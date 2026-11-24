import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Expand, Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// A project's demo video and screenshots in one slider, under the case-study
// header. The video (if any) is the first slide; `gallery` images follow.
//
//   video   — { youtubeId, title?, caption? }   (unlisted YouTube is fine)
//   gallery — [{ src, alt, caption? }]
//
// One slide shows at a time in a 16:9 frame. Arrows, dots, ←/→ keys while the
// slider has focus, and a horizontal swipe all move it. Images are fitted
// inside the frame; tall ones (a long doc, a full form) open full size in a
// new tab when clicked.
//
// The video autoplays muted and loops (browsers only autoplay without sound),
// with captions unloaded over YouTube's embed postMessage API, and pauses when
// its slide isn't showing. Under reduced motion it's a click-to-play
// thumbnail instead, and nothing from YouTube loads until it's pressed.
// ─────────────────────────────────────────────────────────────────────────────

const YT_ORIGIN = "https://www.youtube-nocookie.com";
const REDUCE = "(prefers-reduced-motion: reduce)";

const subscribe = (cb) => {
  const mq = window.matchMedia?.(REDUCE);
  mq?.addEventListener("change", cb);
  return () => mq?.removeEventListener("change", cb);
};
// true = autoplay allowed. Server render: false, so it starts as the thumbnail.
const useAutoplay = () =>
  useSyncExternalStore(
    subscribe,
    () => !window.matchMedia?.(REDUCE).matches,
    () => false
  );

const playerUrl = (id, { muted }) => {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    playsinline: "1",
    cc_load_policy: "0",
    enablejsapi: "1",
  });
  if (muted) {
    params.set("mute", "1");
    params.set("loop", "1");
    params.set("playlist", id); // YouTube loops a single video via a playlist of itself
  }
  return `${YT_ORIGIN}/embed/${id}?${params}`;
};

const ytCommand = (frame, func, args = []) =>
  frame?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    YT_ORIGIN
  );

// ─── Video slide ────────────────────────────────────────────────────────────
const VideoSlide = ({ video, projectName, active }) => {
  const autoplay = useAutoplay();
  const [clicked, setClicked] = useState(false);
  const frameRef = useRef(null);
  const showPlayer = autoplay || clicked;
  const label = video.title ?? `${projectName} demo`;

  // Keep captions off while playback starts (the module loads with
  // playback, not with the iframe), then stop asking.
  useEffect(() => {
    if (!showPlayer) return;
    const timer = setInterval(
      () => ytCommand(frameRef.current, "unloadModule", ["captions"]),
      700
    );
    const stop = setTimeout(() => clearInterval(timer), 12000);
    return () => {
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, [showPlayer]);

  // Pause when the slide is out of view; resume when it comes back.
  useEffect(() => {
    if (!showPlayer) return;
    ytCommand(frameRef.current, active ? "playVideo" : "pauseVideo");
  }, [active, showPlayer]);

  if (showPlayer) {
    return (
      <iframe
        ref={frameRef}
        src={playerUrl(video.youtubeId, { muted: !clicked })}
        title={label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        tabIndex={active ? 0 : -1}
        className="absolute inset-0 w-full h-full"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("project_video_play", { project: projectName });
        setClicked(true);
      }}
      aria-label={`Play video: ${label}`}
      tabIndex={active ? 0 : -1}
      className="group absolute inset-0 w-full h-full"
    >
      <img
        src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
        alt=""
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-caution text-ink shadow-lg group-hover:scale-105 transition-transform">
          <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
};

// ─── Image slide ────────────────────────────────────────────────────────────
const ImageSlide = ({ image, active }) => (
  <a
    href={image.src}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={active ? 0 : -1}
    aria-label={`Open full size: ${image.alt}`}
    className="group absolute inset-0 flex items-center justify-center bg-white"
  >
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      draggable="false"
      className="max-w-full max-h-full object-contain select-none"
    />
    <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-ink/75 text-sheet text-xs font-bold px-3 py-1.5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
      <Expand className="w-3.5 h-3.5" aria-hidden="true" />
      Full size
    </span>
  </a>
);

// ─── Slider ─────────────────────────────────────────────────────────────────
export const ProjectMedia = ({ video, gallery = [], projectName }) => {
  const slides = [
    ...(video ? [{ kind: "video", caption: video.caption }] : []),
    ...gallery.map((image) => ({ kind: "image", image, caption: image.caption })),
  ];
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const count = slides.length;
  if (count === 0) return null;

  const go = (next) => {
    const i = (next + count) % count;
    setIndex(i);
    trackEvent("project_media_slide", { project: projectName, slide: i });
  };

  const current = slides[index];

  // ←/→ work while focus is anywhere in the slider: the frame, the arrows,
  // or the dots. (The YouTube player keeps its own keys once it has focus.)
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section
      className="mt-10"
      aria-roledescription="carousel"
      aria-label={`${projectName} demo and screenshots`}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative aspect-video overflow-hidden rounded-xl border border-rule bg-panel shadow-md"
        tabIndex={0}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        {/* The track: every slide stays mounted (so the video keeps its
            place), and the track slides to the current one. */}
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="relative shrink-0 w-full h-full"
            >
              {s.kind === "video" ? (
                <VideoSlide video={video} projectName={projectName} active={i === index} />
              ) : (
                <ImageSlide image={s.image} active={i === index} />
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 min-w-11 min-h-11 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 min-w-11 min-h-11 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <p className="text-sm text-ink-muted min-h-[1.25rem]" aria-live="polite">
          {current.caption}
        </p>
        {count > 1 && (
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a slide">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={
                    s.kind === "video" ? "Slide 1: demo video" : `Slide ${i + 1}: ${s.image.alt}`
                  }
                  onClick={() => go(i)}
                  className="p-1.5"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-caution" : "w-2 bg-ink-faint/50 hover:bg-ink-faint"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-ink-faint tabular-nums">
              {index + 1} / {count}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectMedia;

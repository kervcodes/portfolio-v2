import { Routes, Route } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useNavigationContinuity } from "@/lib/motion";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import { PostDetail } from "@/pages/PostDetail";
import { SprintPage } from "@/pages/SprintPage";
import { Posts } from "@/sections/Posts";
// import { Projects } from "@/sections/Projects";
import { Learning } from "@/sections/Learning";

// ─── Homepage ─────────────────────────────────────────────────────────────────
// Order is deliberate: the primary visitor is a recruiter with ~60 seconds.
// Credibility (Experience) lands before work-in-progress (Learning, Posts).
//
// Section rhythm — two steps, applied by meaning, not uniformly:
//   major boundary (topic change)  py-24 md:py-32
//   continuation (same movement)   py-16 md:py-20
// Learning + Posts are one movement ("what I'm doing now"), so they sit close.
//
// Content widths — three named roles, nothing else:
//   prose / forms   max-w-2xl (672)
//   record          max-w-3xl (768)
//   grids           max-w-5xl (1024)
//
// Projects stays out until the product names are cleared — see PRODUCT.md.
const HomePage = () => (
  <div className="min-h-screen overflow-x-hidden flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <About />
      <Experience />
      <Learning />
      <Posts />
      {/* <Projects /> */}
      <Contact />
    </main>
    <Footer />
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  // Where a route lands: top of the new page, back to the offset you left, or
  // on the section a deep link named. Mounted once, above the routes.
  useNavigationContinuity();

  return (
    // `domAnimation` is the transform/opacity feature set and nothing else —
    // no layout projection, no drag, no 3D — because that is all this build
    // animates, and it is a third of the full bundle. `strict` makes importing
    // the eager `motion` component a build error, so the lean set cannot be
    // quietly undone by one import in one section later.
    //
    // `reducedMotion="user"` is the library's half of the preference; the
    // components in lib/sequence.jsx skip their observers entirely under it,
    // so the guard is a pair rather than a single point of failure.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sprint" element={<SprintPage />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
        </Routes>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;

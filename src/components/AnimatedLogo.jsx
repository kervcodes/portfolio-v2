// The mark: dark initials on a rounded amber tile — the same solid amber the
// Contact and résumé buttons wear, so the logo reads as part of that set.
export const AnimatedLogo = ({ size = 34 }) => (
  <span
    className="relative inline-flex shrink-0 items-center justify-center bg-caution text-ink shadow-md"
    style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.24),
    }}
    aria-hidden="true"
  >
    <span
      className="font-sans font-bold leading-none tracking-tight"
      style={{ fontSize: size * 0.42 }}
    >
      KN
    </span>
  </span>
);

export default AnimatedLogo;

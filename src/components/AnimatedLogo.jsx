// The mark is a stencilled equipment plate: initials punched into a square,
// the way a placard is riveted to a panel. The aurora-gradient hexagon
// belonged to the previous world.
export const AnimatedLogo = ({ size = 34 }) => (
  <span
    className="relative inline-flex shrink-0 items-center justify-center border border-current"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    {/* corner rivets */}
    <span className="absolute left-0.5 top-0.5 w-0.5 h-0.5 bg-current opacity-60" />
    <span className="absolute right-0.5 top-0.5 w-0.5 h-0.5 bg-current opacity-60" />
    <span className="absolute left-0.5 bottom-0.5 w-0.5 h-0.5 bg-current opacity-60" />
    <span className="absolute right-0.5 bottom-0.5 w-0.5 h-0.5 bg-current opacity-60" />
    <span
      className="font-mono font-bold leading-none tracking-[0.06em]"
      style={{ fontSize: size * 0.38 }}
    >
      KN
    </span>
  </span>
);

export default AnimatedLogo;

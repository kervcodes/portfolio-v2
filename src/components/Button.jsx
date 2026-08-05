// Buttons are placard keys: square, stencil-lettered, and they commit with a
// press rather than a glow. No rounded pills, no shadows growing on hover.
const base =
  "relative inline-flex items-center justify-center gap-2 font-mono uppercase " +
  "tracking-[0.14em] font-bold transition-colors duration-150 " +
  "active:translate-y-px disabled:opacity-45 disabled:cursor-not-allowed " +
  "disabled:active:translate-y-0";

const variants = {
  // The committed action.
  primary: "bg-ink text-sheet hover:bg-panel-2 border border-ink",
  // Available, secondary. Reads as an unlit key until you touch it.
  outline:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-sheet",
  // On the charcoal panel.
  panel:
    "bg-caution text-ink border border-caution hover:bg-sheet hover:border-sheet",
};

// A placard key is not a small object: the page's conversion actions should
// not be its smallest lettering.
const sizes = {
  sm: "text-[0.6875rem] px-3 py-2 min-h-9",
  default: "text-xs px-5 py-3 min-h-11",
  lg: "text-sm px-7 py-4 min-h-12",
};

export const Button = ({
  className = "",
  size = "default",
  variant = "primary",
  href,
  children,
  ...props
}) => {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      className={`${base} ${variants[variant] ?? variants.primary} ${
        sizes[size] ?? sizes.default
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Button;

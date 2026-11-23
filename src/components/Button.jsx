// Buttons: soft rounded keys in the page's serif, sentence case, with a small
// drop shadow and a 200ms ease on hover. Proportions follow the reference
// hero (17px type, 12×24 padding, 8px radius); colour stays in this site's
// palette — charcoal panel for the committed action, amber on the dark strip.
const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden " +
  "font-sans font-medium leading-normal no-underline rounded-lg " +
  "transition-all duration-200 ease-in-out active:translate-y-px " +
  "focus-visible:outline-3 focus-visible:outline-offset-2 " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:active:translate-y-0";

const variants = {
  // The committed action. Darkens on hover, the way the reference does.
  primary: "bg-panel text-sheet shadow-md hover:bg-ink hover:shadow-lg",
  // Available, secondary: drawn, not filled, until you touch it.
  outline:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-sheet hover:shadow-md",
  // On the charcoal panel.
  panel: "bg-caution text-ink shadow-md hover:bg-sheet hover:shadow-lg",
};

const sizes = {
  sm: "text-[15px] px-4 py-2 min-h-10",
  default: "text-[17px] px-6 py-3 min-h-11",
  lg: "text-lg px-7 py-3.5 min-h-12",
};

export const Button = ({
  className = "",
  size = "default",
  variant = "primary",
  href,
  as,
  children,
  ...props
}) => {
  // `as` lets a caller swap in a router <Link> (passing `to`) for in-app
  // routes, so they navigate client-side instead of reloading the page.
  const Tag = as ?? (href ? "a" : "button");
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

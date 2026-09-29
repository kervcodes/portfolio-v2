import { tagBorderClass } from "@/lib/tagColors";

// The ride kiosk's stack chips, one step larger — the site's 11px placard is
// too small to read from across a table. Deliberately not <Tag>: its glossary
// tooltips are a reading aid for a desk, not clutter to open on a kiosk.
export const Chips = ({ items, className = "" }) => (
  <ul className={`flex flex-wrap gap-2 ${className}`}>
    {items.map((item) => (
      <li
        key={item}
        className={`placard text-xs text-ink-muted border px-2.5 py-1.5 ${tagBorderClass(item)}`}
      >
        {item}
      </li>
    ))}
  </ul>
);

export default Chips;

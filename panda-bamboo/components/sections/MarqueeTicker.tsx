const DEFAULT_ITEMS = ["Toy Car", "Girls Doll", "Balloons", "Color Plate", "Puzzles", "Cubes"];

export function MarqueeTicker({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-theme-light py-4">
      <ul className="animate-marquee flex w-max gap-8 text-sm font-bold uppercase tracking-wider text-theme">
        {row.map((t, i) => (
          <li key={`${t}-${i}`}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

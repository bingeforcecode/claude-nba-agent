import type { Category } from "@/lib/reports";

const STYLES: Record<Category, string> = {
  "Trade rumor": "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  "Firing/Drama": "bg-red-500/15 text-red-300 ring-red-500/30",
  "Signing/Move": "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Beef/Fight": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Other: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${STYLES[category]}`}
    >
      {category}
    </span>
  );
}

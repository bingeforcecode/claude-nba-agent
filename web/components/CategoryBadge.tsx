import type { Category } from "@/lib/reports";

const STYLES: Record<Category, string> = {
  "Trade rumor": "bg-blue-50 text-blue-700 ring-blue-600/20",
  "Firing/Drama": "bg-red-50 text-red-700 ring-red-600/20",
  "Signing/Move": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Beef/Fight": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Other: "bg-zinc-100 text-zinc-700 ring-zinc-600/20",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${STYLES[category]}`}
    >
      {category}
    </span>
  );
}

import type { Story } from "@/lib/reports";
import { CategoryBadge } from "./CategoryBadge";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <CategoryBadge category={story.category} />
        <span className="text-sm font-extrabold tabular-nums text-zinc-300">
          #{story.rank}
        </span>
      </div>

      <h2 className="text-lg font-bold leading-snug text-zinc-900">
        {story.headline}
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            The real story
          </p>
          <p className="leading-relaxed text-zinc-600">{story.realStory}</p>
        </div>
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Why it pops
          </p>
          <p className="leading-relaxed text-zinc-500">{story.whyItPops}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {story.sourceUrl ? (
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 rounded-lg bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-700 ring-1 ring-inset ring-zinc-200 transition hover:bg-orange-50 hover:text-orange-700 hover:ring-orange-200"
          >
            {story.sourceLabel || "Source"} ↗
          </a>
        ) : (
          <span className="text-sm text-zinc-400">{story.sourceLabel}</span>
        )}

        {story.clipUrl && (
          <a
            href={story.clipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 rounded-lg bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-inset ring-sky-200 transition hover:bg-sky-100"
          >
            ▶ Watch clip
          </a>
        )}
      </div>
    </article>
  );
}

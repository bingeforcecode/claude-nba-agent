import type { Story } from "@/lib/reports";
import { CategoryBadge } from "./CategoryBadge";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <CategoryBadge category={story.category} />
        <span className="text-sm font-bold text-white/30">#{story.rank}</span>
      </div>

      <h2 className="text-xl font-bold leading-snug text-white">
        {story.headline}
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">
            The real story
          </p>
          <p className="leading-relaxed text-white/80">{story.realStory}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">
            Why it pops
          </p>
          <p className="leading-relaxed text-white/70">{story.whyItPops}</p>
        </div>
      </div>

      {story.sourceUrl ? (
        <a
          href={story.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium text-orange-300 hover:text-orange-200"
        >
          {story.sourceLabel || "Source"} ↗
        </a>
      ) : (
        <span className="mt-auto text-sm text-white/40">
          {story.sourceLabel}
        </span>
      )}
    </article>
  );
}

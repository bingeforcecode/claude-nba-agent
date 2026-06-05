import Link from "next/link";
import type { Report } from "@/lib/reports";
import { StoryCard } from "./StoryCard";

function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function Dashboard({
  report,
  dates,
}: {
  report: Report;
  dates: string[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <header className="mb-8 border-b border-white/10 pb-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
          Basketball Kings
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
          Daily Briefing
        </h1>
        <p className="mt-2 text-white/50">{formatDate(report.date)}</p>
      </header>

      {dates.length > 1 && (
        <nav className="mb-8 flex flex-wrap gap-2">
          {dates.map((d) => {
            const active = d === report.date;
            return (
              <Link
                key={d}
                href={d === dates[0] ? "/" : `/briefing/${d}`}
                className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset transition ${
                  active
                    ? "bg-orange-500/20 text-orange-200 ring-orange-500/40"
                    : "bg-white/[0.03] text-white/60 ring-white/10 hover:bg-white/[0.06]"
                }`}
              >
                {d}
              </Link>
            );
          })}
        </nav>
      )}

      {report.stories.length === 0 ? (
        <p className="text-white/50">No stories in this briefing.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {report.stories.map((story) => (
            <StoryCard key={story.rank} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}

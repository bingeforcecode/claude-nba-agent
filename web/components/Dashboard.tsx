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

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <p className="text-2xl font-extrabold tracking-tight text-zinc-900">
        {value}
      </p>
      <p className="text-sm font-medium text-zinc-500">{label}</p>
    </div>
  );
}

export function Dashboard({
  report,
  dates,
}: {
  report: Report;
  dates: string[];
}) {
  const categories = new Set(report.stories.map((s) => s.category));

  return (
    <div>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm font-black text-white">
              BK
            </span>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Basketball Kings
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Daily Briefing
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-zinc-500">
            The biggest NBA stories worth an episode — sourced, ranked, and ready
            to shoot.
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-400">
            {formatDate(report.date)}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
            <Stat value={report.stories.length} label="Top stories" />
            <Stat value={categories.size} label="Categories" />
            <Stat value="Daily" label="Updated" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {dates.length > 1 && (
          <nav className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-medium text-zinc-400">
              Past briefings:
            </span>
            {dates.map((d) => {
              const active = d === report.date;
              return (
                <Link
                  key={d}
                  href={d === dates[0] ? "/" : `/briefing/${d}`}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-orange-500 text-white shadow-sm"
                      : "bg-white text-zinc-600 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  {d}
                </Link>
              );
            })}
          </nav>
        )}

        {report.stories.length === 0 ? (
          <p className="text-zinc-500">No stories in this briefing.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {report.stories.map((story) => (
              <StoryCard key={story.rank} story={story} />
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-12 pt-4">
        <p className="border-t border-zinc-200 pt-6 text-sm text-zinc-400">
          Basketball Kings — daily NBA briefing. Stories sourced via live web
          search.
        </p>
      </footer>
    </div>
  );
}

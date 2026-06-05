import { Dashboard } from "@/components/Dashboard";
import { getLatestReport, getReportDates } from "@/lib/reports";

export default function Home() {
  const report = getLatestReport();
  const dates = getReportDates();

  if (!report) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">
          Basketball Kings — Daily Briefing
        </h1>
        <p className="mt-3 text-white/50">
          No briefings yet. Run the agent to generate one.
        </p>
      </div>
    );
  }

  return <Dashboard report={report} dates={dates} />;
}

import { notFound } from "next/navigation";
import { Dashboard } from "@/components/Dashboard";
import { getReport, getReportDates } from "@/lib/reports";

export function generateStaticParams() {
  return getReportDates().map((date) => ({ date }));
}

export default async function BriefingPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const report = getReport(date);
  if (!report) notFound();

  return <Dashboard report={report} dates={getReportDates()} />;
}

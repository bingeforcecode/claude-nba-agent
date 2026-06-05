import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basketball Kings — Daily Briefing",
  description: "Daily NBA story briefing for the Basketball Kings show.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

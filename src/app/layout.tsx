import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MatchDay Hub | Digital Match Sheet & Live Tournament Engine",
  description: "Production-grade tournament management & digital e-scoreboard for futsal and football leagues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}

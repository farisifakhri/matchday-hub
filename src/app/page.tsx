import Link from "next/link";
import { Trophy, Activity, ShieldAlert, FileSpreadsheet, PlayCircle, Users, CheckCircle2, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              ⚽
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight text-white">MatchDay Hub</h1>
              <span className="text-xs text-slate-400">Digital Match Sheet & Tournament Engine</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            <Trophy className="w-3.5 h-3.5" /> Next-Gen Sports Management Platform
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Digital Match Sheet & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Live Tournament Engine
            </span>
          </h2>
          
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Eliminates manual paper score sheets, tracks accumulated fouls per half, enforces referee licensing, and generates official PDF Match Reports (*Berita Acara*) in 1-click.
          </p>
        </div>

        {/* Action Portals */}
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Operator Console */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Operator Console</h3>
              <p className="text-slate-400 text-sm">
                Touchscreen tablet interface for table officials. Track goals, accumulated fouls, cards, and timeouts with live countdown clocks.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5th Foul & 10m Penalty Alert
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Auto 2nd Yellow to Red
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/match/sample-match/live"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition"
              >
                Launch Operator Tablet
              </Link>
            </div>
          </div>

          {/* Card 2: Public Match Center */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Public Live Scoreboard</h3>
              <p className="text-slate-400 text-sm">
                Real-time spectator view featuring live scores, period tracking, animated goal flashes, and timeline incident logs.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Realtime Incident Timeline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Live Lineup & Roster View
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/live/sample-match"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition"
              >
                Open Live Scoreboard
              </Link>
            </div>
          </div>

          {/* Card 3: Admin & BAP Report */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Admin & Official BAP</h3>
              <p className="text-slate-400 text-sm">
                Tournament dashboard with bracket standings, referee assignment matrix, and instant PDF Berita Acara Pertandingan generation.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1-Click PDF Match Sheet
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Referee License Checker
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition"
              >
                View Tournament Admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-12 border-t border-slate-800 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">Engine Specifications</h3>
          <p className="text-slate-400 text-sm">Built for high reliability and zero-loss match recording</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="font-semibold text-sm text-white">Futsal Official Clock</div>
            <div className="text-xs text-slate-400 mt-1">20-Min Net/Gross Countdown with Stoppage controls</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <ShieldAlert className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="font-semibold text-sm text-white">Accumulated Fouls</div>
            <div className="text-xs text-slate-400 mt-1">Automatic 5th warning & 6th 10m spot penalty triggers</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="font-semibold text-sm text-white">Referee Matrix</div>
            <div className="text-xs text-slate-400 mt-1">1st, 2nd, 3rd, and Timekeeper assignment checks</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="font-semibold text-sm text-white">PostgreSQL ACID</div>
            <div className="text-xs text-slate-400 mt-1">Atomic score & event transactions without desync</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        MatchDay Hub © 2026. Production-Grade Sports Tournament Engine.
      </footer>
    </main>
  );
}

import React from "react";
import Link from "next/link";
import { Trophy, Users, FileText, ArrowLeft, ShieldCheck, PlayCircle, Calendar } from "lucide-react";

export default function AdminDashboardPage() {
  const standings = [
    { rank: 1, team: "Garuda Muda FC", played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 1, gd: "+2", pts: 3 },
    { rank: 2, team: "Rajawali Futsal Club", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 3, gd: "-2", pts: 0 },
    { rank: 3, team: "Bintang Timur Futsal", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: "0", pts: 0 },
    { rank: 4, team: "Cosmo JNE Futsal", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: "0", pts: 0 },
  ];

  const matches = [
    { id: "match-1", number: 1, court: "Court 1", time: "14:00", home: "Garuda Muda FC", away: "Rajawali Futsal Club", status: "LIVE", score: "1 - 0" },
    { id: "match-2", number: 2, court: "Court 1", time: "16:00", home: "Bintang Timur Futsal", away: "Cosmo JNE Futsal", status: "UPCOMING", score: "vs" },
  ];

  const referees = [
    { name: "Agus Hendrawan, S.Pd", role: "1st Referee", license: "Level 1 Nasional (PSSI)", status: "Assigned • Match #1" },
    { name: "Deni Hermawan", role: "2nd Referee", license: "Level 2 Daerah (AFP JBR)", status: "Assigned • Match #1" },
    { name: "Rian Prasetyo", role: "Timekeeper", license: "Level 3 Daerah (AFP DKI)", status: "Assigned • Match #1" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-bold text-base text-white">Super League Championship Futsal 2026</h1>
            <span className="text-xs text-slate-400">Tournament Administration & BAP Management</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/match/sample-match/live"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition"
          >
            <PlayCircle className="w-4 h-4" /> Open Live Operator
          </Link>
        </div>
      </header>

      {/* Admin Body */}
      <main className="max-w-7xl mx-auto w-full p-6 space-y-8">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">Total Teams</div>
            <div className="text-2xl font-bold text-white mt-1">4 Clubs</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">Matches Scheduled</div>
            <div className="text-2xl font-bold text-white mt-1">12 Fixtures</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">Licensed Officials</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">6 Referees</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">Validated BAPs</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">1 Generated</div>
          </div>
        </div>

        {/* 2 Column Layout: Matches & Standings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Matches & Schedule (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" /> Matchday Fixtures
              </h2>
            </div>

            <div className="space-y-3">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Match #{m.number}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {m.court} • {m.time}
                      </span>
                      {m.status === "LIVE" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 font-bold animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-white text-base">
                      {m.home} <span className="text-emerald-400 px-2">{m.score}</span> {m.away}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/api/pdf/sample-match"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" /> BAP (PDF)
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Referee Assignment Matrix */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Referee Assignment & License Validation
              </h3>
              <div className="space-y-2">
                {referees.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{ref.name}</div>
                      <div className="text-slate-400">{ref.license}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 rounded bg-slate-800 text-cyan-400 font-medium">
                        {ref.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Standings Table (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> Tournament Standings
            </h2>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    <th className="p-3">Team</th>
                    <th className="p-3 text-center">P</th>
                    <th className="p-3 text-center">GD</th>
                    <th className="p-3 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {standings.map((team) => (
                    <tr key={team.rank} className="hover:bg-slate-800/30">
                      <td className="p-3 text-center font-bold text-slate-400">{team.rank}</td>
                      <td className="p-3 font-semibold text-white">{team.team}</td>
                      <td className="p-3 text-center">{team.played}</td>
                      <td className="p-3 text-center text-slate-400">{team.gd}</td>
                      <td className="p-3 text-center font-bold text-emerald-400">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

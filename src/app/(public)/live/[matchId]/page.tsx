"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Radio, Clock, ShieldAlert, Sparkles } from "lucide-react";

export default function PublicLiveScoreboardPage({ params }: { params: Promise<{ matchId: string }> }) {
  const resolvedParams = React.use(params);
  const [activeTab, setActiveTab] = useState<"TIMELINE" | "LINEUPS">("TIMELINE");

  const matchData = {
    tournament: "Super League Championship Futsal 2026",
    stage: "Group Stage • Group A",
    venue: "GOR Sumantri Brodjonegoro (Court 1)",
    status: "FIRST_HALF",
    clock: "15:28",
    homeTeam: {
      name: "Garuda Muda FC",
      code: "GDA",
      score: 1,
      fouls: 2,
      color: "#dc2626",
      starters: ["#1 Muhammad Ridwan (GK)", "#4 Bambang Kurnia (C)", "#7 Fajar Pratama", "#10 Syahrul Ramadhan", "#11 Andi Saputra"],
    },
    awayTeam: {
      name: "Rajawali Futsal Club",
      code: "RJW",
      score: 0,
      fouls: 3,
      color: "#2563eb",
      starters: ["#12 Dimas Wicaksono (GK)", "#5 Eko Prasetyo", "#8 Rizky Firmansyah (C)", "#9 Hadi Gunawan", "#14 Kevin Alamsyah"],
    },
    timeline: [
      { id: "e1", minute: 4, second: 32, period: "1H", team: "GDA", type: "GOAL", text: "GOAL! Fajar Pratama (#7) strikes into the bottom left corner." },
      { id: "e2", minute: 7, second: 10, period: "1H", team: "RJW", type: "FOUL", text: "Foul committed by #5 Eko Prasetyo." },
      { id: "e3", minute: 9, second: 45, period: "1H", team: "GDA", type: "YELLOW_CARD", text: "Yellow Card issued to #10 Syahrul Ramadhan for reckless tackle." },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-bold text-sm text-white">MATCHDAY LIVE MATCH CENTER</span>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
          LIVE STREAM SYNC
        </span>
      </header>

      {/* Hero Live Score Banner */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
            {matchData.tournament}
          </div>
          <div className="text-xs text-slate-500 mb-6">
            {matchData.stage} • {matchData.venue}
          </div>

          {/* Live Score Block */}
          <div className="w-full grid grid-cols-11 items-center justify-items-center gap-2">
            {/* Home Team */}
            <div className="col-span-4 flex flex-col items-end text-right">
              <div className="h-14 w-14 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center font-black text-xl text-red-400 mb-2">
                {matchData.homeTeam.code}
              </div>
              <h2 className="font-extrabold text-xl sm:text-2xl text-white">{matchData.homeTeam.name}</h2>
              <div className="text-xs text-slate-400 mt-1">
                Accumulated Fouls: <span className="font-bold text-amber-400">{matchData.homeTeam.fouls}/5</span>
              </div>
            </div>

            {/* Score & Period Status */}
            <div className="col-span-3 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold mb-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                1ST HALF
              </div>
              <div className="text-5xl sm:text-7xl font-extrabold text-white tracking-wider font-mono">
                {matchData.homeTeam.score} - {matchData.awayTeam.score}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold mt-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5" /> {matchData.clock}
              </div>
            </div>

            {/* Away Team */}
            <div className="col-span-4 flex flex-col items-start text-left">
              <div className="h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-black text-xl text-blue-400 mb-2">
                {matchData.awayTeam.code}
              </div>
              <h2 className="font-extrabold text-xl sm:text-2xl text-white">{matchData.awayTeam.name}</h2>
              <div className="text-xs text-slate-400 mt-1">
                Accumulated Fouls: <span className="font-bold text-amber-400">{matchData.awayTeam.fouls}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <div className="flex border-b border-slate-800 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("TIMELINE")}
            className={`pb-3 font-semibold text-sm transition relative ${
              activeTab === "TIMELINE" ? "text-emerald-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Match Incident Timeline
            {activeTab === "TIMELINE" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("LINEUPS")}
            className={`pb-3 font-semibold text-sm transition relative ${
              activeTab === "LINEUPS" ? "text-emerald-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Starting Lineups & Rosters
            {activeTab === "LINEUPS" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
            )}
          </button>
        </div>

        {activeTab === "TIMELINE" ? (
          <div className="space-y-4">
            {matchData.timeline.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4"
              >
                <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                  {item.minute}&apos;
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.type === "GOAL"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : item.type === "YELLOW_CARD"
                          ? "bg-yellow-950 text-yellow-400 border border-yellow-800"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-500">[{item.period}]</span>
                  </div>
                  <p className="text-sm text-slate-200">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                {matchData.homeTeam.name}
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {matchData.homeTeam.starters.map((player, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    {player}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                {matchData.awayTeam.name}
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {matchData.awayTeam.starters.map((player, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    {player}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

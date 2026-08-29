"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ScoreboardBanner from "./ScoreboardBanner";
import MatchTimeline from "./MatchTimeline";
import MatchPitchLineup from "./MatchPitchLineup";
import MatchStatsComparison from "./MatchStatsComparison";
import StandingsTable from "@/components/standings/StandingsTable";
import { MatchDetailData, StandingItem, UserRole } from "@/types/match";
import Link from "next/link";
import { 
  Clock, 
  Users, 
  BarChart3, 
  Trophy, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Star,
  Tv
} from "lucide-react";

interface MatchCenterDetailClientProps {
  match: MatchDetailData;
  standings?: StandingItem[];
}

type TabKey = "TIMELINE" | "LINEUPS" | "RATINGS" | "STATS" | "STANDINGS" | "OFFICIALS";

export default function MatchCenterDetailClient({
  match,
  standings = [],
}: MatchCenterDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("TIMELINE");
  const [currentRole, setCurrentRole] = useState<UserRole>("USER");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "TIMELINE", label: "Linimasa Insiden", icon: <Clock className="w-4 h-4" /> },
    { key: "LINEUPS", label: "Susunan & Lapangan 2D", icon: <Users className="w-4 h-4" /> },
    { key: "RATINGS", label: "Rating Pemain (FotMob)", icon: <Star className="w-4 h-4 text-[#eab308]" /> },
    { key: "STATS", label: "Statistik Pertandingan", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "STANDINGS", label: "Klasemen Langsung", icon: <Trophy className="w-4 h-4" /> },
    { key: "OFFICIALS", label: "Wasit & Dokumen BAP", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#222222] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentSport={match.sportType}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />

      {/* Hero Scoreboard Banner */}
      <ScoreboardBanner match={match} />

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto w-full px-4 py-6 flex-1 space-y-6">
        {/* FotMob Navigation Tabs Bar */}
        <div className="flex items-center gap-1 border-b border-[#e5e7eb] overflow-x-auto pb-1 scrollbar-none bg-white p-1 rounded-2xl shadow-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap rounded-xl transition ${
                  isActive
                    ? "bg-[#222222] text-white shadow-sm"
                    : "text-[#666666] hover:text-[#222222] hover:bg-[#f3f4f6]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Timeline */}
        {activeTab === "TIMELINE" && (
          <div className="p-6 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <MatchTimeline
              events={match.events}
              homeTeamCode={match.homeTeam.code}
              awayTeamCode={match.awayTeam.code}
            />
          </div>
        )}

        {/* Tab 2: Lineups & 2D Tactical Pitch */}
        {activeTab === "LINEUPS" && (
          <div className="p-6 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <MatchPitchLineup
              sportType={match.sportType}
              homeTeam={{
                name: match.homeTeam.name,
                code: match.homeTeam.code,
                color: match.homeTeam.officialColor || "#dc2626",
                starters: match.homeTeam.starters,
                bench: match.homeTeam.bench,
              }}
              awayTeam={{
                name: match.awayTeam.name,
                code: match.awayTeam.code,
                color: match.awayTeam.officialColor || "#2563eb",
                starters: match.awayTeam.starters,
                bench: match.awayTeam.bench,
              }}
            />
          </div>
        )}

        {/* Tab 3: FotMob Automated Player Ratings & MOTM */}
        {activeTab === "RATINGS" && (
          <div className="space-y-6">
            {/* Man of the Match Spotlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#222222] to-[#383838] text-white shadow-md flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eab308] text-[#222222] text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>MAN OF THE MATCH (MOTM)</span>
                </div>
                <h3 className="text-xl font-extrabold">Bukayo Saka (#7 • ARS)</h3>
                <p className="text-xs text-slate-300">
                  1 Gol Indah, 1 Assist Krusial, 4 Dribel Sukses • FotMob Rating: <strong className="text-[#eab308] text-sm">8.9</strong>
                </p>
              </div>

              <div className="text-right">
                <div className="font-mono text-3xl font-black text-[#eab308]">8.9</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">FotMob Score</div>
              </div>
            </div>

            {/* Squad Ratings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Team Ratings */}
              <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
                  <span className="font-bold text-sm text-[#222222]">{match.homeTeam.name}</span>
                  <span className="text-xs text-[#666666] font-mono">Rating Tim: 7.4</span>
                </div>

                <div className="divide-y divide-[#f0f0f0]">
                  {match.homeTeam.starters.map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[#666666] font-bold w-5">#{p.jerseyNumber}</span>
                        <span className="font-semibold text-[#222222]">{p.fullName}</span>
                        {p.isCaptain && (
                          <span className="text-[9px] px-1 rounded bg-[#f3f4f6] font-bold text-[#374151]">C</span>
                        )}
                        {p.isMOTM && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#fef08a] font-black text-[#854d0e] flex items-center gap-0.5">
                            ★ MOTM
                          </span>
                        )}
                      </div>
                      <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                        (p.rating || 6.0) >= 8.0 ? "bg-[#dcfce7] text-[#166534]" :
                        (p.rating || 6.0) >= 7.0 ? "bg-[#fef9c3] text-[#854d0e]" : "bg-[#f3f4f6] text-[#374151]"
                      }`}>
                        {p.rating?.toFixed(1) || "6.5"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away Team Ratings */}
              <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
                  <span className="font-bold text-sm text-[#222222]">{match.awayTeam.name}</span>
                  <span className="text-xs text-[#666666] font-mono">Rating Tim: 6.8</span>
                </div>

                <div className="divide-y divide-[#f0f0f0]">
                  {match.awayTeam.starters.map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[#666666] font-bold w-5">#{p.jerseyNumber}</span>
                        <span className="font-semibold text-[#222222]">{p.fullName}</span>
                        {p.isCaptain && (
                          <span className="text-[9px] px-1 rounded bg-[#f3f4f6] font-bold text-[#374151]">C</span>
                        )}
                      </div>
                      <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                        (p.rating || 6.0) >= 8.0 ? "bg-[#dcfce7] text-[#166534]" :
                        (p.rating || 6.0) >= 7.0 ? "bg-[#fef9c3] text-[#854d0e]" : "bg-[#f3f4f6] text-[#374151]"
                      }`}>
                        {p.rating?.toFixed(1) || "6.2"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Match Stats Bar Comparison */}
        {activeTab === "STATS" && (
          <div className="p-6 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <MatchStatsComparison
              sportType={match.sportType}
              homeTeam={{
                name: match.homeTeam.name,
                code: match.homeTeam.code,
                color: match.homeTeam.officialColor || "#dc2626",
                score: match.homeTeam.score,
                foulsH1: match.homeTeam.foulsH1,
                foulsH2: match.homeTeam.foulsH2,
                timeoutsH1: match.homeTeam.timeoutsH1,
                timeoutsH2: match.homeTeam.timeoutsH2,
              }}
              awayTeam={{
                name: match.awayTeam.name,
                code: match.awayTeam.code,
                color: match.awayTeam.officialColor || "#2563eb",
                score: match.awayTeam.score,
                foulsH1: match.awayTeam.foulsH1,
                foulsH2: match.awayTeam.foulsH2,
                timeoutsH1: match.awayTeam.timeoutsH1,
                timeoutsH2: match.awayTeam.timeoutsH2,
              }}
            />
          </div>
        )}

        {/* Tab 5: Live Standings */}
        {activeTab === "STANDINGS" && (
          <div className="space-y-4">
            <StandingsTable
              standings={standings}
              title={`Klasemen Langsung • ${match.tournamentName}`}
              isCompact={false}
            />
          </div>
        )}

        {/* Tab 6: Match Officials & BAP Document */}
        {activeTab === "OFFICIALS" && (
          <div className="space-y-6">
            {/* Officials Matrix */}
            <div className="p-6 rounded-2xl bg-white border border-[#f0f0f0] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0a8a4a]" />
                  <h3 className="font-bold text-base text-[#222222]">Perangkat Pertandingan Resmi (Officials)</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#166534] font-bold">
                  Lisensi Terverifikasi PSSI
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {match.officials.map((off, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] space-y-1.5"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0a8a4a]">
                      {off.role}
                    </div>
                    <div className="font-bold text-sm text-[#222222]">{off.name}</div>
                    <div className="text-xs text-[#666666]">{off.license}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BAP Download / Legal Sign-off Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#0a8a4a] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dokumen Berita Acara Pertandingan (BAP) Tersedia</span>
                </div>
                <h4 className="text-lg font-bold text-[#222222]">
                  Official Match Sheet & Incident Protocol (Format Standar A4)
                </h4>
                <p className="text-xs text-[#666666] max-w-xl">
                  Memuat rincian akumulasi foul per babak, pencetak gol, sanksi kartu kuning/merah, serta kolom tanda tangan digital wasit 1, wasit 2, dan timekeeper.
                </p>
              </div>

              <Link
                href={`/api/pdf/${match.id}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-md transition whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-[#0a8a4a]" />
                <span>Buka / Cetak BAP (PDF)</span>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

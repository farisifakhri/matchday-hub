"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import RoleIndicatorBadge from "@/components/layout/RoleIndicatorBadge";
import MatchCard from "@/components/match/MatchCard";
import MatchFilters, { StatusFilterType } from "@/components/match/MatchFilters";
import StandingsTable from "@/components/standings/StandingsTable";
import TopScorersWidget from "@/components/match/TopScorersWidget";
import { SportType, UserRole, StandingItem } from "@/types/match";
import Link from "next/link";
import { Trophy, FileText, PlayCircle, ShieldCheck, ChevronRight, Layers, Users, QrCode, Tv } from "lucide-react";

interface MatchItemFormatted {
  id: string;
  sportType: SportType;
  matchNumber: number;
  stage: string;
  venue: string;
  status: any;
  scheduledAt: string;
  homeTeam: {
    name: string;
    code: string;
    score: number;
    color?: string | null;
    fouls?: number;
  };
  awayTeam: {
    name: string;
    code: string;
    score: number;
    color?: string | null;
    fouls?: number;
  };
}

interface MatchHubDashboardProps {
  initialFootballMatches: MatchItemFormatted[];
  initialFootballStandings: StandingItem[];
  initialFutsalMatches: MatchItemFormatted[];
  initialFutsalStandings: StandingItem[];
}

export default function MatchHubDashboard({
  initialFootballMatches,
  initialFootballStandings,
  initialFutsalMatches,
  initialFutsalStandings,
}: MatchHubDashboardProps) {
  const [currentSport, setCurrentSport] = useState<SportType>("FOOTBALL");
  const [currentRole, setCurrentRole] = useState<UserRole>("USER");
  const [activeStatus, setActiveStatus] = useState<StatusFilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeMatches = currentSport === "FOOTBALL" ? initialFootballMatches : initialFutsalMatches;
  const activeStandings = currentSport === "FOOTBALL" ? initialFootballStandings : initialFutsalStandings;

  // Filter matches
  const filteredMatches = activeMatches.filter((m) => {
    // Status filter
    if (activeStatus === "LIVE") {
      const isLive = m.status === "FIRST_HALF" || m.status === "SECOND_HALF" || m.status === "EXTRA_TIME";
      if (!isLive) return false;
    } else if (activeStatus === "COMPLETED") {
      if (m.status !== "COMPLETED") return false;
    } else if (activeStatus === "SCHEDULED") {
      if (m.status !== "SCHEDULED") return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = `${m.homeTeam.name} ${m.awayTeam.name} ${m.venue}`.toLowerCase();
      if (!matchName.includes(q)) return false;
    }

    return true;
  });

  const liveCount = activeMatches.filter(
    (m) => m.status === "FIRST_HALF" || m.status === "SECOND_HALF"
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#222222] flex flex-col font-sans">
      {/* Global Navbar with FotMob Styling, Sports Switcher & 5 Portals */}
      <Navbar
        currentSport={currentSport}
        onSportChange={setCurrentSport}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6 flex-1">
        {/* Role Simulator Banner */}
        <RoleIndicatorBadge currentRole={currentRole} />

        {/* 5 Portals Quick Navigator Banner (Futscore Model) */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#d71149]" />
              <h3 className="font-bold text-sm text-[#222222]">
                5 Portal Mandiri Terpisah (Futscore Ecosystem)
              </h3>
            </div>
            <span className="text-xs text-[#666666] hidden sm:inline">
              Pilih portal sesuai peran Anda di turnamen
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <Link
              href="/"
              className="p-3 rounded-xl bg-[#222222] text-white flex flex-col justify-between hover:bg-[#383838] transition shadow-sm"
            >
              <div className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Portal 1</div>
              <div className="font-bold text-xs mt-1">Public Fan Hub</div>
              <div className="text-[11px] opacity-75 mt-0.5">Live center & Klasemen</div>
            </Link>

            <Link
              href="/club"
              className="p-3 rounded-xl bg-white border border-[#e5e7eb] hover:bg-slate-50 text-[#222222] flex flex-col justify-between transition shadow-sm"
            >
              <div className="text-[10px] font-bold text-[#0a8a4a] uppercase tracking-wider">Portal 2</div>
              <div className="font-bold text-xs mt-1">Club & Manager</div>
              <div className="text-[11px] text-[#666666] mt-0.5">Roster & DSP Lineup</div>
            </Link>

            <Link
              href="/admin/dashboard"
              className="p-3 rounded-xl bg-white border border-[#e5e7eb] hover:bg-slate-50 text-[#222222] flex flex-col justify-between transition shadow-sm"
            >
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Portal 3</div>
              <div className="font-bold text-xs mt-1">Organizer & Admin</div>
              <div className="text-[11px] text-[#666666] mt-0.5">Bagan, Sponsor & Poster</div>
            </Link>

            <Link
              href="/operator/match/sample-match/live"
              className="p-3 rounded-xl bg-white border border-[#e5e7eb] hover:bg-slate-50 text-[#222222] flex flex-col justify-between transition shadow-sm"
            >
              <div className="text-[10px] font-bold text-[#eab308] uppercase tracking-wider">Portal 4</div>
              <div className="font-bold text-xs mt-1">Operator Meja</div>
              <div className="text-[11px] text-[#666666] mt-0.5">Tablet E-Scoreboard</div>
            </Link>

            <Link
              href="/officials"
              className="p-3 rounded-xl bg-white border border-[#e5e7eb] hover:bg-slate-50 text-[#222222] flex flex-col justify-between transition shadow-sm"
            >
              <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Portal 5</div>
              <div className="font-bold text-xs mt-1">Commissioner</div>
              <div className="text-[11px] text-[#666666] mt-0.5">Scan QR & Sign BAP</div>
            </Link>
          </div>
        </div>

        {/* League Header Showcase (FotMob Style) */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f3f4f6] text-[#374151]">
              <Trophy className="w-3.5 h-3.5 text-[#eab308]" />
              <span>
                {currentSport === "FOOTBALL"
                  ? "Premier Football Championship 2026 • Musim 2025/2026"
                  : "Super League Championship Futsal 2026 • Musim 2025/2026"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
              {currentSport === "FOOTBALL" ? (
                <>
                  Pusat Pertandingan <span className="text-[#0a8a4a]">Sepakbola</span> (11v11)
                </>
              ) : (
                <>
                  Pusat Pertandingan <span className="text-[#d71149]">Futsal Pro</span> (5v5 Net Time)
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-[#666666]">
              {currentSport === "FOOTBALL"
                ? "Pantau live score sepak bola, formasi taktis 2D, rating performa pemain, dan klasemen liga."
                : "Pantau futsal 5v5 dengan penghitung akumulasi 5-foul, peringatan penalti 10 meter, dan live scoreboard."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/standings"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#d1d5db] hover:bg-slate-50 text-[#222222] font-bold text-xs shadow-sm transition"
            >
              <Trophy className="w-4 h-4 text-[#eab308]" />
              <span>Klasemen Liga</span>
            </Link>

            <Link
              href="/operator/match/sample-match/live"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-md transition"
            >
              <PlayCircle className="w-4 h-4 text-[#eab308]" />
              <span>Konsol Wasit</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Grid: Matches Feed (Left) & Standings/Stats (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Matches Feed */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Bar */}
            <MatchFilters
              activeStatus={activeStatus}
              onStatusChange={setActiveStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              liveCount={liveCount}
              totalCount={activeMatches.length}
            />

            {/* Matches List Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d71149]" />
                <h2 className="font-extrabold text-base text-[#222222]">
                  Jadwal & Skor Pertandingan ({filteredMatches.length})
                </h2>
              </div>
              <span className="text-xs text-[#666666]">
                Format: {currentSport === "FOOTBALL" ? "Sepakbola (11v11)" : "Futsal (5v5)"}
              </span>
            </div>

            {/* Match Cards */}
            {filteredMatches.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#f0f0f0] text-[#666666] space-y-2">
                <p className="font-bold text-sm text-[#222222]">Tidak ada pertandingan yang cocok dengan filter saat ini.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStatus("ALL");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#d71149] hover:underline font-bold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMatches.map((m) => (
                  <MatchCard
                    key={m.id}
                    id={m.id}
                    sportType={m.sportType}
                    matchNumber={m.matchNumber}
                    stage={m.stage}
                    venue={m.venue}
                    status={m.status}
                    scheduledAt={m.scheduledAt}
                    homeTeam={m.homeTeam}
                    awayTeam={m.awayTeam}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar: Compact Standings & Top Scorers */}
          <div className="lg:col-span-4 space-y-6">
            {/* Standings Table (Compact) */}
            <StandingsTable
              standings={activeStandings}
              title={`Klasemen ${currentSport === "FOOTBALL" ? "Sepakbola" : "Futsal"}`}
              isCompact={true}
            />

            {/* Top Scorers Widget */}
            <TopScorersWidget />

            {/* Quick Link to BAP Document Sheet */}
            <div className="p-5 rounded-2xl bg-white border border-[#f0f0f0] space-y-3 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0a8a4a]" />
                <h3 className="font-bold text-sm text-[#222222]">Berita Acara Pertandingan (BAP)</h3>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                Dokumen pengesahan resmi perangkat pertandingan (Match Commissioner, Wasit 1, Wasit 2, dan Timekeeper). Tersedia format cetak standar A4/PDF.
              </p>
              <Link
                href="/api/pdf/sample-match"
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs transition shadow-sm"
              >
                <span>Lihat Sample Dokumen BAP</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

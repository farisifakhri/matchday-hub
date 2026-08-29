"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, FileText, PlayCircle, Star, Tv } from "lucide-react";
import { MatchDetailData } from "@/types/match";
import FoulCounterIndicator from "./FoulCounterIndicator";

interface ScoreboardBannerProps {
  match: MatchDetailData;
}

export default function ScoreboardBanner({ match }: ScoreboardBannerProps) {
  const isLive = match.status === "FIRST_HALF" || match.status === "SECOND_HALF";
  const isFutsal = match.sportType === "FUTSAL";

  const getStatusBadge = () => {
    if (match.status === "FIRST_HALF") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d71149] text-white text-xs font-bold shadow-sm">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          BABAK 1 ({isFutsal ? "Futsal Net Time" : "Waktu Berjalan"})
        </span>
      );
    }
    if (match.status === "SECOND_HALF") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d71149] text-white text-xs font-bold shadow-sm">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          BABAK 2 ({isFutsal ? "Futsal Net Time" : "Waktu Berjalan"})
        </span>
      );
    }
    if (match.status === "COMPLETED") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e5e7eb] text-[#374151] text-xs font-bold">
          FULL TIME (SELESAI)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f3f4f6] text-[#6b7280] text-xs font-semibold">
        SEGERA DIMULAI
      </span>
    );
  };

  return (
    <div className="bg-white border-b border-[#f0f0f0] pt-4 pb-8 px-4 shadow-sm">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] hover:text-[#222222] px-3 py-1.5 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] hover:bg-[#f3f4f6] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Jadwal</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/overlay/match/${match.id}`}
              target="_blank"
              title="Buka Overlay Transparan OBS Studio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#e5e5e5] text-[#222222] text-xs font-bold transition shadow-sm"
            >
              <Tv className="w-3.5 h-3.5 text-[#d71149]" />
              <span className="hidden sm:inline">OBS Overlay</span>
            </Link>

            <Link
              href={`/api/pdf/${match.id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#e5e5e5] text-[#222222] text-xs font-bold transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#0a8a4a]" />
              <span>Cetak BAP Resmi (PDF)</span>
            </Link>

            <Link
              href={`/operator/match/${match.id}/live`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#222222] hover:bg-[#383838] text-white text-xs font-bold transition shadow-sm"
            >
              <PlayCircle className="w-3.5 h-3.5 text-[#eab308]" />
              <span className="hidden sm:inline">Buka Tablet Operator</span>
            </Link>
          </div>
        </div>

        {/* Tournament & Stage Subhead */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#f3f4f6] text-[#374151]">
            <span>{match.sportType === "FOOTBALL" ? "⚽ Sepak Bola 11v11" : "👟 Futsal 5v5"}</span>
            <span>•</span>
            <span>{match.tournamentName}</span>
          </div>
          <div className="text-xs text-[#666666] font-medium">
            {match.stage} • 📍 {match.venue}
          </div>
        </div>

        {/* Main SofaScore Match Header Grid */}
        <div className="grid grid-cols-12 items-center gap-2 sm:gap-6 py-4">
          {/* Home Team */}
          <div className="col-span-4 flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
            <div
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-md ring-4 ring-[#f5f5f5]"
              style={{ backgroundColor: match.homeTeam.officialColor || "#dc2626" }}
            >
              {match.homeTeam.code}
            </div>
            <div>
              <h2 className="text-base sm:text-2xl font-black text-[#222222] leading-tight">
                {match.homeTeam.name}
              </h2>
              <span className="text-xs text-[#666666] font-medium">(Tuan Rumah)</span>
            </div>

            {/* Futsal Foul Counter */}
            {isFutsal && (
              <div className="mt-1">
                <FoulCounterIndicator 
                  foulsCount={match.period === "1H" ? match.homeTeam.foulsH1 : match.homeTeam.foulsH2}
                  periodLabel={match.period === "1H" ? "Fouls 1H" : "Fouls 2H"}
                />
              </div>
            )}
          </div>

          {/* Center: Live Digital Score & Time */}
          <div className="col-span-4 flex flex-col items-center justify-center text-center space-y-2">
            {getStatusBadge()}

            <div className="font-mono font-black text-5xl sm:text-7xl text-[#222222] tracking-widest tabular-nums">
              {match.homeTeam.score} - {match.awayTeam.score}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] font-mono text-xs font-bold text-[#222222]">
              <Clock className="w-3.5 h-3.5 text-[#d71149]" />
              <span>{match.clockFormatted}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
            <div
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-md ring-4 ring-[#f5f5f5]"
              style={{ backgroundColor: match.awayTeam.officialColor || "#2563eb" }}
            >
              {match.awayTeam.code}
            </div>
            <div>
              <h2 className="text-base sm:text-2xl font-black text-[#222222] leading-tight">
                {match.awayTeam.name}
              </h2>
              <span className="text-xs text-[#666666] font-medium">(Tamu)</span>
            </div>

            {/* Futsal Foul Counter */}
            {isFutsal && (
              <div className="mt-1">
                <FoulCounterIndicator 
                  foulsCount={match.period === "1H" ? match.awayTeam.foulsH1 : match.awayTeam.foulsH2}
                  periodLabel={match.period === "1H" ? "Fouls 1H" : "Fouls 2H"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

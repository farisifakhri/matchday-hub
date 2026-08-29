"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FileText, Radio } from "lucide-react";
import { MatchStatus, SportType } from "@/types/match";

interface MatchCardProps {
  id: string;
  sportType: SportType;
  matchNumber: number;
  stage: string;
  venue: string;
  status: MatchStatus;
  scheduledAt: string | Date;
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

export default function MatchCard({
  id,
  sportType,
  matchNumber,
  stage,
  venue,
  status,
  scheduledAt,
  homeTeam,
  awayTeam,
}: MatchCardProps) {
  const isLive = status === "FIRST_HALF" || status === "SECOND_HALF" || status === "EXTRA_TIME";
  const isCompleted = status === "COMPLETED";
  const isScheduled = status === "SCHEDULED";
  const isFutsal = sportType === "FUTSAL";

  const getStatusDisplay = () => {
    if (status === "FIRST_HALF") {
      return {
        label: isFutsal ? "1H 15:28" : "1H 34'",
        badgeClass: "bg-[#d71149] text-white",
        dotPulse: true,
      };
    }
    if (status === "SECOND_HALF") {
      return {
        label: isFutsal ? "2H 08:12" : "2H 68'",
        badgeClass: "bg-[#d71149] text-white",
        dotPulse: true,
      };
    }
    if (status === "HALF_TIME") {
      return {
        label: "HT (Istirahat)",
        badgeClass: "bg-[#eab308] text-white font-bold",
        dotPulse: false,
      };
    }
    if (isCompleted) {
      return {
        label: "FT (Selesai)",
        badgeClass: "bg-[#e5e7eb] text-[#374151] font-semibold",
        dotPulse: false,
      };
    }
    const timeStr = new Date(scheduledAt).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      label: timeStr,
      badgeClass: "bg-[#f3f4f6] text-[#6b7280]",
      dotPulse: false,
    };
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className="group rounded-2xl bg-white hover:bg-slate-50/70 border border-[#f0f0f0] hover:border-[#e5e5e5] transition duration-150 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Left: Time / Status & Meta */}
      <div className="flex sm:flex-col items-center sm:items-start justify-between w-full sm:w-28 shrink-0 pb-2 sm:pb-0 border-b sm:border-b-0 border-[#f0f0f0]">
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide ${statusInfo.badgeClass}`}
          >
            {statusInfo.dotPulse && (
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            )}
            {statusInfo.label}
          </span>
        </div>
        <div className="text-[11px] text-[#666666] font-medium mt-1 truncate max-w-[130px]">
          {stage}
        </div>
      </div>

      {/* Center: Teams & Live Score */}
      <Link
        href={`/live/${id}`}
        className="flex-1 w-full flex flex-col gap-2.5 pr-2"
      >
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
              style={{ backgroundColor: homeTeam.color || "#dc2626" }}
            >
              {homeTeam.code}
            </div>
            <span className="font-bold text-sm text-[#222222] group-hover:text-[#d71149] transition">
              {homeTeam.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isFutsal && isLive && homeTeam.fouls !== undefined && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className={`h-2 w-2 rounded-full ${
                      dot <= (homeTeam.fouls || 0)
                        ? dot === 5
                          ? "bg-[#d71149] animate-pulse"
                          : "bg-[#eab308]"
                        : "bg-[#e5e7eb]"
                    }`}
                  />
                ))}
              </div>
            )}
            <span className="font-mono font-extrabold text-lg text-[#222222] tabular-nums min-w-[20px] text-right">
              {isScheduled ? "-" : homeTeam.score}
            </span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
              style={{ backgroundColor: awayTeam.color || "#2563eb" }}
            >
              {awayTeam.code}
            </div>
            <span className="font-bold text-sm text-[#222222] group-hover:text-[#d71149] transition">
              {awayTeam.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isFutsal && isLive && awayTeam.fouls !== undefined && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className={`h-2 w-2 rounded-full ${
                      dot <= (awayTeam.fouls || 0)
                        ? dot === 5
                          ? "bg-[#d71149] animate-pulse"
                          : "bg-[#eab308]"
                        : "bg-[#e5e7eb]"
                    }`}
                  />
                ))}
              </div>
            )}
            <span className="font-mono font-extrabold text-lg text-[#222222] tabular-nums min-w-[20px] text-right">
              {isScheduled ? "-" : awayTeam.score}
            </span>
          </div>
        </div>
      </Link>

      {/* Right: Actions & Venue */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0f0f0]">
        <div className="text-[11px] text-[#666666] text-left sm:text-right truncate max-w-[140px]">
          📍 {venue}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/api/pdf/${id}`}
            target="_blank"
            title="Cetak Berita Acara Pertandingan"
            className="p-1.5 rounded-lg bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#374151] transition"
          >
            <FileText className="w-4 h-4" />
          </Link>
          <Link
            href={`/live/${id}`}
            className="px-2.5 py-1.5 rounded-lg bg-[#222222] hover:bg-[#383838] text-white transition flex items-center gap-1 text-xs font-bold shadow-sm"
          >
            <span>Detail Laga</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

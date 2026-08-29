"use client";

import React, { useState } from "react";
import { MatchEventItem, EventType } from "@/types/match";
import { ShieldAlert, AlertCircle, Clock, CheckCircle } from "lucide-react";

interface MatchTimelineProps {
  events: MatchEventItem[];
  homeTeamCode: string;
  awayTeamCode: string;
}

export default function MatchTimeline({
  events,
  homeTeamCode,
  awayTeamCode,
}: MatchTimelineProps) {
  const [filterType, setFilterType] = useState<"ALL" | "GOALS" | "CARDS" | "FOULS">("ALL");

  const getEventBadge = (type: EventType) => {
    switch (type) {
      case "GOAL":
      case "PENALTY_GOAL":
        return {
          icon: "⚽",
          label: type === "PENALTY_GOAL" ? "PENALTI GOL" : "GOL",
          badgeClass: "bg-emerald-950 text-emerald-400 border-emerald-800",
        };
      case "OWN_GOAL":
        return {
          icon: "⚽⚠️",
          label: "GOL BUNUH DIRI",
          badgeClass: "bg-red-950 text-red-400 border-red-800",
        };
      case "YELLOW_CARD":
        return {
          icon: "🟨",
          label: "KARTU KUNING",
          badgeClass: "bg-yellow-950 text-yellow-400 border-yellow-800",
        };
      case "SECOND_YELLOW_CARD":
      case "RED_CARD":
        return {
          icon: "🟥",
          label: type === "SECOND_YELLOW_CARD" ? "KUNING KE-2 -> MERAH" : "KARTU MERAH",
          badgeClass: "bg-red-950 text-red-400 border-red-800 font-extrabold",
        };
      case "FOUL":
      case "ACCUMULATED_FOUL":
        return {
          icon: "⚠️",
          label: type === "ACCUMULATED_FOUL" ? "AKUMULASI FOUL" : "PELANGGARAN",
          badgeClass: "bg-amber-950 text-amber-400 border-amber-800",
        };
      case "TIMEOUT":
        return {
          icon: "⏱️",
          label: "TIME-OUT",
          badgeClass: "bg-blue-950 text-blue-400 border-blue-800",
        };
      case "SUBSTITUTION":
        return {
          icon: "🔄",
          label: "PERGANTIAN",
          badgeClass: "bg-purple-950 text-purple-400 border-purple-800",
        };
      default:
        return {
          icon: "📢",
          label: "PERIOD EVENT",
          badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
        };
    }
  };

  const filteredEvents = events.filter((e) => {
    if (filterType === "GOALS") return e.type === "GOAL" || e.type === "PENALTY_GOAL" || e.type === "OWN_GOAL";
    if (filterType === "CARDS") return e.type === "YELLOW_CARD" || e.type === "SECOND_YELLOW_CARD" || e.type === "RED_CARD";
    if (filterType === "FOULS") return e.type === "FOUL" || e.type === "ACCUMULATED_FOUL";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Sub-filter tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800/80">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Filter Insiden Laga:
        </span>
        <div className="flex items-center gap-1">
          {[
            { id: "ALL", label: "Semua" },
            { id: "GOALS", label: "⚽ Gol" },
            { id: "CARDS", label: "🟨🟥 Kartu" },
            { id: "FOULS", label: "⚠️ Pelanggaran" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === tab.id
                  ? "bg-slate-800 text-white font-bold border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
          Belum ada catatan insiden untuk kategori ini.
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-800 ml-4 space-y-4 pl-6 py-2">
          {filteredEvents.map((evt) => {
            const badge = getEventBadge(evt.type);
            return (
              <div key={evt.id} className="relative group">
                {/* Timeline Pin Node */}
                <div className="absolute -left-[33px] top-3 h-5 w-5 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-[10px] group-hover:border-emerald-400 transition shadow">
                  {badge.icon.slice(0, 2)}
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {/* Minute badge */}
                      <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                        {evt.minute}&apos;
                      </span>

                      {/* Event Type Badge */}
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${badge.badgeClass}`}>
                        {badge.label}
                      </span>

                      {/* Period info */}
                      <span className="text-[11px] text-slate-500 font-medium">
                        [{evt.period}]
                      </span>
                    </div>

                    {/* Description */}
                    <div className="text-sm font-semibold text-white">
                      {evt.player ? (
                        <span>
                          <strong className="text-emerald-300">#{evt.player.jerseyNumber} {evt.player.fullName}</strong>
                          {evt.player.isCaptain && <span className="ml-1 text-amber-400 text-xs font-bold">(C)</span>}
                        </span>
                      ) : (
                        <span>{badge.label}</span>
                      )}
                    </div>

                    {evt.notes && (
                      <p className="text-xs text-slate-400 italic">
                        &quot;{evt.notes}&quot;
                      </p>
                    )}
                  </div>

                  {/* Team Tag */}
                  {evt.teamId && (
                    <div className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 self-end sm:self-center">
                      KLUB EVENT
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

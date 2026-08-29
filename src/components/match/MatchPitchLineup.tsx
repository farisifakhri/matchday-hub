"use client";

import React, { useState } from "react";
import { PlayerBasic, SportType } from "@/types/match";
import { Users, Shield, Award } from "lucide-react";

interface MatchPitchLineupProps {
  sportType: SportType;
  homeTeam: {
    name: string;
    code: string;
    color: string;
    starters: PlayerBasic[];
    bench?: PlayerBasic[];
  };
  awayTeam: {
    name: string;
    code: string;
    color: string;
    starters: PlayerBasic[];
    bench?: PlayerBasic[];
  };
}

export default function MatchPitchLineup({
  sportType,
  homeTeam,
  awayTeam,
}: MatchPitchLineupProps) {
  const [selectedSide, setSelectedSide] = useState<"BOTH" | "HOME" | "AWAY">("BOTH");
  const isFutsal = sportType === "FUTSAL";

  // Coordinates helper for pitch rendering
  // Futsal 5v5 Layout (Home left half, Away right half)
  const futsalHomePositions = [
    { top: "50%", left: "10%", pos: "GK" },
    { top: "50%", left: "26%", pos: "Anchor" },
    { top: "20%", left: "38%", pos: "Flank L" },
    { top: "80%", left: "38%", pos: "Flank R" },
    { top: "50%", left: "45%", pos: "Pivot" },
  ];

  const futsalAwayPositions = [
    { top: "50%", right: "10%", pos: "GK" },
    { top: "50%", right: "26%", pos: "Anchor" },
    { top: "20%", right: "38%", pos: "Flank L" },
    { top: "80%", right: "38%", pos: "Flank R" },
    { top: "50%", right: "45%", pos: "Pivot" },
  ];

  // Football 11v11 4-3-3 Layout
  const footballHomePositions = [
    { top: "50%", left: "7%", pos: "GK" },
    { top: "18%", left: "20%", pos: "RB" },
    { top: "38%", left: "18%", pos: "CB" },
    { top: "62%", left: "18%", pos: "CB" },
    { top: "82%", left: "20%", pos: "LB" },
    { top: "50%", left: "28%", pos: "CDM" },
    { top: "32%", left: "34%", pos: "CM" },
    { top: "68%", left: "34%", pos: "CAM" },
    { top: "20%", left: "44%", pos: "RW" },
    { top: "50%", left: "44%", pos: "ST" },
    { top: "80%", left: "44%", pos: "LW" },
  ];

  const footballAwayPositions = [
    { top: "50%", right: "7%", pos: "GK" },
    { top: "18%", right: "20%", pos: "RB" },
    { top: "38%", right: "18%", pos: "CB" },
    { top: "62%", right: "18%", pos: "CB" },
    { top: "82%", right: "20%", pos: "LB" },
    { top: "50%", right: "28%", pos: "CDM" },
    { top: "32%", right: "34%", pos: "CM" },
    { top: "68%", right: "34%", pos: "CAM" },
    { top: "20%", right: "44%", pos: "RW" },
    { top: "50%", right: "44%", pos: "ST" },
    { top: "80%", right: "44%", pos: "LW" },
  ];

  const homeCoords = isFutsal ? futsalHomePositions : footballHomePositions;
  const awayCoords = isFutsal ? futsalAwayPositions : footballAwayPositions;

  return (
    <div className="space-y-8">
      {/* Tactical Pitch 2D Canvas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Formasi Taktis Lapangan ({isFutsal ? "Futsal 5v5" : "Sepakbola 4-3-3"})</span>
            </h3>
          </div>
          <div className="text-xs text-slate-400">
            {isFutsal ? "Ukuran Lapangan Futsal Standar FIFA" : "Ukuran Lapangan Rumput Sepakbola Standar FIFA"}
          </div>
        </div>

        {/* The Pitch Container */}
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl bg-emerald-900/90 select-none">
          {/* Pitch Grass Stripes Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:10%_100%] pointer-events-none" />

          {/* Pitch Outer White Lines */}
          <div className="absolute inset-4 border-2 border-white/40 pointer-events-none">
            {/* Halfway Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/40" />

            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-white/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60" />

            {/* Left Penalty Area (Home) */}
            <div className="absolute top-1/4 bottom-1/4 left-0 w-24 border-r-2 border-y-2 border-white/40" />
            <div className="absolute top-[38%] bottom-[38%] left-0 w-10 border-r-2 border-y-2 border-white/40" />
            <div className="absolute top-1/2 left-16 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/50" />

            {/* Right Penalty Area (Away) */}
            <div className="absolute top-1/4 bottom-1/4 right-0 w-24 border-l-2 border-y-2 border-white/40" />
            <div className="absolute top-[38%] bottom-[38%] right-0 w-10 border-l-2 border-y-2 border-white/40" />
            <div className="absolute top-1/2 right-16 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>

          {/* Home Players Pins */}
          {homeTeam.starters.map((player, idx) => {
            const coord = homeCoords[idx] || { top: "50%", left: "20%", pos: player.position };
            return (
              <div
                key={player.id || idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                style={{ top: coord.top, left: coord.left }}
              >
                <div
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm text-white shadow-lg ring-2 ring-white/80 group-hover:scale-110 transition"
                  style={{ backgroundColor: homeTeam.color || "#dc2626" }}
                >
                  {player.jerseyNumber}
                </div>
                <div className="mt-0.5 px-1.5 py-0.2 rounded bg-slate-950/80 backdrop-blur-sm text-[9px] sm:text-[11px] font-bold text-white whitespace-nowrap shadow border border-white/10 flex items-center gap-1">
                  <span>{player.fullName.split(" ").slice(-1)[0]}</span>
                  {player.isCaptain && <span className="text-amber-400 font-black">(C)</span>}
                </div>
              </div>
            );
          })}

          {/* Away Players Pins */}
          {awayTeam.starters.map((player, idx) => {
            const coord = awayCoords[idx] || { top: "50%", right: "20%", pos: player.position };
            return (
              <div
                key={player.id || idx}
                className="absolute translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                style={{ top: coord.top, right: coord.right }}
              >
                <div
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm text-white shadow-lg ring-2 ring-white/80 group-hover:scale-110 transition"
                  style={{ backgroundColor: awayTeam.color || "#2563eb" }}
                >
                  {player.jerseyNumber}
                </div>
                <div className="mt-0.5 px-1.5 py-0.2 rounded bg-slate-950/80 backdrop-blur-sm text-[9px] sm:text-[11px] font-bold text-white whitespace-nowrap shadow border border-white/10 flex items-center gap-1">
                  <span>{player.fullName.split(" ").slice(-1)[0]}</span>
                  {player.isCaptain && <span className="text-amber-400 font-black">(C)</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roster Tables (Home vs Away) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home Lineup Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: homeTeam.color || "#dc2626" }}
              />
              <h4 className="font-bold text-white text-sm">{homeTeam.name}</h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {homeTeam.starters.length} Starter
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Starting Lineup
            </div>
            {homeTeam.starters.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-emerald-400 w-5 text-center">
                    #{p.jerseyNumber}
                  </span>
                  <span className="font-semibold text-slate-200">{p.fullName}</span>
                  {p.isCaptain && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800 font-bold">
                      KAPTEN
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-900">
                  {p.position}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Away Lineup Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: awayTeam.color || "#2563eb" }}
              />
              <h4 className="font-bold text-white text-sm">{awayTeam.name}</h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {awayTeam.starters.length} Starter
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Starting Lineup
            </div>
            {awayTeam.starters.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-cyan-400 w-5 text-center">
                    #{p.jerseyNumber}
                  </span>
                  <span className="font-semibold text-slate-200">{p.fullName}</span>
                  {p.isCaptain && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800 font-bold">
                      KAPTEN
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-900">
                  {p.position}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { formatMatchTime } from "@/lib/utils";

export default function ObsScoreboardOverlay() {
  const params = useParams();
  const matchId = params?.id as string;
  const [seconds, setSeconds] = useState(1108); // 18:28
  const [period, setPeriod] = useState("1H");
  const [homeScore, setHomeScore] = useState(2);
  const [awayScore, setAwayScore] = useState(1);
  const [homeFouls, setHomeFouls] = useState(4);
  const [awayFouls, setAwayFouls] = useState(2);

  const currentMinutes = Math.floor(seconds / 60);
  const currentSeconds = seconds % 60;
  const timeFormatted = formatMatchTime(currentMinutes, currentSeconds);

  return (
    <div className="min-h-screen bg-transparent p-6 flex flex-col justify-start items-start select-none font-sans">
      {/* OBS Clean Lower-Third / Top-Left Scoreboard Strip */}
      <div className="flex items-stretch rounded-xl overflow-hidden shadow-2xl border border-black/40 bg-[#141414] text-white animate-in slide-in-from-top-4 duration-300">
        
        {/* League / Tournament Mini Tag */}
        <div className="bg-[#d71149] px-3 py-2 flex items-center justify-center font-black text-xs uppercase tracking-wider text-white">
          <span>SUPER LEAGUE</span>
        </div>

        {/* Home Team Section */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-[#1f1f1f] border-r border-white/10">
          <div className="w-6 h-6 rounded bg-[#dc2626] text-white flex items-center justify-center font-black text-xs shadow-sm">
            GDA
          </div>
          <span className="font-extrabold text-sm tracking-wide">GARUDA MUDA</span>
          {/* Home Foul Dot Indicators */}
          <div className="flex items-center gap-1 ml-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <span
                key={dot}
                className={`w-1.5 h-1.5 rounded-full ${
                  dot <= homeFouls ? "bg-[#eab308]" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Score Block */}
        <div className="flex items-center justify-center px-4 py-2 bg-[#0c0a09] font-mono font-black text-lg text-white tracking-widest min-w-[64px] border-r border-white/10">
          {homeScore} - {awayScore}
        </div>

        {/* Away Team Section */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-[#1f1f1f] border-r border-white/10">
          {/* Away Foul Dot Indicators */}
          <div className="flex items-center gap-1 mr-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <span
                key={dot}
                className={`w-1.5 h-1.5 rounded-full ${
                  dot <= awayFouls ? "bg-[#eab308]" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <span className="font-extrabold text-sm tracking-wide">RAJAWALI FC</span>
          <div className="w-6 h-6 rounded bg-[#2563eb] text-white flex items-center justify-center font-black text-xs shadow-sm">
            RJW
          </div>
        </div>

        {/* Time & Period Block */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-[#262626] font-mono text-xs font-bold text-[#eab308]">
          <span className="text-white/80">{period}</span>
          <span>{timeFormatted}</span>
        </div>
      </div>

      {/* Broadcast Instructions Notice (Transparent in actual stream) */}
      <div className="mt-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-[11px] text-white/70 max-w-sm border border-white/10">
        💡 <strong>OBS / vMix Source</strong>: Masukkan URL ini sebagai <em>Browser Source</em> dengan resolusi 1920x1080.
      </div>
    </div>
  );
}

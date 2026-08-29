"use client";

import React from "react";
import { Flame } from "lucide-react";

interface ScorerItem {
  rank: number;
  playerName: string;
  jerseyNumber: number;
  teamCode: string;
  teamColor: string;
  goals: number;
}

interface TopScorersWidgetProps {
  scorers?: ScorerItem[];
}

export default function TopScorersWidget({
  scorers = [
    { rank: 1, playerName: "Bukayo Saka", jerseyNumber: 7, teamCode: "ARS", teamColor: "#dc2626", goals: 4 },
    { rank: 2, playerName: "Kai Havertz", jerseyNumber: 29, teamCode: "ARS", teamColor: "#dc2626", goals: 3 },
    { rank: 3, playerName: "Cole Palmer", jerseyNumber: 20, teamCode: "CHE", teamColor: "#2563eb", goals: 3 },
    { rank: 4, playerName: "Erling Haaland", jerseyNumber: 9, teamCode: "MCI", teamColor: "#0ea5e9", goals: 2 },
  ],
}: TopScorersWidgetProps) {
  return (
    <div className="bg-white border border-[#f0f0f0] rounded-2xl overflow-hidden shadow-sm">
      <div className="px-4 py-3.5 border-b border-[#f0f0f0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#d71149]" />
          <h3 className="font-bold text-sm text-[#222222]">Top Skor Liga</h3>
        </div>
        <span className="text-[10px] uppercase font-bold text-[#666666]">Gol Terbanyak</span>
      </div>

      <div className="divide-y divide-[#f0f0f0] p-1">
        {scorers.map((s) => (
          <div
            key={s.rank}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f9fafb] transition text-xs"
          >
            <div className="flex items-center gap-3">
              <span className={`font-mono font-bold w-4 text-center ${s.rank === 1 ? "text-[#eab308] font-black" : "text-[#666666]"}`}>
                {s.rank}
              </span>
              <div
                className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-[10px] text-white shrink-0 shadow-sm"
                style={{ backgroundColor: s.teamColor }}
              >
                {s.teamCode}
              </div>
              <div>
                <div className="font-semibold text-[#222222] truncate max-w-[130px]">
                  {s.playerName}
                </div>
                <div className="text-[10px] text-[#666666] font-mono">
                  #{s.jerseyNumber} • {s.teamCode}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 font-mono">
              <span className="text-base font-black text-[#0a8a4a]">{s.goals}</span>
              <span className="text-[10px] text-[#9ca3af] font-bold uppercase">Gol</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

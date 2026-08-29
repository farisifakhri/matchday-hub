"use client";

import React from "react";
import { StandingItem } from "@/types/match";
import { Trophy } from "lucide-react";

interface StandingsTableProps {
  standings: StandingItem[];
  title?: string;
  isCompact?: boolean;
}

export default function StandingsTable({
  standings,
  title = "Klasemen Sementara Liga",
  isCompact = false,
}: StandingsTableProps) {
  return (
    <div className="bg-white border border-[#f0f0f0] rounded-2xl overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="px-4 py-3.5 border-b border-[#f0f0f0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#eab308]" />
          <h3 className="font-bold text-sm text-[#222222]">{title}</h3>
        </div>
        <span className="text-[11px] text-[#666666]">Poin: M=3, S=1, K=0</span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#f0f0f0] bg-[#fafafa] text-[11px] text-[#666666] font-bold uppercase tracking-wider">
              <th className="py-2.5 px-3 text-center w-8">#</th>
              <th className="py-2.5 px-3">Klub</th>
              <th className="py-2.5 px-2 text-center">P</th>
              <th className="py-2.5 px-2 text-center">W</th>
              <th className="py-2.5 px-2 text-center">D</th>
              <th className="py-2.5 px-2 text-center">L</th>
              {!isCompact && (
                <>
                  <th className="py-2.5 px-2 text-center">GF</th>
                  <th className="py-2.5 px-2 text-center">GA</th>
                </>
              )}
              <th className="py-2.5 px-2 text-center font-mono">GD</th>
              <th className="py-2.5 px-3 text-center font-bold text-[#222222]">PTS</th>
              {!isCompact && (
                <th className="py-2.5 px-3 text-center">Form</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {standings.map((row) => {
              const isLeader = row.rank === 1;
              const isUCL = row.rank <= 2;

              return (
                <tr
                  key={row.teamId}
                  className="hover:bg-[#f9fafb] transition group"
                >
                  {/* Rank with qualification bar */}
                  <td className="py-3 px-3 text-center relative font-bold text-[#374151]">
                    {isUCL && (
                      <span className="absolute left-0 top-1 bottom-1 w-1 bg-[#0a8a4a] rounded-r" />
                    )}
                    <span className={isLeader ? "text-[#eab308] font-black" : ""}>
                      {row.rank}
                    </span>
                  </td>

                  {/* Club */}
                  <td className="py-3 px-3 font-semibold text-[#222222]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-[10px] text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: row.officialColor || "#3b82f6" }}
                      >
                        {row.teamCode}
                      </div>
                      <span className="truncate max-w-[140px] sm:max-w-none group-hover:text-[#d71149] transition">
                        {row.teamName}
                      </span>
                    </div>
                  </td>

                  {/* Matches Played */}
                  <td className="py-3 px-2 text-center text-[#4b5563] font-mono">
                    {row.played}
                  </td>

                  {/* Won */}
                  <td className="py-3 px-2 text-center text-[#4b5563] font-mono">
                    {row.won}
                  </td>

                  {/* Drawn */}
                  <td className="py-3 px-2 text-center text-[#6b7280] font-mono">
                    {row.drawn}
                  </td>

                  {/* Lost */}
                  <td className="py-3 px-2 text-center text-[#6b7280] font-mono">
                    {row.lost}
                  </td>

                  {!isCompact && (
                    <>
                      {/* GF */}
                      <td className="py-3 px-2 text-center text-[#6b7280] font-mono">
                        {row.gf}
                      </td>
                      {/* GA */}
                      <td className="py-3 px-2 text-center text-[#6b7280] font-mono">
                        {row.ga}
                      </td>
                    </>
                  )}

                  {/* GD */}
                  <td className="py-3 px-2 text-center font-mono font-semibold">
                    <span
                      className={
                        row.gd > 0
                          ? "text-[#0a8a4a]"
                          : row.gd < 0
                          ? "text-[#d71149]"
                          : "text-[#6b7280]"
                      }
                    >
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </span>
                  </td>

                  {/* Points */}
                  <td className="py-3 px-3 text-center font-mono font-black text-sm text-[#222222]">
                    {row.points}
                  </td>

                  {/* Form 5 dots */}
                  {!isCompact && (
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {row.form && row.form.length > 0 ? (
                          row.form.map((res, i) => (
                            <span
                              key={i}
                              title={res === "W" ? "Menang" : res === "D" ? "Seri" : "Kalah"}
                              className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-black text-white ${
                                res === "W"
                                  ? "bg-[#0a8a4a]"
                                  : res === "D"
                                  ? "bg-[#9ca3af]"
                                  : "bg-[#d71149]"
                              }`}
                            >
                              {res}
                            </span>
                          ))
                        ) : (
                          <span className="text-[#9ca3af] text-[10px]">-</span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend Footer */}
      <div className="p-3 bg-[#fafafa] border-t border-[#f0f0f0] text-[11px] text-[#666666] flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#0a8a4a]" />
          <span>Zona Promosi / Kualifikasi Kejuaraan</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Search, Radio } from "lucide-react";

export type StatusFilterType = "ALL" | "LIVE" | "COMPLETED" | "SCHEDULED";

interface MatchFiltersProps {
  activeStatus: StatusFilterType;
  onStatusChange: (status: StatusFilterType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  liveCount: number;
  totalCount: number;
}

export default function MatchFilters({
  activeStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  liveCount,
  totalCount,
}: MatchFiltersProps) {
  const filterButtons: { type: StatusFilterType; label: string; count?: number; isLive?: boolean }[] = [
    { type: "ALL", label: "Semua", count: totalCount },
    { type: "LIVE", label: "LIVE", count: liveCount, isLive: true },
    { type: "COMPLETED", label: "Selesai" },
    { type: "SCHEDULED", label: "Jadwal" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-[#f0f0f0] shadow-sm">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {filterButtons.map((btn) => {
          const isActive = activeStatus === btn.type;
          return (
            <button
              key={btn.type}
              type="button"
              onClick={() => onStatusChange(btn.type)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? btn.isLive 
                    ? "bg-[#d71149] text-white shadow-sm"
                    : "bg-[#222222] text-white shadow-sm"
                  : "text-[#666666] hover:text-[#222222] hover:bg-[#f3f4f6]"
              }`}
            >
              {btn.isLive && (
                <Radio className={`w-3 h-3 ${isActive ? "text-white" : "text-[#d71149] animate-pulse"}`} />
              )}
              <span>{btn.label}</span>
              {btn.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white font-bold"
                      : "bg-[#e5e7eb] text-[#6b7280] font-semibold"
                  }`}
                >
                  {btn.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="w-3.5 h-3.5 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari klub atau stadion..."
          className="w-full bg-[#f9fafb] border border-[#e5e7eb] text-[#222222] text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:bg-white focus:border-[#222222] transition placeholder:text-[#9ca3af]"
        />
      </div>
    </div>
  );
}

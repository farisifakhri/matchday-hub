"use client";

import React from "react";
import { AlertTriangle, Flame } from "lucide-react";

interface FoulCounterIndicatorProps {
  foulsCount: number;
  periodLabel?: string;
  isFootball?: boolean;
}

export default function FoulCounterIndicator({
  foulsCount,
  periodLabel = "Babak 1",
  isFootball = false,
}: FoulCounterIndicatorProps) {
  if (isFootball) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
        <span>Pelanggaran:</span>
        <span className="font-mono font-bold text-slate-200">{foulsCount}</span>
      </div>
    );
  }

  // Futsal 5-Foul Rule
  const maxFoulsBeforePenalty = 5;
  const isWarning = foulsCount === 5;
  const isDirectPenalty = foulsCount >= 6;

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-slate-400 font-medium">{periodLabel} Fouls:</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((num) => {
            const isFilled = foulsCount >= num;
            return (
              <span
                key={num}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  isFilled
                    ? num >= 5
                      ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                      : "bg-emerald-400"
                    : "bg-slate-800 border border-slate-700"
                }`}
              />
            );
          })}
        </div>
        <span className="font-mono text-xs font-bold text-white ml-1">
          {foulsCount}/5
        </span>
      </div>

      {/* Alert Banners */}
      {isWarning && (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-[10px] font-bold text-amber-400 animate-pulse">
          <AlertTriangle className="w-3 h-3" />
          <span>Batas Foul Ke-5! Hati-hati penalti 10m</span>
        </div>
      )}

      {isDirectPenalty && (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/90 border border-red-800 text-[10px] font-extrabold text-red-400 animate-bounce">
          <Flame className="w-3 h-3" />
          <span>Foul {foulsCount}: Bebas Penalti Titik Ke-2 (10m)!</span>
        </div>
      )}
    </div>
  );
}

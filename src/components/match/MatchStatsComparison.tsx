"use client";

import React from "react";
import { SportType } from "@/types/match";
import { BarChart3 } from "lucide-react";

interface MatchStatsComparisonProps {
  sportType: SportType;
  homeTeam: {
    name: string;
    code: string;
    color: string;
    score: number;
    foulsH1: number;
    foulsH2: number;
    timeoutsH1: number;
    timeoutsH2: number;
  };
  awayTeam: {
    name: string;
    code: string;
    color: string;
    score: number;
    foulsH1: number;
    foulsH2: number;
    timeoutsH1: number;
    timeoutsH2: number;
  };
  yellowCardsHome?: number;
  yellowCardsAway?: number;
  redCardsHome?: number;
  redCardsAway?: number;
}

export default function MatchStatsComparison({
  sportType,
  homeTeam,
  awayTeam,
  yellowCardsHome = 0,
  yellowCardsAway = 1,
  redCardsHome = 0,
  redCardsAway = 0,
}: MatchStatsComparisonProps) {
  const isFutsal = sportType === "FUTSAL";

  const totalFoulsHome = homeTeam.foulsH1 + homeTeam.foulsH2;
  const totalFoulsAway = awayTeam.foulsH1 + awayTeam.foulsH2;

  const stats = [
    {
      label: "Skor Pertandingan",
      homeVal: homeTeam.score,
      awayVal: awayTeam.score,
    },
    ...(isFutsal
      ? [
          {
            label: "Akumulasi Foul (Babak 1)",
            homeVal: homeTeam.foulsH1,
            awayVal: awayTeam.foulsH1,
          },
          {
            label: "Akumulasi Foul (Babak 2)",
            homeVal: homeTeam.foulsH2,
            awayVal: awayTeam.foulsH2,
          },
        ]
      : []),
    {
      label: isFutsal ? "Total Pelanggaran (Fouls)" : "Total Pelanggaran",
      homeVal: totalFoulsHome || (isFutsal ? 2 : 7),
      awayVal: totalFoulsAway || (isFutsal ? 3 : 9),
    },
    {
      label: "Kartu Kuning",
      homeVal: yellowCardsHome,
      awayVal: yellowCardsAway,
    },
    {
      label: "Kartu Merah",
      homeVal: redCardsHome,
      awayVal: redCardsAway,
    },
    ...(isFutsal
      ? [
          {
            label: "Time-out Digunakan (Babak 1)",
            homeVal: homeTeam.timeoutsH1,
            awayVal: awayTeam.timeoutsH1,
          },
          {
            label: "Time-out Digunakan (Babak 2)",
            homeVal: homeTeam.timeoutsH2,
            awayVal: awayTeam.timeoutsH2,
          },
        ]
      : [
          {
            label: "Pergantian Pemain (Subs)",
            homeVal: 2,
            awayVal: 3,
          },
        ]),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <span>Statistik Perbandingan Laga (SofaScore Metric Bars)</span>
        </h3>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: homeTeam.color || "#dc2626" }}
            />
            <span className="text-slate-200">{homeTeam.code}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: awayTeam.color || "#2563eb" }}
            />
            <span className="text-slate-200">{awayTeam.code}</span>
          </div>
        </div>
      </div>

      {/* Comparison Bars */}
      <div className="space-y-5">
        {stats.map((item, idx) => {
          const sum = item.homeVal + item.awayVal;
          const homePct = sum === 0 ? 50 : Math.round((item.homeVal / sum) * 100);
          const awayPct = sum === 0 ? 50 : 100 - homePct;

          return (
            <div key={idx} className="space-y-1.5">
              {/* Values & Label */}
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="font-mono text-sm text-slate-100 min-w-[24px] text-left">
                  {item.homeVal}
                </span>
                <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider text-center">
                  {item.label}
                </span>
                <span className="font-mono text-sm text-slate-100 min-w-[24px] text-right">
                  {item.awayVal}
                </span>
              </div>

              {/* Progress Split Bar */}
              <div className="h-2.5 w-full bg-slate-950 rounded-full flex overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-l-full transition-all duration-500"
                  style={{
                    width: `${homePct}%`,
                    backgroundColor: homeTeam.color || "#dc2626",
                  }}
                />
                <div
                  className="h-full rounded-r-full transition-all duration-500"
                  style={{
                    width: `${awayPct}%`,
                    backgroundColor: awayTeam.color || "#2563eb",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

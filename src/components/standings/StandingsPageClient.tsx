"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import StandingsTable from "./StandingsTable";
import { StandingItem, SportType, UserRole } from "@/types/match";
import { Trophy, Award, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

interface StandingsPageClientProps {
  footballStandings: StandingItem[];
  futsalStandings: StandingItem[];
}

export default function StandingsPageClient({
  footballStandings,
  futsalStandings,
}: StandingsPageClientProps) {
  const [currentSport, setCurrentSport] = useState<SportType>("FOOTBALL");
  const [currentRole, setCurrentRole] = useState<UserRole>("USER");

  const activeStandings = currentSport === "FOOTBALL" ? footballStandings : futsalStandings;

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#222222] flex flex-col font-sans">
      <Navbar
        currentSport={currentSport}
        onSportChange={setCurrentSport}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />

      <main className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        {/* Header Banner */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fef3c7] text-[#92400e] mb-2">
              <Trophy className="w-3.5 h-3.5 text-[#eab308]" />
              <span>Klasemen Resmi Musim 2025/2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
              Tabel Peringkat {currentSport === "FOOTBALL" ? "Premier Football (11v11)" : "Super League Futsal (5v5)"}
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Perhitungan klasemen otomatis terintegrasi langsung dengan skor pertandingan (Menang = 3 poin, Seri = 1 poin).
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#383838] text-white text-xs font-bold transition shadow-sm"
          >
            <span>Lihat Jadwal Pertandingan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Full Table */}
        <StandingsTable
          standings={activeStandings}
          title={`Klasemen Lengkap • ${currentSport === "FOOTBALL" ? "Sepakbola" : "Futsal"}`}
          isCompact={false}
        />

        {/* Tournament Regulation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-[#f0f0f0] space-y-2 shadow-sm">
            <div className="font-extrabold text-xs text-[#0a8a4a] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Kriteria Penentuan Posisi
            </div>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              1. Jumlah Poin Terbanyak<br />
              2. Selisih Gol (Goal Difference)<br />
              3. Jumlah Gol Masuk (Goals For)<br />
              4. Head-to-Head (Rekor Pertemuan)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#f0f0f0] space-y-2 shadow-sm">
            <div className="font-extrabold text-xs text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Zona Kejuaraan
            </div>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              Peringkat 1 dan 2 otomatis lolos ke babak Final Championship Series dan berhak atas kuota kompetisi tingkat nasional.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#f0f0f0] space-y-2 shadow-sm">
            <div className="font-extrabold text-xs text-[#eab308] uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> Pengesahan Resmi
            </div>
            <p className="text-xs text-[#4b5563] leading-relaxed">
              Data klasemen divalidasi dan disahkan oleh Match Commissioner setelah seluruh Berita Acara Pertandingan (BAP) ditandatangani.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

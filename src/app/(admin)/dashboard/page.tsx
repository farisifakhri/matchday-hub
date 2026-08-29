"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { 
  Trophy, 
  Users, 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  PlayCircle, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon, 
  Download, 
  Share2,
  Tv,
  Layers
} from "lucide-react";

export default function OrganizerAdminDashboardPage() {
  const [selectedPosterType, setSelectedPosterType] = useState<"LINEUP" | "SCORECARD">("SCORECARD");
  const [posterGenerated, setPosterGenerated] = useState(false);

  // Screening submissions for Helper Admin
  const [screeningList, setScreeningList] = useState([
    { id: "sc1", playerName: "Syahrul Ramadhan", team: "Garuda Muda FC", docType: "KTP Elektronik", status: "PENDING" },
    { id: "sc2", playerName: "Bagas Maulana", team: "Garuda Muda FC", docType: "NISN / Kartu Pelajar", status: "PENDING" },
    { id: "sc3", playerName: "Dimas Wicaksono", team: "Rajawali Futsal Club", docType: "KTP Elektronik", status: "VERIFIED" },
  ]);

  const handleVerify = (id: string, newStatus: "VERIFIED" | "REJECTED") => {
    setScreeningList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#222222] flex flex-col font-sans">
      <Navbar currentSport="FUTSAL" currentRole="SUPER_ADMIN" />

      <main className="max-w-7xl mx-auto w-full p-6 space-y-6 flex-1">
        {/* Header & Overview */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e]">
                PORTAL 3: ORGANIZER & EVENT ADMIN
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#222222] mt-1">
              Super League Championship Futsal 2026
            </h1>
            <p className="text-xs text-[#666666]">
              Master Turnamen, Screening Berkas Atlet, Sponsor Placement & 1-Click Social Media Kit.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/overlay/match/sample-match"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e5e5] hover:bg-slate-50 text-[#222222] text-xs font-bold transition shadow-sm"
            >
              <Tv className="w-4 h-4 text-[#d71149]" />
              <span>OBS Overlay</span>
            </Link>

            <Link
              href="/operator/match/sample-match/live"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-sm transition"
            >
              <PlayCircle className="w-4 h-4 text-[#eab308]" />
              <span>Buka Konsol Meja</span>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <div className="text-xs text-[#666666] font-medium">Total Tim Peserta</div>
            <div className="text-2xl font-black text-[#222222] mt-1">4 Klub (Lunas)</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <div className="text-xs text-[#666666] font-medium">Jadwal Laga (Fixtures)</div>
            <div className="text-2xl font-black text-[#222222] mt-1">12 Pertandingan</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <div className="text-xs text-[#666666] font-medium">Perangkat Wasit</div>
            <div className="text-2xl font-black text-[#0a8a4a] mt-1">6 Wasit Berlisensi</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#f0f0f0] shadow-sm">
            <div className="text-xs text-[#666666] font-medium">Pendapatan Turnamen</div>
            <div className="text-2xl font-black text-[#d71149] mt-1">Rp 6.000.000</div>
          </div>
        </div>

        {/* 2-Column Section: Screening Matrix (Left) & 1-Click Social Media Kit (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Screening Berkas KTP / NISN */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-[#222222]">
                    Panel Screening & Verifikasi Berkas (Helper Admin)
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Validasi keaslian identitas atlet sebelum Digital Pass diterbitkan
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {screeningList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#222222]">{item.playerName}</div>
                      <div className="text-[11px] text-[#666666] mt-0.5">
                        {item.team} • Dokumen: <strong className="text-[#374151]">{item.docType}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.status === "VERIFIED" ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#dcfce7] text-[#166534] font-bold text-[11px]">
                          ✓ Lolos
                        </span>
                      ) : item.status === "REJECTED" ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#fee2e2] text-[#991b1b] font-bold text-[11px]">
                          ✕ Ditolak
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleVerify(item.id, "VERIFIED")}
                            className="px-2.5 py-1.5 rounded-lg bg-[#0a8a4a] text-white font-bold hover:bg-[#08733d] transition"
                          >
                            Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => handleVerify(item.id, "REJECTED")}
                            className="px-2.5 py-1.5 rounded-lg bg-[#fee2e2] text-[#991b1b] font-bold hover:bg-[#fecaca] transition"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsorship Placement Manager */}
            <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-extrabold text-sm text-[#222222]">
                Sponsorship Placement Engine
              </h3>
              <p className="text-xs text-[#666666]">
                Logo sponsor aktif otomatis muncul di scoreboard live, PDF BAP, OBS stream, dan poster medsos:
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] text-center">
                  <div className="text-[10px] font-bold text-[#d71149] uppercase">Title Sponsor</div>
                  <div className="font-extrabold text-xs text-[#222222] mt-1">Bank Mandiri</div>
                </div>
                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] text-center">
                  <div className="text-[10px] font-bold text-[#0a8a4a] uppercase">Apparel Partner</div>
                  <div className="font-extrabold text-xs text-[#222222] mt-1">Specs Indonesia</div>
                </div>
                <div className="p-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] text-center">
                  <div className="text-[10px] font-bold text-blue-600 uppercase">Drink Partner</div>
                  <div className="font-extrabold text-xs text-[#222222] mt-1">Hydro Coco</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 1-Click Social Media Match Graphics Generator */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#eab308]" />
                  <div>
                    <h3 className="font-extrabold text-base text-[#222222]">
                      1-Click Social Media Poster Kit
                    </h3>
                    <p className="text-xs text-[#666666]">
                      Generator grafis otomatis untuk Instagram Feed & Story (Resolusi HD)
                    </p>
                  </div>
                </div>
              </div>

              {/* Poster Mode Selector */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPosterType("SCORECARD")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedPosterType === "SCORECARD"
                      ? "bg-[#222222] text-white shadow-sm"
                      : "bg-[#f3f4f6] text-[#4b5563]"
                  }`}
                >
                  Full-Time Scorecard
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPosterType("LINEUP")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedPosterType === "LINEUP"
                      ? "bg-[#222222] text-white shadow-sm"
                      : "bg-[#f3f4f6] text-[#4b5563]"
                  }`}
                >
                  Starting Lineup Poster
                </button>
              </div>

              {/* Dynamic Poster Preview Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#0c0a09] text-white p-6 flex flex-col justify-between shadow-lg border border-[#44403c]">
                {/* Poster Header */}
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#fbbf24]">
                      OFFICIAL TOURNAMENT MATCHDAY
                    </span>
                    <h4 className="text-xs font-extrabold text-white">Super League Championship 2026</h4>
                  </div>
                  <div className="text-right text-[10px] font-bold text-white/80">
                    GOR Brodjonegoro
                  </div>
                </div>

                {/* Poster Content */}
                {selectedPosterType === "SCORECARD" ? (
                  <div className="text-center my-auto space-y-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#dc2626] text-white font-black text-[10px] tracking-wider">
                      FULL TIME RESULT
                    </span>

                    <div className="flex items-center justify-center gap-6">
                      <div>
                        <div className="text-xs font-black text-[#dc2626] uppercase">GARUDA MUDA</div>
                        <div className="text-4xl font-black font-mono">4</div>
                      </div>
                      <div className="text-lg font-bold text-white/40">vs</div>
                      <div>
                        <div className="text-xs font-black text-[#3b82f6] uppercase">RAJAWALI FC</div>
                        <div className="text-4xl font-black font-mono">2</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-white/80 font-medium">
                      ⚽ Fajar P. 4&apos;, 28&apos; • ⚽ Syahrul 19&apos; | ⚽ Dimas W. 14&apos;
                    </div>
                  </div>
                ) : (
                  <div className="text-center my-auto space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0a8a4a] text-white font-black text-[10px] tracking-wider">
                      STARTING FIVE (5v5)
                    </span>
                    <h5 className="font-extrabold text-sm text-white">GARUDA MUDA FC</h5>
                    <div className="grid grid-cols-5 gap-1 text-[10px] text-white/90 pt-1">
                      <div className="bg-white/10 p-1.5 rounded-lg">#1 Ridwan (GK)</div>
                      <div className="bg-white/10 p-1.5 rounded-lg">#4 Kurnia (C)</div>
                      <div className="bg-white/10 p-1.5 rounded-lg">#7 Pratama</div>
                      <div className="bg-white/10 p-1.5 rounded-lg">#10 Ramadhan</div>
                      <div className="bg-white/10 p-1.5 rounded-lg">#11 Saputra</div>
                    </div>
                  </div>
                )}

                {/* Poster Footer (Sponsors) */}
                <div className="flex items-center justify-between border-t border-white/20 pt-3 text-[9px] text-white/60">
                  <span>MatchDay Hub Engine</span>
                  <span>Presented by: Bank Mandiri • Specs Indonesia</span>
                </div>
              </div>

              {/* Download / Share Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPosterGenerated(true)}
                  className="flex-1 py-2.5 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#eab308]" />
                  <span>{posterGenerated ? "✓ Poster Berhasil Di-Download" : "Unduh Grafis Instagram HD"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

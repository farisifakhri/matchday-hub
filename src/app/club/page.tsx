"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { 
  Users, 
  QrCode, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  Plus, 
  CreditCard, 
  Send, 
  X, 
  Sparkles,
  Shirt,
  Download
} from "lucide-react";
import { PlayerBasic, SportType } from "@/types/match";

export default function ClubManagerPortal() {
  const [sportType, setSportType] = useState<SportType>("FUTSAL");
  const [selectedPlayerForPass, setSelectedPlayerForPass] = useState<PlayerBasic | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [dspSubmitted, setDspSubmitted] = useState(false);

  // Mock Squad Roster
  const [roster, setRoster] = useState<PlayerBasic[]>([
    { id: "p1", fullName: "Muhammad Ridwan", jerseyNumber: 1, position: "GK", isCaptain: false, screeningStatus: "VERIFIED", qrCodeToken: "PASS-INA-GDA-001", isSuspended: false },
    { id: "p2", fullName: "Bambang Kurnia", jerseyNumber: 4, position: "Anchor", isCaptain: true, screeningStatus: "VERIFIED", qrCodeToken: "PASS-INA-GDA-004", isSuspended: false },
    { id: "p3", fullName: "Fajar Pratama", jerseyNumber: 7, position: "Flank", isCaptain: false, screeningStatus: "VERIFIED", qrCodeToken: "PASS-INA-GDA-007", isSuspended: false },
    { id: "p4", fullName: "Syahrul Ramadhan", jerseyNumber: 10, position: "Pivot", isCaptain: false, screeningStatus: "VERIFIED", qrCodeToken: "PASS-INA-GDA-010", isSuspended: false },
    { id: "p5", fullName: "Andi Saputra", jerseyNumber: 11, position: "Flank", isCaptain: false, screeningStatus: "VERIFIED", qrCodeToken: "PASS-INA-GDA-011", isSuspended: false },
    { id: "p6", fullName: "Reza Pahlevi", jerseyNumber: 8, position: "Flank", isCaptain: false, screeningStatus: "VERIFIED", qrCodeToken: "PASS-INA-GDA-008", isSuspended: true }, // Suspended player
    { id: "p7", fullName: "Bagas Maulana", jerseyNumber: 14, position: "Pivot", isCaptain: false, screeningStatus: "PENDING", qrCodeToken: "PASS-INA-GDA-014", isSuspended: false },
  ]);

  // Selected Starters for DSP (Max 5 for Futsal, 11 for Football)
  const [selectedStarters, setSelectedStarters] = useState<string[]>(["p1", "p2", "p3", "p4", "p5"]);
  const [captainId, setCaptainId] = useState<string>("p2");

  const toggleStarter = (playerId: string, isSuspended?: boolean) => {
    if (isSuspended) return; // Prevent selection if suspended!
    if (dspSubmitted) return;

    if (selectedStarters.includes(playerId)) {
      setSelectedStarters(selectedStarters.filter(id => id !== playerId));
    } else {
      const maxStarters = sportType === "FUTSAL" ? 5 : 11;
      if (selectedStarters.length < maxStarters) {
        setSelectedStarters([...selectedStarters, playerId]);
      }
    }
  };

  const handleSimulatePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#222222] flex flex-col font-sans">
      <Navbar currentSport={sportType} onSportChange={setSportType} currentRole="ADMIN_CLUB" />

      <main className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6 flex-1">
        {/* Header Title & Team Overview */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#dc2626] text-white flex items-center justify-center font-black text-2xl shadow-md">
              GDA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#222222]">Garuda Muda FC</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] font-bold text-xs">
                  {paymentSuccess ? "Registrasi Lunas (PAID)" : "Status: Verifikasi Panitia"}
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-0.5">
                Manajer: Hendro Kartiko • Turnamen: Super League Futsal 2026 (Group A)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-sm transition"
            >
              <CreditCard className="w-4 h-4 text-[#eab308]" />
              <span>Biaya Registrasi (QRIS)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Roster List (Left) & Lineup Builder (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Squad Roster Management */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-[#222222]">Daftar Pemain Tim (Roster)</h3>
                  <p className="text-xs text-[#666666]">
                    Klik ikon QR untuk membuka <strong>Digital Player Pass</strong> atlet
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#f3f4f6] text-[#374151]">
                  Total {roster.length} Atlet
                </span>
              </div>

              <div className="divide-y divide-[#f0f0f0]">
                {roster.map((player) => (
                  <div key={player.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-sm text-[#222222] w-6 text-center">
                        #{player.jerseyNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-[#222222]">{player.fullName}</span>
                          {player.isCaptain && (
                            <span className="px-1.5 py-0.2 rounded bg-[#fef08a] text-[#854d0e] font-black text-[10px]">
                              KAPTEN
                            </span>
                          )}
                          {player.isSuspended && (
                            <span className="px-1.5 py-0.5 rounded bg-[#fee2e2] text-[#991b1b] font-bold text-[10px] flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3" /> Sanksi Kartu
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#666666] flex items-center gap-2 mt-0.5">
                          <span>Posisi: {player.position}</span>
                          <span>•</span>
                          <span className={player.screeningStatus === "VERIFIED" ? "text-[#0a8a4a] font-bold" : "text-[#eab308] font-bold"}>
                            {player.screeningStatus === "VERIFIED" ? "✓ Lolos Screening" : "⏳ Menunggu Verifikasi"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPlayerForPass(player)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#222222] font-bold text-xs transition"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#d71149]" />
                        <span>Pass QR</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pre-Match Lineup Builder (DSP) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#f0f0f0] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-[#222222]">Lineup Builder (DSP Resmi)</h3>
                  <p className="text-xs text-[#666666]">
                    Pilih 5 Pemain Inti (Starter) untuk Matchday 1
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#f3f4f6] text-[#222222]">
                  {selectedStarters.length} / 5 Starter
                </span>
              </div>

              {/* Suspension Engine Alert */}
              <div className="p-3 rounded-xl bg-[#fff7ed] border border-[#ffedd5] text-xs text-[#9a3412] flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-[#ea580c] mt-0.5" />
                <div>
                  <p className="font-bold">Smart Disciplinary Engine Aktif:</p>
                  <p className="text-[11px] text-[#7c2d12]">
                    Pemain dengan sanksi kartu otomatis terkunci dan tidak dapat dipilih sebagai Starter.
                  </p>
                </div>
              </div>

              {/* Starter Selector List */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#374151] uppercase tracking-wider block">
                  Pilih Starter (Klik untuk ganti):
                </label>

                <div className="space-y-1.5">
                  {roster.map((p) => {
                    const isSelected = selectedStarters.includes(p.id);
                    const isSuspended = p.isSuspended;

                    return (
                      <button
                        key={p.id}
                        type="button"
                        disabled={isSuspended || dspSubmitted}
                        onClick={() => toggleStarter(p.id, isSuspended)}
                        className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                          isSuspended
                            ? "bg-[#f9fafb] border-[#e5e7eb] text-[#9ca3af] cursor-not-allowed opacity-60"
                            : isSelected
                            ? "bg-[#222222] border-[#222222] text-white shadow-sm"
                            : "bg-white border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-black w-5">#{p.jerseyNumber}</span>
                          <span>{p.fullName} ({p.position})</span>
                        </div>

                        <div>
                          {isSuspended ? (
                            <span className="text-[10px] text-[#dc2626] font-bold">TERKUNCI SANKSI</span>
                          ) : isSelected ? (
                            <span className="text-[10px] font-bold bg-[#0a8a4a] text-white px-2 py-0.5 rounded-md">
                              STARTER
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#6b7280]">Cadangan</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit DSP Action */}
              <div className="pt-3 border-t border-[#f0f0f0]">
                {dspSubmitted ? (
                  <div className="p-3 rounded-xl bg-[#dcfce7] border border-[#bbf7d0] text-[#166534] text-xs font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>DSP Resmi Berhasil Dikirim ke Match Commissioner!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={selectedStarters.length !== 5}
                    onClick={() => setDspSubmitted(true)}
                    className="w-full py-2.5 rounded-xl bg-[#0a8a4a] hover:bg-[#08733d] disabled:opacity-50 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit DSP Resmi ke Pengawas Laga</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Digital Player Pass Modal (QR Code) */}
      {selectedPlayerForPass && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#e5e7eb] text-center animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a8a4a]">
                KARTU ATLET DIGITAL RESMI
              </span>
              <button
                type="button"
                onClick={() => setSelectedPlayerForPass(null)}
                className="text-[#9ca3af] hover:text-[#222222] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Official ID Card Layout */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#222222] to-[#383838] text-white space-y-4 shadow-lg relative overflow-hidden">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white text-[#222222] flex items-center justify-center font-black text-3xl shadow-inner border-2 border-[#eab308]">
                #{selectedPlayerForPass.jerseyNumber}
              </div>

              <div>
                <h3 className="font-extrabold text-lg">{selectedPlayerForPass.fullName}</h3>
                <p className="text-xs text-slate-300">
                  {selectedPlayerForPass.position} • Garuda Muda FC
                </p>
              </div>

              {/* QR Code Simulation Box */}
              <div className="bg-white p-3 rounded-xl max-w-[140px] mx-auto shadow-sm">
                <div className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-mono font-bold p-2 text-center">
                  [ QR: {selectedPlayerForPass.qrCodeToken} ]
                </div>
              </div>

              <div className="text-[10px] text-slate-300 font-mono">
                Token ID: {selectedPlayerForPass.qrCodeToken}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPlayerForPass(null)}
              className="w-full py-2 rounded-xl bg-[#222222] text-white font-bold text-xs hover:bg-[#383838] transition"
            >
              Tutup Kartu
            </button>
          </div>
        </div>
      )}

      {/* QRIS Payment Simulation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#e5e7eb] text-center">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
              <span className="text-xs font-bold text-[#222222]">Pembayaran Registrasi Tim</span>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="text-[#9ca3af] hover:text-[#222222] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#166534] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-extrabold text-base text-[#222222]">Pembayaran Berhasil!</h4>
                <p className="text-xs text-[#666666]">Status registrasi turnamen tim Anda telah aktif.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Biaya Turnamen:</span>
                    <span className="font-bold text-[#222222]">Rp 1.500.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Metode:</span>
                    <span className="font-bold text-[#0a8a4a]">QRIS Dinamis / VA</span>
                  </div>
                </div>

                {/* Simulated QR Code */}
                <div className="bg-[#f5f5f5] p-4 rounded-2xl border border-[#e5e5e5] max-w-[160px] mx-auto flex items-center justify-center aspect-square font-mono text-[10px] text-center text-[#666666]">
                  [ SCAN QRIS RESMI BANK INDONESIA ]
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-2.5 rounded-xl bg-[#0a8a4a] hover:bg-[#08733d] text-white font-bold text-xs shadow-md transition"
                >
                  Simulasikan Pembayaran Berhasil
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

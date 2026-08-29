"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { 
  ShieldCheck, 
  QrCode, 
  CheckCircle, 
  FileSignature, 
  Star, 
  FileText, 
  PlayCircle, 
  UserCheck, 
  AlertCircle,
  Camera,
  Layers
} from "lucide-react";
import Link from "next/link";

export default function MatchCommissionerOfficialsPortal() {
  const [activeTab, setActiveTab] = useState<"QR_SCREENING" | "DSP_APPROVAL" | "BAP_SIGN" | "ASSESSMENT">("QR_SCREENING");
  
  // QR Scan State
  const [scannedToken, setScannedToken] = useState("");
  const [scannedPlayer, setScannedPlayer] = useState<any | null>(null);

  // DSP Approval State
  const [dspApproved, setDspApproved] = useState(false);

  // Digital Sign State
  const [isSigned, setIsSigned] = useState(false);
  const [signName, setSignName] = useState("Drs. H. Mulyadi (Match Commissioner)");

  // Assessor Scores
  const [assessorScores, setAssessorScores] = useState({
    lawOfGame: 9,
    positioning: 8,
    matchControl: 9,
    communication: 8,
    notes: "Wasit memimpin dengan tegas. Keputusan kartu merah pada menit 34 sangat akurat dan sesuai regulasi.",
  });
  const [assessmentSaved, setAssessmentSaved] = useState(false);

  const handleSimulateScan = () => {
    setScannedToken("PASS-INA-GDA-007");
    setScannedPlayer({
      name: "Fajar Pratama",
      jerseyNumber: 7,
      team: "Garuda Muda FC",
      position: "Flank",
      screeningStatus: "VERIFIED",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      idNumber: "32760112990001",
      birthDate: "14 Mei 2004",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#222222] flex flex-col font-sans">
      <Navbar currentSport="FUTSAL" currentRole="MATCH_COMMISSIONER" />

      <main className="max-w-7xl mx-auto w-full p-6 space-y-6 flex-1">
        {/* Header & Overview */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-[#f3e8ff] text-[#7e22ce]">
                PORTAL 5: MATCH COMMISSIONER & OFFICIALS
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#222222] mt-1">
              Pusat Otoritas Pengawas Pertandingan & Penilai Wasit
            </h1>
            <p className="text-xs text-[#666666]">
              Verifikasi fisik atlet via QR Scanner, otorisasi kick-off, tanda tangan digital BAP, dan penilaian kinerja wasit.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/api/pdf/sample-match"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e5e5] hover:bg-slate-50 text-[#222222] text-xs font-bold transition shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#0a8a4a]" />
              <span>Lihat BAP PDF</span>
            </Link>
          </div>
        </div>

        {/* Officials Tab Selector */}
        <div className="flex items-center gap-2 bg-white border border-[#f0f0f0] p-1.5 rounded-2xl shadow-sm overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("QR_SCREENING")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "QR_SCREENING" ? "bg-[#222222] text-white shadow-sm" : "text-[#666666] hover:bg-[#f3f4f6]"
            }`}
          >
            <QrCode className="w-4 h-4 text-[#d71149]" />
            <span>1. Scan QR Atlet di Lapangan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("DSP_APPROVAL")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "DSP_APPROVAL" ? "bg-[#222222] text-white shadow-sm" : "text-[#666666] hover:bg-[#f3f4f6]"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#0a8a4a]" />
            <span>2. Otorisasi DSP & Kick-Off</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("BAP_SIGN")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "BAP_SIGN" ? "bg-[#222222] text-white shadow-sm" : "text-[#666666] hover:bg-[#f3f4f6]"
            }`}
          >
            <FileSignature className="w-4 h-4 text-blue-600" />
            <span>3. Tanda Tangan Digital BAP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ASSESSMENT")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "ASSESSMENT" ? "bg-[#222222] text-white shadow-sm" : "text-[#666666] hover:bg-[#f3f4f6]"
            }`}
          >
            <Star className="w-4 h-4 text-[#eab308]" />
            <span>4. Evaluasi Penilai Wasit</span>
          </button>
        </div>

        {/* Tab 1: QR Screening on Field */}
        {activeTab === "QR_SCREENING" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#d71149]" />
                <h3 className="font-extrabold text-base text-[#222222]">
                  Pemindai QR Pass Atlet (Kamera Tablet/HP)
                </h3>
              </div>
              <p className="text-xs text-[#666666]">
                Arahkan kamera ke Digital Player Pass pemain sebelum memasuki lapangan untuk mencocokkan identitas fisik dan mencegah joki pemain.
              </p>

              <div className="aspect-video rounded-2xl bg-[#141414] text-white flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-white/20">
                <Camera className="w-10 h-10 text-white/40 mb-2 animate-pulse" />
                <span className="text-xs text-white/80 font-mono">[ KAMERA AKTIF: MENCARI QR CODE ATLET ]</span>
              </div>

              <button
                type="button"
                onClick={handleSimulateScan}
                className="w-full py-2.5 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-md transition"
              >
                Simulasikan Scan QR Pemain (#7 Fajar Pratama)
              </button>
            </div>

            <div className="md:col-span-6 bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#222222]">Hasil Validasi Identitas Atlet</h3>

              {scannedPlayer ? (
                <div className="p-5 rounded-2xl bg-[#f9fafb] border border-[#e5e7eb] space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5e7eb]">
                    <span className="text-xs font-bold text-[#0a8a4a] flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> ATLET RESMI TERDAFTAR
                    </span>
                    <span className="text-[10px] font-mono text-[#666666]">{scannedToken}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#dc2626] text-white flex items-center justify-center font-black text-2xl shadow-sm">
                      #{scannedPlayer.jerseyNumber}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#222222]">{scannedPlayer.name}</h4>
                      <p className="text-xs text-[#666666]">{scannedPlayer.team} • {scannedPlayer.position}</p>
                      <p className="text-[11px] text-[#374151] mt-1 font-mono">NIK: {scannedPlayer.idNumber}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#e5e7eb] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0a8a4a]">Izin Bermain: DIBERIKAN</span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-[#dcfce7] text-[#166534] font-bold">
                      ✓ Cocok Fisik
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-[#9ca3af] bg-[#fafafa] rounded-2xl border border-dashed border-[#e5e7eb] text-xs">
                  Arahkan kamera ke QR Code pemain untuk memvalidasi kartu.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: DSP Approval & Kick-off */}
        {activeTab === "DSP_APPROVAL" && (
          <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-4">
              <div>
                <h3 className="font-extrabold text-base text-[#222222]">
                  Verifikasi Daftar Susunan Pemain (DSP) Resmi
                </h3>
                <p className="text-xs text-[#666666]">
                  Periksa susunan pemain kedua tim sebelum mengotorisasi kick-off pertandingan.
                </p>
              </div>

              {dspApproved && (
                <span className="px-3 py-1 rounded-full bg-[#dcfce7] text-[#166534] font-bold text-xs flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> DSP Terverifikasi & Kick-off Diizinkan
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] space-y-2">
                <div className="font-bold text-sm text-[#dc2626]">Garuda Muda FC (5 Starters)</div>
                <div className="text-xs text-[#374151] space-y-1">
                  <div>• #1 Muhammad Ridwan (GK)</div>
                  <div>• #4 Bambang Kurnia (Anchor / Kapten)</div>
                  <div>• #7 Fajar Pratama (Flank)</div>
                  <div>• #10 Syahrul Ramadhan (Pivot)</div>
                  <div>• #11 Andi Saputra (Flank)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f9fafb] border border-[#e5e7eb] space-y-2">
                <div className="font-bold text-sm text-[#2563eb]">Rajawali Futsal Club (5 Starters)</div>
                <div className="text-xs text-[#374151] space-y-1">
                  <div>• #12 Dimas Wicaksono (GK)</div>
                  <div>• #5 Eko Prasetyo (Anchor)</div>
                  <div>• #8 Rizky Firmansyah (Flank / Kapten)</div>
                  <div>• #9 Hadi Gunawan (Pivot)</div>
                  <div>• #14 Kevin Alamsyah (Flank)</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f0f0f0] flex justify-end">
              <button
                type="button"
                onClick={() => setDspApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-[#0a8a4a] hover:bg-[#08733d] text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{dspApproved ? "✓ DSP Telah Disahkan" : "Sahkan DSP & Otorisasi Kick-Off"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Digital E-Signature BAP */}
        {activeTab === "BAP_SIGN" && (
          <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-[#222222]">
                Pengesahan Berita Acara Pertandingan (Digital E-Signature)
              </h3>
              <p className="text-xs text-[#666666]">
                Tanda tangan digital Match Commissioner untuk memvalidasi hasil akhir laga secara hukum turnamen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f9fafb] border border-[#e5e7eb] max-w-lg mx-auto space-y-4 text-center">
              <div className="text-xs font-bold text-[#374151]">Kolom Tanda Tangan Digital Pengawas:</div>

              {/* Simulated Signature Pad */}
              <div className="aspect-[3/1] bg-white border-2 border-dashed border-[#d1d5db] rounded-xl flex items-center justify-center relative overflow-hidden">
                {isSigned ? (
                  <div className="font-serif italic font-black text-2xl text-[#1e3a8a] rotate-[-4deg]">
                    Mulyadi_Signed_Official
                  </div>
                ) : (
                  <span className="text-xs text-[#9ca3af]">
                    [ Klik tombol di bawah untuk menandatangani BAP ]
                  </span>
                )}
              </div>

              <div className="text-xs font-mono text-[#666666]">{signName}</div>

              <button
                type="button"
                onClick={() => setIsSigned(true)}
                className="w-full py-2.5 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <FileSignature className="w-4 h-4 text-[#eab308]" />
                <span>{isSigned ? "✓ BAP Resmi Telah Ditandatangani" : "Tandatangani Dokumen BAP Sekarang"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Referee Assessor Evaluation */}
        {activeTab === "ASSESSMENT" && (
          <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-base text-[#222222]">
                Lembar Penilaian Kinerja Wasit (Referee Assessor)
              </h3>
              <p className="text-xs text-[#666666]">
                Evaluasi numerik (skala 1-10) untuk Wasit 1, Wasit 2, dan Timekeeper pertandingan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#374151] mb-1">
                    1. Penguasaan Law of the Game (Skor: {assessorScores.lawOfGame}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={assessorScores.lawOfGame}
                    onChange={(e) => setAssessorScores({ ...assessorScores, lawOfGame: Number(e.target.value) })}
                    className="w-full accent-[#0a8a4a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#374151] mb-1">
                    2. Posisi Lari & Sudut Pandang Lapangan (Skor: {assessorScores.positioning}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={assessorScores.positioning}
                    onChange={(e) => setAssessorScores({ ...assessorScores, positioning: Number(e.target.value) })}
                    className="w-full accent-[#0a8a4a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#374151] mb-1">
                    3. Kontrol Emosi & Ketegasan Kartu (Skor: {assessorScores.matchControl}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={assessorScores.matchControl}
                    onChange={(e) => setAssessorScores({ ...assessorScores, matchControl: Number(e.target.value) })}
                    className="w-full accent-[#0a8a4a]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#374151]">
                  Catatan Rahasia Komite Wasit:
                </label>
                <textarea
                  rows={4}
                  value={assessorScores.notes}
                  onChange={(e) => setAssessorScores({ ...assessorScores, notes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#d1d5db] text-xs text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#f0f0f0] flex justify-end">
              <button
                type="button"
                onClick={() => setAssessmentSaved(true)}
                className="px-6 py-2.5 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-md transition"
              >
                {assessmentSaved ? "✓ Evaluasi Berhasil Disimpan" : "Simpan Laporan Evaluasi Wasit"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Trophy, 
  ChevronDown, 
  ShieldCheck, 
  FileText, 
  PlayCircle, 
  Users, 
  Calendar,
  Sparkles,
  Search,
  Globe,
  QrCode,
  Tv,
  LogIn,
  Layers
} from "lucide-react";
import { SportType, UserRole, PortalType } from "@/types/match";
import { USER_ROLES_CONFIG, PORTALS_CONFIG } from "@/lib/data/get-tournament-data";

interface NavbarProps {
  currentSport?: SportType;
  onSportChange?: (sport: SportType) => void;
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export default function Navbar({
  currentSport = "FOOTBALL",
  onSportChange,
  currentRole = "USER",
  onRoleChange,
}: NavbarProps) {
  const pathname = usePathname();
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const activeRoleConfig = USER_ROLES_CONFIG[currentRole] || USER_ROLES_CONFIG.USER;

  // Determine active portal based on pathname
  let activePortalId: PortalType = "PUBLIC";
  if (pathname?.startsWith("/club")) activePortalId = "CLUB";
  else if (pathname?.startsWith("/admin")) activePortalId = "ORGANIZER";
  else if (pathname?.startsWith("/operator")) activePortalId = "OPERATOR";
  else if (pathname?.startsWith("/officials")) activePortalId = "OFFICIALS";

  const activePortal = PORTALS_CONFIG[activePortalId];

  const handleSelectSport = (sport: SportType) => {
    if (onSportChange) {
      onSportChange(sport);
    }
  };

  const handleSelectRole = (role: UserRole) => {
    if (onRoleChange) {
      onRoleChange(role);
    }
    setIsRoleDropdownOpen(false);
  };

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#f0f0f0] shadow-sm">
      {/* Top Utility & 5-Portal Switcher Ribbon */}
      <div className="bg-[#f8f9fa] border-b border-[#f0f0f0] px-4 py-1.5 text-xs text-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Sports Selector & Live Pulse */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-[#0a8a4a]">
              <span className="h-2 w-2 rounded-full bg-[#0a8a4a] animate-pulse" />
              <span className="hidden sm:inline text-[11px]">Match Engine 2.0</span>
            </div>

            {/* Sport Toggle (FotMob Style) */}
            <div className="inline-flex rounded-md bg-[#e9ecef] p-0.5 border border-[#dee2e6]">
              <button
                type="button"
                onClick={() => handleSelectSport("FOOTBALL")}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold transition ${
                  currentSport === "FOOTBALL"
                    ? "bg-white text-[#222222] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#222222]"
                }`}
              >
                <span>⚽</span>
                <span>Sepakbola</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectSport("FUTSAL")}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold transition ${
                  currentSport === "FUTSAL"
                    ? "bg-white text-[#222222] shadow-sm font-bold"
                    : "text-[#666666] hover:text-[#222222]"
                }`}
              >
                <span>👟</span>
                <span>Futsal</span>
              </button>
            </div>
          </div>

          {/* Right: 5 Portals Switcher & Role Simulator */}
          <div className="flex items-center gap-2">
            {/* 5 Portals Dropdown (Futscore Dedicated Portals) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#d1d5db] text-[#222222] text-xs font-bold shadow-sm hover:bg-slate-50 transition"
              >
                <Layers className="w-3.5 h-3.5 text-[#d71149]" />
                <span className="hidden md:inline text-[#666666] font-normal">Portal:</span>
                <span>{activePortal.title.split(". ")[1]}</span>
                <ChevronDown className="w-3 h-3 text-[#666666]" />
              </button>

              {isPortalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-[#e5e7eb] shadow-xl p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#666666] uppercase tracking-wider border-b border-[#f0f0f0]">
                    Pilih 1 dari 5 Portal Mandiri (Futscore Model)
                  </div>
                  {Object.values(PORTALS_CONFIG).map((p) => (
                    <Link
                      key={p.id}
                      href={p.path}
                      onClick={() => setIsPortalDropdownOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-xs transition ${
                        activePortalId === p.id
                          ? "bg-[#f5f5f5] text-[#222222] font-bold border border-[#e5e7eb]"
                          : "text-[#4b5563] hover:bg-[#f9fafb]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#222222]">{p.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f3f4f6] text-[#6b7280]">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#666666] font-normal mt-0.5 line-clamp-1">
                        {p.description}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Role Simulation Indicator */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#222222] text-white text-[11px] font-bold hover:bg-[#383838] transition"
              >
                <span>Role: {activeRoleConfig.label}</span>
                <ChevronDown className="w-3 h-3 opacity-80" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-xl bg-white border border-[#e5e7eb] shadow-xl p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#666666] uppercase tracking-wider border-b border-[#f0f0f0]">
                    Simulasi 12 Tingkatan User
                  </div>
                  {Object.values(USER_ROLES_CONFIG).map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => handleSelectRole(r.role)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition flex items-center justify-between ${
                        currentRole === r.role
                          ? "bg-[#222222] text-white font-bold"
                          : "text-[#374151] hover:bg-[#f3f4f6]"
                      }`}
                    >
                      <span>{r.label}</span>
                      <span className="text-[10px] opacity-75">{r.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Profile CTA */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#dee2e6]">
                <div className="w-6 h-6 rounded-full bg-[#0a8a4a] text-white flex items-center justify-center text-xs font-bold">
                  U
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-[#d71149] font-medium hover:underline"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#d71149] hover:bg-[#b00d3a] text-white text-xs font-bold transition shadow-sm"
              >
                <LogIn className="w-3 h-3" />
                <span>Masuk / SSO</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main FotMob Header Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-[#222222] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition">
              ⚽
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-[#222222] flex items-center gap-1.5">
                MatchDay<span className="text-[#d71149]">Hub</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#f5f5f5] border border-[#e5e5e5] text-[#222222]">
                  {currentSport}
                </span>
              </div>
              <p className="text-[11px] text-[#666666] font-medium leading-none">
                FotMob Clean UI & Live Tournament Platform
              </p>
            </div>
          </Link>

          {/* Navigation Links for Public Hub */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                pathname === "/" ? "text-[#222222] bg-[#f5f5f5]" : "text-[#666666] hover:text-[#222222] hover:bg-[#f8f9fa]"
              }`}
            >
              <Calendar className="w-4 h-4 text-[#d71149]" />
              <span>Pertandingan</span>
            </Link>
            <Link
              href="/standings"
              className={`px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                pathname === "/standings" ? "text-[#222222] bg-[#f5f5f5]" : "text-[#666666] hover:text-[#222222] hover:bg-[#f8f9fa]"
              }`}
            >
              <Trophy className="w-4 h-4 text-[#eab308]" />
              <span>Klasemen Liga</span>
            </Link>
            <Link
              href="/club"
              className={`px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                pathname?.startsWith("/club") ? "text-[#222222] bg-[#f5f5f5]" : "text-[#666666] hover:text-[#222222] hover:bg-[#f8f9fa]"
              }`}
            >
              <Users className="w-4 h-4 text-[#0a8a4a]" />
              <span>Portal Klub & DSP</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                pathname?.startsWith("/admin") ? "text-[#222222] bg-[#f5f5f5]" : "text-[#666666] hover:text-[#222222] hover:bg-[#f8f9fa]"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Organizer & Poster</span>
            </Link>
          </nav>
        </div>

        {/* Right Action Buttons & Quick Tools */}
        <div className="flex items-center gap-2">
          {/* Operator Tablet Button */}
          <Link
            href="/operator/match/sample-match/live"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-xs shadow-sm transition"
          >
            <PlayCircle className="w-4 h-4 text-[#eab308]" />
            <span className="hidden sm:inline">Tablet Wasit Meja</span>
          </Link>

          {/* OBS Stream Overlay Link */}
          <Link
            href="/overlay/match/sample-match"
            target="_blank"
            title="Buka Overlay Transparan OBS Studio"
            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white border border-[#e5e5e5] hover:bg-slate-50 text-[#222222] text-xs font-bold transition shadow-sm"
          >
            <Tv className="w-3.5 h-3.5 text-[#d71149]" />
            <span className="hidden md:inline">OBS Overlay</span>
          </Link>

          {/* PDF Official BAP */}
          <Link
            href="/api/pdf/sample-match"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#e5e5e5] hover:bg-slate-50 text-[#222222] font-semibold text-xs transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#0a8a4a]" />
            <span className="hidden sm:inline">BAP (PDF)</span>
          </Link>
        </div>
      </div>

      {/* Auth Modal (Google OAuth & Email Credentials) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#e5e7eb] animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black text-[#222222]">
                  {authTab === "login" ? "Masuk ke MatchDay Hub" : "Daftar Akun Baru"}
                </h3>
                <p className="text-xs text-[#666666] mt-0.5">
                  Akses 5 portal turnamen, manajemen klub & live scoreboard.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="text-[#9ca3af] hover:text-[#222222] p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Google OAuth Single Sign-On Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-[#d1d5db] bg-white hover:bg-[#f9fafb] text-[#222222] font-bold text-sm shadow-sm transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#e5e7eb]" />
              <span className="text-xs text-[#9ca3af] font-medium">atau dengan email</span>
              <div className="flex-1 h-px bg-[#e5e7eb]" />
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleSimulateLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="manager@klubanda.id"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#d1d5db] text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#d1d5db] text-sm text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#222222] hover:bg-[#383838] text-white font-bold text-sm shadow-md transition mt-2"
              >
                {authTab === "login" ? "Masuk Sekarang" : "Daftar Akun"}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-[#f0f0f0]">
              {authTab === "login" ? (
                <p className="text-xs text-[#666666]">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthTab("register")}
                    className="font-bold text-[#d71149] hover:underline"
                  >
                    Daftar di sini
                  </button>
                </p>
              ) : (
                <p className="text-xs text-[#666666]">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthTab("login")}
                    className="font-bold text-[#d71149] hover:underline"
                  >
                    Masuk di sini
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

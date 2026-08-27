"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  Plus, 
  ArrowLeft, 
  FileText, 
  Check, 
  AlertTriangle,
  Flame,
  Volume2
} from "lucide-react";
import { evaluateFoulRules, shouldConvertSecondYellow } from "@/lib/rules-engine";
import { formatMatchTime } from "@/lib/utils";

interface TeamState {
  id: string;
  name: string;
  code: string;
  color: string;
  score: number;
  foulsH1: number;
  foulsH2: number;
  timeoutsH1: number;
  timeoutsH2: number;
  players: { id: string; name: string; number: number; position: string; yellowCards: number; isRedCard: boolean }[];
}

interface EventLog {
  id: string;
  time: string;
  period: "1H" | "2H";
  teamCode: string;
  type: string;
  description: string;
}

export default function OperatorLiveMatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  // Clock state: 20 minutes (1200 seconds) countdown for futsal
  const [secondsLeft, setSecondsLeft] = useState<number>(1200);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [period, setPeriod] = useState<"1H" | "2H">("1H");
  const [activeModal, setActiveModal] = useState<"GOAL" | "FOUL" | "CARD" | "TIMEOUT" | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<"HOME" | "AWAY">("HOME");

  // Home Team State
  const [homeTeam, setHomeTeam] = useState<TeamState>({
    id: "team-1",
    name: "Garuda Muda FC",
    code: "GDA",
    color: "#dc2626",
    score: 1,
    foulsH1: 2,
    foulsH2: 0,
    timeoutsH1: 0,
    timeoutsH2: 0,
    players: [
      { id: "p1", name: "Muhammad Ridwan", number: 1, position: "GK", yellowCards: 0, isRedCard: false },
      { id: "p2", name: "Bambang Kurnia", number: 4, position: "Anchor", yellowCards: 0, isRedCard: false },
      { id: "p3", name: "Fajar Pratama", number: 7, position: "Flank", yellowCards: 0, isRedCard: false },
      { id: "p4", name: "Syahrul Ramadhan", number: 10, position: "Pivot", yellowCards: 1, isRedCard: false },
      { id: "p5", name: "Andi Saputra", number: 11, position: "Flank", yellowCards: 0, isRedCard: false },
    ],
  });

  // Away Team State
  const [awayTeam, setAwayTeam] = useState<TeamState>({
    id: "team-2",
    name: "Rajawali Futsal Club",
    code: "RJW",
    color: "#2563eb",
    score: 0,
    foulsH1: 3,
    foulsH2: 0,
    timeoutsH1: 0,
    timeoutsH2: 0,
    players: [
      { id: "p6", name: "Dimas Wicaksono", number: 12, position: "GK", yellowCards: 0, isRedCard: false },
      { id: "p7", name: "Eko Prasetyo", number: 5, position: "Anchor", yellowCards: 0, isRedCard: false },
      { id: "p8", name: "Rizky Firmansyah", number: 8, position: "Flank", yellowCards: 0, isRedCard: false },
      { id: "p9", name: "Hadi Gunawan", number: 9, position: "Pivot", yellowCards: 0, isRedCard: false },
      { id: "p10", name: "Kevin Alamsyah", number: 14, position: "Flank", yellowCards: 0, isRedCard: false },
    ],
  });

  const [logs, setLogs] = useState<EventLog[]>([
    { id: "1", time: "00:00", period: "1H", teamCode: "ALL", type: "PERIOD_START", description: "Match Commenced" },
    { id: "2", time: "04:32", period: "1H", teamCode: "GDA", type: "GOAL", description: "Goal scored by #7 Fajar Pratama" },
  ]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const currentMinutes = Math.floor(secondsLeft / 60);
  const currentSeconds = secondsLeft % 60;
  const currentMatchTimeFormatted = formatMatchTime(currentMinutes, currentSeconds);

  // Active foul counts for current period
  const homeFoulsCurrent = period === "1H" ? homeTeam.foulsH1 : homeTeam.foulsH2;
  const awayFoulsCurrent = period === "1H" ? awayTeam.foulsH1 : awayTeam.foulsH2;

  const homeFoulStatus = evaluateFoulRules(homeFoulsCurrent);
  const awayFoulStatus = evaluateFoulRules(awayFoulsCurrent);

  // Actions
  const handleAddGoal = (team: "HOME" | "AWAY", playerId?: string) => {
    const targetTeam = team === "HOME" ? homeTeam : awayTeam;
    const player = targetTeam.players.find((p) => p.id === playerId);
    const desc = player ? `Goal scored by #${player.number} ${player.name}` : `Goal scored for ${targetTeam.name}`;

    if (team === "HOME") {
      setHomeTeam((prev) => ({ ...prev, score: prev.score + 1 }));
    } else {
      setAwayTeam((prev) => ({ ...prev, score: prev.score + 1 }));
    }

    setLogs((prev) => [
      {
        id: String(Date.now()),
        time: currentMatchTimeFormatted,
        period,
        teamCode: targetTeam.code,
        type: "GOAL",
        description: desc,
      },
      ...prev,
    ]);
    setActiveModal(null);
  };

  const handleAddFoul = (team: "HOME" | "AWAY") => {
    const targetTeam = team === "HOME" ? homeTeam : awayTeam;
    const currentFouls = period === "1H" ? (team === "HOME" ? homeTeam.foulsH1 : awayTeam.foulsH1) : (team === "HOME" ? homeTeam.foulsH2 : awayTeam.foulsH2);
    const newCount = currentFouls + 1;

    if (team === "HOME") {
      setHomeTeam((prev) => ({
        ...prev,
        foulsH1: period === "1H" ? prev.foulsH1 + 1 : prev.foulsH1,
        foulsH2: period === "2H" ? prev.foulsH2 + 1 : prev.foulsH2,
      }));
    } else {
      setAwayTeam((prev) => ({
        ...prev,
        foulsH1: period === "1H" ? prev.foulsH1 + 1 : prev.foulsH1,
        foulsH2: period === "2H" ? prev.foulsH2 + 1 : prev.foulsH2,
      }));
    }

    let foulNote = `Accumulated foul #${newCount}`;
    if (newCount === 5) foulNote += " ⚠️ [5TH FOUL WARNING]";
    if (newCount >= 6) foulNote += " 🚨 [10M DIRECT PENALTY AWARDED]";

    setLogs((prev) => [
      {
        id: String(Date.now()),
        time: currentMatchTimeFormatted,
        period,
        teamCode: targetTeam.code,
        type: "FOUL",
        description: `${targetTeam.name} - ${foulNote}`,
      },
      ...prev,
    ]);
    setActiveModal(null);
  };

  const handleAddCard = (team: "HOME" | "AWAY", playerId: string, cardType: "YELLOW" | "RED") => {
    const isHome = team === "HOME";
    const targetTeam = isHome ? homeTeam : awayTeam;
    const player = targetTeam.players.find((p) => p.id === playerId);
    if (!player) return;

    let finalType: "YELLOW_CARD" | "SECOND_YELLOW_CARD" | "RED_CARD" = cardType === "YELLOW" ? "YELLOW_CARD" : "RED_CARD";

    if (cardType === "YELLOW" && player.yellowCards >= 1) {
      finalType = "SECOND_YELLOW_CARD";
    }

    const updatedPlayers = targetTeam.players.map((p) => {
      if (p.id === playerId) {
        if (finalType === "SECOND_YELLOW_CARD" || finalType === "RED_CARD") {
          return { ...p, yellowCards: p.yellowCards + 1, isRedCard: true };
        }
        return { ...p, yellowCards: p.yellowCards + 1 };
      }
      return p;
    });

    if (isHome) {
      setHomeTeam((prev) => ({ ...prev, players: updatedPlayers }));
    } else {
      setAwayTeam((prev) => ({ ...prev, players: updatedPlayers }));
    }

    const cardDesc =
      finalType === "SECOND_YELLOW_CARD"
        ? `Second Yellow Card -> RED CARD for #${player.number} ${player.name} (Expulsion)`
        : `${cardType === "YELLOW" ? "Yellow Card" : "Direct Red Card"} for #${player.number} ${player.name}`;

    setLogs((prev) => [
      {
        id: String(Date.now()),
        time: currentMatchTimeFormatted,
        period,
        teamCode: targetTeam.code,
        type: finalType,
        description: cardDesc,
      },
      ...prev,
    ]);
    setActiveModal(null);
  };

  const handleTimeout = (team: "HOME" | "AWAY") => {
    const isHome = team === "HOME";
    const targetTeam = isHome ? homeTeam : awayTeam;
    const usedTimeout = period === "1H" ? targetTeam.timeoutsH1 : targetTeam.timeoutsH2;

    if (usedTimeout >= 1) {
      alert(`Team ${targetTeam.name} has already used their 1-minute timeout for period ${period}.`);
      return;
    }

    setIsRunning(false); // Official futsal timeout pauses match clock

    if (isHome) {
      setHomeTeam((prev) => ({
        ...prev,
        timeoutsH1: period === "1H" ? prev.timeoutsH1 + 1 : prev.timeoutsH1,
        timeoutsH2: period === "2H" ? prev.timeoutsH2 + 1 : prev.timeoutsH2,
      }));
    } else {
      setAwayTeam((prev) => ({
        ...prev,
        timeoutsH1: period === "1H" ? prev.timeoutsH1 + 1 : prev.timeoutsH1,
        timeoutsH2: period === "2H" ? prev.timeoutsH2 + 1 : prev.timeoutsH2,
      }));
    }

    setLogs((prev) => [
      {
        id: String(Date.now()),
        time: currentMatchTimeFormatted,
        period,
        teamCode: targetTeam.code,
        type: "TIMEOUT",
        description: `1-Minute Official Timeout called by ${targetTeam.name}`,
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col select-none">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-sm tracking-wide text-slate-100">
              OPERATOR CONSOLE (TABLET)
            </span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Court 1 • Match #1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/api/pdf/sample-match"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-medium transition"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            Preview BAP (PDF)
          </Link>
        </div>
      </header>

      {/* Main Operator Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 max-w-[1600px] mx-auto w-full">
        {/* Left 8 Cols: Scoreboard, Controls & Keypad */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Main Digital Scoreboard Card */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
            {/* Top Period Badge & Stoppage indicator */}
            <div className="flex items-center justify-between w-full border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPeriod("1H")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    period === "1H" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  1ST HALF
                </button>
                <button
                  onClick={() => setPeriod("2H")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    period === "2H" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  2ND HALF
                </button>
              </div>

              {/* Central Official Clock */}
              <div className="flex items-center gap-3">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-wider bg-slate-950 px-4 py-1 rounded-xl border border-emerald-500/30">
                  {currentMatchTimeFormatted}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`p-2.5 rounded-xl font-bold transition ${
                      isRunning ? "bg-amber-500 hover:bg-amber-400 text-slate-950" : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                    }`}
                    title={isRunning ? "Pause Clock" : "Start Clock"}
                  >
                    {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setSecondsLeft(1200);
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Reset Clock (20:00)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Score & Fouls Display */}
            <div className="grid grid-cols-2 w-full gap-8 py-6">
              {/* Home Team */}
              <div className="flex flex-col items-center text-center space-y-2 border-r border-slate-800 pr-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <h3 className="font-bold text-xl sm:text-2xl text-white">{homeTeam.name}</h3>
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight font-mono">
                  {homeTeam.score}
                </div>

                {/* Accumulated Fouls Tracker */}
                <div className="w-full max-w-xs mt-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">Accumulated Fouls ({period})</span>
                    <span className={`font-bold ${homeFoulStatus.isDirectPenaltySecondSpot ? "text-red-400" : homeFoulStatus.isWarning ? "text-amber-400" : "text-slate-200"}`}>
                      {homeFoulsCurrent} / 5
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div
                        key={num}
                        className={`h-2.5 rounded-full transition ${
                          num <= homeFoulsCurrent
                            ? num >= 6
                              ? "bg-red-500 shadow-sm shadow-red-500/50"
                              : num === 5
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                            : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                  {homeFoulStatus.isDirectPenaltySecondSpot && (
                    <div className="mt-2 text-[11px] font-bold text-red-400 flex items-center justify-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" /> 10m Penalty Spot Active!
                    </div>
                  )}
                </div>

                {/* Timeout Indicator */}
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span>Timeout ({period}):</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    (period === "1H" ? homeTeam.timeoutsH1 : homeTeam.timeoutsH2) > 0 ? "bg-red-950 text-red-400 border border-red-800" : "bg-emerald-950 text-emerald-400"
                  }`}>
                    {(period === "1H" ? homeTeam.timeoutsH1 : homeTeam.timeoutsH2) > 0 ? "USED" : "AVAILABLE"}
                  </span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center text-center space-y-2 pl-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  <h3 className="font-bold text-xl sm:text-2xl text-white">{awayTeam.name}</h3>
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight font-mono">
                  {awayTeam.score}
                </div>

                {/* Accumulated Fouls Tracker */}
                <div className="w-full max-w-xs mt-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">Accumulated Fouls ({period})</span>
                    <span className={`font-bold ${awayFoulStatus.isDirectPenaltySecondSpot ? "text-red-400" : awayFoulStatus.isWarning ? "text-amber-400" : "text-slate-200"}`}>
                      {awayFoulsCurrent} / 5
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div
                        key={num}
                        className={`h-2.5 rounded-full transition ${
                          num <= awayFoulsCurrent
                            ? num >= 6
                              ? "bg-red-500 shadow-sm shadow-red-500/50"
                              : num === 5
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                            : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                  {awayFoulStatus.isDirectPenaltySecondSpot && (
                    <div className="mt-2 text-[11px] font-bold text-red-400 flex items-center justify-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" /> 10m Penalty Spot Active!
                    </div>
                  )}
                </div>

                {/* Timeout Indicator */}
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span>Timeout ({period}):</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    (period === "1H" ? awayTeam.timeoutsH1 : awayTeam.timeoutsH2) > 0 ? "bg-red-950 text-red-400 border border-red-800" : "bg-emerald-950 text-emerald-400"
                  }`}>
                    {(period === "1H" ? awayTeam.timeoutsH1 : awayTeam.timeoutsH2) > 0 ? "USED" : "AVAILABLE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Trigger Keypad (Tablet Touch Controls) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Home Quick Actions */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 flex flex-col gap-2.5">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{homeTeam.code} Actions</span>
                <span className="text-[10px] text-slate-500 font-normal">One-touch input</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedTeam("HOME");
                    setActiveModal("GOAL");
                  }}
                  className="py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" /> + GOAL
                </button>
                <button
                  onClick={() => handleAddFoul("HOME")}
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm border border-amber-900/50 transition flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-4 h-4" /> + FOUL
                </button>
                <button
                  onClick={() => {
                    setSelectedTeam("HOME");
                    setActiveModal("CARD");
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition"
                >
                  🟨 / 🟥 Card
                </button>
                <button
                  onClick={() => handleTimeout("HOME")}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs border border-cyan-900/40 transition flex items-center justify-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Timeout (1m)
                </button>
              </div>
            </div>

            {/* Away Quick Actions */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-blue-950/60 flex flex-col gap-2.5">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{awayTeam.code} Actions</span>
                <span className="text-[10px] text-slate-500 font-normal">One-touch input</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedTeam("AWAY");
                    setActiveModal("GOAL");
                  }}
                  className="py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" /> + GOAL
                </button>
                <button
                  onClick={() => handleAddFoul("AWAY")}
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm border border-amber-900/50 transition flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-4 h-4" /> + FOUL
                </button>
                <button
                  onClick={() => {
                    setSelectedTeam("AWAY");
                    setActiveModal("CARD");
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition"
                >
                  🟨 / 🟥 Card
                </button>
                <button
                  onClick={() => handleTimeout("AWAY")}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs border border-cyan-900/40 transition flex items-center justify-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Timeout (1m)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Live Incident Feed */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col h-full max-h-[700px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <h4 className="font-bold text-sm text-slate-200">Live Incident Log (BAP)</h4>
            <span className="text-xs text-slate-500">{logs.length} Events</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-start justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-emerald-400">{log.time}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                      {log.period}
                    </span>
                    <span
                      className={`font-semibold px-1.5 rounded text-[10px] ${
                        log.type === "GOAL"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : log.type.includes("RED")
                          ? "bg-red-950 text-red-300 border border-red-800"
                          : log.type.includes("YELLOW")
                          ? "bg-yellow-950 text-yellow-300 border border-yellow-800"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {log.type}
                    </span>
                  </div>
                  <p className="text-slate-300 pt-1">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Modal / Player Selector */}
      {activeModal === "GOAL" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              ⚽ Record Goal for {selectedTeam === "HOME" ? homeTeam.name : awayTeam.name}
            </h3>
            <p className="text-xs text-slate-400">Select the goalscorer from active lineup:</p>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {(selectedTeam === "HOME" ? homeTeam.players : awayTeam.players).map((player) => (
                <button
                  key={player.id}
                  onClick={() => handleAddGoal(selectedTeam, player.id)}
                  className="w-full p-3 rounded-xl bg-slate-950 hover:bg-emerald-950 hover:border-emerald-600 border border-slate-800 text-left flex items-center justify-between text-sm transition"
                >
                  <span className="font-semibold text-slate-200">
                    #{player.number} {player.name}
                  </span>
                  <span className="text-xs text-slate-500">{player.position}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleAddGoal(selectedTeam)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
              >
                Unknown / Team Goal
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {activeModal === "CARD" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">
              Issue Caution / Expulsion Card ({selectedTeam === "HOME" ? homeTeam.name : awayTeam.name})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {(selectedTeam === "HOME" ? homeTeam.players : awayTeam.players).map((player) => (
                <div
                  key={player.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-200">
                      #{player.number} {player.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Cards: {player.yellowCards} 🟨 {player.isRedCard ? "• 🟥 Expelled" : ""}
                    </div>
                  </div>
                  {!player.isRedCard ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAddCard(selectedTeam, player.id, "YELLOW")}
                        className="px-2.5 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold hover:bg-yellow-500/30"
                      >
                        🟨 Yellow
                      </button>
                      <button
                        onClick={() => handleAddCard(selectedTeam, player.id, "RED")}
                        className="px-2.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500/30"
                      >
                        🟥 Red
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-red-400 font-bold">Expelled</span>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

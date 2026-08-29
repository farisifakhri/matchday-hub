import { getMatchById, getTournamentData } from "@/lib/data/get-tournament-data";
import MatchCenterDetailClient from "@/components/match/MatchCenterDetailClient";
import { MatchDetailData, StandingItem } from "@/types/match";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function PublicLiveScoreboardPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;

  let matchData: MatchDetailData | null = null;
  let standings: StandingItem[] = [];

  // 1. If it's a real match ID, fetch from Prisma
  if (matchId && matchId !== "sample-match") {
    matchData = await getMatchById(matchId);
  }

  // 2. Fallback to first available live/recent match if sample-match or not found
  if (!matchData) {
    const defaultData = await getTournamentData("FOOTBALL");
    if (defaultData && defaultData.matches.length > 0) {
      matchData = await getMatchById(defaultData.matches[0].id);
      standings = defaultData.standings;
    }
  }

  // 3. Fallback mock if database isn't reachable
  if (!matchData) {
    matchData = {
      id: matchId || "sample-match",
      tournamentId: "t1",
      tournamentName: "Premier Football Championship 2026",
      sportType: "FOOTBALL",
      matchNumber: 1,
      stage: "Matchday 1",
      venue: "Stadion Utama Gelora Bung Karno",
      scheduledAt: new Date().toISOString(),
      status: "SECOND_HALF",
      clockFormatted: "68:15",
      period: "2H",
      homeTeam: {
        id: "team-1",
        name: "Arsenal FC Nusantara",
        code: "ARS",
        officialColor: "#dc2626",
        score: 2,
        foulsH1: 4,
        foulsH2: 3,
        timeoutsH1: 0,
        timeoutsH2: 0,
        starters: [
          { id: "p1", fullName: "David Raya", jerseyNumber: 1, position: "GK" },
          { id: "p2", fullName: "Ben White", jerseyNumber: 4, position: "RB" },
          { id: "p3", fullName: "William Saliba", jerseyNumber: 2, position: "CB" },
          { id: "p4", fullName: "Gabriel Magalhaes", jerseyNumber: 6, position: "CB" },
          { id: "p5", fullName: "Jurrien Timber", jerseyNumber: 12, position: "LB" },
          { id: "p6", fullName: "Thomas Partey", jerseyNumber: 5, position: "CDM" },
          { id: "p7", fullName: "Declan Rice", jerseyNumber: 41, position: "CM" },
          { id: "p8", fullName: "Martin Odegaard", jerseyNumber: 8, position: "CAM", isCaptain: true },
          { id: "p9", fullName: "Bukayo Saka", jerseyNumber: 7, position: "RW" },
          { id: "p10", fullName: "Kai Havertz", jerseyNumber: 29, position: "ST" },
          { id: "p11", fullName: "Gabriel Martinelli", jerseyNumber: 11, position: "LW" },
        ],
      },
      awayTeam: {
        id: "team-2",
        name: "Chelsea FC Indonesia",
        code: "CHE",
        officialColor: "#2563eb",
        score: 1,
        foulsH1: 5,
        foulsH2: 4,
        timeoutsH1: 0,
        timeoutsH2: 0,
        starters: [
          { id: "p12", fullName: "Robert Sanchez", jerseyNumber: 1, position: "GK" },
          { id: "p13", fullName: "Malo Gusto", jerseyNumber: 27, position: "RB" },
          { id: "p14", fullName: "Wesley Fofana", jerseyNumber: 29, position: "CB" },
          { id: "p15", fullName: "Levi Colwill", jerseyNumber: 6, position: "CB" },
          { id: "p16", fullName: "Marc Cucurella", jerseyNumber: 3, position: "LB" },
          { id: "p17", fullName: "Moises Caicedo", jerseyNumber: 25, position: "CDM" },
          { id: "p18", fullName: "Enzo Fernandez", jerseyNumber: 8, position: "CM", isCaptain: true },
          { id: "p19", fullName: "Cole Palmer", jerseyNumber: 20, position: "CAM" },
          { id: "p20", fullName: "Noni Madueke", jerseyNumber: 11, position: "RW" },
          { id: "p21", fullName: "Nicolas Jackson", jerseyNumber: 15, position: "ST" },
          { id: "p22", fullName: "Pedro Neto", jerseyNumber: 7, position: "LW" },
        ],
      },
      events: [
        { id: "e1", minute: 14, second: 20, period: "1H", type: "GOAL", notes: "Bukayo Saka curling finish", player: { id: "p9", fullName: "Bukayo Saka", jerseyNumber: 7, position: "RW" } },
        { id: "e2", minute: 38, second: 45, period: "1H", type: "YELLOW_CARD", notes: "Tackle on midfield", player: { id: "p17", fullName: "Moises Caicedo", jerseyNumber: 25, position: "CDM" } },
        { id: "e3", minute: 44, second: 10, period: "1H", type: "PENALTY_GOAL", notes: "Cole Palmer penalty", player: { id: "p19", fullName: "Cole Palmer", jerseyNumber: 20, position: "CAM" } },
        { id: "e4", minute: 61, second: 18, period: "2H", type: "GOAL", notes: "Kai Havertz header", player: { id: "p10", fullName: "Kai Havertz", jerseyNumber: 29, position: "ST" } },
      ],
      officials: [
        { name: "Agus Hendrawan, S.Pd", role: "Wasit Utama", license: "Level 1 Nasional (FIFA/PSSI)" },
        { name: "Deni Hermawan", role: "Asisten Wasit 1", license: "Level 2 Daerah" },
        { name: "Rian Prasetyo", role: "Cadangan Wasit", license: "Level 3 Daerah" },
      ],
    };
  }

  return <MatchCenterDetailClient match={matchData} standings={standings} />;
}

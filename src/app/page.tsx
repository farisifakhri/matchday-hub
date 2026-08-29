import { getTournamentData } from "@/lib/data/get-tournament-data";
import MatchHubDashboard from "@/components/home/MatchHubDashboard";
import { StandingItem } from "@/types/match";

export const revalidate = 0; // Fresh match data

export default async function HomePage() {
  const footballData = await getTournamentData("FOOTBALL");
  const futsalData = await getTournamentData("FUTSAL");

  // Format Football Matches
  const footballMatches = (footballData?.matches || []).map((m) => ({
    id: m.id,
    sportType: "FOOTBALL" as const,
    matchNumber: m.matchNumber,
    stage: m.stage,
    venue: m.venue,
    status: m.status,
    scheduledAt: m.scheduledAt.toISOString(),
    homeTeam: {
      name: m.homeTeam.name,
      code: m.homeTeam.code,
      score: m.homeScore,
      color: m.homeTeam.officialColor,
      fouls: m.homeFoulsH1 + m.homeFoulsH2,
    },
    awayTeam: {
      name: m.awayTeam.name,
      code: m.awayTeam.code,
      score: m.awayScore,
      color: m.awayTeam.officialColor,
      fouls: m.awayFoulsH1 + m.awayFoulsH2,
    },
  }));

  // Format Futsal Matches
  const futsalMatches = (futsalData?.matches || []).map((m) => ({
    id: m.id,
    sportType: "FUTSAL" as const,
    matchNumber: m.matchNumber,
    stage: m.stage,
    venue: m.venue,
    status: m.status,
    scheduledAt: m.scheduledAt.toISOString(),
    homeTeam: {
      name: m.homeTeam.name,
      code: m.homeTeam.code,
      score: m.homeScore,
      color: m.homeTeam.officialColor,
      fouls: m.homeFoulsH1,
    },
    awayTeam: {
      name: m.awayTeam.name,
      code: m.awayTeam.code,
      score: m.awayScore,
      color: m.awayTeam.officialColor,
      fouls: m.awayFoulsH1,
    },
  }));

  const fallbackStandings: StandingItem[] = [
    { rank: 1, teamId: "t1", teamName: "Arsenal FC Nusantara", teamCode: "ARS", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, points: 3, form: ["W"], officialColor: "#dc2626" },
    { rank: 2, teamId: "t2", teamName: "Chelsea FC Indonesia", teamCode: "CHE", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, points: 0, form: ["L"], officialColor: "#2563eb" },
    { rank: 3, teamId: "t3", teamName: "Liverpool Merah FC", teamCode: "LIV", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [], officialColor: "#b91c1c" },
    { rank: 4, teamId: "t4", teamName: "Manchester Biru FC", teamCode: "MCI", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [], officialColor: "#0ea5e9" },
  ];

  return (
    <MatchHubDashboard
      initialFootballMatches={footballMatches}
      initialFootballStandings={footballData?.standings || fallbackStandings}
      initialFutsalMatches={futsalMatches}
      initialFutsalStandings={futsalData?.standings || fallbackStandings}
    />
  );
}

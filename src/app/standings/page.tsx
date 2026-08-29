import React from "react";
import { getTournamentData } from "@/lib/data/get-tournament-data";
import StandingsPageClient from "@/components/standings/StandingsPageClient";
import { StandingItem } from "@/types/match";

export const revalidate = 0;

export default async function StandingsPage() {
  const footballData = await getTournamentData("FOOTBALL");
  const futsalData = await getTournamentData("FUTSAL");

  const fallbackFootballStandings: StandingItem[] = [
    { rank: 1, teamId: "t1", teamName: "Arsenal FC Nusantara", teamCode: "ARS", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, points: 3, form: ["W"], officialColor: "#dc2626" },
    { rank: 2, teamId: "t2", teamName: "Chelsea FC Indonesia", teamCode: "CHE", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, points: 0, form: ["L"], officialColor: "#2563eb" },
    { rank: 3, teamId: "t3", teamName: "Liverpool Merah FC", teamCode: "LIV", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [], officialColor: "#b91c1c" },
    { rank: 4, teamId: "t4", teamName: "Manchester Biru FC", teamCode: "MCI", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [], officialColor: "#0ea5e9" },
  ];

  const fallbackFutsalStandings: StandingItem[] = [
    { rank: 1, teamId: "f1", teamName: "Bintang Timur Futsal", teamCode: "BTF", played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 2, gd: 2, points: 3, form: ["W"], officialColor: "#16a34a" },
    { rank: 2, teamId: "f2", teamName: "Garuda Muda FC", teamCode: "GDA", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, gd: 1, points: 3, form: ["W"], officialColor: "#dc2626" },
    { rank: 3, teamId: "f3", teamName: "Rajawali Futsal Club", teamCode: "RJW", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, gd: -1, points: 0, form: ["L"], officialColor: "#2563eb" },
    { rank: 4, teamId: "f4", teamName: "Cosmo JNE Futsal", teamCode: "CSM", played: 1, won: 0, drawn: 0, lost: 1, gf: 2, ga: 4, gd: -2, points: 0, form: ["L"], officialColor: "#f59e0b" },
  ];

  return (
    <StandingsPageClient
      footballStandings={footballData?.standings || fallbackFootballStandings}
      futsalStandings={futsalData?.standings || fallbackFutsalStandings}
    />
  );
}

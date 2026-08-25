import { EventType, MatchPeriod } from "@/types/match";

export interface FoulLimitStatus {
  count: number;
  isWarning: boolean; // 5th foul
  isDirectPenaltySecondSpot: boolean; // 6th foul and onwards (10m penalty spot in Futsal)
}

export function evaluateFoulRules(currentFouls: number): FoulLimitStatus {
  return {
    count: currentFouls,
    isWarning: currentFouls === 5,
    isDirectPenaltySecondSpot: currentFouls >= 6,
  };
}

export function shouldConvertSecondYellow(
  existingYellowCardsForPlayer: number,
  newEventType: EventType
): EventType {
  if (newEventType === "YELLOW_CARD" && existingYellowCardsForPlayer >= 1) {
    return "SECOND_YELLOW_CARD";
  }
  return newEventType;
}

export function isMatchActive(status: string): boolean {
  return ["FIRST_HALF", "SECOND_HALF", "EXTRA_TIME", "PENALTIES"].includes(status);
}

export function getFoulCountForPeriod(
  period: MatchPeriod,
  homeFoulsH1: number,
  homeFoulsH2: number,
  awayFoulsH1: number,
  awayFoulsH2: number,
  isHome: boolean
): number {
  if (isHome) {
    return period === "1H" ? homeFoulsH1 : homeFoulsH2;
  }
  return period === "1H" ? awayFoulsH1 : awayFoulsH2;
}

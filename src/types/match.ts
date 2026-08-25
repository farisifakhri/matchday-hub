export type MatchStatus =
  | "SCHEDULED"
  | "WARMUP"
  | "FIRST_HALF"
  | "HALF_TIME"
  | "SECOND_HALF"
  | "EXTRA_TIME"
  | "PENALTIES"
  | "COMPLETED"
  | "POSTPONED"
  | "ABANDONED";

export type EventType =
  | "GOAL"
  | "OWN_GOAL"
  | "PENALTY_GOAL"
  | "PENALTY_MISSED"
  | "YELLOW_CARD"
  | "SECOND_YELLOW_CARD"
  | "RED_CARD"
  | "FOUL"
  | "ACCUMULATED_FOUL"
  | "TIMEOUT"
  | "SUBSTITUTION"
  | "PERIOD_START"
  | "PERIOD_END";

export type MatchPeriod = "1H" | "2H" | "ET1" | "ET2" | "PK";

export interface MatchScoreState {
  homeScore: number;
  awayScore: number;
  homeFoulsH1: number;
  awayFoulsH1: number;
  homeFoulsH2: number;
  awayFoulsH2: number;
  homeTimeoutsH1: number;
  awayTimeoutsH1: number;
  homeTimeoutsH2: number;
  awayTimeoutsH2: number;
}

export interface PlayerBasic {
  id: string;
  fullName: string;
  jerseyNumber: number;
  position: string;
  isCaptain?: boolean;
}

export interface TeamBasic {
  id: string;
  name: string;
  code: string;
  logoUrl?: string | null;
  officialColor?: string | null;
  players?: PlayerBasic[];
}

export interface MatchEventItem {
  id: string;
  minute: number;
  second: number;
  period: MatchPeriod;
  type: EventType;
  teamId?: string | null;
  playerId?: string | null;
  player?: PlayerBasic | null;
  notes?: string | null;
  createdAt: string | Date;
}

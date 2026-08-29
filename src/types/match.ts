export type SportType = "FOOTBALL" | "FUTSAL";

export type PortalType = 
  | "PUBLIC" 
  | "CLUB" 
  | "ORGANIZER" 
  | "OPERATOR" 
  | "OFFICIALS";

export type UserRole =
  | "SUPER_ADMIN"
  | "HELPER_ADMIN"
  | "HELPER_SPORT"
  | "HELPER_EVENT"
  | "MATCH_COMMISSIONER"
  | "ANALYST_TEAM"
  | "REFEREE_ASSESSOR"
  | "REFEREE"
  | "ADMIN_CLUB"
  | "PLAYER"
  | "MEDIA"
  | "USER";

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
  photoUrl?: string | null;
  documentUrl?: string | null;
  screeningStatus?: "PENDING" | "VERIFIED" | "REJECTED";
  qrCodeToken?: string;
  isSuspended?: boolean;
  rating?: number;
  isMOTM?: boolean;
}

export interface TeamBasic {
  id: string;
  name: string;
  code: string;
  logoUrl?: string | null;
  officialColor?: string | null;
  paymentStatus?: "PENDING" | "PAID" | "REFUNDED";
  players?: PlayerBasic[];
}

export interface MatchEventItem {
  id: string;
  minute: number;
  second: number;
  period: MatchPeriod | string;
  type: EventType;
  teamId?: string | null;
  playerId?: string | null;
  player?: PlayerBasic | null;
  notes?: string | null;
  createdAt?: string | Date;
}

export interface StandingItem {
  rank: number;
  teamId: string;
  teamName: string;
  teamCode: string;
  logoUrl?: string | null;
  officialColor?: string | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export interface MatchOfficialItem {
  name: string;
  role: string;
  license: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  logoUrl?: string | null;
  tier: "TITLE" | "MAIN" | "OFFICIAL" | "MEDIA" | string;
  websiteUrl?: string | null;
}

export interface MatchDetailData {
  id: string;
  tournamentId: string;
  tournamentName: string;
  sportType: SportType;
  matchNumber: number;
  stage: string;
  venue: string;
  scheduledAt: string;
  status: MatchStatus;
  clockFormatted: string;
  period: string;
  commissionerSign?: string | null;
  motmPlayerId?: string | null;
  sponsors?: SponsorItem[];
  homeTeam: TeamBasic & {
    score: number;
    foulsH1: number;
    foulsH2: number;
    timeoutsH1: number;
    timeoutsH2: number;
    starters: PlayerBasic[];
    bench?: PlayerBasic[];
  };
  awayTeam: TeamBasic & {
    score: number;
    foulsH1: number;
    foulsH2: number;
    timeoutsH1: number;
    timeoutsH2: number;
    starters: PlayerBasic[];
    bench?: PlayerBasic[];
  };
  events: MatchEventItem[];
  officials: MatchOfficialItem[];
}

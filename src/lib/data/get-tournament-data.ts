import { prisma } from "@/lib/prisma";
import { SportType, UserRole, PortalType, StandingItem, MatchDetailData, PlayerBasic } from "@/types/match";

export interface PortalConfig {
  id: PortalType;
  title: string;
  badge: string;
  description: string;
  path: string;
  icon: string;
  primaryRoles: UserRole[];
}

export const PORTALS_CONFIG: Record<PortalType, PortalConfig> = {
  PUBLIC: {
    id: "PUBLIC",
    title: "1. Public Fan & Match Center",
    badge: "FotMob Style Live UI",
    description: "Pusat jadwal pertandingan, live scoreboard, linimasa menit-ke-menit, formasi 2D, dan klasemen liga.",
    path: "/",
    icon: "Globe",
    primaryRoles: ["USER", "MEDIA"],
  },
  CLUB: {
    id: "CLUB",
    title: "2. Club & Squad Management",
    badge: "Manager & Athlete",
    description: "Pengelolaan squad tim, upload dokumen KTP/NISN, Digital Player Pass ber-QR Code, dan submit DSP pra-laga.",
    path: "/club",
    icon: "Shield",
    primaryRoles: ["ADMIN_CLUB", "PLAYER"],
  },
  ORGANIZER: {
    id: "ORGANIZER",
    title: "3. Tournament Organizer & EO",
    badge: "Event Admin",
    description: "Master turnamen (Futsal/Bola), generator bagan grup, screening berkas pemain, sponsor, dan 1-click poster medsos.",
    path: "/admin/dashboard",
    icon: "Trophy",
    primaryRoles: ["SUPER_ADMIN", "HELPER_ADMIN", "HELPER_SPORT", "HELPER_EVENT"],
  },
  OPERATOR: {
    id: "OPERATOR",
    title: "4. Operator Meja & Live Scoring",
    badge: "Referee Table Console",
    description: "Tablet E-Scoreboard layar sentuh: Timer, keypad cepat gol/kartu, 5-foul counter futsal, dan OBS stream overlay.",
    path: "/operator/match/sample-match/live",
    icon: "PlayCircle",
    primaryRoles: ["REFEREE", "MATCH_COMMISSIONER", "SUPER_ADMIN"],
  },
  OFFICIALS: {
    id: "OFFICIALS",
    title: "5. Match Commissioner & Officials",
    badge: "Pengawas & Assessor",
    description: "Scan QR screening atlet di lapangan, otorisasi kick-off, tanda tangan digital BAP, dan lembar evaluasi wasit.",
    path: "/officials",
    icon: "FileCheck",
    primaryRoles: ["MATCH_COMMISSIONER", "REFEREE_ASSESSOR", "SUPER_ADMIN"],
  },
};

export interface RoleConfig {
  role: UserRole;
  label: string;
  category: "Admin" | "Official" | "Club" | "Public";
  badgeColor: string;
  description: string;
  allowedActions: string[];
  defaultPortal: PortalType;
}

export const USER_ROLES_CONFIG: Record<UserRole, RoleConfig> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Super Admin",
    category: "Admin",
    badgeColor: "bg-red-950 text-red-400 border-red-800",
    description: "Kontrol sistem penuh, master data turnamen, kelola akses user & audit sistem.",
    allowedActions: ["Kelola Turnamen", "Manajemen User", "Audit Log", "Reset Database"],
    defaultPortal: "ORGANIZER",
  },
  HELPER_ADMIN: {
    role: "HELPER_ADMIN",
    label: "Helper Admin",
    category: "Admin",
    badgeColor: "bg-orange-950 text-orange-400 border-orange-800",
    description: "Operasional admin kompetisi, verifikasi berkas klub & screening KTP/NISN pemain.",
    allowedActions: ["Verifikasi Dokumen", "Kelola Tim", "Validasi Pemain"],
    defaultPortal: "ORGANIZER",
  },
  HELPER_SPORT: {
    role: "HELPER_SPORT",
    label: "Helper Sport",
    category: "Admin",
    badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
    description: "Pengelolaan teknis lapangan, inspeksi bola/gawang, perlengkapan match.",
    allowedActions: ["Inspeksi Lapangan", "Logistik Bola & Rompi", "Checklist Teknis"],
    defaultPortal: "ORGANIZER",
  },
  HELPER_EVENT: {
    role: "HELPER_EVENT",
    label: "Helper Event",
    category: "Admin",
    badgeColor: "bg-yellow-950 text-yellow-400 border-yellow-800",
    description: "Operasional venue, alur penonton, seremonial kick-off & penghargaan piala.",
    allowedActions: ["Protokol Acara", "Manajemen Venue", "Akses VIP & Panggung"],
    defaultPortal: "ORGANIZER",
  },
  MATCH_COMMISSIONER: {
    role: "MATCH_COMMISSIONER",
    label: "Match Commissioner",
    category: "Official",
    badgeColor: "bg-purple-950 text-purple-400 border-purple-800",
    description: "Otoritas tertinggi pengawas laga, scan QR screening DSP & tanda tangan digital BAP.",
    allowedActions: ["Verifikasi DSP Resmi", "Scan QR Atlet", "Pengesahan BAP (Digital Sign)"],
    defaultPortal: "OFFICIALS",
  },
  ANALYST_TEAM: {
    role: "ANALYST_TEAM",
    label: "Analyst Team",
    category: "Official",
    badgeColor: "bg-indigo-950 text-indigo-400 border-indigo-800",
    description: "Akses data metrik laga mendalam, evaluasi formasi taktis, xG, dan perbandingan performa.",
    allowedActions: ["Download Data Mentah", "Lihat Perbandingan Taktis", "Export Statistik"],
    defaultPortal: "PUBLIC",
  },
  REFEREE_ASSESSOR: {
    role: "REFEREE_ASSESSOR",
    label: "Referee Assessor",
    category: "Official",
    badgeColor: "bg-pink-950 text-pink-400 border-pink-800",
    description: "Penilai kinerja wasit utama & asisten wasit di lapangan, pengisian skor evaluasi perangkat laga.",
    allowedActions: ["Input Nilai Kinerja Wasit", "Review Insiden Kartu", "Laporan Komite Wasit"],
    defaultPortal: "OFFICIALS",
  },
  REFEREE: {
    role: "REFEREE",
    label: "Referee (Wasit)",
    category: "Official",
    badgeColor: "bg-cyan-950 text-cyan-400 border-cyan-800",
    description: "Pencatatan pelanggaran, gol, kartu kuning/merah, dan pengoperasian tablet konsol meja.",
    allowedActions: ["Catat Gol & Kartu", "Akses Tablet Konsol Meja", "Lapor Pelanggaran"],
    defaultPortal: "OPERATOR",
  },
  ADMIN_CLUB: {
    role: "ADMIN_CLUB",
    label: "Admin Club",
    category: "Club",
    badgeColor: "bg-emerald-950 text-emerald-400 border-emerald-800",
    description: "Manajer tim, input daftar pemain (roster), nomor punggung, tunjuk kapten & submit susunan pemain.",
    allowedActions: ["Submit Lineup Laga", "Atur Nomor Punggung", "Ganti Kapten Tim"],
    defaultPortal: "CLUB",
  },
  PLAYER: {
    role: "PLAYER",
    label: "Player (Pemain)",
    category: "Club",
    badgeColor: "bg-teal-950 text-teal-400 border-teal-800",
    description: "Profil atlet resmi, Digital Player Pass QR, statistik menit bermain, catatan gol dan kartu.",
    allowedActions: ["Lihat Digital Pass", "Cek Jadwal Laga Tim", "Riwayat Performa"],
    defaultPortal: "CLUB",
  },
  MEDIA: {
    role: "MEDIA",
    label: "Media & Press",
    category: "Public",
    badgeColor: "bg-blue-950 text-blue-400 border-blue-800",
    description: "Jurnalis & peliput: akses instan ke Berita Acara Pertandingan (BAP PDF), press release, dan kutipan laga.",
    allowedActions: ["Unduh BAP Resmi (PDF)", "Copy Press Summary", "Akses Statistik Publik"],
    defaultPortal: "PUBLIC",
  },
  USER: {
    role: "USER",
    label: "Public User",
    category: "Public",
    badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    description: "Penonton dan pecinta olahraga: pantau live scores FotMob, linimasa laga, formasi 2D, dan klasemen.",
    allowedActions: ["Pantau Live Scoreboard", "Lihat Linimasa & Lineup", "Cek Klasemen"],
    defaultPortal: "PUBLIC",
  },
};

export async function getTournamentData(sportType: SportType = "FOOTBALL") {
  try {
    const tournament = await prisma.tournament.findFirst({
      where: { sportType },
      include: {
        sponsors: true,
        teams: {
          include: {
            players: true,
          },
        },
        matches: {
          include: {
            homeTeam: { include: { players: true } },
            awayTeam: { include: { players: true } },
            events: {
              include: { player: true },
              orderBy: { minute: "desc" },
            },
            officials: {
              include: {
                official: {
                  include: { user: true },
                },
              },
            },
          },
          orderBy: { matchNumber: "asc" },
        },
      },
    });

    if (tournament) {
      const standingsMap = new Map<string, StandingItem>();

      tournament.teams.forEach((t) => {
        standingsMap.set(t.id, {
          rank: 1,
          teamId: t.id,
          teamName: t.name,
          teamCode: t.code,
          logoUrl: t.logoUrl,
          officialColor: t.officialColor,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          gf: 0,
          ga: 0,
          gd: 0,
          points: 0,
          form: [],
        });
      });

      tournament.matches.forEach((m) => {
        if (m.status === "COMPLETED" || m.status === "SECOND_HALF" || m.status === "FIRST_HALF") {
          const home = standingsMap.get(m.homeTeamId);
          const away = standingsMap.get(m.awayTeamId);

          if (home && away) {
            home.played += 1;
            away.played += 1;
            home.gf += m.homeScore;
            home.ga += m.awayScore;
            away.gf += m.awayScore;
            away.ga += m.homeScore;

            if (m.homeScore > m.awayScore) {
              home.won += 1;
              home.points += 3;
              away.lost += 1;
              home.form.push("W");
              away.form.push("L");
            } else if (m.homeScore < m.awayScore) {
              away.won += 1;
              away.points += 3;
              home.lost += 1;
              home.form.push("L");
              away.form.push("W");
            } else {
              home.drawn += 1;
              away.drawn += 1;
              home.points += 1;
              away.points += 1;
              home.form.push("D");
              away.form.push("D");
            }

            home.gd = home.gf - home.ga;
            away.gd = away.gf - away.ga;
          }
        }
      });

      const sortedStandings = Array.from(standingsMap.values())
        .sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          if (b.gd !== a.gd) return b.gd - a.gd;
          return b.gf - a.gf;
        })
        .map((item, index) => ({
          ...item,
          rank: index + 1,
          form: item.form.slice(-5) as ("W" | "D" | "L")[],
        }));

      return {
        tournament,
        matches: tournament.matches,
        teams: tournament.teams,
        standings: sortedStandings,
      };
    }
  } catch (error) {
    console.error("Database fetch error, using safe fallback:", error);
  }

  // Safe Fallback Data if DB is empty / starting up
  const isFutsal = sportType === "FUTSAL";
  const fallbackTeams: any[] = isFutsal
    ? [
        { id: "fts-1", name: "Garuda Muda FC", code: "GDA", officialColor: "#dc2626", players: [] },
        { id: "fts-2", name: "Rajawali Futsal Club", code: "RJW", officialColor: "#2563eb", players: [] },
        { id: "fts-3", name: "Bintang Timur Futsal", code: "BTF", officialColor: "#16a34a", players: [] },
        { id: "fts-4", name: "Cosmo JNE Futsal", code: "CSM", officialColor: "#f59e0b", players: [] },
      ]
    : [
        { id: "fb-1", name: "Arsenal FC Nusantara", code: "ARS", officialColor: "#dc2626", players: [] },
        { id: "fb-2", name: "Chelsea FC Indonesia", code: "CHE", officialColor: "#2563eb", players: [] },
        { id: "fb-3", name: "Liverpool Merah FC", code: "LIV", officialColor: "#b91c1c", players: [] },
        { id: "fb-4", name: "Manchester Biru FC", code: "MCI", officialColor: "#0ea5e9", players: [] },
      ];

  const fallbackStandings: StandingItem[] = fallbackTeams.map((t, idx) => ({
    rank: idx + 1,
    teamId: t.id,
    teamName: t.name,
    teamCode: t.code,
    officialColor: t.officialColor,
    played: idx === 0 ? 1 : 0,
    won: idx === 0 ? 1 : 0,
    drawn: 0,
    lost: 0,
    gf: idx === 0 ? 2 : 0,
    ga: idx === 0 ? 1 : 0,
    gd: idx === 0 ? 1 : 0,
    points: idx === 0 ? 3 : 0,
    form: idx === 0 ? ["W"] : [],
  }));

  return {
    tournament: {
      id: isFutsal ? "fts-tourn" : "fb-tourn",
      name: isFutsal ? "Super League Championship Futsal 2026" : "Premier Football Championship 2026",
      slug: isFutsal ? "super-league-futsal-2026" : "premier-football-championship-2026",
      season: "2025/2026",
      category: isFutsal ? "Men Open" : "Men Open Pro",
      sportType,
      registrationFee: 1500000,
      startDate: new Date(),
      endDate: new Date(),
    } as any,
    matches: [
      {
        id: "sample-match",
        tournamentId: isFutsal ? "fts-tourn" : "fb-tourn",
        matchNumber: 1,
        stage: "Matchday 1",
        venue: isFutsal ? "GOR Sumantri Brodjonegoro" : "Stadion Utama Gelora Bung Karno",
        scheduledAt: new Date(),
        status: "FIRST_HALF" as any,
        homeTeam: fallbackTeams[0],
        awayTeam: fallbackTeams[1],
        homeScore: 2,
        awayScore: 1,
        homeFoulsH1: 3,
        awayFoulsH1: 2,
        homeFoulsH2: 0,
        awayFoulsH2: 0,
        events: [],
        officials: [],
      } as any,
    ],
    teams: fallbackTeams,
    standings: fallbackStandings,
  };
}

export async function getMatchById(matchId: string): Promise<MatchDetailData | null> {
  try {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        tournament: {
          include: { sponsors: true },
        },
        homeTeam: { include: { players: true } },
        awayTeam: { include: { players: true } },
        events: {
          include: { player: true },
          orderBy: { minute: "desc" },
        },
        officials: {
          include: {
            official: {
              include: { user: true },
            },
          },
        },
      },
    });

    if (match) {
      const sportType: SportType = (match.tournament.sportType as SportType) || "FOOTBALL";
      const isFutsal = sportType === "FUTSAL";
      const startersCount = isFutsal ? 5 : 11;

      const formattedData: MatchDetailData = {
        id: match.id,
        tournamentId: match.tournamentId,
        tournamentName: match.tournament.name,
        sportType,
        matchNumber: match.matchNumber,
        stage: match.stage,
        venue: match.venue,
        scheduledAt: match.scheduledAt.toISOString(),
        status: match.status,
        clockFormatted: match.status === "FIRST_HALF" ? "18:42" : match.status === "SECOND_HALF" ? "68:15" : "FT",
        period: match.status === "FIRST_HALF" ? "1H" : match.status === "SECOND_HALF" ? "2H" : "FT",
        commissionerSign: match.commissionerSign,
        motmPlayerId: match.motmPlayerId,
        sponsors: match.tournament.sponsors.map(s => ({
          id: s.id,
          name: s.name,
          logoUrl: s.logoUrl,
          tier: s.tier,
          websiteUrl: s.websiteUrl,
        })),
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          code: match.homeTeam.code,
          logoUrl: match.homeTeam.logoUrl,
          officialColor: match.homeTeam.officialColor || "#dc2626",
          score: match.homeScore,
          foulsH1: match.homeFoulsH1,
          foulsH2: match.homeFoulsH2,
          timeoutsH1: match.homeTimeoutsH1,
          timeoutsH2: match.homeTimeoutsH2,
          starters: match.homeTeam.players.slice(0, startersCount).map(p => ({
            id: p.id,
            fullName: p.fullName,
            jerseyNumber: p.jerseyNumber,
            position: p.position,
            isCaptain: p.isCaptain,
            photoUrl: p.photoUrl,
            documentUrl: p.documentUrl,
            screeningStatus: p.screeningStatus as any,
            qrCodeToken: p.qrCodeToken || `TOKEN-${p.id}`,
            isSuspended: p.isSuspended,
            rating: p.jerseyNumber === 7 ? 8.9 : p.jerseyNumber === 29 ? 7.6 : 6.8,
            isMOTM: p.jerseyNumber === 7,
          })),
          bench: match.homeTeam.players.slice(startersCount).map(p => ({
            id: p.id,
            fullName: p.fullName,
            jerseyNumber: p.jerseyNumber,
            position: p.position,
            isCaptain: p.isCaptain,
            photoUrl: p.photoUrl,
            documentUrl: p.documentUrl,
            screeningStatus: p.screeningStatus as any,
            qrCodeToken: p.qrCodeToken || `TOKEN-${p.id}`,
            isSuspended: p.isSuspended,
            rating: 6.0,
          })),
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          code: match.awayTeam.code,
          logoUrl: match.awayTeam.logoUrl,
          officialColor: match.awayTeam.officialColor || "#2563eb",
          score: match.awayScore,
          foulsH1: match.awayFoulsH1,
          foulsH2: match.awayFoulsH2,
          timeoutsH1: match.awayTimeoutsH1,
          timeoutsH2: match.awayTimeoutsH2,
          starters: match.awayTeam.players.slice(0, startersCount).map(p => ({
            id: p.id,
            fullName: p.fullName,
            jerseyNumber: p.jerseyNumber,
            position: p.position,
            isCaptain: p.isCaptain,
            photoUrl: p.photoUrl,
            documentUrl: p.documentUrl,
            screeningStatus: p.screeningStatus as any,
            qrCodeToken: p.qrCodeToken || `TOKEN-${p.id}`,
            isSuspended: p.isSuspended,
            rating: p.jerseyNumber === 20 ? 8.1 : 6.4,
          })),
          bench: match.awayTeam.players.slice(startersCount).map(p => ({
            id: p.id,
            fullName: p.fullName,
            jerseyNumber: p.jerseyNumber,
            position: p.position,
            isCaptain: p.isCaptain,
            photoUrl: p.photoUrl,
            documentUrl: p.documentUrl,
            screeningStatus: p.screeningStatus as any,
            qrCodeToken: p.qrCodeToken || `TOKEN-${p.id}`,
            isSuspended: p.isSuspended,
            rating: 6.0,
          })),
        },
        events: match.events.map((e) => ({
          id: e.id,
          minute: e.minute,
          second: e.second,
          period: e.period,
          type: e.type,
          teamId: e.teamId,
          playerId: e.playerId,
          player: e.player ? {
            id: e.player.id,
            fullName: e.player.fullName,
            jerseyNumber: e.player.jerseyNumber,
            position: e.player.position,
            isCaptain: e.player.isCaptain,
            rating: 7.5,
          } : null,
          notes: e.notes,
          createdAt: e.createdAt,
        })),
        officials: match.officials.map((off) => ({
          name: off.official.user.fullName,
          role: off.role.replace("_", " "),
          license: off.official.licenseLevel,
        })),
      };

      return formattedData;
    }
  } catch (error) {
    console.error("Match detail fetch error:", error);
  }

  // Safe fallback mock match
  return {
    id: "sample-match",
    tournamentId: "fts-tourn",
    tournamentName: "Super League Championship Futsal 2026",
    sportType: "FUTSAL" as SportType,
    matchNumber: 1,
    stage: "Matchday 1",
    venue: "GOR Sumantri Brodjonegoro (Court 1)",
    scheduledAt: new Date().toISOString(),
    status: "FIRST_HALF" as any,
    clockFormatted: "15:28",
    period: "1H",
    sponsors: [],
    homeTeam: {
      id: "team-1",
      name: "Garuda Muda FC",
      code: "GDA",
      officialColor: "#dc2626",
      score: 2,
      foulsH1: 3,
      foulsH2: 0,
      timeoutsH1: 0,
      timeoutsH2: 0,
      starters: [
        { id: "p1", fullName: "Muhammad Ridwan", jerseyNumber: 1, position: "GK", isCaptain: false, rating: 7.2 },
        { id: "p2", fullName: "Bambang Kurnia", jerseyNumber: 4, position: "Anchor", isCaptain: true, rating: 7.8 },
        { id: "p3", fullName: "Fajar Pratama", jerseyNumber: 7, position: "Flank", isCaptain: false, rating: 8.9, isMOTM: true },
        { id: "p4", fullName: "Syahrul Ramadhan", jerseyNumber: 10, position: "Pivot", isCaptain: false, rating: 7.6 },
        { id: "p5", fullName: "Andi Saputra", jerseyNumber: 11, position: "Flank", isCaptain: false, rating: 7.0 },
      ],
      bench: [],
    },
    awayTeam: {
      id: "team-2",
      name: "Rajawali Futsal Club",
      code: "RJW",
      officialColor: "#2563eb",
      score: 1,
      foulsH1: 2,
      foulsH2: 0,
      timeoutsH1: 0,
      timeoutsH2: 0,
      starters: [
        { id: "p6", fullName: "Dimas Wicaksono", jerseyNumber: 12, position: "GK", isCaptain: false, rating: 6.8 },
        { id: "p7", fullName: "Eko Prasetyo", jerseyNumber: 5, position: "Anchor", isCaptain: false, rating: 6.5 },
        { id: "p8", fullName: "Rizky Firmansyah", jerseyNumber: 8, position: "Flank", isCaptain: true, rating: 7.1 },
        { id: "p9", fullName: "Hadi Gunawan", jerseyNumber: 9, position: "Pivot", isCaptain: false, rating: 7.4 },
        { id: "p10", fullName: "Kevin Alamsyah", jerseyNumber: 14, position: "Flank", isCaptain: false, rating: 6.6 },
      ],
      bench: [],
    },
    events: [
      { id: "e1", minute: 4, second: 32, period: "1H", type: "GOAL", teamId: "team-1", notes: "Tendangan keras mendatar Fajar Pratama" },
      { id: "e2", minute: 9, second: 15, period: "1H", type: "GOAL", teamId: "team-2", notes: "Gol rebound Hadi Gunawan" },
      { id: "e3", minute: 14, second: 20, period: "1H", type: "GOAL", teamId: "team-1", notes: "Finishing apik Syahrul Ramadhan" },
    ],
    officials: [
      { name: "Agus Hendrawan, S.Pd", role: "1st Referee", license: "Level 1 Nasional (PSSI)" },
      { name: "Deni Hermawan", role: "2nd Referee", license: "Level 2 Daerah (AFP JBR)" },
      { name: "Rian Prasetyo", role: "Timekeeper", license: "Level 3 Daerah (AFP DKI)" },
    ],
  };
}

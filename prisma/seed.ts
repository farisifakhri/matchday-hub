import { PrismaClient, Role, SportType, MatchStatus, RefereeRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding MatchDay Hub Database (Dual-Sport & 12 Roles)...");

  // Clean existing data
  await prisma.matchEvent.deleteMany();
  await prisma.matchOfficial.deleteMany();
  await prisma.matchLineup.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.refereeProfile.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users for all 12 Roles
  const usersToCreate = [
    { email: "superadmin@matchday.hub", name: "Bambang Pamungkas (Super Admin)", role: Role.SUPER_ADMIN },
    { email: "helperadmin@matchday.hub", name: "Siti Rahmawati (Helper Admin)", role: Role.HELPER_ADMIN },
    { email: "helpersport@matchday.hub", name: "Doni Prasetyo (Helper Sport)", role: Role.HELPER_SPORT },
    { email: "helperevent@matchday.hub", name: "Maya Anggraini (Helper Event)", role: Role.HELPER_EVENT },
    { email: "matchcomm@matchday.hub", name: "Drs. H. Mulyadi (Match Commissioner)", role: Role.MATCH_COMMISSIONER },
    { email: "analyst@matchday.hub", name: "Kevin Sanjaya (Team Analyst)", role: Role.ANALYST_TEAM },
    { email: "refassessor@matchday.hub", name: "Ir. Joko Susilo (Referee Assessor)", role: Role.REFEREE_ASSESSOR },
    { email: "adminclub@matchday.hub", name: "Hendro Kartiko (Club Manager)", role: Role.ADMIN_CLUB },
    { email: "player@matchday.hub", name: "Fajar Pratama (Player)", role: Role.PLAYER },
    { email: "media@matchday.hub", name: "Rina Salsabila (Sports Journalist / Media)", role: Role.MEDIA },
    { email: "user@matchday.hub", name: "Ahmad Rizky (Supporter / Public User)", role: Role.USER },
  ];

  for (const u of usersToCreate) {
    await prisma.user.create({
      data: {
        email: u.email,
        fullName: u.name,
        passwordHash: "$2b$10$hashed_password_placeholder",
        role: u.role,
      },
    });
  }

  // Referees with RefereeProfile
  const refUser1 = await prisma.user.create({
    data: {
      email: "ref1@matchday.hub",
      fullName: "Agus Hendrawan, S.Pd",
      passwordHash: "$2b$10$hashed_ref_pw_placeholder",
      role: Role.REFEREE,
      refereeProfile: {
        create: {
          licenseLevel: "Level 1 Nasional (FIFA/PSSI)",
          licenseNumber: "REF-INA-2024-0012",
          affiliatedAssoc: "PSSI Pusat / AFP Banten",
        },
      },
    },
    include: { refereeProfile: true },
  });

  const refUser2 = await prisma.user.create({
    data: {
      email: "ref2@matchday.hub",
      fullName: "Deni Hermawan",
      passwordHash: "$2b$10$hashed_ref_pw_placeholder",
      role: Role.REFEREE,
      refereeProfile: {
        create: {
          licenseLevel: "Level 2 Daerah",
          licenseNumber: "REF-JBR-2025-0844",
          affiliatedAssoc: "AFP Jawa Barat",
        },
      },
    },
    include: { refereeProfile: true },
  });

  const timekeeperUser = await prisma.user.create({
    data: {
      email: "timekeeper@matchday.hub",
      fullName: "Rian Prasetyo",
      passwordHash: "$2b$10$hashed_ref_pw_placeholder",
      role: Role.REFEREE,
      refereeProfile: {
        create: {
          licenseLevel: "Level 3 Daerah",
          licenseNumber: "REF-DKI-2025-0199",
          affiliatedAssoc: "AFP DKI Jakarta",
        },
      },
    },
    include: { refereeProfile: true },
  });

  // ==========================================
  // 2. TOURNAMENT 1: FOOTBALL (Sepak Bola 11v11)
  // ==========================================
  const footballTournament = await prisma.tournament.create({
    data: {
      name: "Premier Football Championship 2026",
      slug: "premier-football-championship-2026",
      season: "2025/2026",
      category: "Men Open Pro",
      sportType: SportType.FOOTBALL,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-05-30"),
    },
  });

  const fbArsenal = await prisma.team.create({
    data: {
      tournamentId: footballTournament.id,
      name: "Arsenal FC Nusantara",
      code: "ARS",
      officialColor: "#dc2626",
      players: {
        create: [
          { fullName: "David Raya", jerseyNumber: 1, position: "GK", isCaptain: false },
          { fullName: "Ben White", jerseyNumber: 4, position: "RB", isCaptain: false },
          { fullName: "William Saliba", jerseyNumber: 2, position: "CB", isCaptain: false },
          { fullName: "Gabriel Magalhaes", jerseyNumber: 6, position: "CB", isCaptain: false },
          { fullName: "Jurrien Timber", jerseyNumber: 12, position: "LB", isCaptain: false },
          { fullName: "Thomas Partey", jerseyNumber: 5, position: "CDM", isCaptain: false },
          { fullName: "Declan Rice", jerseyNumber: 41, position: "CM", isCaptain: false },
          { fullName: "Martin Odegaard", jerseyNumber: 8, position: "CAM", isCaptain: true },
          { fullName: "Bukayo Saka", jerseyNumber: 7, position: "RW", isCaptain: false },
          { fullName: "Kai Havertz", jerseyNumber: 29, position: "ST", isCaptain: false },
          { fullName: "Gabriel Martinelli", jerseyNumber: 11, position: "LW", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  const fbChelsea = await prisma.team.create({
    data: {
      tournamentId: footballTournament.id,
      name: "Chelsea FC Indonesia",
      code: "CHE",
      officialColor: "#2563eb",
      players: {
        create: [
          { fullName: "Robert Sanchez", jerseyNumber: 1, position: "GK", isCaptain: false },
          { fullName: "Malo Gusto", jerseyNumber: 27, position: "RB", isCaptain: false },
          { fullName: "Wesley Fofana", jerseyNumber: 29, position: "CB", isCaptain: false },
          { fullName: "Levi Colwill", jerseyNumber: 6, position: "CB", isCaptain: false },
          { fullName: "Marc Cucurella", jerseyNumber: 3, position: "LB", isCaptain: false },
          { fullName: "Moises Caicedo", jerseyNumber: 25, position: "CDM", isCaptain: false },
          { fullName: "Enzo Fernandez", jerseyNumber: 8, position: "CM", isCaptain: true },
          { fullName: "Cole Palmer", jerseyNumber: 20, position: "CAM", isCaptain: false },
          { fullName: "Noni Madueke", jerseyNumber: 11, position: "RW", isCaptain: false },
          { fullName: "Nicolas Jackson", jerseyNumber: 15, position: "ST", isCaptain: false },
          { fullName: "Pedro Neto", jerseyNumber: 7, position: "LW", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  const fbLiverpool = await prisma.team.create({
    data: {
      tournamentId: footballTournament.id,
      name: "Liverpool Merah FC",
      code: "LIV",
      officialColor: "#b91c1c",
      players: {
        create: [
          { fullName: "Alisson Becker", jerseyNumber: 1, position: "GK", isCaptain: false },
          { fullName: "Trent Alexander-Arnold", jerseyNumber: 66, position: "RB", isCaptain: false },
          { fullName: "Virgil van Dijk", jerseyNumber: 4, position: "CB", isCaptain: true },
          { fullName: "Ibrahima Konate", jerseyNumber: 5, position: "CB", isCaptain: false },
          { fullName: "Andrew Robertson", jerseyNumber: 26, position: "LB", isCaptain: false },
          { fullName: "Ryan Gravenberch", jerseyNumber: 38, position: "CDM", isCaptain: false },
          { fullName: "Alexis Mac Allister", jerseyNumber: 10, position: "CM", isCaptain: false },
          { fullName: "Dominik Szoboszlai", jerseyNumber: 8, position: "CAM", isCaptain: false },
          { fullName: "Mohamed Salah", jerseyNumber: 11, position: "RW", isCaptain: false },
          { fullName: "Darwin Nunez", jerseyNumber: 9, position: "ST", isCaptain: false },
          { fullName: "Luis Diaz", jerseyNumber: 7, position: "LW", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  const fbManCity = await prisma.team.create({
    data: {
      tournamentId: footballTournament.id,
      name: "Manchester Biru FC",
      code: "MCI",
      officialColor: "#0ea5e9",
      players: {
        create: [
          { fullName: "Ederson Moraes", jerseyNumber: 31, position: "GK", isCaptain: false },
          { fullName: "Kyle Walker", jerseyNumber: 2, position: "RB", isCaptain: true },
          { fullName: "Ruben Dias", jerseyNumber: 3, position: "CB", isCaptain: false },
          { fullName: "Manuel Akanji", jerseyNumber: 25, position: "CB", isCaptain: false },
          { fullName: "Josko Gvardiol", jerseyNumber: 24, position: "LB", isCaptain: false },
          { fullName: "Rodri Hernandez", jerseyNumber: 16, position: "CDM", isCaptain: false },
          { fullName: "Mateo Kovacic", jerseyNumber: 8, position: "CM", isCaptain: false },
          { fullName: "Kevin De Bruyne", jerseyNumber: 17, position: "CAM", isCaptain: false },
          { fullName: "Bernardo Silva", jerseyNumber: 20, position: "RW", isCaptain: false },
          { fullName: "Erling Haaland", jerseyNumber: 9, position: "ST", isCaptain: false },
          { fullName: "Phil Foden", jerseyNumber: 47, position: "LW", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  // Football Matches
  const fbMatchLive = await prisma.match.create({
    data: {
      tournamentId: footballTournament.id,
      matchNumber: 1,
      stage: "Matchday 1",
      venue: "Stadion Utama Gelora Bung Karno",
      scheduledAt: new Date(),
      status: MatchStatus.SECOND_HALF,
      homeTeamId: fbArsenal.id,
      awayTeamId: fbChelsea.id,
      homeScore: 2,
      awayScore: 1,
      officials: {
        create: [
          { officialId: refUser1.refereeProfile!.id, role: RefereeRole.FIRST_REFEREE },
          { officialId: refUser2.refereeProfile!.id, role: RefereeRole.SECOND_REFEREE },
          { officialId: timekeeperUser.refereeProfile!.id, role: RefereeRole.TIMEKEEPER },
        ],
      },
      events: {
        create: [
          { minute: 14, second: 20, period: "1H", type: "GOAL", teamId: fbArsenal.id, playerId: fbArsenal.players.find(p => p.jerseyNumber === 7)?.id, notes: "Bukayo Saka curling finish to top left corner" },
          { minute: 38, second: 45, period: "1H", type: "YELLOW_CARD", teamId: fbChelsea.id, playerId: fbChelsea.players.find(p => p.jerseyNumber === 25)?.id, notes: "Late tackle on midfield" },
          { minute: 44, second: 10, period: "1H", type: "GOAL", teamId: fbChelsea.id, playerId: fbChelsea.players.find(p => p.jerseyNumber === 20)?.id, notes: "Cole Palmer penalty into bottom right" },
          { minute: 61, second: 18, period: "2H", type: "GOAL", teamId: fbArsenal.id, playerId: fbArsenal.players.find(p => p.jerseyNumber === 29)?.id, notes: "Kai Havertz header from corner" },
        ],
      },
    },
  });

  const fbMatchUpcoming = await prisma.match.create({
    data: {
      tournamentId: footballTournament.id,
      matchNumber: 2,
      stage: "Matchday 1",
      venue: "Jakarta International Stadium (JIS)",
      scheduledAt: new Date(Date.now() + 3600 * 4 * 1000),
      status: MatchStatus.SCHEDULED,
      homeTeamId: fbLiverpool.id,
      awayTeamId: fbManCity.id,
      homeScore: 0,
      awayScore: 0,
    },
  });

  // ==========================================
  // 3. TOURNAMENT 2: FUTSAL (5v5)
  // ==========================================
  const futsalTournament = await prisma.tournament.create({
    data: {
      name: "Super League Championship Futsal 2026",
      slug: "super-league-futsal-2026",
      season: "2025/2026",
      category: "Men Open",
      sportType: SportType.FUTSAL,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-04-15"),
    },
  });

  const ftsGaruda = await prisma.team.create({
    data: {
      tournamentId: futsalTournament.id,
      name: "Garuda Muda FC",
      code: "GDA",
      officialColor: "#dc2626",
      players: {
        create: [
          { fullName: "Muhammad Ridwan", jerseyNumber: 1, position: "GK", isCaptain: false },
          { fullName: "Bambang Kurnia", jerseyNumber: 4, position: "Anchor", isCaptain: true },
          { fullName: "Fajar Pratama", jerseyNumber: 7, position: "Flank", isCaptain: false },
          { fullName: "Syahrul Ramadhan", jerseyNumber: 10, position: "Pivot", isCaptain: false },
          { fullName: "Andi Saputra", jerseyNumber: 11, position: "Flank", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  const ftsRajawali = await prisma.team.create({
    data: {
      tournamentId: futsalTournament.id,
      name: "Rajawali Futsal Club",
      code: "RJW",
      officialColor: "#2563eb",
      players: {
        create: [
          { fullName: "Dimas Wicaksono", jerseyNumber: 12, position: "GK", isCaptain: false },
          { fullName: "Eko Prasetyo", jerseyNumber: 5, position: "Anchor", isCaptain: false },
          { fullName: "Rizky Firmansyah", jerseyNumber: 8, position: "Flank", isCaptain: true },
          { fullName: "Hadi Gunawan", jerseyNumber: 9, position: "Pivot", isCaptain: false },
          { fullName: "Kevin Alamsyah", jerseyNumber: 14, position: "Flank", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  const ftsBintang = await prisma.team.create({
    data: {
      tournamentId: futsalTournament.id,
      name: "Bintang Timur Futsal",
      code: "BTF",
      officialColor: "#16a34a",
      players: {
        create: [
          { fullName: "Ahmad Habibie", jerseyNumber: 1, position: "GK", isCaptain: false },
          { fullName: "Sunny Rizky", jerseyNumber: 6, position: "Anchor", isCaptain: true },
          { fullName: "Iqbal Iskandar", jerseyNumber: 9, position: "Flank", isCaptain: false },
          { fullName: "Singgih Romana", jerseyNumber: 10, position: "Pivot", isCaptain: false },
          { fullName: "Ardiansyah Runtuboy", jerseyNumber: 12, position: "Flank", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  const ftsCosmo = await prisma.team.create({
    data: {
      tournamentId: futsalTournament.id,
      name: "Cosmo JNE Futsal",
      code: "CSM",
      officialColor: "#f59e0b",
      players: {
        create: [
          { fullName: "Rizqky Hanna", jerseyNumber: 2, position: "GK", isCaptain: false },
          { fullName: "Reza Yamani", jerseyNumber: 7, position: "Anchor", isCaptain: false },
          { fullName: "Firman Adriansyah", jerseyNumber: 11, position: "Flank", isCaptain: false },
          { fullName: "Vahid Shafiei", jerseyNumber: 13, position: "Pivot", isCaptain: true },
          { fullName: "Caisar Silitonga", jerseyNumber: 17, position: "Flank", isCaptain: false },
        ],
      },
    },
    include: { players: true },
  });

  // Futsal Matches
  const ftsMatchLive = await prisma.match.create({
    data: {
      tournamentId: futsalTournament.id,
      matchNumber: 1,
      stage: "Group A",
      venue: "GOR Sumantri Brodjonegoro (Court 1)",
      scheduledAt: new Date(),
      status: MatchStatus.FIRST_HALF,
      homeTeamId: ftsGaruda.id,
      awayTeamId: ftsRajawali.id,
      homeScore: 1,
      awayScore: 0,
      homeFoulsH1: 2,
      awayFoulsH1: 3,
      officials: {
        create: [
          { officialId: refUser1.refereeProfile!.id, role: RefereeRole.FIRST_REFEREE },
          { officialId: refUser2.refereeProfile!.id, role: RefereeRole.SECOND_REFEREE },
          { officialId: timekeeperUser.refereeProfile!.id, role: RefereeRole.TIMEKEEPER },
        ],
      },
      events: {
        create: [
          { minute: 0, second: 0, period: "1H", type: "PERIOD_START", notes: "Kick-off babak pertama" },
          { minute: 4, second: 32, period: "1H", type: "GOAL", teamId: ftsGaruda.id, playerId: ftsGaruda.players.find(p => p.jerseyNumber === 7)?.id, notes: "Tendangan mendatar pojok kiri bawah" },
          { minute: 7, second: 10, period: "1H", type: "FOUL", teamId: ftsRajawali.id, playerId: ftsRajawali.players.find(p => p.jerseyNumber === 5)?.id, notes: "Pelanggaran tackle langsung" },
        ],
      },
    },
  });

  const ftsMatchCompleted = await prisma.match.create({
    data: {
      tournamentId: futsalTournament.id,
      matchNumber: 2,
      stage: "Group A",
      venue: "GOR Sumantri Brodjonegoro (Court 2)",
      scheduledAt: new Date(Date.now() - 3600 * 3 * 1000),
      status: MatchStatus.COMPLETED,
      homeTeamId: ftsBintang.id,
      awayTeamId: ftsCosmo.id,
      homeScore: 4,
      awayScore: 2,
      homeFoulsH1: 3,
      awayFoulsH1: 4,
      homeFoulsH2: 4,
      awayFoulsH2: 5,
    },
  });

  console.log("✅ Seed successfully created Dual-Sport competitions and all 12 user roles!");
  console.log(`⚽ Football Match Live ID: ${fbMatchLive.id}`);
  console.log(`👟 Futsal Match Live ID: ${ftsMatchLive.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

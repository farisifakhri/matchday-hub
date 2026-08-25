import { PrismaClient, Role, MatchStatus, RefereeRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding MatchDay Hub Database...");

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

  // 1. Create Users & Referees
  const operatorUser = await prisma.user.create({
    data: {
      email: "operator@matchday.hub",
      fullName: "Budi Santoso (Table Official)",
      passwordHash: "$2b$10$hashed_operator_pw_placeholder",
      role: Role.MATCH_OPERATOR,
    },
  });

  const refUser1 = await prisma.user.create({
    data: {
      email: "ref1@matchday.hub",
      fullName: "Agus Hendrawan, S.Pd",
      passwordHash: "$2b$10$hashed_ref_pw_placeholder",
      role: Role.REFEREE,
      refereeProfile: {
        create: {
          licenseLevel: "Level 1 Nasional",
          licenseNumber: "REF-INA-2024-0012",
          affiliatedAssoc: "Asosiasi Futsal Indonesia",
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

  // 2. Create Tournament
  const tournament = await prisma.tournament.create({
    data: {
      name: "Super League Championship Futsal 2026",
      slug: "super-league-futsal-2026",
      season: "2025/2026",
      category: "Men Open",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-04-15"),
    },
  });

  // 3. Create Teams & Players
  const teamGaruda = await prisma.team.create({
    data: {
      tournamentId: tournament.id,
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

  const teamRajawali = await prisma.team.create({
    data: {
      tournamentId: tournament.id,
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

  // 4. Create Initial Match (Matchday 1 - Live ready)
  const match1 = await prisma.match.create({
    data: {
      tournamentId: tournament.id,
      matchNumber: 1,
      stage: "Group Stage - Group A",
      venue: "GOR Sumantri Brodjonegoro (Court 1)",
      scheduledAt: new Date(),
      status: MatchStatus.FIRST_HALF,
      homeTeamId: teamGaruda.id,
      awayTeamId: teamRajawali.id,
      homeScore: 1,
      awayScore: 0,
      homeFoulsH1: 2,
      awayFoulsH1: 3,
      homeFoulsH2: 0,
      awayFoulsH2: 0,
      officials: {
        create: [
          { officialId: refUser1.refereeProfile!.id, role: RefereeRole.FIRST_REFEREE },
          { officialId: refUser2.refereeProfile!.id, role: RefereeRole.SECOND_REFEREE },
          { officialId: timekeeperUser.refereeProfile!.id, role: RefereeRole.TIMEKEEPER },
        ],
      },
      events: {
        create: [
          {
            minute: 0,
            second: 0,
            period: "1H",
            type: "PERIOD_START",
            notes: "Kick-off babak pertama",
          },
          {
            minute: 4,
            second: 32,
            period: "1H",
            type: "GOAL",
            teamId: teamGaruda.id,
            playerId: teamGaruda.players.find((p) => p.jerseyNumber === 7)?.id,
            notes: "Tendangan mendatar pojok kiri bawah",
          },
        ],
      },
    },
  });

  console.log("✅ Seeding completed successfully!");
  console.log(`🏆 Tournament created: ${tournament.name} (${tournament.id})`);
  console.log(`⚽ Match 1 ID: ${match1.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

# MatchDay Hub: Digital Match Sheet & Live Tournament Engine
### Production-Grade Full-Stack Implementation Blueprint & Architecture Guide

---

## 1. Executive Summary & Architecture Overview

**MatchDay Hub** is an end-to-end tournament management platform and digital match recording system (Digital Match Sheet / E-Scoreboard) designed to streamline sports competition operations (such as Futsal and Football leagues). The system addresses core operational pain points: manual paper score sheets, delayed public score updates, official assignment conflicts, and manual post-match reporting.

```
                  +-------------------------------------------------------------+
                  |                      CLIENT LAYERS                          |
                  +-------------------------------------------------------------+
                  |  [Operator Console]      [Public Match Center]  [Admin Web] |
                  +--------+--------------------------+--------------------+----+
                           | (HTTPS / WSS)            | (HTTPS / WSS)      |
                           v                          v                    v
+-------------------------------------------------------------------------------+
|                       API GATEWAY & EDGE (Next.js App Router)                  |
+-------------------------------------------------------------------------------+
| - Authentication & RBAC (NextAuth / JWT)                                      |
| - Server Actions / Route Handlers (Edge & Node.js Runtime)                    |
| - Validation Layer (Zod Schemas)                                              |
+------------------------------------+------------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------------+
|                       CORE SERVICES & BUSINESS LOGIC                          |
+-------------------------------------------------------------------------------+
|  +-------------------+  +---------------------+  +-------------------------+  |
|  | Tournament Engine |  | Match Event Engine  |  | Referee Assignment Svc  |  |
|  +-------------------+  +---------------------+  +-------------------------+  |
|  | PDF Generator Svc |  | Standings Calculator|  | Realtime Sync Broadcaster| |
|  +-------------------+  +---------------------+  +-------------------------+  |
+-------------------+-------------------+--------------------+------------------+
                    |                   |                    |
                    v                   v                    v
+-------------------+---+       +-------+-------+    +-------+------------------+
| PostgreSQL (Prisma)   |       | Redis (Pub/Sub|    | S3 / Cloud Storage       |
| - Relational Data     |       | & State Cache)|    | - PDF Match Sheets (BAP) |
| - ACID Event Logs     |       | - Live Match  |    | - Team/Player Logos      |
+-----------------------+       +---------------+    +--------------------------+
```

---

## 2. Tech Stack Selection & Justification

| Layer / Concern | Technology | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js 14/15 (App Router, React Server Components) | Unified full-stack TypeScript environment with fast SSR/ISR for SEO-friendly public match centers. |
| **Styling & UI** | Tailwind CSS + Shadcn UI (Radix Primitives) | Accessible, high-density dashboard layouts optimized for tablet/operator screen viewports. |
| **Database & ORM** | PostgreSQL + Prisma ORM | Relational integrity for tournaments, strict transactional safety for match event logging. |
| **Realtime Sync** | Supabase Realtime / WebSocket (Socket.io) + Redis | Sub-100ms low-latency state propagation for live scoreboard viewers and table officials. |
| **State Management**| Zustand + TanStack Query (React Query v5) | Lightweight optimistic UI updates for match timers, fouls, and rapid event triggers. |
| **Document Engine**| `@react-pdf/renderer` / WeasyPrint Pipeline | Server-side automated generation of standardized PDF Match Sheets (*Berita Acara Pertandingan*). |
| **Testing & CI/CD** | Vitest, Playwright, GitHub Actions | End-to-end validation of match rule engines (accumulated fouls, card expirations). |

---

## 3. Database Schema (Prisma Data Model)

Below is the production-ready Prisma schema modeling leagues, teams, players, referees, matches, match events, and foul tallies.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  TOURNAMENT_ADMIN
  MATCH_OPERATOR
  REFEREE
  PUBLIC_USER
}

enum MatchStatus {
  SCHEDULED
  WARMUP
  FIRST_HALF
  HALF_TIME
  SECOND_HALF
  EXTRA_TIME
  PENALTIES
  COMPLETED
  POSTPONED
  ABANDONED
}

enum EventType {
  GOAL
  OWN_GOAL
  PENALTY_GOAL
  PENALTY_MISSED
  YELLOW_CARD
  SECOND_YELLOW_CARD
  RED_CARD
  FOUL
  ACCUMULATED_FOUL
  TIMEOUT
  SUBSTITUTION
  PERIOD_START
  PERIOD_END
}

enum RefereeRole {
  FIRST_REFEREE
  SECOND_REFEREE
  THIRD_REFEREE
  TIMEKEEPER
  ASSESSOR
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  passwordHash  String
  fullName      String
  role          Role           @default(PUBLIC_USER)
  refereeProfile RefereeProfile?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
}

model RefereeProfile {
  id             String          @id @default(cuid())
  userId         String          @unique
  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  licenseLevel   String          // e.g., "Level 2 Nasional", "Level 1 AFC", "Level 3 Daerah"
  licenseNumber  String          @unique
  affiliatedAssoc String         // e.g., "PSSI Banten", "Asosiasi Futsal Provinsi"
  matchAssignments MatchOfficial[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}

model Tournament {
  id          String      @id @default(cuid())
  name        String
  slug        String      @unique
  season      String
  category    String      // e.g., "Men Open", "U-20", "Student"
  startDate   DateTime
  endDate     DateTime
  teams       Team[]
  matches     Match[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Team {
  id            String         @id @default(cuid())
  tournamentId  String
  tournament    Tournament     @relation(fields: [tournamentId], references: [id])
  name          String
  code          String         // e.g., "GLT", "FCB"
  logoUrl       String?
  officialColor String?        // Hex code for scoreboard badges
  players       Player[]
  homeMatches   Match[]        @relation("HomeTeam")
  awayMatches   Match[]        @relation("AwayTeam")
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@unique([tournamentId, code])
}

model Player {
  id           String       @id @default(cuid())
  teamId       String
  team         Team         @relation(fields: [teamId], references: [id], onDelete: Cascade)
  jerseyNumber Int
  fullName     String
  position     String       // GK, Anchor, Flank, Pivot
  isCaptain    Boolean      @default(false)
  matchLineups MatchLineup[]
  events       MatchEvent[]
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt

  @@unique([teamId, jerseyNumber])
}

model Match {
  id              String          @id @default(cuid())
  tournamentId    String
  tournament      Tournament      @relation(fields: [tournamentId], references: [id])
  matchNumber     Int
  stage           String          // "Group A", "Quarter Final", "Final"
  venue           String
  scheduledAt     DateTime
  status          MatchStatus     @default(SCHEDULED)
  
  homeTeamId      String
  homeTeam        Team            @relation("HomeTeam", fields: [homeTeamId], references: [id])
  awayTeamId      String
  awayTeam        Team            @relation("AwayTeam", fields: [awayTeamId], references: [id])
  
  homeScore       Int             @default(0)
  awayScore       Int             @default(0)
  homeFoulsH1     Int             @default(0)
  awayFoulsH1     Int             @default(0)
  homeFoulsH2     Int             @default(0)
  awayFoulsH2     Int             @default(0)
  
  homeTimeoutsH1  Int             @default(0)
  awayTimeoutsH1  Int             @default(0)
  homeTimeoutsH2  Int             @default(0)
  awayTimeoutsH2  Int             @default(0)

  pdfReportUrl    String?
  events          MatchEvent[]
  officials       MatchOfficial[]
  lineups         MatchLineup[]
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
}

model MatchOfficial {
  id          String          @id @default(cuid())
  matchId     String
  match       Match           @relation(fields: [matchId], references: [id], onDelete: Cascade)
  officialId  String
  official    RefereeProfile  @relation(fields: [officialId], references: [id])
  role        RefereeRole

  @@unique([matchId, role])
}

model MatchLineup {
  id          String   @id @default(cuid())
  matchId     String
  match       Match    @relation(fields: [matchId], references: [id], onDelete: Cascade)
  playerId    String
  player      Player   @relation(fields: [playerId], references: [id])
  isStarter   Boolean  @default(false)
  
  @@unique([matchId, playerId])
}

model MatchEvent {
  id          String     @id @default(cuid())
  matchId     String
  match       Match      @relation(fields: [matchId], references: [id], onDelete: Cascade)
  minute      Int
  second      Int
  period      String     // "1H", "2H", "ET1", "ET2", "PK"
  type        EventType
  teamId      String?
  playerId    String?
  player      Player?    @relation(fields: [playerId], references: [id])
  assistId    String?
  notes       String?
  createdAt   DateTime   @default(now())
}
```

---

## 4. Real-time Architecture & State Engine

The platform operates on an event-sourcing pattern where match state is derived from sequential events and synced across connected clients using WebSockets.

### Event Processing Flow
1. **Operator Action:** Table official clicks "Goal" or "Accumulated Foul" on the operator tablet interface.
2. **Optimistic UI:** Zustand immediately updates local scoreboard display and decrements/increments UI timers.
3. **Transaction Execution:** Backend receives the signed payload, validates business rules in a PostgreSQL transaction, updates the aggregate `Match` score/foul tallies, and persists the `MatchEvent`.
4. **Broadcast Notification:** Event is published to Redis channel `match:{matchId}` and fanned out through Supabase Realtime / WebSockets to all public viewers.

```typescript
// server/actions/record-match-event.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const EventPayloadSchema = z.object({
  matchId: z.string(),
  minute: z.number().min(0).max(120),
  second: z.number().min(0).max(59),
  period: z.enum(["1H", "2H", "ET1", "ET2", "PK"]),
  type: z.enum([
    "GOAL", "OWN_GOAL", "YELLOW_CARD", "SECOND_YELLOW_CARD",
    "RED_CARD", "FOUL", "ACCUMULATED_FOUL", "TIMEOUT"
  ]),
  teamId: z.string().optional(),
  playerId: z.string().optional(),
  notes: z.string().optional(),
});

export async function recordMatchEvent(rawPayload: z.infer<typeof EventPayloadSchema>) {
  const payload = EventPayloadSchema.parse(rawPayload);

  return await prisma.$transaction(async (tx) => {
    // 1. Insert Match Event
    const event = await tx.matchEvent.create({
      data: payload,
    });

    // 2. Compute Aggregates Based on Event Type
    if (payload.type === "GOAL" && payload.teamId) {
      const match = await tx.match.findUniqueOrThrow({ where: { id: payload.matchId } });
      const isHome = match.homeTeamId === payload.teamId;

      await tx.match.update({
        where: { id: payload.matchId },
        data: isHome
          ? { homeScore: { increment: 1 } }
          : { awayScore: { increment: 1 } },
      });
    }

    if (payload.type === "ACCUMULATED_FOUL" && payload.teamId) {
      const match = await tx.match.findUniqueOrThrow({ where: { id: payload.matchId } });
      const isHome = match.homeTeamId === payload.teamId;
      const isH1 = payload.period === "1H";

      if (isHome) {
        await tx.match.update({
          where: { id: payload.matchId },
          data: isH1 ? { homeFoulsH1: { increment: 1 } } : { homeFoulsH2: { increment: 1 } },
        });
      } else {
        await tx.match.update({
          where: { id: payload.matchId },
          data: isH1 ? { awayFoulsH1: { increment: 1 } } : { awayFoulsH2: { increment: 1 } },
        });
      }
    }

    revalidateTag(`match-${payload.matchId}`);
    return { success: true, eventId: event.id };
  });
}
```

---

## 5. Official Match Sheet (BAP) PDF Generation

Upon match conclusion, the system aggregates all referee logs, verified lineups, caution minutes, and foul counts into an official Berita Acara Pertandingan (BAP) PDF document signed by match officials.

```typescript
// services/pdf/bap-template.ts
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 9, fontFamily: "Helvetica", backgroundColor: "#FFFFFF" },
  header: { textAlign: "center", marginBottom: 12, borderBottom: "2pt solid #1e293b", paddingBottom: 6 },
  title: { fontSize: 14, fontWeight: "bold", textTransform: "uppercase" },
  subtitle: { fontSize: 10, color: "#475569" },
  scoreBox: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10, padding: 8, backgroundColor: "#f1f5f9" },
  scoreText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 12 },
  table: { width: "100%", marginVertical: 6, borderWidth: 1, borderColor: "#cbd5e1" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#cbd5e1", minHeight: 18, alignItems: "center" },
  tableHeader: { backgroundColor: "#e2e8f0", fontWeight: "bold" },
  col1: { width: "15%", paddingLeft: 4 },
  col2: { width: "45%", paddingLeft: 4 },
  col3: { width: "20%", textAlign: "center" },
  col4: { width: "20%", textAlign: "center" },
  signatures: { flexDirection: "row", justifyContent: "space-between", marginTop: 30 },
  signBlock: { width: "28%", textAlign: "center", borderTopWidth: 1, borderColor: "#000", paddingTop: 4 }
});

export function MatchSheetDocument({ match }: { match: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{match.tournament.name}</Text>
          <Text style={styles.subtitle}>OFFICIAL MATCH REPORT (BERITA ACARA PERTANDINGAN)</Text>
          <Text style={{ fontSize: 8, marginTop: 2 }}>Venue: {match.venue} | Date: {new Date(match.scheduledAt).toLocaleDateString("id-ID")}</Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{match.homeTeam.name}</Text>
          <Text style={styles.scoreText}>{match.homeScore} - {match.awayScore}</Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{match.awayTeam.name}</Text>
        </View>

        {/* Goal Events Section */}
        <Text style={{ fontWeight: "bold", marginTop: 8, marginBottom: 4 }}>MATCH INCIDENTS & GOALS</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col1}>Time</Text>
            <Text style={styles.col2}>Player Name</Text>
            <Text style={styles.col3}>Team</Text>
            <Text style={styles.col4}>Incident Type</Text>
          </View>
          {match.events.map((evt: any) => (
            <View key={evt.id} style={styles.tableRow}>
              <Text style={styles.col1}>{evt.minute}:{String(evt.second).padStart(2, "0")}</Text>
              <Text style={styles.col2}>{evt.player?.fullName || "-"}</Text>
              <Text style={styles.col3}>{evt.teamId === match.homeTeamId ? match.homeTeam.code : match.awayTeam.code}</Text>
              <Text style={styles.col4}>{evt.type}</Text>
            </View>
          ))}
        </View>

        {/* Match Officials Signature Block */}
        <View style={styles.signatures}>
          <View style={styles.signBlock}>
            <Text style={{ fontSize: 8 }}>First Referee</Text>
            <Text style={{ marginTop: 28, fontWeight: "bold" }}>{match.officials.find((o: any) => o.role === "FIRST_REFEREE")?.official.user.fullName || "________________"}</Text>
          </View>
          <View style={styles.signBlock}>
            <Text style={{ fontSize: 8 }}>Second Referee</Text>
            <Text style={{ marginTop: 28, fontWeight: "bold" }}>{match.officials.find((o: any) => o.role === "SECOND_REFEREE")?.official.user.fullName || "________________"}</Text>
          </View>
          <View style={styles.signBlock}>
            <Text style={{ fontSize: 8 }}>Timekeeper</Text>
            <Text style={{ marginTop: 28, fontWeight: "bold" }}>{match.officials.find((o: any) => o.role === "TIMEKEEPER")?.official.user.fullName || "________________"}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
```

---

## 6. GitHub Repository Structure

A clean, modular folder layout designed for open-source showcase:

```
matchday-hub/
├── .github/
│   └── workflows/
│       ├── ci.yml               # Automated Vitest & ESLint checks
│       └── e2e.yml              # Playwright multi-role operator flow tests
├── prisma/
│   ├── schema.prisma            # Core relational schema
│   ├── seed.ts                  # Mock tournament, teams, and referee data
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── (admin)/
│   │   │   ├── dashboard/       # Tournament standings & bracket builder
│   │   │   └── referees/        # Assignment matrix & license validator
│   │   ├── (operator)/
│   │   │   └── match/[id]/
│   │   │       ├── live/        # Fullscreen operator tablet interface
│   │   │       └── sheet/       # Pre-match lineup verification
│   │   ├── (public)/
│   │   │   ├── tournaments/     # Public fixtures & team rosters
│   │   │   └── live/[matchId]/  # Real-time animated scoreboard
│   │   ├── api/
│   │   │   ├── pdf/[matchId]/   # Stream generated BAP PDF
│   │   │   └── live-sync/       # SSE / WebSocket gateway
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                  # Shadcn primitives
│   │   ├── operator/
│   │   │   ├── FoulTracker.tsx  # Accumulated foul 5-limit alert modal
│   │   │   ├── ScoreKeypad.tsx  # Quick one-touch goal & card input
│   │   │   └── TimerControl.tsx # Stoppage countdown clock
│   │   └── public/
│   │       └── LivePitchView.tsx
│   ├── lib/
│   │   ├── prisma.ts            # Client singleton
│   │   ├── redis.ts             # Pub/Sub connection instance
│   │   └── rules-engine.ts      # Sports rules validator (yellow to red conversion)
│   └── types/
│       └── match.ts
├── tests/
│   ├── rules-engine.test.ts
│   └── match-events.test.ts
├── docker-compose.yml           # PostgreSQL + Redis local dev cluster
├── README.md                    # Architecture overview, screenshots, setup guide
└── package.json
```

---

## 7. GitHub README High-Impact Presentation

To maximize recruiter and engineering lead impression, structure the root `README.md` with:

1. **Badges:** Next.js 15, TypeScript, PostgreSQL, Prisma, Redis, Vitest, CI Passing.
2. **Interactive Demo Links:** Live Vercel demo + sample downloaded PDF match sheet.
3. **Key Architectural Highlights:**
   - *Zero-Loss Event Queue:* Optimistic client state synced with transactional DB records.
   - *Conflict-Free Referee Assigner:* Automatically flags license incompatibility or overlapping match times.
   - *Automated Federation-Grade Reporting:* 1-click BAP generation matching official tournament standards.
4. **Step-by-Step Local Deployment:** Docker compose setup for instant PostgreSQL/Redis bootstrapping.

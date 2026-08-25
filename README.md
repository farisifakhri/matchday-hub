# ⚽ MatchDay Hub: Digital Match Sheet & Live Tournament Engine

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)

**MatchDay Hub** is an end-to-end sports tournament management platform and digital match recording system (*Digital Match Sheet / E-Scoreboard*) engineered specifically for Futsal and Football leagues.

---

## 🌟 Key Features

1. **📱 Operator Console (Tablet Optimized)**:
   - One-touch keypad for recording Goals, Fouls, Yellow/Red Cards, and 1-Minute Timeouts.
   - Built-in Futsal Rules Engine: Automated **5th Foul Warning** and **6th Foul 10m Penalty Spot** triggers.
   - Automatic 2nd Yellow to Red Card expulsion conversion.
   - Net/Gross countdown timer with quick stoppage controls.

2. **📡 Public Live Match Center**:
   - Real-time spectator scoreboard with animated score flashes and active period badges.
   - Live Incident Timeline (*Goals, Fouls, Cautions*).
   - Starting lineups and club roster inspection.

3. **🏆 Admin & BAP Report Generation**:
   - Group stage standings and automatic Goal Difference calculation.
   - Referee assignment matrix with certification/license validation.
   - **1-Click Official BAP (*Berita Acara Pertandingan*)**: Generates official standardized match sheet with official signature blocks.

4. **🔒 ACID Relational Integrity**:
   - Prisma PostgreSQL transactions ensure aggregate scores and foul counters stay synchronized with detailed incident event logs.

---

## 🏗️ Architecture & Tech Stack

```
[Operator Tablet]        [Public Scoreboard]        [Admin Dashboard]
        │                        │                          │
        └────────────────────────┼──────────────────────────┘
                                 ▼
                     Next.js 15 (App Router)
                  (Server Actions & Edge API)
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       PostgreSQL (Prisma ORM)             Redis (Cache)
```

- **Framework**: Next.js 15 (App Router, RSC, Server Actions)
- **Database**: PostgreSQL with Prisma ORM
- **State & Rules**: Zustand + Custom Sports Rules Engine
- **Styling**: Tailwind CSS + Lucide Icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Migration & Seed
Ensure PostgreSQL is running, then run:
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the MatchDay Hub portal.

---

## 📄 License
MIT © 2026 MatchDay Hub

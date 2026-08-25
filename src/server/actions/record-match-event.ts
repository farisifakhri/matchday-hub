"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const EventPayloadSchema = z.object({
  matchId: z.string(),
  minute: z.number().min(0).max(120),
  second: z.number().min(0).max(59),
  period: z.enum(["1H", "2H", "ET1", "ET2", "PK"]),
  type: z.enum([
    "GOAL",
    "OWN_GOAL",
    "PENALTY_GOAL",
    "PENALTY_MISSED",
    "YELLOW_CARD",
    "SECOND_YELLOW_CARD",
    "RED_CARD",
    "FOUL",
    "ACCUMULATED_FOUL",
    "TIMEOUT",
    "SUBSTITUTION",
    "PERIOD_START",
    "PERIOD_END",
  ]),
  teamId: z.string().optional(),
  playerId: z.string().optional(),
  notes: z.string().optional(),
});

export type RecordMatchEventInput = z.infer<typeof EventPayloadSchema>;

export async function recordMatchEvent(rawPayload: RecordMatchEventInput) {
  const payload = EventPayloadSchema.parse(rawPayload);

  return await prisma.$transaction(async (tx) => {
    // 1. Insert Match Event
    const event = await tx.matchEvent.create({
      data: {
        matchId: payload.matchId,
        minute: payload.minute,
        second: payload.second,
        period: payload.period,
        type: payload.type,
        teamId: payload.teamId,
        playerId: payload.playerId,
        notes: payload.notes,
      },
      include: {
        player: true,
      },
    });

    // 2. Compute Aggregates Based on Event Type
    if ((payload.type === "GOAL" || payload.type === "PENALTY_GOAL") && payload.teamId) {
      const match = await tx.match.findUniqueOrThrow({ where: { id: payload.matchId } });
      const isHome = match.homeTeamId === payload.teamId;

      await tx.match.update({
        where: { id: payload.matchId },
        data: isHome
          ? { homeScore: { increment: 1 } }
          : { awayScore: { increment: 1 } },
      });
    }

    if (payload.type === "OWN_GOAL" && payload.teamId) {
      const match = await tx.match.findUniqueOrThrow({ where: { id: payload.matchId } });
      const isHome = match.homeTeamId === payload.teamId;

      // An own goal by home team gives point to away team
      await tx.match.update({
        where: { id: payload.matchId },
        data: isHome
          ? { awayScore: { increment: 1 } }
          : { homeScore: { increment: 1 } },
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

    if (payload.type === "TIMEOUT" && payload.teamId) {
      const match = await tx.match.findUniqueOrThrow({ where: { id: payload.matchId } });
      const isHome = match.homeTeamId === payload.teamId;
      const isH1 = payload.period === "1H";

      if (isHome) {
        await tx.match.update({
          where: { id: payload.matchId },
          data: isH1 ? { homeTimeoutsH1: { increment: 1 } } : { homeTimeoutsH2: { increment: 1 } },
        });
      } else {
        await tx.match.update({
          where: { id: payload.matchId },
          data: isH1 ? { awayTimeoutsH1: { increment: 1 } } : { awayTimeoutsH2: { increment: 1 } },
        });
      }
    }

    revalidatePath(`/match/${payload.matchId}/live`);
    revalidatePath(`/live/${payload.matchId}`);

    return { success: true, event };
  });
}

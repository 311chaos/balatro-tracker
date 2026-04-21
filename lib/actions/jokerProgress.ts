"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { StickerLevel } from "@/config/types";

export async function upsertJokerProgress(jokerId: string, stickerLevel: StickerLevel) {
  const session = await auth();
  if (!session?.user?.id) return;

  await db.userJokerProgress.upsert({
    where: { userId_jokerId: { userId: session.user.id, jokerId } },
    create: { userId: session.user.id, jokerId, stickerLevel },
    update: { stickerLevel },
  });
}

export async function deleteJokerProgress(jokerId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await db.userJokerProgress.deleteMany({
    where: { userId: session.user.id, jokerId },
  });
}

export async function getJokerProgress(): Promise<Record<string, StickerLevel>> {
  const session = await auth();
  if (!session?.user?.id) return {};

  const rows = await db.userJokerProgress.findMany({
    where: { userId: session.user.id },
    select: { jokerId: true, stickerLevel: true },
  });

  return Object.fromEntries(rows.map((r) => [r.jokerId, r.stickerLevel as StickerLevel]));
}

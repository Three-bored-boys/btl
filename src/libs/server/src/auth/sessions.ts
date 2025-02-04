import { useDB } from "@/server/db/db";
import { eq } from "drizzle-orm";
import { users, sessions, Session, User } from "@/server/db/schema";
import { sanitizedUser } from "@/server/utils";
import { generateAuthSessionToken, encryptAuthSessionToken } from "./utils";
import { Context } from "hono";
import { Environment } from "@/root/bindings";

export type SanitizedUser = Omit<User, "hashedPassword">;
export type SessionValidationResult =
  | {
      user: SanitizedUser;
      session: Session;
    }
  | {
      user: null;
      session: null;
    };

export function generateSessionToken() {
  return generateAuthSessionToken();
}

export async function createSession(token: string, userId: number, c: Context<Environment>) {
  const sessionId = await encryptAuthSessionToken(token);
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await useDB(c, async (db) => {
    return db.insert(sessions).values(session);
  });
  return session;
}

export async function validateSessionToken(token: string, c: Context<Environment>): Promise<SessionValidationResult> {
  const sessionId = await encryptAuthSessionToken(token);

  const result = await useDB(c, async (db) => {
    return db
      .select({ user: users, session: sessions })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, sessionId));
  });

  if (!result) {
    return { session: null, user: null };
  }

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await invalidateSession(session.id, c);
    return { session: null, user: null };
  }

  return { session, user: sanitizedUser(user) };
}

export async function invalidateSession(sessionId: string, c: Context<Environment>) {
  await useDB(c, async (db) => {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  });
}

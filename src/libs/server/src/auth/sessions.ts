import { db } from "@/server/db/db";
import { eq } from "drizzle-orm";
import { users, sessions, Session, SanitizedUser } from "@/server/db/schema";
import { sanitizedUser } from "@/server/utils";
import { generateAuthSessionToken, encryptAuthSessionToken } from "./utils";
import { unstable_cache } from "next/cache";

export type SessionValidationResult =
  | {
      user: SanitizedUser;
      session: Session;
    }
  | {
      user: null;
      session: null;
    };

//////////////////////////////////////////////////////////////////////////////////////////////////////

export function generateSessionToken() {
  return generateAuthSessionToken();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export async function createSession(token: string, userId: number) {
  const sessionId = await encryptAuthSessionToken(token, process.env.SESSION_SECRET_KEY!);
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await db.insert(sessions).values(session);

  return session;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = await encryptAuthSessionToken(token, process.env.SESSION_SECRET_KEY!);

  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await invalidateSession(session.id);
    return { session: null, user: null };
  }

  return { session, user: sanitizedUser(user) };
}

export const cacheValidateSessionToken = unstable_cache(validateSessionToken, ["user-session"], {
  tags: ["user-session"],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

export async function invalidateSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

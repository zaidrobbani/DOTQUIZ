import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptSession, SESSION_COOKIE_NAME } from "./session";
import type { Session } from "./dto";

export const getOptionalSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return decryptSession(raw);
});

export const verifySession = cache(async (): Promise<Session> => {
  const session = await getOptionalSession();

  if (!session) {
    redirect("/login");
  }

  return session;
});

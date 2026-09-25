import "server-only";
import { SignJWT, jwtVerify } from "jose";
import type { Session, SessionPayload } from "./dto";

export const SESSION_COOKIE_NAME = "dotquiz_session";
export const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET belum diset. Tambahkan di file .env.local.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function encryptSession(
  payload: SessionPayload,
  expiresAt: Date,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecretKey());
}

export async function decryptSession(
  token: string | undefined,
): Promise<Session | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    if (typeof payload.username !== "string" || !payload.exp) {
      return null;
    }

    return { username: payload.username, expiresAt: payload.exp * 1000 };
  } catch {
    return null;
  }
}

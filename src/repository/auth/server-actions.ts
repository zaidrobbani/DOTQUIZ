"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema, type LoginActionState } from "./dto";
import {
  encryptSession,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_MS,
} from "./session";

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Nama tidak valid." };
  }

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await encryptSession(
    { username: parsed.data.username },
    expiresAt,
  );

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  redirect("/setup");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

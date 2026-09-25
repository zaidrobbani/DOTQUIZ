import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Nama minimal 3 karakter.")
    .max(20, "Nama maksimal 20 karakter.")
    .regex(
      /^[a-zA-Z0-9_ ]+$/,
      "Hanya huruf, angka, spasi, dan underscore yang diperbolehkan.",
    ),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export interface SessionPayload {
  username: string;
}

export interface Session extends SessionPayload {
  expiresAt: number;
}

export interface LoginActionState {
  error?: string;
}

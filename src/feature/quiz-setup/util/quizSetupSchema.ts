import { z } from "zod";

export const quizSetupSchema = z.object({
  amount: z.number().min(5, "Minimal 5 soal.").max(50, "Maksimal 50 soal."),
  categoryId: z.number().nullable(),
  difficulty: z.enum(["easy", "medium", "hard"]).nullable(),
  type: z.enum(["multiple", "boolean"]).nullable(),
  durationMinutes: z
    .number()
    .min(1, "Minimal 1 menit.")
    .max(30, "Maksimal 30 menit."),
});

export type QuizSetupFormValues = z.infer<typeof quizSetupSchema>;

export const DEFAULT_SETUP_VALUES: QuizSetupFormValues = {
  amount: 10,
  categoryId: null,
  difficulty: null,
  type: null,
  durationMinutes: 5,
};

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizQuestion, QuizSetupConfig } from "@/repository/trivia/dto";

export interface QuizAttemptResult {
  id: string;
  owner: string;
  finishedAt: number;
  reason: "completed" | "timeout";
  config: QuizSetupConfig;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  durationUsedSeconds: number;
  questions: QuizQuestion[];
  answers: Record<string, string | null>;
}

interface QuizHistoryState {
  attempts: QuizAttemptResult[];
  addAttempt: (attempt: QuizAttemptResult) => void;
  getById: (id: string) => QuizAttemptResult | undefined;
  clearForOwner: (owner: string) => void;
}

export const useQuizHistoryStore = create<QuizHistoryState>()(
  persist(
    (set, get) => ({
      attempts: [],
      addAttempt: (attempt) =>
        set((state) => ({ attempts: [attempt, ...state.attempts] })),
      getById: (id) => get().attempts.find((attempt) => attempt.id === id),
      clearForOwner: (owner) =>
        set((state) => ({
          attempts: state.attempts.filter((attempt) => attempt.owner !== owner),
        })),
    }),
    { name: "dotquiz-history" },
  ),
);

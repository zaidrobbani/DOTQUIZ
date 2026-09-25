import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizQuestion, QuizSetupConfig } from "@/repository/trivia/dto";
import {
  useQuizHistoryStore,
  type QuizAttemptResult,
} from "./quizHistoryStore";

export type QuizSessionStatus = "idle" | "in-progress" | "finished";

interface QuizSessionState {
  owner: string | null;
  status: QuizSessionStatus;
  config: QuizSetupConfig | null;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string | null>;
  startedAt: number | null;
  deadline: number | null;
  lastResultId: string | null;

  startSession: (
    owner: string,
    config: QuizSetupConfig,
    questions: QuizQuestion[],
  ) => void;
  answerCurrent: (option: string) => void;
  finalizeSession: (reason: "completed" | "timeout") => void;
  resetSession: () => void;
}

function buildResult(
  state: QuizSessionState,
  reason: "completed" | "timeout",
): QuizAttemptResult | null {
  if (
    !state.owner ||
    !state.config ||
    state.questions.length === 0 ||
    !state.startedAt
  ) {
    return null;
  }

  let correctCount = 0;
  let wrongCount = 0;
  let answeredCount = 0;

  for (const question of state.questions) {
    const answer = state.answers[question.id] ?? null;
    if (answer === null) continue;
    answeredCount += 1;
    if (answer === question.correctAnswer) correctCount += 1;
    else wrongCount += 1;
  }

  const totalQuestions = state.questions.length;

  return {
    id: crypto.randomUUID(),
    owner: state.owner,
    finishedAt: Date.now(),
    reason,
    config: state.config,
    totalQuestions,
    answeredCount,
    correctCount,
    wrongCount,
    unansweredCount: totalQuestions - answeredCount,
    durationUsedSeconds: Math.round((Date.now() - state.startedAt) / 1000),
    questions: state.questions,
    answers: state.answers,
  };
}

const initialState: Omit<
  QuizSessionState,
  "startSession" | "answerCurrent" | "finalizeSession" | "resetSession"
> = {
  owner: null,
  status: "idle",
  config: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  startedAt: null,
  deadline: null,
  lastResultId: null,
};

export const useQuizSessionStore = create<QuizSessionState>()(
  persist(
    (set, get) => ({
      ...initialState,

      startSession: (owner, config, questions) => {
        const now = Date.now();
        set({
          owner,
          status: "in-progress",
          config,
          questions,
          currentIndex: 0,
          answers: {},
          startedAt: now,
          deadline: now + config.durationSeconds * 1000,
          lastResultId: null,
        });
      },

      answerCurrent: (option) => {
        const state = get();
        if (state.status !== "in-progress") return;

        const question = state.questions[state.currentIndex];
        if (!question) return;

        const nextAnswers = { ...state.answers, [question.id]: option };
        const isLastQuestion = state.currentIndex >= state.questions.length - 1;

        if (isLastQuestion) {
          set({ answers: nextAnswers });
          get().finalizeSession("completed");
          return;
        }

        set({ answers: nextAnswers, currentIndex: state.currentIndex + 1 });
      },

      finalizeSession: (reason) => {
        const state = get();
        if (state.status !== "in-progress") return;

        const result = buildResult(state, reason);
        if (result) {
          useQuizHistoryStore.getState().addAttempt(result);
        }

        set({ status: "finished", lastResultId: result?.id ?? null });
      },

      resetSession: () => set({ ...initialState }),
    }),
    { name: "dotquiz-session" },
  ),
);

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ResultSummarySection from "../section/ResultSummarySection";
import AnswerReviewSection from "../section/AnswerReviewSection";
import LoadingScreen from "@/shared/ui/LoadingScreen";
import { useHasHydrated } from "@/shared/lib/useHasHydrated";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { useQuizHistoryStore } from "@/store/quizHistoryStore";
import { ROUTES } from "@/shared/util/constants";

export default function QuizResultContainer() {
  const router = useRouter();
  const hasHydrated = useHasHydrated(useQuizSessionStore);

  const lastResultId = useQuizSessionStore((state) => state.lastResultId);
  const resetSession = useQuizSessionStore((state) => state.resetSession);
  const result = useQuizHistoryStore((state) =>
    lastResultId ? state.getById(lastResultId) : undefined,
  );

  useEffect(() => {
    if (!hasHydrated) return;
    if (!lastResultId || !result) {
      router.replace(ROUTES.setup);
    }
  }, [hasHydrated, lastResultId, result, router]);

  if (!hasHydrated || !result) {
    return <LoadingScreen label="Menyiapkan hasil..." />;
  }

  const handleRestart = () => {
    resetSession();
    router.push(ROUTES.setup);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <ResultSummarySection result={result} onRestart={handleRestart} />
      <AnswerReviewSection result={result} />
    </div>
  );
}

"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "../components/QuestionCard";
import QuizProgressHeader from "../components/QuizProgressHeader";
import LoadingScreen from "@/shared/ui/LoadingScreen";
import { useCountdown } from "@/shared/lib/useCountdown";
import { useHasHydrated } from "@/shared/lib/useHasHydrated";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { ROUTES } from "@/shared/util/constants";

export default function QuizPlayContainer() {
  const router = useRouter();
  const hasHydrated = useHasHydrated(useQuizSessionStore);

  const status = useQuizSessionStore((state) => state.status);
  const questions = useQuizSessionStore((state) => state.questions);
  const currentIndex = useQuizSessionStore((state) => state.currentIndex);
  const deadline = useQuizSessionStore((state) => state.deadline);
  const answers = useQuizSessionStore((state) => state.answers);
  const answerCurrent = useQuizSessionStore((state) => state.answerCurrent);
  const finalizeSession = useQuizSessionStore((state) => state.finalizeSession);

  const handleExpire = useCallback(() => {
    finalizeSession("timeout");
  }, [finalizeSession]);

  const remainingMs = useCountdown(
    status === "in-progress" ? deadline : null,
    handleExpire,
  );

  useEffect(() => {
    if (!hasHydrated) return;

    if (status === "idle") {
      router.replace(ROUTES.setup);
    } else if (status === "finished") {
      router.replace(ROUTES.quizResult);
    }
  }, [hasHydrated, status, router]);

  if (!hasHydrated || status !== "in-progress") {
    return <LoadingScreen label="Menyiapkan kuis..." />;
  }

  const question = questions[currentIndex];
  if (!question) {
    return <LoadingScreen label="Menyiapkan kuis..." />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <QuizProgressHeader
        currentIndex={currentIndex}
        total={questions.length}
        answeredCount={Object.keys(answers).length}
        remainingMs={remainingMs}
      />
      <QuestionCard
        key={question.id}
        question={question}
        onSelect={(option) => answerCurrent(option)}
      />
    </div>
  );
}

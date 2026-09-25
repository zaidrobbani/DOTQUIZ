"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { QuizQuestion } from "@/repository/trivia/dto";
import { DIFFICULTY_LABEL, TYPE_LABEL } from "@/shared/util/constants";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function QuestionCard({
  question,
  onSelect,
}: {
  question: QuizQuestion;
  onSelect: (option: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [question.id] },
  );

  const handlePick = (option: string) => {
    if (picked) return;
    setPicked(option);
    window.setTimeout(() => onSelect(option), 400);
  };

  const isBoolean = question.type === "boolean";
  const difficulty = question.difficulty?.toLowerCase();

  return (
    <div
      ref={cardRef}
      className="question-card rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-9 shadow-xl shadow-indigo-500/5 backdrop-blur-md"
    >
      {/* Category & Difficulty Badges */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-lg px-2.5 py-1 text-xs font-semibold ring-1",
            difficulty === "easy" &&
              "bg-emerald-50 text-emerald-700 ring-emerald-200",
            difficulty === "medium" &&
              "bg-amber-50 text-amber-700 ring-amber-200",
            difficulty === "hard" && "bg-rose-50 text-rose-700 ring-rose-200",
            !["easy", "medium", "hard"].includes(difficulty) &&
              "bg-slate-100 text-slate-700 ring-slate-200",
          )}
        >
          {DIFFICULTY_LABEL[question.difficulty] ?? question.difficulty}
        </span>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200/70">
          {question.category}
        </span>
        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200/60">
          {TYPE_LABEL[question.type] ?? question.type}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="mb-8 text-xl font-bold leading-relaxed text-slate-900 sm:text-2xl">
        {question.question}
      </h2>

      {/* Options Grid */}
      <div
        className={cn(
          "grid gap-3.5",
          isBoolean
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2",
        )}
      >
        {question.options.map((option, index) => {
          const isPicked = picked === option;
          const isCorrect =
            picked !== null && option === question.correctAnswer;
          const isWrongPick = isPicked && option !== question.correctAnswer;

          return (
            <button
              key={option}
              type="button"
              disabled={picked !== null}
              onClick={() => handlePick(option)}
              className={cn(
                "group relative flex items-center gap-3.5 rounded-2xl border-2 p-4 sm:p-4.5 text-left transition-all duration-200 cursor-pointer",
                picked === null &&
                  "border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-xs active:scale-[0.99]",
                picked !== null &&
                  !isPicked &&
                  !isCorrect &&
                  "opacity-50 border-slate-200 bg-slate-50 cursor-default",
                isCorrect &&
                  "border-emerald-500 bg-emerald-50/90 text-emerald-900 shadow-sm ring-2 ring-emerald-200 font-semibold cursor-default",
                isWrongPick &&
                  "border-rose-500 bg-rose-50/90 text-rose-900 shadow-sm ring-2 ring-rose-200 font-semibold cursor-default",
              )}
            >
              {/* Option Letter Pill */}
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors",
                  picked === null &&
                    "bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white",
                  isCorrect && "bg-emerald-600 text-white",
                  isWrongPick && "bg-rose-600 text-white",
                  picked !== null &&
                    !isPicked &&
                    !isCorrect &&
                    "bg-slate-200 text-slate-400",
                )}
              >
                {OPTION_LETTERS[index] || index + 1}
              </span>

              <span className="flex-1 text-sm sm:text-base leading-snug">
                {option}
              </span>

              {/* Status Icons */}
              {isCorrect ? (
                <span className="text-emerald-600 font-bold text-lg">✓</span>
              ) : null}
              {isWrongPick ? (
                <span className="text-rose-600 font-bold text-lg">✕</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

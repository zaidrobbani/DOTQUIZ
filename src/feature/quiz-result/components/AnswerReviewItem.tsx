import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import type { QuizQuestion } from "@/repository/trivia/dto";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function AnswerReviewItem({
  index,
  question,
  userAnswer,
}: {
  index: number;
  question: QuizQuestion;
  userAnswer: string | null;
}) {
  const isCorrect = userAnswer === question.correctAnswer;
  const isUnanswered = userAnswer === null;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5 transition-all">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 flex-1">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700 mt-0.5">
            {index + 1}
          </span>
          <span className="text-sm sm:text-base font-bold leading-relaxed text-slate-900">
            {question.question}
          </span>
        </div>

        {/* Verdict Badge */}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold ring-1 shrink-0",
            isUnanswered && "bg-slate-100 text-slate-600 ring-slate-200",
            isCorrect && "bg-emerald-50 text-emerald-700 ring-emerald-200",
            !isCorrect &&
              !isUnanswered &&
              "bg-rose-50 text-rose-700 ring-rose-200",
          )}
        >
          {isUnanswered ? (
            <>
              <MinusCircleFilled className="text-slate-400" />
              <span>Dilewati</span>
            </>
          ) : isCorrect ? (
            <>
              <CheckCircleFilled className="text-emerald-600" />
              <span>Benar</span>
            </>
          ) : (
            <>
              <CloseCircleFilled className="text-rose-600" />
              <span>Salah</span>
            </>
          )}
        </span>
      </div>

      {/* Options */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {question.options.map((option, optIdx) => {
          const isThisCorrect = option === question.correctAnswer;
          const isThisUserPick = option === userAnswer;

          return (
            <div
              key={option}
              className={cn(
                "flex items-center justify-between rounded-xl border p-3 text-sm transition-all",
                !isThisCorrect &&
                  !isThisUserPick &&
                  "border-slate-200 bg-white text-slate-600",
                isThisCorrect &&
                  "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-1 ring-emerald-200",
                isThisUserPick &&
                  !isThisCorrect &&
                  "border-rose-400 bg-rose-50/90 text-rose-950 font-semibold ring-1 ring-rose-200",
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold",
                    isThisCorrect
                      ? "bg-emerald-600 text-white"
                      : isThisUserPick
                        ? "bg-rose-600 text-white"
                        : "bg-slate-100 text-slate-500",
                  )}
                >
                  {OPTION_LETTERS[optIdx] || optIdx + 1}
                </span>
                <span>{option}</span>
              </div>

              {isThisCorrect ? (
                <span className="text-xs font-bold text-emerald-700">
                  ✓ Kunci
                </span>
              ) : null}
              {isThisUserPick && !isThisCorrect ? (
                <span className="text-xs font-bold text-rose-700">
                  ✕ Jawabanmu
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

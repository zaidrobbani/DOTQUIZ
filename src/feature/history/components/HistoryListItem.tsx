import Link from "next/link";
import {
  RightOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { QuizAttemptResult } from "@/store/quizHistoryStore";
import { DIFFICULTY_LABEL, ROUTES } from "@/shared/util/constants";
import { cn, formatClock } from "@/lib/utils";

export default function HistoryListItem({
  attempt,
}: {
  attempt: QuizAttemptResult;
}) {
  const percent =
    attempt.totalQuestions > 0
      ? Math.round((attempt.correctCount / attempt.totalQuestions) * 100)
      : 0;
  const date = new Date(attempt.finishedAt).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const difficultyColors = {
    easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    hard: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <Link href={ROUTES.historyDetail(attempt.id)} className="block group">
      <div className="history-item rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:border-indigo-300 hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-indigo-600">
              {attempt.config.categoryName}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {attempt.config.difficulty ? (
                <span
                  className={cn(
                    "inline-flex items-center rounded-md border px-2 py-0.5 font-semibold",
                    difficultyColors[attempt.config.difficulty] ||
                      "bg-slate-50 text-slate-600 border-slate-200",
                  )}
                >
                  {DIFFICULTY_LABEL[attempt.config.difficulty]}
                </span>
              ) : null}

              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-medium text-slate-600">
                <QuestionCircleOutlined className="text-slate-400" />
                {attempt.totalQuestions} Soal
              </span>

              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-medium text-slate-600">
                <ClockCircleOutlined className="text-slate-400" />
                {formatClock(attempt.durationUsedSeconds)}
              </span>

              <span className="inline-flex items-center gap-1 text-slate-400 ml-1">
                <CalendarOutlined />
                {date}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
            <div className="text-left sm:text-right">
              <span
                className={cn(
                  "inline-block rounded-xl px-3 py-1 text-base font-extrabold shadow-2xs",
                  percent >= 80
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : percent >= 60
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200",
                )}
              >
                {percent}%
              </span>
              <p className="mt-0.5 text-xs text-slate-400 font-medium">
                {attempt.correctCount} / {attempt.totalQuestions} Benar
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:translate-x-0.5">
              <RightOutlined className="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import type { QuizAttemptResult } from "@/store/quizHistoryStore";
import {
  TrophyOutlined,
  BarChartOutlined,
  FireOutlined,
} from "@ant-design/icons";

function scorePercent(attempt: QuizAttemptResult) {
  return attempt.totalQuestions > 0
    ? Math.round((attempt.correctCount / attempt.totalQuestions) * 100)
    : 0;
}

export default function HistoryStatsCards({
  attempts,
}: {
  attempts: QuizAttemptResult[];
}) {
  const totalAttempts = attempts.length;
  const averagePercent =
    totalAttempts > 0
      ? Math.round(
          attempts.reduce((sum, attempt) => sum + scorePercent(attempt), 0) /
            totalAttempts,
        )
      : 0;
  const bestPercent =
    totalAttempts > 0 ? Math.max(...attempts.map(scorePercent)) : 0;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Total Kuis */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Kuis
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              {totalAttempts}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
            <BarChartOutlined />
          </div>
        </div>
      </div>

      {/* Rata-rata */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rata-rata Skor
            </p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                {averagePercent}
              </span>
              <span className="text-sm font-semibold text-slate-400">%</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-600">
            <FireOutlined />
          </div>
        </div>
      </div>

      {/* Skor Terbaik */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Skor Terbaik
            </p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-emerald-600 sm:text-3xl">
                {bestPercent}
              </span>
              <span className="text-sm font-semibold text-emerald-500">%</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
            <TrophyOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

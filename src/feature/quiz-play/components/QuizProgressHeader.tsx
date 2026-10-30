"use client";

import { Progress } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { formatClock } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function QuizProgressHeader({
  currentIndex,
  total,
  answeredCount,
  remainingMs,
}: {
  currentIndex: number;
  total: number;
  answeredCount: number;
  remainingMs: number;
}) {
  const percent =
    total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const remainingSeconds = remainingMs / 1000;
  const isUrgent = remainingSeconds <= 30;

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-xs backdrop-blur-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200/50">
            Soal {currentIndex + 1} / {total}
          </span>
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            • {answeredCount} terjawab
          </span>
        </div>

        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3.5 py-1 text-sm font-bold font-mono transition-all shadow-2xs",
            isUrgent
              ? "border border-rose-300 bg-rose-50 text-rose-600 animate-pulse ring-2 ring-rose-200"
              : "border border-slate-200 bg-white text-slate-700",
          )}
        >
          <ClockCircleOutlined
            className={isUrgent ? "text-rose-500" : "text-indigo-600"}
          />
          <span>{formatClock(remainingSeconds)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor={{
            "0%": "#6366f1",
            "100%": "#4f46e5",
          }}
          railColor="#f1f5f9"
          size={["100%", 8]}
          className="m-0!"
        />
        <div className="flex justify-between text-[11px] font-medium text-slate-400 pt-0.5">
          <span>Mulai</span>
          <span>Progres: {percent}%</span>
          <span>Selesai</span>
        </div>
      </div>
    </div>
  );
}

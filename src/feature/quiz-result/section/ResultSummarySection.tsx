"use client";

import { useRef, type ReactNode } from "react";
import { Button } from "antd";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScoreRing from "../components/ScoreRing";
import StatsGrid from "../components/StatsGrid";
import type { QuizAttemptResult } from "@/store/quizHistoryStore";
import { DIFFICULTY_LABEL, ROUTES, TYPE_LABEL } from "@/shared/util/constants";

import {
  ReloadOutlined,
  HistoryOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

export default function ResultSummarySection({
  result,
  onRestart,
  footer,
}: {
  result: QuizAttemptResult;
  onRestart?: () => void;
  footer?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".score-ring",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
      );
      gsap.fromTo(
        ".stats-grid > *",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          delay: 0.15,
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  const { config } = result;
  const percent =
    result.totalQuestions > 0
      ? Math.round((result.correctCount / result.totalQuestions) * 100)
      : 0;

  const isGreat = percent >= 80;
  const isGood = percent >= 60;

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      {/* Score Hero Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-10 text-center shadow-xl shadow-indigo-500/5 backdrop-blur-md">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 mb-6">
          <span>{config.categoryName}</span>
          <span>•</span>
          <span>
            {config.difficulty
              ? DIFFICULTY_LABEL[config.difficulty]
              : "Semua Kesulitan"}
          </span>
          <span>•</span>
          <span>{config.type ? TYPE_LABEL[config.type] : "Semua Tipe"}</span>
        </div>

        <div className="score-ring my-2 flex justify-center">
          <ScoreRing
            correct={result.correctCount}
            total={result.totalQuestions}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              isGreat
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : isGood
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                  : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
            }`}
          >
            <TrophyOutlined />
            <span>
              {isGreat
                ? "Hasil Luar Biasa!"
                : isGood
                  ? "Pencapaian Bagus!"
                  : "Tetap Semangat & Latihan Lagi!"}
            </span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {result.reason === "timeout"
              ? "Waktu Pengerjaan Habis!"
              : "Kuis Berhasil Diselesaikan!"}
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-md">
            Kamu berhasil menjawab{" "}
            <strong className="text-slate-800">{result.correctCount}</strong>{" "}
            dari{" "}
            <strong className="text-slate-800">{result.totalQuestions}</strong>{" "}
            soal dengan benar.
          </p>
        </div>
      </div>

      {/* Stats Breakdown */}
      <StatsGrid
        total={result.totalQuestions}
        answered={result.answeredCount}
        correct={result.correctCount}
        wrong={result.wrongCount}
        unanswered={result.unansweredCount}
        durationUsedSeconds={result.durationUsedSeconds}
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        {footer ?? (
          <>
            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              onClick={onRestart}
              className="!h-12 !px-8 !rounded-xl !text-base !font-semibold !shadow-md !shadow-indigo-500/25"
            >
              Mulai Kuis Baru
            </Button>
            <Link href={ROUTES.history}>
              <Button
                size="large"
                icon={<HistoryOutlined />}
                className="!h-12 !px-6 !rounded-xl !text-base !font-medium hover:!border-indigo-400"
              >
                Lihat Riwayat
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

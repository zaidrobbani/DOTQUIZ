"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { App as AntdApp } from "antd";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import QuizSetupForm from "../section/QuizSetupForm";
import type { QuizSetupFormValues } from "../util/quizSetupSchema";
import {
  useCategoriesQuery,
  useStartQuizMutation,
} from "@/repository/trivia/query";
import type { QuizSetupConfig } from "@/repository/trivia/dto";
import { useAuthStore } from "@/store/authStore";
import { useQuizSessionStore } from "@/store/quizSessionStore";
import { ROUTES } from "@/shared/util/constants";

export default function QuizSetupContainer() {
  const router = useRouter();
  const { message } = AntdApp.useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const username = useAuthStore((state) => state.username);
  const startSession = useQuizSessionStore((state) => state.startSession);

  const categoriesQuery = useCategoriesQuery();
  const startQuizMutation = useStartQuizMutation();

  useGSAP(
    () => {
      gsap.fromTo(
        ".setup-card",
        { opacity: 0, y: 16, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
      );
    },
    { scope: containerRef },
  );

  const handleSubmit = (values: QuizSetupFormValues) => {
    if (!username) return;

    const category = categoriesQuery.data?.find(
      (item) => item.id === values.categoryId,
    );

    const config: QuizSetupConfig = {
      amount: values.amount,
      categoryId: values.categoryId,
      categoryName: category?.name ?? "Semua Kategori",
      difficulty: values.difficulty,
      type: values.type,
      durationSeconds: values.durationMinutes * 60,
    };

    startQuizMutation.mutate(config, {
      onSuccess: (questions) => {
        startSession(username, config, questions);
        router.push(ROUTES.quizPlay);
      },
      onError: (error) => {
        message.error(error.message || "Gagal memuat soal kuis.");
      },
    });
  };

  return (
    <div ref={containerRef} className="mx-auto max-w-xl">
      <div className="setup-card rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-9 shadow-xl shadow-indigo-500/5 backdrop-blur-md">
        <div className="mb-6 flex flex-col items-start gap-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            <span>🎯</span>
            <span>Konfigurasi Sesi</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Atur Kuismu
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sesuaikan parameter soal sesuai minatmu, lalu tekan mulai ketika
            siap.
          </p>
        </div>

        <QuizSetupForm
          categories={categoriesQuery.data ?? []}
          loadingCategories={categoriesQuery.isLoading}
          submitting={startQuizMutation.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

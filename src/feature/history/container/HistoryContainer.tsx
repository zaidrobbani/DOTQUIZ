"use client";

import { useMemo, useRef } from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HistoryStatsCards from "../components/HistoryStatsCards";
import HistoryListSection from "../section/HistoryListSection";
import LoadingScreen from "@/shared/ui/LoadingScreen";
import { useHasHydrated } from "@/shared/lib/useHasHydrated";
import { useAuthStore } from "@/store/authStore";
import { useQuizHistoryStore } from "@/store/quizHistoryStore";

export default function HistoryContainer() {
  const hasHydrated = useHasHydrated(useQuizHistoryStore);
  const username = useAuthStore((state) => state.username);
  const allAttempts = useQuizHistoryStore((state) => state.attempts);
  const clearForOwner = useQuizHistoryStore((state) => state.clearForOwner);
  const attempts = useMemo(
    () =>
      username
        ? allAttempts
            .filter((attempt) => attempt.owner === username)
            .sort((a, b) => b.finishedAt - a.finishedAt)
        : [],
    [allAttempts, username],
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".history-animate",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [attempts.length], scope: containerRef },
  );

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  return (
    <div ref={containerRef} className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="history-animate flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 mb-2">
            <HistoryOutlined />
            <span>Aktivitas & Performa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
            Riwayat Kuis
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Lihat kembali catatan performa dan kuis-kuis yang telah kamu
            selesaikan.
          </p>
        </div>

        {attempts.length > 0 && username ? (
          <Popconfirm
            title="Hapus semua riwayat?"
            description="Semua riwayat kuis kamu akan dihapus secara permanen."
            okText="Ya, Hapus Semua"
            cancelText="Batal"
            okButtonProps={{ danger: true }}
            onConfirm={() => clearForOwner(username)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              className="!h-10 !rounded-xl !border-rose-200 !bg-rose-50/50 !text-rose-600 hover:!bg-rose-100/60 self-start sm:self-auto"
            >
              Hapus Riwayat
            </Button>
          </Popconfirm>
        ) : null}
      </div>

      {/* Stats Cards */}
      {attempts.length > 0 ? (
        <div className="history-animate">
          <HistoryStatsCards attempts={attempts} />
        </div>
      ) : null}

      {/* List Section */}
      <div className="history-animate">
        <HistoryListSection attempts={attempts} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";
import { ArrowLeftOutlined, HistoryOutlined } from "@ant-design/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ResultSummarySection from "@/feature/quiz-result/section/ResultSummarySection";
import AnswerReviewSection from "@/feature/quiz-result/section/AnswerReviewSection";
import LoadingScreen from "@/shared/ui/LoadingScreen";
import { useHasHydrated } from "@/shared/lib/useHasHydrated";
import { useQuizHistoryStore } from "@/store/quizHistoryStore";
import { ROUTES } from "@/shared/util/constants";

export default function HistoryDetailContainer({
  attemptId,
}: {
  attemptId: string;
}) {
  const router = useRouter();
  const hasHydrated = useHasHydrated(useQuizHistoryStore);
  const result = useQuizHistoryStore((state) => state.getById(attemptId));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!result) {
      router.replace(ROUTES.history);
    }
  }, [hasHydrated, result, router]);

  useGSAP(
    () => {
      if (result) {
        gsap.fromTo(
          ".detail-animate",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
        );
      }
    },
    { dependencies: [Boolean(result)], scope: containerRef },
  );

  if (!hasHydrated || !result) {
    return <LoadingScreen />;
  }

  return (
    <div ref={containerRef} className="mx-auto max-w-3xl space-y-6">
      <div className="detail-animate flex items-center justify-between">
        <Link href={ROUTES.history}>
          <Button
            icon={<ArrowLeftOutlined />}
            size="large"
            className="!h-10 !rounded-xl !border-slate-200 !text-slate-600 hover:!border-indigo-400 hover:!text-indigo-600"
          >
            Kembali ke Riwayat
          </Button>
        </Link>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700">
          <HistoryOutlined />
          <span>Detail Hasil Kuis</span>
        </div>
      </div>

      <div className="detail-animate">
        <ResultSummarySection
          result={result}
          footer={
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href={ROUTES.history}>
                <Button
                  size="large"
                  className="!h-11 !rounded-xl !px-6 !font-semibold"
                >
                  Kembali ke Riwayat
                </Button>
              </Link>
              <Link href={ROUTES.setup}>
                <Button
                  type="primary"
                  size="large"
                  className="!h-11 !rounded-xl !bg-indigo-600 !px-6 !font-semibold hover:!bg-indigo-700"
                >
                  Coba Kuis Lain
                </Button>
              </Link>
            </div>
          }
        />
      </div>

      <div className="detail-animate">
        <AnswerReviewSection result={result} />
      </div>
    </div>
  );
}

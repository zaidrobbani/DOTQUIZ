import HistoryListItem from "../components/HistoryListItem";
import EmptyState from "@/shared/ui/EmptyState";
import type { QuizAttemptResult } from "@/store/quizHistoryStore";
import { ROUTES } from "@/shared/util/constants";

export default function HistoryListSection({
  attempts,
}: {
  attempts: QuizAttemptResult[];
}) {
  if (attempts.length === 0) {
    return (
      <EmptyState
        title="Belum Ada Riwayat Kuis"
        description="Kuis yang sudah kamu selesaikan akan tersimpan otomatis di sini. Ayo uji wawasanmu sekarang!"
        actionText="Mulai Kuis Pertama"
        actionHref={ROUTES.setup}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {attempts.map((attempt) => (
        <HistoryListItem key={attempt.id} attempt={attempt} />
      ))}
    </div>
  );
}

import HistoryDetailContainer from "@/feature/history/container/HistoryDetailContainer";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;

  return <HistoryDetailContainer attemptId={attemptId} />;
}

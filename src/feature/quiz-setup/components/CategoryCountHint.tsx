"use client";

import { Skeleton } from "antd";
import { useCategoryCountQuery } from "@/repository/trivia/query";

export default function CategoryCountHint({
  categoryId,
}: {
  categoryId: number | null;
}) {
  const { data, isLoading } = useCategoryCountQuery(categoryId);

  if (categoryId === null) return null;
  if (isLoading) {
    return <Skeleton.Input active size="small" style={{ width: 260 }} />;
  }
  if (!data) return null;

  const count = data.category_question_count;

  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs">
      <div className="mb-2 flex items-center justify-between font-semibold text-indigo-950">
        <span>Tersedia di Kategori Ini:</span>
        <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-white font-bold">
          {count.total_question_count} Soal
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-slate-700">
        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-emerald-200 text-emerald-700 font-medium shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Mudah: {count.total_easy_question_count}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-amber-200 text-amber-700 font-medium shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Sedang: {count.total_medium_question_count}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-rose-200 text-rose-700 font-medium shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Sulit: {count.total_hard_question_count}
        </span>
      </div>
    </div>
  );
}

import { Collapse } from "antd";
import { FormOutlined } from "@ant-design/icons";
import AnswerReviewItem from "../components/AnswerReviewItem";
import type { QuizAttemptResult } from "@/store/quizHistoryStore";

export default function AnswerReviewSection({
  result,
}: {
  result: QuizAttemptResult;
}) {
  return (
    <div className="mt-8">
      <Collapse
        className="!rounded-2xl !border-slate-200/80 !bg-white/95 !shadow-sm overflow-hidden"
        items={[
          {
            key: "review",
            label: (
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 font-bold text-slate-800 text-base">
                  <FormOutlined className="text-indigo-600" />
                  <span>Tinjau Pembahasan Soal</span>
                </span>
                <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-bold text-indigo-700">
                  {result.correctCount} / {result.totalQuestions} Benar
                </span>
              </div>
            ),
            children: (
              <div className="flex flex-col gap-4 py-2">
                {result.questions.map((question, index) => (
                  <AnswerReviewItem
                    key={question.id}
                    index={index}
                    question={question}
                    userAnswer={result.answers[question.id] ?? null}
                  />
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

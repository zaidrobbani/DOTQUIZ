import {
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  MinusCircleFilled,
  EditFilled,
  FileTextFilled,
} from "@ant-design/icons";
import { formatClock } from "@/lib/utils";

export default function StatsGrid({
  total,
  answered,
  correct,
  wrong,
  unanswered,
  durationUsedSeconds,
}: {
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  unanswered: number;
  durationUsedSeconds: number;
}) {
  const items = [
    {
      title: "Total Soal",
      value: total,
      icon: <FileTextFilled className="text-indigo-600" />,
      bg: "bg-indigo-50/60 border-indigo-100",
      textColor: "text-slate-800",
    },
    {
      title: "Terjawab",
      value: answered,
      icon: <EditFilled className="text-blue-600" />,
      bg: "bg-blue-50/60 border-blue-100",
      textColor: "text-slate-800",
    },
    {
      title: "Benar",
      value: correct,
      icon: <CheckCircleFilled className="text-emerald-600" />,
      bg: "bg-emerald-50/60 border-emerald-100",
      textColor: "text-emerald-700",
    },
    {
      title: "Salah",
      value: wrong,
      icon: <CloseCircleFilled className="text-rose-600" />,
      bg: "bg-rose-50/60 border-rose-100",
      textColor: "text-rose-700",
    },
    {
      title: "Tidak Dijawab",
      value: unanswered,
      icon: <MinusCircleFilled className="text-slate-400" />,
      bg: "bg-slate-50 border-slate-200/60",
      textColor: "text-slate-600",
    },
    {
      title: "Waktu Terpakai",
      value: formatClock(durationUsedSeconds),
      icon: <ClockCircleFilled className="text-amber-500" />,
      bg: "bg-amber-50/60 border-amber-100",
      textColor: "text-amber-700",
    },
  ];

  return (
    <div className="stats-grid grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 my-6">
      {items.map((item) => (
        <div
          key={item.title}
          className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border ${item.bg} text-center shadow-2xs transition-all hover:scale-[1.01]`}
        >
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <span
            className={`text-2xl sm:text-3xl font-black tracking-tight ${item.textColor}`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

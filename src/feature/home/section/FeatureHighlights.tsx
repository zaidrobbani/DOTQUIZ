import {
  ClockCircleOutlined,
  DatabaseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const FEATURES = [
  {
    icon: <DatabaseOutlined className="text-2xl text-indigo-600" />,
    badgeBg: "bg-indigo-50 border-indigo-100",
    title: "Setup Fleksibel",
    description:
      "Pilih kategori, tingkat kesulitan, tipe soal pilihan ganda atau benar/salah, serta tentukan durasi pengerjaan bebas sesuai preferensimu.",
  },
  {
    icon: <ClockCircleOutlined className="text-2xl text-amber-500" />,
    badgeBg: "bg-amber-50 border-amber-100",
    title: "Timer Nyata & Presisi",
    description:
      "Satu timer global terintegrasi untuk seluruh kuis. Sistem menghitung sisa waktu secara akurat berdasarkan timestamp nyata.",
  },
  {
    icon: <ReloadOutlined className="text-2xl text-emerald-600" />,
    badgeBg: "bg-emerald-50 border-emerald-100",
    title: "Resume Otomatis Cerdas",
    description:
      "Koneksi terputus atau browser tertutup? DotQuiz otomatis memulihkan soal terakhir dan sisa waktu pengerjaanmu saat kembali.",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="feature-highlights mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="highlight-card group relative flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 backdrop-blur-xs"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${feature.badgeBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}
            >
              {feature.icon}
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

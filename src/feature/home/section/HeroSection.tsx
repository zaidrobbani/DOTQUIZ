import Link from "next/link";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { ROUTES } from "@/shared/util/constants";

export default function HeroSection({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <section className="hero-section flex flex-col items-center px-4 pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
      {/* Top Navbar Header for Landing */}
      <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-4 py-1.5 shadow-xs backdrop-blur-xs">
        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-indigo-700 uppercase">
          Ditenagai Open Trivia DB
        </span>
      </div>

      <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.15]">
        Satu Soal, Satu Waktu.{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
          Uji Ketangkasan Berpikirmu.
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Atur sendiri kategori, tingkat kesulitan, jumlah soal, dan durasi
        pengerjaan. Timer terus berjalan secara presisi meski browser ditutup —
        DotQuiz otomatis menyimpan dan melanjutkan progresmu tanpa kehilangan
        data.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href={isAuthenticated ? ROUTES.setup : ROUTES.login}>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
            className="!h-13 !px-8 !text-base !font-semibold !shadow-lg !shadow-indigo-500/30 hover:!scale-[1.02] active:!scale-[0.98] transition-transform"
          >
            {isAuthenticated ? "Mulai Atur Kuis" : "Mulai Main Sekarang"}
          </Button>
        </Link>

        {isAuthenticated ? (
          <Link href={ROUTES.history}>
            <Button
              size="large"
              icon={<HistoryOutlined />}
              className="!h-13 !px-6 !text-base !font-medium hover:!border-indigo-400"
            >
              Lihat Riwayat
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Feature Pills */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <CheckCircleOutlined className="text-emerald-500 text-sm" />
          <span>Timer Nyata Real-time</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleOutlined className="text-emerald-500 text-sm" />
          <span>Resume Otomatis</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleOutlined className="text-emerald-500 text-sm" />
          <span>20+ Kategori Trivia</span>
        </div>
      </div>
    </section>
  );
}

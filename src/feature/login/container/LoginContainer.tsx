"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LoginForm from "../components/LoginForm";
import GradientBackground from "@/shared/ui/GradientBackground";
import Logo from "@/shared/ui/Logo";
import { ROUTES } from "@/shared/util/constants";

export default function LoginContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".login-card",
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      );
    },
    { scope: containerRef },
  );

  return (
    <GradientBackground className="flex min-h-screen flex-col justify-between p-4 sm:p-6">
      {/* Top Bar with back link */}
      <div className="mx-auto w-full max-w-5xl flex items-center justify-between">
        <Link
          href={ROUTES.home}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
        >
          <ArrowLeftOutlined />
          <span>Kembali ke Beranda</span>
        </Link>
        <Logo className="text-base" />
      </div>

      {/* Main Login Card */}
      <div ref={containerRef} className="mx-auto my-auto w-full max-w-md py-8">
        <div className="login-card rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-md sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/25">
              <span className="text-2xl font-bold">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Selamat Datang!
            </h1>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Masukkan nama panggilanmu untuk langsung mulai bermain kuis
              trivia.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>

      {/* Subtle Footer */}
      <div className="text-center text-xs text-slate-400 py-2">
        DotQuiz &bull; Tantang Wawasan &amp; Kecepatan Berpikir
      </div>
    </GradientBackground>
  );
}

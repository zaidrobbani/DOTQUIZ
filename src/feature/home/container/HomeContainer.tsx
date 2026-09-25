"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Button } from "antd";
import HeroSection from "../section/HeroSection";
import FeatureHighlights from "../section/FeatureHighlights";
import GradientBackground from "@/shared/ui/GradientBackground";
import Logo from "@/shared/ui/Logo";
import { ROUTES } from "@/shared/util/constants";

export default function HomeContainer({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-section > *",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
      gsap.fromTo(
        ".highlight-card",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <GradientBackground className="min-h-screen flex flex-col justify-between">
      {/* Landing Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href={ROUTES.home} className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link href={isAuthenticated ? ROUTES.setup : ROUTES.login}>
              <Button
                type="primary"
                className="!font-semibold !rounded-xl !h-10"
              >
                {isAuthenticated ? "Masuk ke Kuis" : "Masuk"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div ref={containerRef} className="flex-1">
        <HeroSection isAuthenticated={isAuthenticated} />
        <FeatureHighlights />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white/60 py-6 text-center text-xs text-slate-500 backdrop-blur-xs">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            &copy; {new Date().getFullYear()} DotQuiz. All rights reserved.
          </span>
          <span>Open Trivia Database API Integration</span>
        </div>
      </footer>
    </GradientBackground>
  );
}

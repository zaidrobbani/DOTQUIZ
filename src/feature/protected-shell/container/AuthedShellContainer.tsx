"use client";

import { useEffect, type ReactNode } from "react";
import AppNavbar from "../components/AppNavbar";
import GradientBackground from "@/shared/ui/GradientBackground";
import { useAuthStore } from "@/store/authStore";

export default function AuthedShellContainer({
  username,
  children,
}: {
  username: string;
  children: ReactNode;
}) {
  const setUsername = useAuthStore((state) => state.setUsername);

  useEffect(() => {
    setUsername(username);
    return () => setUsername(null);
  }, [username, setUsername]);

  return (
    <GradientBackground className="min-h-screen flex flex-col">
      <AppNavbar username={username} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
    </GradientBackground>
  );
}

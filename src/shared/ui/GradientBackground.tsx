import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GradientBackground({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("dotquiz-gradient-bg min-h-screen w-full", className)}>
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-lg font-bold tracking-tight",
        className,
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-amber-400 text-white">
        Q
      </span>
      <span>
        Dot<span className="text-indigo-600">Quiz</span>
      </span>
    </span>
  );
}

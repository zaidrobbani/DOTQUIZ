"use client";

import { useEffect, useState } from "react";

export function useCountdown(deadline: number | null, onExpire?: () => void) {
  const [remainingMs, setRemainingMs] = useState(() =>
    deadline ? Math.max(0, deadline - Date.now()) : 0,
  );

  useEffect(() => {
    if (!deadline) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const tick = () => {
      const next = Math.max(0, deadline - Date.now());
      setRemainingMs(next);
      if (next <= 0 && interval) {
        clearInterval(interval);
        onExpire?.();
      }
    };

    tick();
    interval = setInterval(tick, 250);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [deadline, onExpire]);

  return deadline ? remainingMs : 0;
}

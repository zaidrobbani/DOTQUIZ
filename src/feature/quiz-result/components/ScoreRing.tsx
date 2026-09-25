"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "antd";
import gsap from "gsap";

export default function ScoreRing({
  correct,
  total,
}: {
  correct: number;
  total: number;
}) {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const [display, setDisplay] = useState(0);
  const animatedValue = useRef({ value: 0 });

  useEffect(() => {
    const target = animatedValue.current;
    gsap.to(target, {
      value: percent,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(target.value)),
    });
  }, [percent]);

  return (
    <Progress
      type="circle"
      percent={display}
      size={140}
      strokeColor={{ "0%": "#4f46e5", "100%": "#f59e0b" }}
      format={() => (
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{display}%</span>
          <span className="text-xs text-gray-400">
            {correct}/{total} benar
          </span>
        </div>
      )}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 2,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      if (current >= 1_000_000) {
        setDisplay((current / 1_000_000).toFixed(decimals) + "M");
      } else if (current >= 1_000) {
        setDisplay((current / 1_000).toFixed(decimals) + "K");
      } else {
        setDisplay(current.toFixed(decimals));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, decimals, duration]);

  return (
    <motion.span
      ref={ref}
      className={`font-[family-name:var(--font-jetbrains)] tabular-nums ${className}`}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

export function CircuitDivider({ className }: { className?: string }) {
  const gradientId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-10 w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--accent-cyan)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--accent-violet)" stopOpacity="0.8" />
            <stop offset="65%" stopColor="var(--accent-violet)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,20 L440,20 L440,30 L560,30 L560,10 L640,10 L640,20 L1200,20"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: "easeInOut" }}
        />
        <motion.circle
          cx="600"
          cy="20"
          r="4"
          fill="var(--accent-violet)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.9 }}
        />
      </svg>
    </div>
  );
}

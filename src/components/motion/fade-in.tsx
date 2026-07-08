"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function FadeIn({ delay = 0, children, ...props }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

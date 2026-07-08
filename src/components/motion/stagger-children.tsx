"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function StaggerContainer({ children, ...props }: HTMLMotionProps<"div">) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={shouldReduceMotion ? { staggerChildren: 0 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  );
}

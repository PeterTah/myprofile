"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, color-mix(in oklch, var(--accent-cyan), transparent 88%), transparent), radial-gradient(50% 40% at 80% 70%, color-mix(in oklch, var(--accent-violet), transparent 90%), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="kicker text-sm text-accent-cyan"
        >
          {"// " + profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1 }}
          className="mt-4 text-4xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
          className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm text-muted-foreground md:text-base"
        >
          {profile.titles.map((title, i) => (
            <span key={title} className="flex items-center gap-3">
              {title}
              {i < profile.titles.length - 1 ? (
                <span className="text-accent-violet">/</span>
              ) : null}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button size="lg" nativeButton={false} render={<a href="#career" />}>
            View my journey
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={`mailto:${contact.email}`} />}
          >
            <Mail className="size-4" />
            Get in touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={profile.resumeUrl} download />}
          >
            <Download className="size-4" />
            Download CV
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

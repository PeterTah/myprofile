"use client";

import { Download, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { cvFacts, cvFocusAreas, cvHighlights } from "@/data/cv";
import { digitalTransformationProgramme } from "@/data/digital-transformation";
import { futureReadyFocus, roadmapCertifications } from "@/data/future-focus";

export function CvSnapshot() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          kicker="// Resume"
          title="CV snapshot"
          description="A concise, recruiter-friendly view of the resume content behind the portfolio."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <Card className="glow-border border-border/70 bg-card/90">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="flex items-center gap-2 text-sm font-medium text-accent-cyan">
                  <Sparkles className="size-4" />
                  Executive summary
                </div>

                <p className="text-lg leading-relaxed text-foreground/90">
                  {profile.executiveProfile}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {cvFacts.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: index * 0.05 }}
                      className="rounded-2xl border border-border/70 bg-background/60 p-4"
                    >
                      <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-base font-medium text-foreground">{fact.value}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  The site keeps the public story concise. The full CV is available as a
                  download for recruiters and hiring managers who want the complete version.
                </p>

                <Button size="lg" nativeButton={false} render={<a href={profile.resumeUrl} download />}>
                  <Download className="size-4" />
                  Download CV
                </Button>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.05}>
              <Card className="glow-border border-border/70">
                <CardContent className="space-y-4 p-6">
                  <p className="font-mono text-sm tracking-wide text-accent-cyan">
                    Selected focus areas
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {cvFocusAreas.map((item) => (
                      <Badge key={item} variant="secondary" className="font-normal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="glow-border border-border/70">
                <CardContent className="space-y-4 p-6">
                  <p className="font-mono text-sm tracking-wide text-accent-violet">
                    What the CV emphasizes
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {cvHighlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Card className="glow-border border-border/70">
                <CardContent className="space-y-4 p-6">
                  <p className="font-mono text-sm tracking-wide text-accent-cyan">
                    Digital transformation programme
                  </p>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {digitalTransformationProgramme.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {digitalTransformationProgramme.provider} · {digitalTransformationProgramme.year}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {digitalTransformationProgramme.summary}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="glow-border border-border/70">
                <CardContent className="space-y-4 p-6">
                  <p className="font-mono text-sm tracking-wide text-accent-cyan">
                    2026–2030 Roadmap
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {futureReadyFocus.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-violet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Certification roadmap
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {roadmapCertifications.map((item) => (
                      <Badge key={item} variant="secondary" className="font-normal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

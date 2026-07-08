import { Award, BriefcaseBusiness, GraduationCap, Languages } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-children";
import { Card, CardContent } from "@/components/ui/card";
import { TerminalBadge } from "@/components/shared/terminal-badge";
import { digitalTransformationProgramme } from "@/data/digital-transformation";
import { education, certifications, languages, affiliations } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          kicker="// Education & Credentials"
          title="Formal foundations"
          description="A cleaner view of the academic, certification, and language background behind the CV."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <StaggerContainer className="space-y-4">
            {education.map((item) => (
              <StaggerItem key={item.degree}>
                <Card className="glow-border border-border/70">
                  <CardContent className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent-cyan" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="font-medium leading-snug">{item.degree}</p>
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.school}</p>
                      {item.details ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90">
                          {item.details}
                        </p>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="space-y-6">
            <Card className="glow-border border-border/70">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="size-4 text-accent-violet" />
                  Certifications
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {certifications.map((cert) => (
                    <TerminalBadge key={cert.name}>{cert.name}</TerminalBadge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glow-border border-border/70">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Languages className="size-4 text-accent-cyan" />
                  Languages
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {languages.map((language) => (
                    <TerminalBadge key={language.name}>
                      {language.name} · {language.proficiency}
                    </TerminalBadge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glow-border border-border/70">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BriefcaseBusiness className="size-4 text-accent-cyan" />
                  Professional affiliation
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {affiliations.map((affiliation) => (
                    <TerminalBadge key={affiliation.name}>{affiliation.name}</TerminalBadge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glow-border border-border/70">
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="font-mono text-sm tracking-wide text-accent-violet">
                    Digital transformation programme
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {digitalTransformationProgramme.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {digitalTransformationProgramme.provider} · {digitalTransformationProgramme.year}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {digitalTransformationProgramme.summary}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {digitalTransformationProgramme.highlights.map((item) => (
                    <TerminalBadge key={item}>{item}</TerminalBadge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

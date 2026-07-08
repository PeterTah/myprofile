import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-children";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading kicker="// Skills --list" title="Core competencies" />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group) => (
            <StaggerItem key={group.category}>
              <Card className="glow-border h-full border-border/70">
                <CardHeader>
                  <CardTitle className="font-mono text-sm tracking-wide text-accent-cyan">
                    {group.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary" className="font-normal">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

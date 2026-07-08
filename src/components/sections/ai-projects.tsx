import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-children";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiProjects } from "@/data/ai-projects";
import { cn } from "@/lib/utils";

export function AIProjects() {
  return (
    <section id="ai-projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          kicker="// Selected Work"
          title="Where infrastructure meets intelligence"
          description="Hands-on projects bringing Azure AI, RAG, and agent protocols into enterprise-grade systems — browse the code on GitHub below."
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiProjects.map((project) => (
            <StaggerItem key={project.title} className={project.featured ? "sm:col-span-2" : ""}>
              <Card
                className={cn(
                  "glow-border h-full border-border/70",
                  project.featured && "glow-border-active"
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-accent-violet" />
                    <CardTitle className="text-base">{project.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

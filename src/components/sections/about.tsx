import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading kicker="// About" title="Executive profile" />
        <FadeIn delay={0.1} className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed text-foreground/90">
            {profile.executiveProfile}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

import { Download, Mail } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/sections/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";

export function ContactFooter() {
  return (
    <section id="contact" className="border-t border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          kicker="// Contact"
          title="Let's talk infrastructure, AI, or the next escalation"
        />

        <FadeIn delay={0.1} className="mt-10">
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">Or reach me directly:</p>
          <Button size="lg" nativeButton={false} render={<a href={`mailto:${contact.email}`} />}>
            <Mail className="size-4" />
            {contact.email}
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={`mailto:${contact.emailSecondary}`} />}
          >
            <Mail className="size-4" />
            {contact.emailSecondary}
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
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={contact.linkedin} target="_blank" rel="noopener noreferrer" />}
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={contact.github} target="_blank" rel="noopener noreferrer" />}
          >
            <GithubIcon className="size-4" />
            GitHub
          </Button>
        </FadeIn>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p className="font-mono">{profile.name}</p>
          <p>&copy; {new Date().getFullYear()} — Built with Next.js.</p>
        </div>
      </div>
    </section>
  );
}

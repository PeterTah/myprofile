import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CvSnapshot } from "@/components/sections/cv-snapshot";
import { DigitalTwinChat } from "@/components/sections/digital-twin-chat";
import { CareerTimeline } from "@/components/sections/career-timeline";
import { Skills } from "@/components/sections/skills";
import { AIProjects } from "@/components/sections/ai-projects";
import { Education } from "@/components/sections/education";
import { ContactFooter } from "@/components/sections/contact-footer";
import { CircuitDivider } from "@/components/shared/circuit-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CvSnapshot />
      <DigitalTwinChat />
      <CircuitDivider />
      <CareerTimeline />
      <CircuitDivider />
      <Skills />
      <CircuitDivider />
      <AIProjects />
      <CircuitDivider />
      <Education />
      <CircuitDivider />
      <ContactFooter />
    </>
  );
}

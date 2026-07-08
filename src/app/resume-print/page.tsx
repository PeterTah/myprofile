import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import { cvHighlights } from "@/data/cv";
import { skillCategories } from "@/data/skills";
import { experience } from "@/data/experience";
import { education, certifications, languages, affiliations } from "@/data/education";
import { futureReadyFocus, roadmapCertifications } from "@/data/future-focus";

export const metadata: Metadata = {
  title: `${profile.name} — Resume`,
  robots: { index: false, follow: false },
};

export default function ResumePrintPage() {
  const timeline = [...experience].reverse();

  return (
    <div className="min-h-screen bg-white py-10 text-neutral-900 print:py-0">
      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          html, body { background: #ffffff; }
        }
      `}</style>

      <div className="mx-auto max-w-[190mm] space-y-8 px-8 font-sans text-[13px] leading-relaxed print:px-0">
        <header className="space-y-2 border-b border-neutral-300 pb-5">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">{profile.name}</h1>
          <p className="text-sm font-medium text-neutral-600">{profile.titles.join(" | ")}</p>
          <p className="text-xs text-neutral-500">
            {profile.location} · {contact.email} · {contact.linkedin} · {contact.github}
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Executive Summary
          </h2>
          <p className="text-neutral-800">{profile.executiveProfile}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Core Highlights
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-neutral-800">
            {cvHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Core Competencies
          </h2>
          <div className="space-y-1.5">
            {skillCategories.map((group) => (
              <p key={group.category}>
                <span className="font-semibold text-neutral-900">{group.category}: </span>
                <span className="text-neutral-700">{group.items.join(", ")}</span>
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {timeline.map((entry) => (
              <div key={entry.role + entry.period} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold text-neutral-900">
                    {entry.role} — {entry.company}
                  </p>
                  <p className="font-mono text-xs text-neutral-500">{entry.period}</p>
                </div>
                <p className="mt-1 text-neutral-700">{entry.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2 break-inside-avoid">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Future-Ready Focus (2026–2030)
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-neutral-800">
            {futureReadyFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-xs text-neutral-500">
            Certification roadmap: {roadmapCertifications.join(" · ")}
          </p>
        </section>

        <section className="grid grid-cols-2 gap-8 break-inside-avoid">
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Education
            </h2>
            <ul className="space-y-1.5 text-neutral-800">
              {education.map((item) => (
                <li key={item.degree}>
                  <span className="font-medium">{item.degree}</span> — {item.school} ({item.year})
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Languages &amp; Affiliations
            </h2>
            <ul className="space-y-1 text-neutral-800">
              {languages.map((language) => (
                <li key={language.name}>
                  {language.name} — {language.proficiency}
                </li>
              ))}
              {affiliations.map((affiliation) => (
                <li key={affiliation.name}>{affiliation.name}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-2 break-inside-avoid">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Certifications
          </h2>
          <p className="text-neutral-700">{certifications.map((cert) => cert.name).join(" · ")}</p>
        </section>
      </div>
    </div>
  );
}

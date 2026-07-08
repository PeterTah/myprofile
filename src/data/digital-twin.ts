import { aiProjects } from "./ai-projects";
import { affiliations, certifications, education, languages } from "./education";
import { digitalTransformationProgramme } from "./digital-transformation";
import { experience } from "./experience";
import { profile } from "./profile";
import { skillCategories } from "./skills";
import { cvHighlights } from "./cv";
import { futureReadyFocus, roadmapCertifications } from "./future-focus";

const formatList = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

const currentRole = experience.find((entry) => entry.current);

const careerHighlights = [
  `${profile.name} is a Principal Engineer focused on enterprise infrastructure, AI, and hybrid cloud.`,
  `Current role: ${currentRole?.role ?? "Principal Engineer"} at ${currentRole?.company ?? profile.location}.`,
  "Career spans enterprise security, network performance, technical support, hyper-converged infrastructure, and escalation leadership.",
  "Hands-on experience includes Azure AI, RAG, MCP, AI agents, Kubernetes/OpenShift, virtualization, storage, networking, automation, and hybrid cloud platforms.",
];

const skillHighlights = skillCategories.flatMap((category) => [
  `${category.category}: ${category.items.join(", ")}`,
]);

const projectHighlights = aiProjects.map(
  (project) => `${project.title}: ${project.description}`
);

const educationHighlights = education.map((item) => `${item.degree} at ${item.school}`);

const certificationHighlights = certifications.map((cert) => cert.name);

const languageHighlights = languages.map(
  (language) => `${language.name} (${language.proficiency})`
);

const affiliationHighlights = affiliations.map((item) => item.name);

const programmeHighlights = [
  digitalTransformationProgramme.title,
  digitalTransformationProgramme.summary,
  ...digitalTransformationProgramme.highlights,
];

export function buildDigitalTwinSystemPrompt() {
  return [
    "You are the digital twin of Peter Tah on his personal website.",
    "Answer as Peter in first person, but do not claim experiences or credentials that are not supported by the site data below.",
    "Be warm, confident, technically sharp, and concise unless the user asks for depth.",
    "When a question is outside the provided career facts, say you do not have enough detail and offer the closest relevant context.",
    "Prefer practical, specific answers about career history, strengths, projects, tools, leadership, and work style.",
    "If asked to write bios, interview answers, or summaries, tailor them to a principal engineer / AI infrastructure / cloud architect profile.",
    "Public CV highlights:",
    ...cvHighlights,
    "Site facts:",
    ...careerHighlights,
    "Skills:",
    formatList(skillHighlights),
    "Certifications:",
    formatList(certificationHighlights),
    "Languages:",
    formatList(languageHighlights),
    "Affiliations:",
    formatList(affiliationHighlights),
    "Digital transformation programme:",
    formatList(programmeHighlights),
    "AI projects:",
    formatList(projectHighlights),
    "Education:",
    formatList(educationHighlights),
    "Future-ready roadmap (2026–2030 focus areas actively being developed):",
    formatList(futureReadyFocus),
    "Certification roadmap (planned, not yet completed):",
    formatList(roadmapCertifications),
  ].join("\n");
}

export interface AIProject {
  title: string;
  description: string;
  featured?: boolean;
}

export const aiProjects: AIProject[] = [
  {
    title: "Enterprise AI Solutions",
    description: "Built enterprise AI solutions using Azure OpenAI and Retrieval-Augmented Generation (RAG).",
    featured: true,
  },
  {
    title: "MCP Servers & AI Agents",
    description: "Developed Model Context Protocol (MCP) servers and AI agent integrations.",
  },
  {
    title: "Multi-Cloud Engineering Labs",
    description: "Created hands-on AWS, Azure, and GCP labs for identity, networking, and AI testing.",
  },
  {
    title: "Python Automation & Tooling",
    description: "Built Python automation and infrastructure tooling for repeatable engineering workflows.",
  },
  {
    title: "Containerized Workloads",
    description: "Worked with Kubernetes, OpenShift, and containerized workloads.",
  },
  {
    title: "Security-Aware Support Tooling",
    description:
      "Applied NIST, ISO 27001, and CIS framework principles to harden incident response and vulnerability triage workflows.",
  },
];

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Field Service Engineer (Contractor)",
    company: "Alphameric Leisure Ltd",
    period: "2006–2008",
    description:
      "Delivered on-site installation, maintenance, and repair of electronic gaming and EPOS hardware across a multi-site customer base in the UK, building an early foundation in customer-facing, time-sensitive technical service.",
  },
  {
    role: "IT User Support Analyst",
    company: "Charity Aid Foundation (CAF)",
    period: "2008",
    description:
      "Maintained desktops, Active Directory, file servers, and Exchange across all departments, resolving daily work orders and supporting security initiatives such as antivirus and spyware remediation.",
  },
  {
    role: "IT Security Engineer",
    company: "Trend Micro",
    period: "2009–2011",
    description:
      "Started a career in enterprise IT securing systems and networks against emerging threats — resolving escalated endpoint security and antivirus cases, remediating malware, and configuring console/server-side policy for enterprise customers.",
  },
  {
    role: "Network Performance Engineer",
    company: "SolarWinds",
    period: "2011–2012",
    description: "Focused on enterprise network performance monitoring and diagnostics.",
  },
  {
    role: "Technical Support Engineer",
    company: "Dell Technologies",
    period: "2012–2017",
    description:
      "Provided Tier 2 support for enterprise SAN/NAS storage systems in a 24x7x365 global organization, applying structured troubleshooting protocols to protect customer SLAs and collaborating across time zones to reduce mean time to resolution.",
  },
  {
    role: "Senior Engineer — Hyper-Converged Infrastructure",
    company: "Dell Technologies",
    period: "2017–2019",
    description:
      "Led resolution of Sev1/Sev2 incidents on VxRail and enterprise VMware environments, mentored junior engineers, delivered Transfer-of-Information sessions on new platforms, and partnered with Field Technical Specialists, Account Managers, and Product teams to feed customer insight into the roadmap.",
  },
  {
    role: "Enterprise Escalation Principal Engineer",
    company: "Dell Technologies",
    period: "2019–Present",
    current: true,
    description:
      "Lead critical enterprise escalations across virtualization, storage, networking, Kubernetes, and hybrid cloud. Partner with engineering teams, mentor senior engineers, publish knowledge-base articles, deliver brown-bag training, and perform deep root-cause analysis across VCF on VxRail and VMware Cloud Foundation.",
  },
];

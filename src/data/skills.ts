export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "AI & Modern Engineering",
    items: ["Azure OpenAI", "LLMs", "RAG", "MCP", "AI Agents", "Python", "REST APIs"],
  },
  {
    category: "Cloud",
    items: ["AWS", "Azure", "Google Cloud Platform", "Hybrid Cloud", "IaC (Terraform)", "Identity"],
  },
  {
    category: "Automation & Scripting",
    items: ["Python", "Bash", "PowerShell", "REST APIs", "Terraform", "CI/CD-Adjacent Workflows"],
  },
  {
    category: "Cybersecurity",
    items: [
      "NIST",
      "ISO 27001",
      "CIS Controls",
      "Endpoint Security & Threat Mitigation",
      "Vulnerability Triage",
      "Security Incident Response",
    ],
  },
  {
    category: "Enterprise",
    items: ["VMware vSphere", "vSAN", "NSX", "VCF", "VxRail", "Windows Server", "Linux", "Active Directory"],
  },
  {
    category: "Storage & Networking",
    items: [
      "Dell EMC",
      "VNX",
      "Unity",
      "Isilon",
      "VPLEX",
      "SAN/NAS",
      "Fibre Channel / iSCSI",
      "Enterprise Networking",
    ],
  },
  {
    category: "Customer Experience & Leadership",
    items: [
      "High-Severity Incident Ownership",
      "CSAT & Retention",
      "Cross-Functional Collaboration",
      "Staff Engineering",
      "RCA",
      "Mentoring",
    ],
  },
];

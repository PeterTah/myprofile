export interface EducationItem {
  year: string;
  degree: string;
  school: string;
  details?: string;
}

export interface Certification {
  name: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Affiliation {
  name: string;
}

export const education: EducationItem[] = [
  { year: "2015", degree: "MSc Cloud Computing", school: "Cork Institute of Technology" },
  {
    year: "2021",
    degree: "CPD Diploma in Business Innovation & Digital Transformation (L8)",
    school: "Dublin Technical University",
    details:
      "Applied work in foundational technologies, social capital, enterprise change, and Power BI data visualisation.",
  },
  {
    year: "2009",
    degree: "Postgraduate in Renewable Energy System Technology",
    school: "Loughborough University",
  },
  {
    year: "2008",
    degree: "BEng (Hons) Computer Systems and Networks",
    school: "London South Bank University",
  },
];

export const certifications: Certification[] = [
  { name: "VMware vSphere 8 Certified Professional - Data Center Virtualization (VCP-DCV)" },
  { name: "Red Hat Linux Admin RHEL" },
  { name: "DCSE: Dell Certified Systems Engineer" },
  { name: "DEA-41T1: Associate - Specialist, Systems Administrator" },
  { name: "VNX Platform Specialist and Storage Eng." },
  { name: "VxRail Xpert Community Qualification" },
  { name: "Associate - PowerEdge" },
  { name: "VxRail Specialist - Systems Administrator" },
  { name: "VMware vSAN Specialist" },
  { name: "Cisco Certified Network Associate (2022)" },
  { name: "MCSE: Microsoft Certified Systems Engineer" },
  { name: "Oracle PL/SQL and Oracle Database Administration" },
  { name: "Diploma in Project Management (PMI)" },
  { name: "Digital Transformation" },
  { name: "VMware vSphere Optimize and Scale V6.7" },
  { name: "VMware vSAN Performance Troubleshooting Workshop" },
  { name: "VCF on VxRail 5.0" },
];

export const languages: Language[] = [
  { name: "English", proficiency: "First language" },
  { name: "German", proficiency: "B2 Upper Intermediate" },
];

export const affiliations: Affiliation[] = [{ name: "Member, Professional PMI Association" }];

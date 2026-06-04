export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  icon: string;
}

export interface Certification {
  name: string;
  issuer?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
}

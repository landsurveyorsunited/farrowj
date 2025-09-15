
export interface Header {
  name: string;
  tags: string[];
  contact: {
    address: string;
    phone: string;
    email: string;
  };
}

export interface Project {
  title: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  details: string;
}

export interface Expertise {
  area: string;
}

export interface Award {
    title: string;
    year: number;
    description: string;
}

export interface Language {
    name: string;
}

export interface Innovation {
    name: string;
}
export interface AiInnovations {
    description: string;
    frameworks: Innovation[];
}

export interface Publication {
    title: string;
    description: string;
}

export interface Footer {
    tagline: string;
}

export interface ResumeData {
  header: Header;
  lately: Project[];
  experience: Experience[];
  education: Education[];
  coreExpertise: Expertise[];
  awards: Award[];
  languages: Language[];
  aiInnovations: AiInnovations;
  publications: Publication[];
  footer: Footer;
}
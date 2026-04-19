export interface ExperienceItem {
  id: string;
  company: string;
  logoSrc: string;
  url?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface TerminalCommand {
  name: string;
  description: string;
  handler: (args: string[]) => string | string[];
}

export interface WarpPoint {
  x: number;
  y: number;
  age: number;
}

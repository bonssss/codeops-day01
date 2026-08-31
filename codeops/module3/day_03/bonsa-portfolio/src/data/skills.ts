import type { LucideIcon } from "lucide-react";
import {
  Server,
  ShieldCheck,
  Code2,
  Database,
  Wrench,
  Cloud,
} from "lucide-react";

export interface SkillGroup {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  technologies: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "BACKEND",
    description:
      "Building APIs, services, database systems, and server-side applications.",
    icon: Server,
    technologies: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "PostGIS",
      "Prisma",
    ],
  },
  {
    number: "02",
    title: "QUALITY",
    description:
      "Finding bugs before users do through automation and systematic testing.",
    icon: ShieldCheck,
    technologies: [
      "Playwright",
      "Appium",
      "Selenium",
      "API Testing",
      "JMeter",
      "Regression Testing",
    ],
  },
  {
    number: "03",
    title: "FRONTEND",
    description:
      "Creating clean interfaces and connecting them to reliable backend services.",
    icon: Code2,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    number: "04",
    title: "DATABASE",
    description:
      "Designing and working with structured data and relational systems.",
    icon: Database,
    technologies: [
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Neon",
      "Database Design",
      "Query Optimization",
    ],
  },
  {
    number: "05",
    title: "TOOLS",
    description:
      "Development tools and workflows that keep projects maintainable.",
    icon: Wrench,
    technologies: [
      "Git",
      "GitHub",
      "Docker",
      "Linux",
      "VS Code",
      "Postman",
    ],
  },
  {
    number: "06",
    title: "AI / CLOUD",
    description:
      "Exploring AI-powered applications and modern deployment workflows.",
    icon: Cloud,
    technologies: [
      "AI APIs",
      "LLMs",
      "Prompt Engineering",
      "Vercel",
      "Cloud Deployment",
      "Automation",
    ],
  },
];

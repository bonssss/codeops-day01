import type { LucideIcon } from "lucide-react";
import { Search, PenTool, Code2, Bug, Rocket } from "lucide-react";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "Understand the problem, users, requirements, and constraints before writing code.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Design the architecture, API contracts, database structure, and testing strategy.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Turn the design into clean, maintainable, and production-ready software.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Break",
    description:
      "Test aggressively, automate repetitive checks, and intentionally look for failure.",
    icon: Bug,
  },
  {
    number: "05",
    title: "Improve",
    description:
      "Fix the root cause, optimize the system, and continuously make it better.",
    icon: Rocket,
  },
];

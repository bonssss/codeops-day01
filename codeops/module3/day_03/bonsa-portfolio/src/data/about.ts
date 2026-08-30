import type { LucideIcon } from "lucide-react";
import { Code2, Bug, Brain } from "lucide-react";

export interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    icon: Code2,
    title: "BUILD",
    description:
      "I enjoy turning ideas into clean, practical, and maintainable software.",
  },
  {
    icon: Bug,
    title: "BREAK",
    description:
      "I naturally look for edge cases, unexpected behavior, and places where systems can fail.",
  },
  {
    icon: Brain,
    title: "LEARN",
    description:
      "I'm continuously exploring better engineering practices, automation, and AI.",
  },
];

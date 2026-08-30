export interface Project {
  number: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "BugScribe AI",
    description:
      "An AI-powered platform for creating, analyzing, and managing software bug reports.",
    category: "AI / QA",
    image: "/projects/bugscribe.png",
    technologies: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "AI",
    ],
    github: "#",
    demo: "#",
  },

  {
    number: "02",
    title: "eDAS",
    description:
      "A digital addressing system focused on reliable backend services, APIs, and data management.",
    category: "BACKEND",
    image: "/projects/edas.png",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    github: "#",
    demo: "#",
  },

  {
    number: "03",
    title: "Smart Data Entry",
    description:
      "An automation system designed to reduce repetitive browser-based data entry.",
    category: "AUTOMATION",
    image: "/projects/data-entry.png",
    technologies: [
      "Playwright",
      "TypeScript",
      "Node.js",
    ],
    github: "#",
    demo: "#",
  },
];
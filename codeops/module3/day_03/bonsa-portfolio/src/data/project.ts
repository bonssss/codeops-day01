import bugsight from "../assets/images/bugsight.png";
import gym from "../assets/images/gym.png";
import love from "../assets/images/love.png";
import portfolio from "../assets/images/portfolio.png";
import daas from "../assets/images/daas.png";

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
      "An AI-powered platform for creating, analyzing, and managing software bug reports with intelligent categorization.",
    category: "AI / QA",
    image: bugsight,
    technologies: [
      "React.js",
      "Supabase",
      "Python",
      "Gemini API",
    ],
    github: "https://github.com/bonssss/bugscribe-ai",
    demo: "https://bugscribe-ai.vercel.app/",
  },

  {
    number: "02",
    title: "Delivery AS A Service (DAAS)",
    description:
      "Enterprise-grade logistics platform powering B2B and government deliveries with real-time tracking and smart routing.",
    category: "FULLSTACK & BACKEND",
    image: daas,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "PostGIS",
    ],
    github: "#",
    demo: "https://dev.daas.ambalaymaps.com/",
  },

  {
    number: "03",
    title: "Oli Fit Gym",
    description:
      "Modern, responsive web platform for Olyyad Gym featuring workout program showcases, membership details, and sleek UI.",
    category: "FRONTEND",
    image: gym,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    github: "#",
    demo: "https://gym-website-rho-sepia.vercel.app/",
  },

 
  {
    number: "04",
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my skills, projects, and experience.",
    category: "FRONTEND",
    image: portfolio,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
    github: "#",
    demo: "https://bons-dev-qa.vercel.app/",
  },
];
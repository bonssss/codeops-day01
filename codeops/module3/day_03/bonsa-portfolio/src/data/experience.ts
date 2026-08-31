export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  type: string;
  description: string;
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    year: "JAN 2026 — PRESENT",
    role: "Backend Developer",
    company: "Ambalay Maps",
    type: "BACKEND & GEOSPATIAL",
    description:
      "Developing RESTful APIs with Node.js/Express, designing & optimizing PostgreSQL/PostGIS databases, and integrating geospatial mapping services.",
    technologies: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "PostGIS",
      "REST APIs",
      "Git",
    ],
  },
  {
    year: "FEB 2025 — PRESENT",
    role: "QA / Automation Engineer (SDET)",
    company: "Arifpay Financial Technologies S.C",
    type: "FINTECH & QUALITY ASSURANCE",
    description:
      "Building and maintaining Playwright end-to-end automation frameworks for fintech applications, automating API testing for payment services, and setting up CI/CD quality pipelines.",
    technologies: [
      "Playwright",
      "Python",
      "TypeScript",
      "Postman",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    year: "JUL 2024 — FEB 2025",
    role: "Full Stack Developer & QA Engineer",
    company: "Binary Cosmo (NetRyde)",
    type: "FULL STACK & QA",
    description:
      "Engineered full stack features and executed end-to-end automated testing for a multi-role ride service platform (Customer, Driver & Admin modules).",
    technologies: [
      "React",
      "Node.js",
      "Selenium",
      "JavaScript",
      "QA Strategy",
    ],
  },
];

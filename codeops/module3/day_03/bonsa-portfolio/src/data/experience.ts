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
    year: "2025 — PRESENT",
    role: "Backend Developer / QA Engineer",
    company: "Professional Software Projects",
    type: "ENGINEERING",
    description:
      "Building backend services, designing APIs, testing applications, and improving software reliability across web and mobile systems.",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Playwright",
      "Appium",
    ],
  },
  {
    year: "2025",
    role: "QA Engineer",
    company: "ArifPay",
    type: "QUALITY ENGINEERING",
    description:
      "Worked across web, API, and mobile testing with a focus on identifying defects, validating functionality, and improving software quality.",
    technologies: [
      "API Testing",
      "Mobile Testing",
      "Web Testing",
      "JIRA",
      "Automation",
    ],
  },
  {
    year: "2024 — 2025",
    role: "Graphic Designer",
    company: "Netryde",
    type: "DESIGN",
    description:
      "Created digital graphics and visual content while working within a defined brand system for a Seattle-based ride service.",
    technologies: [
      "Photoshop",
      "Brand Design",
      "Visual Design",
      "Marketing",
    ],
  },
];

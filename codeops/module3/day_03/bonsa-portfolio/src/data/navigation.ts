export interface NavLink {
  number: string;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "Work", href: "#projects" },
  { number: "03", label: "Skills", href: "#skills" },
  { number: "04", label: "Process", href: "#process" },
  { number: "05", label: "Experience", href: "#experience" },
  { number: "06", label: "About", href: "#about" },
  { number: "07", label: "Contact", href: "#contact" },
];

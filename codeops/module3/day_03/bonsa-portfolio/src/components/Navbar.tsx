import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "Work", href: "#projects" },
  { number: "03", label: "Skills", href: "#skills" },
  { number: "04", label: "Process", href: "#process" },
  { number: "05", label: "Experience", href: "#experience" },
  { number: "06", label: "About", href: "#about" },
  { number: "07", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-28 flex-col items-center border-r border-white/10 bg-[#050505] lg:flex">
        <a
          href="#home"
          className="mt-8 text-2xl font-black tracking-tight"
        >
          B<span className="text-blue-500">D</span>.
        </a>

        <nav className="mt-24 flex flex-col gap-7">
          {links.map((link) => (
            <a
              key={link.number}
              href={link.href}
              className="group text-neutral-500 transition-colors hover:text-white"
            >
              <span className="mb-1 block text-[9px] text-neutral-700 transition-colors group-hover:text-blue-500">
                {link.number}
              </span>

              <span className="text-[11px]">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-auto mb-8 flex flex-col gap-5">
          <a
            href="#"
            className="text-[10px] text-neutral-600 transition hover:text-white"
          >
            GH
          </a>

          <a
            href="#"
            className="text-[10px] text-neutral-600 transition hover:text-white"
          >
            LI
          </a>

          <a
            href="#"
            className="text-[10px] text-neutral-600 transition hover:text-white"
          >
            X
          </a>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#050505]/90 px-5 py-5 backdrop-blur-xl lg:hidden">
        <a
          href="#home"
          className="text-xl font-black"
        >
          B<span className="text-blue-500">D</span>.
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-neutral-300"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#050505] pt-28 lg:hidden">
          <nav className="flex flex-col px-8">
            {links.map((link) => (
              <a
                key={link.number}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-5 text-2xl font-medium"
              >
                <span className="mr-5 text-xs text-blue-500">
                  {link.number}
                </span>

                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
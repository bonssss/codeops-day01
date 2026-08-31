import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { navLinks as links } from "../data/navigation";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Desktop Navbar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-28 flex-col items-center border-r border-slate-300/80 bg-[#f8fafc]/95 backdrop-blur-md transition-colors duration-300 dark:border-[#30363d] dark:bg-[#0b0e14] lg:flex">
        <a
          href="#home"
          className="mt-8 text-2xl font-black tracking-tight text-slate-800 dark:text-[#e6edf3]"
        >
          B<span className="text-blue-500">D</span>.
        </a>

        {/* Theme Toggle Button Desktop */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-200/70 text-slate-700 transition hover:border-blue-500/40 hover:text-blue-600 dark:border-[#30363d] dark:bg-[#161b22] dark:text-[#8b949e] dark:hover:border-blue-500/40 dark:hover:text-blue-400"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <nav className="mt-14 flex flex-col gap-7">
          {links.map((link) => (
            <a
              key={link.number}
              href={link.href}
              className="group text-slate-600 transition-colors hover:text-slate-900 dark:text-[#8b949e] dark:hover:text-[#e6edf3]"
            >
              <span className="mb-1 block text-[9px] text-slate-400 transition-colors group-hover:text-blue-600 dark:text-[#6e7681] dark:group-hover:text-blue-400">
                {link.number}
              </span>

              <span className="text-[11px] font-medium">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-auto mb-8 flex flex-col gap-5">
          <a
            href="https://github.com/bonssss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-slate-500 transition hover:text-slate-800 dark:text-[#8b949e] dark:hover:text-[#e6edf3]"
          >
            GH
          </a>

          <a
            href="https://www.linkedin.com/in/bonsa-desalegn-90175b257/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-slate-500 transition hover:text-slate-800 dark:text-[#8b949e] dark:hover:text-[#e6edf3]"
          >
            LI
          </a>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-slate-300/80 bg-[#f8fafc]/90 px-5 py-4 backdrop-blur-xl transition-colors duration-300 dark:border-[#30363d] dark:bg-[#0b0e14]/90 lg:hidden">
        <a
          href="#home"
          className="text-xl font-black text-slate-800 dark:text-[#e6edf3]"
        >
          B<span className="text-blue-500">D</span>.
        </a>

        <div className="flex items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-200/70 text-slate-700 transition dark:border-[#30363d] dark:bg-[#161b22] dark:text-[#8b949e]"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-slate-700 dark:text-[#8b949e]"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#f8fafc] pt-24 transition-colors duration-300 dark:bg-[#0b0e14] lg:hidden">
          <nav className="flex flex-col px-8">
            {links.map((link) => (
              <a
                key={link.number}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-200 py-5 text-2xl font-medium text-slate-800 dark:border-[#30363d] dark:text-[#e6edf3]"
              >
                <span className="mr-5 text-xs text-blue-600 dark:text-blue-400">
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
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-300/80 transition-colors duration-300 dark:border-[#30363d] lg:ml-28">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-black tracking-tight text-slate-800 dark:text-[#e6edf3]"
          >
            B<span className="text-blue-500">D</span>.
          </a>

          {/* Center */}
          <p className="text-[11px] text-slate-500 dark:text-[#8b949e]">
            © {year} Bonsa Desalegn. Built with curiosity.
          </p>

          {/* Back to top */}
          <a
            href="#home"
            className="group flex items-center gap-2 text-[10px] font-semibold text-slate-500 transition hover:text-slate-800 dark:text-[#8b949e] dark:hover:text-[#f0f6fc]"
          >
            BACK TO TOP
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 transition group-hover:border-slate-400 dark:border-[#30363d] dark:group-hover:border-slate-600">
              <ArrowUp
                size={13}
                className="transition group-hover:-translate-y-0.5"
              />
            </span>
          </a>

        </div>
      </div>
    </footer>
  );
}
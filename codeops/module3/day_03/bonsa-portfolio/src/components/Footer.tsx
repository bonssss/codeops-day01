import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 lg:ml-24">

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-black tracking-tight"
          >
            B<span className="text-blue-500">D</span>.
          </a>


          {/* Center */}
          <p className="text-[10px] text-neutral-700">
            © {year} Bonsa Desalegn. Built with curiosity.
          </p>


          {/* Back to top */}
          <a
            href="#home"
            className="group flex items-center gap-2 text-[10px] text-neutral-600 transition hover:text-white"
          >
            BACK TO TOP

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition group-hover:border-white/30">
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
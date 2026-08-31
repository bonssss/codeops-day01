import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send } from "lucide-react";

interface IconProps {
  size?: number;
  className?: string;
}

function Github({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  {
    name: "GitHub",
    label: "@bonssss",
    href: "https://github.com/bonssss",
    icon: Github,
  },
  {
    name: "LinkedIn",
    label: "Bonsa Desalegn",
    href: "https://www.linkedin.com/in/bonsa-desalegn-90175b257/",
    icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 transition-colors duration-300 lg:ml-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] text-blue-600 dark:text-blue-400">
            07 / CONTACT
          </p>

          <h2 className="mt-6 max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.06em] text-slate-900 md:text-8xl dark:text-[#f0f6fc]">
            Let's build
            <br />
            <span className="text-slate-400 dark:text-[#8b949e]">
              something useful.
            </span>
          </h2>
        </motion.div>

        {/* Main contact area */}
        <div className="mt-20 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

          {/* Email CTA */}
          <motion.a
            href="mailto:bons6710hos@gmail.com"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-300/80 bg-[#f8fafc] p-8 shadow-sm transition duration-500 hover:border-blue-500/40 hover:shadow-md dark:border-[#30363d] dark:bg-[#161b22] dark:hover:border-blue-500/30 md:p-12"
          >
            {/* Hover glow */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[80px] transition duration-700 group-hover:bg-blue-600/20" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-slate-200/50 text-slate-700 transition group-hover:border-blue-500/40 group-hover:bg-blue-600 group-hover:text-[#f8fafc] dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e]">
                  <Mail size={20} />
                </div>

                <ArrowUpRight
                  size={22}
                  className="text-slate-400 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600 dark:text-[#8b949e] dark:group-hover:text-[#f0f6fc]"
                />
              </div>

              <p className="mt-20 text-xs tracking-[0.25em] text-slate-500 dark:text-[#8b949e]">
                HAVE A PROJECT?
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-slate-900 md:text-3xl dark:text-[#f0f6fc]">
                Send me an email.
              </h3>

              <p className="mt-3 text-sm text-slate-600 dark:text-[#8b949e]">
                Let's talk about your idea, project, or opportunity.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                bons6710hos@gmail.com
                <Send size={14} />
              </div>
            </div>
          </motion.a>

          {/* Social links */}
          <div className="grid gap-6">
            {socials.map((social, index) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.1,
                  }}
                  className="group flex items-center justify-between rounded-2xl border border-slate-300/80 bg-[#f8fafc] p-7 shadow-sm transition duration-500 hover:border-slate-400 dark:border-[#30363d] dark:bg-[#161b22] dark:hover:border-slate-600"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-200/50 text-slate-700 transition group-hover:border-blue-500/40 group-hover:text-blue-600 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e] dark:group-hover:text-[#f0f6fc]">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-[#f0f6fc]">
                        {social.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-[#8b949e]">
                        {social.label}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600 dark:text-[#8b949e] dark:group-hover:text-[#f0f6fc]"
                  />
                </motion.a>
              );
            })}

            {/* Availability */}
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-7 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]">
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-[#f0f6fc]">
                  Available for opportunities
                </p>

                <p className="mt-2 text-[10px] text-slate-600 dark:text-[#8b949e]">
                  Backend · QA · Automation · AI
                </p>
              </div>

              <span className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                ONLINE
              </span>
            </div>
          </div>

        </div>

        {/* Final statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 border-t border-slate-300/80 pt-10 transition-colors duration-300 dark:border-[#30363d]"
        >
          <p className="max-w-3xl text-2xl font-medium leading-relaxed tracking-tight text-slate-600 md:text-4xl dark:text-[#8b949e]">
            "The goal isn't to write more code.
            <span className="text-slate-900 dark:text-[#f0f6fc]">
              {" "}
              It's to create better software.
            </span>
            "
          </p>
        </motion.div>

      </div>
    </section>
  );
}
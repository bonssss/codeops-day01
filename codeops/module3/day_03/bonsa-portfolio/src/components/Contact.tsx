import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Send,
} from "lucide-react";

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
    label: "@bonsa-dev",
    href: "#",
    icon: Github,
  },
  {
    name: "LinkedIn",
    label: "Bonsa Desalegn",
    href: "#",
    icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 lg:ml-24"
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
          <p className="text-xs tracking-[0.3em] text-blue-500">
            07 / CONTACT
          </p>

          <h2 className="mt-6 max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.06em] md:text-8xl">
            Let's build
            <br />
            <span className="text-neutral-600">
              something useful.
            </span>
          </h2>
        </motion.div>


        {/* Main contact area */}
        <div className="mt-20 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

          {/* Email CTA */}
          <motion.a
            href="mailto:your.email@example.com"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#090909] p-8 transition duration-500 hover:border-blue-500/30 md:p-12"
          >
            {/* Hover glow */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[80px] transition duration-700 group-hover:bg-blue-600/20" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-neutral-500 transition group-hover:border-blue-500/40 group-hover:bg-blue-600 group-hover:text-white">
                  <Mail size={20} />
                </div>

                <ArrowUpRight
                  size={22}
                  className="text-neutral-600 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />

              </div>

              <p className="mt-20 text-xs tracking-[0.25em] text-neutral-600">
                HAVE A PROJECT?
              </p>

              <h3 className="mt-4 text-2xl font-semibold md:text-3xl">
                Send me an email.
              </h3>

              <p className="mt-3 text-sm text-neutral-600">
                Let's talk about your idea, project, or opportunity.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-blue-400">
                your.email@example.com
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
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#090909] p-7 transition duration-500 hover:border-white/20"
                >

                  <div className="flex items-center gap-5">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-neutral-500 transition group-hover:text-white">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {social.name}
                      </p>

                      <p className="mt-1 text-xs text-neutral-600">
                        {social.label}
                      </p>
                    </div>

                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-neutral-700 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />

                </motion.a>
              );
            })}


            {/* Availability */}
            <div className="flex items-center justify-between rounded-2xl border border-green-500/10 bg-green-500/[0.02] p-7">

              <div>
                <p className="text-xs font-medium">
                  Available for opportunities
                </p>

                <p className="mt-2 text-[10px] text-neutral-600">
                  Backend · QA · Automation · AI
                </p>
              </div>

              <span className="flex items-center gap-2 text-[10px] text-green-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
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
          className="mt-24 border-t border-white/10 pt-10"
        >
          <p className="max-w-3xl text-2xl font-medium leading-relaxed tracking-tight text-neutral-400 md:text-4xl">
            "The goal isn't to write more code.
            <span className="text-white">
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
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { principles } from "../data/about";

export default function About() {
  return (
    <section
      id="about"
      className="border-b border-slate-300/80 py-32 transition-colors duration-300 dark:border-[#30363d] lg:ml-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-blue-600 dark:text-blue-400">
            06 / ABOUT
          </p>

          <h2 className="mt-5 max-w-5xl text-5xl font-bold leading-[1] tracking-[-0.05em] text-slate-900 md:text-7xl dark:text-[#f0f6fc]">
            I don't just build software.
            <br />
            <span className="text-slate-400 dark:text-[#8b949e]">
              I try to find where it breaks.
            </span>
          </h2>
        </div>

        {/* Main content */}
        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_0.7fr]">

          {/* Story */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <p className="max-w-2xl text-lg leading-9 text-slate-700 dark:text-[#c9d1d9]">
              I'm a software engineer focused on backend development
              and quality engineering. I enjoy building systems,
              understanding how they work, and finding ways to make
              them more reliable.
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-slate-600 dark:text-[#8b949e]">
              My interests sit across backend engineering, API
              development, test automation, mobile and web testing,
              databases, and practical AI applications.
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-slate-600 dark:text-[#8b949e]">
              I believe good engineering is not only about writing
              code that works. It's about understanding the problem,
              designing for failure, testing assumptions, and
              continuously improving the result.
            </p>

            {/* Location */}
            <div className="mt-10 flex items-center gap-3 text-xs text-slate-600 dark:text-[#8b949e]">
              <MapPin
                size={15}
                className="text-blue-600 dark:text-blue-400"
              />
              Ethiopia
            </div>
          </motion.div>

          {/* Profile card */}
          <motion.div
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
              duration: 0.6,
              delay: 0.15,
            }}
            className="rounded-2xl border border-slate-300/80 bg-[#f8fafc] p-7 shadow-sm dark:border-[#30363d] dark:bg-[#161b22]"
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-slate-300/80 pb-5 dark:border-[#30363d]">
              <span className="font-mono text-[10px] text-slate-400 dark:text-[#6e7681]">
                SYSTEM_PROFILE
              </span>

              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                ONLINE
              </span>
            </div>

            {/* Profile */}
            <div className="mt-8 space-y-6">
              <ProfileRow
                label="NAME"
                value="Bonsa Desalegn"
              />

              <ProfileRow
                label="ROLE"
                value="Backend / QA Engineer"
              />

              <ProfileRow
                label="FOCUS"
                value="Software Engineering"
              />

              <ProfileRow
                label="INTEREST"
                value="AI + Automation"
              />

              <ProfileRow
                label="STATUS"
                value="Building"
                green
              />
            </div>

            {/* Code */}
            <div className="mt-10 rounded-lg border border-slate-300/80 bg-[#1e2430] p-5 font-mono text-xs leading-7 text-[#c9d1d9] dark:border-[#30363d] dark:bg-[#0d1117]">
              <p className="text-[#8b949e]">
                {"// engineering philosophy"}
              </p>

              <p>
                <span className="text-blue-400">
                  const
                </span>{" "}
                quality ={" "}
                <span className="text-amber-300">
                  "continuous improvement"
                </span>
                ;
              </p>

              <p>
                <span className="text-blue-400">
                  const
                </span>{" "}
                mindset ={" "}
                <span className="text-amber-300">
                  "build + break"
                </span>
                ;
              </p>
            </div>
          </motion.div>

        </div>

        {/* Principles */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-slate-300/80 bg-slate-300/80 dark:border-[#30363d] dark:bg-[#30363d] md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.div
                key={principle.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="group bg-[#f8fafc] p-8 transition hover:bg-slate-100 dark:bg-[#161b22] dark:hover:bg-[#1c2128]"
              >
                <Icon
                  size={20}
                  className="text-slate-500 transition group-hover:text-blue-600 dark:text-[#8b949e] dark:group-hover:text-blue-400"
                />

                <h3 className="mt-8 text-sm font-semibold tracking-widest text-slate-900 dark:text-[#f0f6fc]">
                  {principle.title}
                </h3>

                <p className="mt-4 text-xs leading-6 text-slate-600 dark:text-[#8b949e]">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Resume */}
        <div className="mt-10 flex justify-end">
          <a
            href="https://www.linkedin.com/in/bonsa-desalegn-90175b257/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs text-slate-500 transition hover:text-slate-900 dark:text-[#8b949e] dark:hover:text-[#f0f6fc]"
          >
            Connect on LinkedIn
            <ArrowUpRight
              size={15}
              className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

      </div>
    </section>
  );
}

function ProfileRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="font-mono text-[9px] tracking-widest text-slate-400 dark:text-[#6e7681]">
        {label}
      </span>

      <span
        className={
          green
            ? "text-xs text-emerald-600 dark:text-emerald-400"
            : "text-xs text-slate-800 dark:text-[#c9d1d9]"
        }
      >
        {value}
      </span>
    </div>
  );
}
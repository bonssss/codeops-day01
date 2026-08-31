import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-slate-300/80 py-32 transition-colors duration-300 dark:border-[#30363d] lg:ml-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-blue-600 dark:text-blue-400">
              05 / EXPERIENCE
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-slate-900 md:text-7xl dark:text-[#f0f6fc]">
              Where I've
              <br />
              been building.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
            My experience sits at the intersection of software
            development, quality engineering, automation, and
            creative problem solving.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-[7px] top-0 hidden w-px bg-slate-300/80 transition-colors duration-300 dark:bg-[#30363d] md:block" />

          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={`${experience.company}-${experience.role}`}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-slate-300/80 bg-slate-300/80 dark:border-[#30363d] dark:bg-[#30363d] sm:grid-cols-3">
          <Stat
            value="2+"
            label="Years Backend & QA"
          />

          <Stat
            value="10+"
            label="API & Test Suites"
          />

          <Stat
            value="100%"
            label="Commitment to Quality"
          />
        </div>

      </div>
    </section>
  );
}

function ExperienceItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  return (
    <motion.article
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group relative md:pl-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 hidden h-[15px] w-[15px] rounded-full border border-slate-400 bg-[#f8fafc] transition group-hover:border-blue-500 group-hover:bg-blue-500 dark:border-slate-600 dark:bg-[#161b22] md:block" />

      <div className="rounded-xl border border-slate-300/80 bg-[#f8fafc] p-7 shadow-sm transition duration-500 hover:border-blue-500/30 hover:shadow-md dark:border-[#30363d] dark:bg-[#161b22] dark:hover:border-slate-600 md:p-9">
        <div className="grid gap-8 lg:grid-cols-[180px_1fr_auto]">

          {/* Date */}
          <div>
            <p className="font-mono text-[10px] tracking-widest text-slate-500 dark:text-[#8b949e]">
              {experience.year}
            </p>

            <p className="mt-3 text-[10px] font-semibold tracking-widest text-blue-600 dark:text-blue-400">
              {experience.type}
            </p>
          </div>

          {/* Main content */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-[#f0f6fc]">
              {experience.role}
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-[#8b949e]">
              {experience.company}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="mt-6 flex flex-wrap gap-2">
              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-slate-300/80 bg-slate-200/50 px-3 py-1.5 text-[10px] text-slate-700 transition group-hover:border-slate-400 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e] dark:group-hover:border-slate-600 dark:group-hover:text-[#c9d1d9]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:block">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-600 group-hover:text-[#f8fafc] dark:border-[#30363d] dark:text-[#8b949e] dark:group-hover:border-blue-500 dark:group-hover:bg-blue-600 dark:group-hover:text-[#f0f6fc]">
              <ArrowUpRight size={16} />
            </div>
          </div>

        </div>
      </div>
    </motion.article>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[#f8fafc] p-7 dark:bg-[#161b22]">
      <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-[#f0f6fc]">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-600 dark:text-[#8b949e]">
        {label}
      </p>
    </div>
  );
}
import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-slate-300/80 py-32 transition-colors duration-300 dark:border-[#30363d] lg:ml-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] text-blue-600 dark:text-blue-400">
            03 / TECH ARSENAL
          </p>

          <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-slate-900 md:text-7xl dark:text-[#f0f6fc]">
            Tools I use
            <br />
            to build things.
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
            I care more about solving the problem than collecting
            technologies. These are the tools I use across backend
            development, quality engineering, automation, and AI.
          </p>
        </div>

        {/* Skill grid */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-slate-300/80 bg-slate-300/80 dark:border-[#30363d] dark:bg-[#30363d] md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillCard
              key={group.number}
              group={group}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const Icon = group.icon;

  return (
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="group relative min-h-[330px] bg-[#f8fafc] p-7 transition duration-500 hover:bg-slate-100 dark:bg-[#161b22] dark:hover:bg-[#1c2128]"
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-200/50 text-slate-700 transition duration-300 group-hover:border-blue-500/40 group-hover:text-blue-600 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e] dark:group-hover:border-blue-500/40 dark:group-hover:text-blue-400">
          <Icon size={19} />
        </div>

        <span className="font-mono text-[10px] text-slate-400 dark:text-[#6e7681]">
          {group.number}
        </span>
      </div>

      {/* Content */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-[#f0f6fc]">
          {group.title}
        </h3>

        <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-[#8b949e]">
          {group.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="absolute bottom-7 left-7 right-7 flex flex-wrap gap-2">
        {group.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-slate-300/80 bg-slate-200/50 px-3 py-1.5 text-[10px] text-slate-700 transition duration-300 hover:border-blue-500/40 hover:text-blue-600 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e] dark:hover:border-blue-500/40 dark:hover:text-blue-400"
          >
            {technology}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
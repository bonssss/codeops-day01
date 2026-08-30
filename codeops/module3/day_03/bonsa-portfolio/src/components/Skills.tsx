import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-white/10 py-32 lg:ml-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] text-blue-500">
            03 / TECH ARSENAL
          </p>

          <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] md:text-7xl">
            Tools I use
            <br />
            to build things.
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-7 text-neutral-500">
            I care more about solving the problem than collecting
            technologies. These are the tools I use across backend
            development, quality engineering, automation, and AI.
          </p>
        </div>


        {/* Skill grid */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">

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
      className="group relative min-h-[330px] bg-[#080808] p-7 transition duration-500 hover:bg-[#0c0c0c]"
    >

      {/* Top */}
      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-neutral-500 transition duration-300 group-hover:border-blue-500/30 group-hover:text-blue-500">
          <Icon size={19} />
        </div>

        <span className="font-mono text-[10px] text-neutral-700">
          {group.number}
        </span>

      </div>


      {/* Content */}
      <div className="mt-12">

        <h3 className="text-xl font-semibold tracking-tight">
          {group.title}
        </h3>

        <p className="mt-3 text-xs leading-6 text-neutral-600">
          {group.description}
        </p>

      </div>


      {/* Technologies */}
      <div className="absolute bottom-7 left-7 right-7 flex flex-wrap gap-2">

        {group.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-neutral-500 transition duration-300 hover:border-blue-500/40 hover:text-blue-400"
          >
            {technology}
          </span>
        ))}

      </div>

    </motion.div>
  );
}
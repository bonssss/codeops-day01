import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-white/10 py-32 lg:ml-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>
            <p className="text-xs tracking-[0.3em] text-blue-500">
              05 / EXPERIENCE
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] md:text-7xl">
              Where I've
              <br />
              been building.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-neutral-500">
            My experience sits at the intersection of software
            development, quality engineering, automation, and
            creative problem solving.
          </p>

        </div>


        {/* Timeline */}
        <div className="relative mt-24">

          {/* Timeline line */}
          <div className="absolute bottom-0 left-[7px] top-0 hidden w-px bg-white/10 md:block" />

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
        <div className="mt-20 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">

          <Stat
            value="2+"
            label="Years Web Testing"
          />

          <Stat
            value="2+"
            label="Years API Testing"
          />

          <Stat
            value="1+"
            label="Year Mobile Testing"
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
      <div className="absolute left-0 top-8 hidden h-[15px] w-[15px] rounded-full border border-neutral-700 bg-[#050505] transition group-hover:border-blue-500 group-hover:bg-blue-500 md:block" />


      <div className="rounded-xl border border-white/10 bg-[#080808] p-7 transition duration-500 group-hover:border-white/20 md:p-9">

        <div className="grid gap-8 lg:grid-cols-[180px_1fr_auto]">

          {/* Date */}
          <div>
            <p className="font-mono text-[10px] tracking-widest text-neutral-600">
              {experience.year}
            </p>

            <p className="mt-3 text-[10px] tracking-widest text-blue-500">
              {experience.type}
            </p>
          </div>


          {/* Main content */}
          <div>

            <h3 className="text-2xl font-semibold tracking-tight">
              {experience.role}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {experience.company}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500">
              {experience.description}
            </p>


            {/* Technologies */}
            <div className="mt-6 flex flex-wrap gap-2">

              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-neutral-500 transition group-hover:text-neutral-300"
                >
                  {technology}
                </span>
              ))}

            </div>

          </div>


          {/* Arrow */}
          <div className="hidden lg:block">

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-600 transition duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-600 group-hover:text-white">
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
    <div className="bg-[#080808] p-7">

      <p className="text-4xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-xs text-neutral-600">
        {label}
      </p>

    </div>
  );
}
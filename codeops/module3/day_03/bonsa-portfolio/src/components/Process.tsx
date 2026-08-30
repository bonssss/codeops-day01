import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Bug,
  Rocket,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Understand the problem, users, requirements, and constraints before writing code.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Design the architecture, API contracts, database structure, and testing strategy.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Turn the design into clean, maintainable, and production-ready software.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Break",
    description:
      "Test aggressively, automate repetitive checks, and intentionally look for failure.",
    icon: Bug,
  },
  {
    number: "05",
    title: "Improve",
    description:
      "Fix the root cause, optimize the system, and continuously make it better.",
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-white/10 py-32 lg:ml-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>
            <p className="text-xs tracking-[0.3em] text-blue-500">
              04 / MY PROCESS
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] md:text-7xl">
              Build.
              <br />
              Break.
              <br />
              Improve.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-7 text-neutral-500">
              Good software isn't finished when it works.
              It's finished when it is reliable, maintainable,
              tested, and ready for the real world.
            </p>
          </div>

        </div>


        {/* Desktop process */}
        <div className="relative mt-24 hidden lg:block">

          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[25px] h-px bg-white/10" />

          <div className="grid grid-cols-5">

            {steps.map((step, index) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
              />
            ))}

          </div>

        </div>


        {/* Mobile / Tablet */}
        <div className="mt-16 space-y-4 lg:hidden">

          {steps.map((step, index) => (
            <ProcessStepMobile
              key={step.number}
              step={step}
              index={index}
            />
          ))}

        </div>


        {/* Bottom statement */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="mt-24 border-t border-white/10 pt-8"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <p className="font-mono text-xs text-neutral-600">
              SYSTEM.STATUS
            </p>

            <p className="text-sm text-neutral-400">
              <span className="text-green-400">●</span>{" "}
              Always learning. Always improving.
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}


/* ================= DESKTOP STEP ================= */

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const Icon = step.icon;

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
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group relative px-5"
    >

      {/* Node */}
      <div className="relative z-10 flex h-[51px] w-[51px] items-center justify-center rounded-full border border-white/10 bg-[#050505] text-neutral-500 transition duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">

        <Icon size={18} />

      </div>


      {/* Number */}
      <p className="mt-8 font-mono text-[10px] text-blue-500">
        {step.number}
      </p>


      {/* Title */}
      <h3 className="mt-3 text-xl font-semibold">
        {step.title}
      </h3>


      {/* Description */}
      <p className="mt-4 max-w-[190px] text-xs leading-6 text-neutral-600 transition group-hover:text-neutral-400">
        {step.description}
      </p>

    </motion.div>
  );
}


/* ================= MOBILE STEP ================= */

function ProcessStepMobile({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
      className="group rounded-xl border border-white/10 bg-[#090909] p-6"
    >

      <div className="flex gap-5">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-neutral-500 group-hover:border-blue-500/30 group-hover:text-blue-500">
          <Icon size={18} />
        </div>

        <div>

          <div className="flex items-center gap-3">

            <span className="font-mono text-[10px] text-blue-500">
              {step.number}
            </span>

            <h3 className="font-semibold">
              {step.title}
            </h3>

          </div>

          <p className="mt-3 text-xs leading-6 text-neutral-600">
            {step.description}
          </p>

        </div>

      </div>

    </motion.div>
  );
}
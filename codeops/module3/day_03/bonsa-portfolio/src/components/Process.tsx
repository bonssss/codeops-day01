import { motion } from "framer-motion";
import { steps } from "../data/process";

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-slate-300/80 py-32 transition-colors duration-300 dark:border-[#30363d] lg:ml-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-blue-600 dark:text-blue-400">
              04 / MY PROCESS
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-slate-900 md:text-7xl dark:text-[#f0f6fc]">
              Build.
              <br />
              Break.
              <br />
              Improve.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
              Good software isn't finished when it works.
              It's finished when it is reliable, maintainable,
              tested, and ready for the real world.
            </p>
          </div>
        </div>

        {/* Desktop process */}
        <div className="relative mt-24 hidden lg:block">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[25px] h-px bg-slate-300/80 transition-colors duration-300 dark:bg-[#30363d]" />

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
          className="mt-24 border-t border-slate-300/80 pt-8 transition-colors duration-300 dark:border-[#30363d]"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <p className="font-mono text-xs text-slate-400 dark:text-[#6e7681]">
              SYSTEM.STATUS
            </p>

            <p className="text-sm text-slate-600 dark:text-[#8b949e]">
              <span className="text-emerald-500 dark:text-emerald-400">●</span>{" "}
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
      <div className="relative z-10 flex h-[51px] w-[51px] items-center justify-center rounded-full border border-slate-300 bg-[#f8fafc] text-slate-700 shadow-sm transition duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-[#f8fafc] dark:border-[#30363d] dark:bg-[#161b22] dark:text-[#8b949e] dark:group-hover:border-blue-500 dark:group-hover:bg-blue-600">
        <Icon size={18} />
      </div>

      {/* Number */}
      <p className="mt-8 font-mono text-[10px] text-blue-600 dark:text-blue-400">
        {step.number}
      </p>

      {/* Title */}
      <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-[#f0f6fc]">
        {step.title}
      </h3>

      {/* Description */}
      <p className="mt-4 max-w-[190px] text-xs leading-6 text-slate-600 transition group-hover:text-slate-900 dark:text-[#8b949e] dark:group-hover:text-[#e6edf3]">
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
      className="group rounded-xl border border-slate-300/80 bg-[#f8fafc] p-6 shadow-sm dark:border-[#30363d] dark:bg-[#161b22]"
    >
      <div className="flex gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-200/50 text-slate-700 group-hover:border-blue-500/40 group-hover:text-blue-600 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e] dark:group-hover:border-blue-500/30 dark:group-hover:text-blue-400">
          <Icon size={18} />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
              {step.number}
            </span>

            <h3 className="font-semibold text-slate-900 dark:text-[#f0f6fc]">
              {step.title}
            </h3>
          </div>

          <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-[#8b949e]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
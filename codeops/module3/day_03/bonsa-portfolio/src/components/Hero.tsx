import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-white/10 lg:ml-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-32 lg:grid-cols-2 lg:px-12">

        {/* Left */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative z-10"
        >
          {/* Availability */}
          <div className="mb-8 flex items-center gap-3 text-[10px] tracking-[0.2em] text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            AVAILABLE FOR OPPORTUNITIES
          </div>

          {/* Label */}
          <p className="mb-5 text-xs tracking-[0.35em] text-neutral-600">
            BACKEND / QA / AI
          </p>

          {/* Name */}
          <h1 className="text-[clamp(4rem,9vw,8rem)] font-black leading-[0.88] tracking-[-0.07em]">
            Hi, I'm
            <br />

            <span className="text-blue-500">
              Bonsa
            </span>{" "}
            Desalegn
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-8 text-neutral-400 md:text-lg">
            I build reliable backend systems, automate
            quality assurance, and explore practical AI
            solutions.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:-translate-y-1 hover:bg-blue-500"
            >
              View Work

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold transition hover:border-white/30"
            >
              Contact Me
            </a>

          </div>
        </motion.div>


        {/* Right - Terminal */}
        <Terminal />

      </div>


      {/* Scroll indicator */}
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-600 transition hover:text-white"
      >
        <ArrowDown
          size={20}
          className="animate-bounce"
        />
      </a>

    </section>
  );
}


function Terminal() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
      }}
      className="relative z-10 hidden self-center lg:block"
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#090909] shadow-2xl">

        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">

          <span className="h-3 w-3 rounded-full bg-red-400/60" />

          <span className="h-3 w-3 rounded-full bg-yellow-400/60" />

          <span className="h-3 w-3 rounded-full bg-green-400/60" />

          <span className="ml-auto font-mono text-[10px] text-neutral-700">
            bonsa@portfolio
          </span>

        </div>


        {/* Terminal body */}
        <div className="p-7 font-mono text-sm leading-7">

          <p className="text-neutral-500">
            <span className="text-green-400">$</span>{" "}
            whoami
          </p>

          <p className="text-neutral-600">
            bonsa@portfolio:~$
          </p>

          <br />

          <p>
            <span className="text-blue-400">
              const
            </span>{" "}
            developer = {"{"}
          </p>

          <p className="pl-5">
            name:{" "}
            <span className="text-yellow-400">
              "Bonsa Desalegn"
            </span>
            ,
          </p>

          <p className="pl-5">
            role:{" "}
            <span className="text-yellow-400">
              "Backend + QA"
            </span>
            ,
          </p>

          <p className="pl-5">
            location:{" "}
            <span className="text-yellow-400">
              "Ethiopia"
            </span>
            ,
          </p>

          <p className="pl-5">
            focus: [
          </p>

          <p className="pl-10 text-neutral-400">
            "Scalable APIs",
          </p>

          <p className="pl-10 text-neutral-400">
            "Test Automation",
          </p>

          <p className="pl-10 text-neutral-400">
            "AI Systems"
          </p>

          <p className="pl-5">
            ]
          </p>

          <p>
            {"}"};
          </p>

          <br />

          <p>
            <span className="text-green-400">
              $ 
            </span>{" "}
            status
          </p>

          <p className="text-green-400">
            ● building...
          </p>

        </div>
      </div>
    </motion.div>
  );
}
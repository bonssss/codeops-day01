import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "../data/project";

function GithubIcon({ size = 14 }: { size?: number }) {
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
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-b border-slate-300/80 py-32 transition-colors duration-300 dark:border-[#30363d] lg:ml-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-blue-600 dark:text-blue-400">
              02 / SELECTED WORK
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-slate-900 md:text-7xl dark:text-[#f0f6fc]">
              Things I've built.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
            A collection of projects where engineering,
            automation, quality, and AI come together.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-20 space-y-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
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
        duration: 0.6,
        delay: index * 0.1,
      }}
      className="group overflow-hidden rounded-2xl border border-slate-300/80 bg-[#f8fafc] shadow-sm transition duration-500 hover:border-blue-500/40 hover:shadow-md dark:border-[#30363d] dark:bg-[#161b22] dark:hover:border-blue-500/30"
    >
      <div className="grid lg:grid-cols-[80px_1fr_1fr]">

        {/* Number */}
        <div className="hidden border-r border-slate-300/80 p-6 transition-colors duration-300 dark:border-[#30363d] lg:block">
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
            {project.number}
          </span>
        </div>

        {/* Project information */}
        <div className="flex flex-col justify-between p-7 md:p-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-1 text-[10px] tracking-widest text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                {project.category}
              </span>

              <span className="font-mono text-xs text-slate-400 lg:hidden dark:text-[#6e7681]">
                {project.number}
              </span>
            </div>

            <h3 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-[#f0f6fc]">
              {project.title}
            </h3>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-slate-300/80 bg-slate-200/50 px-3 py-1.5 text-[10px] text-slate-700 transition group-hover:border-slate-400 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#8b949e] dark:group-hover:border-slate-600 dark:group-hover:text-[#c9d1d9]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-10 flex gap-3">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-200/50 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#e6edf3] dark:hover:border-slate-600"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
            )}

            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-[#f8fafc] transition hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Live Demo
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Project preview */}
        <div className="relative min-h-[300px] overflow-hidden border-t border-slate-300/80 bg-slate-200/60 p-4 transition-colors duration-300 dark:border-[#30363d] dark:bg-[#0d1117] lg:border-l lg:border-t-0 flex items-center justify-center">

          {/* Background subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top rounded-lg border border-slate-300/70 opacity-95 transition duration-500 group-hover:scale-105 group-hover:opacity-100 shadow-sm dark:border-[#30363d] dark:shadow-md"
          />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none rounded-b-lg" />

          {/* Arrow */}
          <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/80 bg-[#f8fafc]/90 text-slate-800 shadow-md backdrop-blur transition duration-300 group-hover:rotate-45 group-hover:bg-blue-600 group-hover:text-[#f8fafc] dark:border-[#30363d] dark:bg-[#161b22]/80 dark:text-[#f0f6fc] dark:group-hover:bg-blue-600">
            <ArrowUpRight size={20} />
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-6 left-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
              PROJECT_{project.number}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-100">
              {project.title}
            </p>
          </div>

        </div>

      </div>
    </motion.article>
  );
}
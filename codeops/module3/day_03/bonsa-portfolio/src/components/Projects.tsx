import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

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

import { projects } from "../data/project";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-b border-white/10 py-32 lg:ml-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="text-xs tracking-[0.3em] text-blue-500">
              02 / SELECTED WORK
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.04em] md:text-7xl">
              Things I've built.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-neutral-500">
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


function ProjectCard({
  project,
  index,
}: ProjectCardProps) {

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
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#090909] transition duration-500 hover:border-blue-500/30"
    >

      <div className="grid lg:grid-cols-[80px_1fr_1fr]">

        {/* Number */}
        <div className="hidden border-r border-white/10 p-6 lg:block">

          <span className="font-mono text-xs text-blue-500">
            {project.number}
          </span>

        </div>


        {/* Project information */}
        <div className="flex flex-col justify-between p-7 md:p-10">

          <div>

            <div className="mb-5 flex items-center gap-3">

              <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[10px] tracking-widest text-blue-400">
                {project.category}
              </span>

              <span className="font-mono text-xs text-neutral-700 lg:hidden">
                {project.number}
              </span>

            </div>


            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {project.title}
            </h3>


            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-500">
              {project.description}
            </p>


            {/* Technologies */}
            <div className="mt-7 flex flex-wrap gap-2">

              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-neutral-500 transition group-hover:border-white/20 group-hover:text-neutral-300"
                >
                  {technology}
                </span>
              ))}

            </div>

          </div>


          {/* Links */}
          <div className="mt-10 flex gap-3">

            <a
              href={project.github}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs transition hover:border-white/30"
            >
              <GithubIcon size={14} />
              GitHub
            </a>

            <a
              href={project.demo}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-medium text-black transition hover:bg-blue-500 hover:text-white"
            >
              Live Demo
              <ExternalLink size={14} />
            </a>

          </div>

        </div>


        {/* Project preview */}
        <div className="relative min-h-[300px] bg-[#111111] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0 flex items-center justify-center p-4">

          {/* Background subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top rounded-lg border border-white/5 opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100 shadow-xl"
          />

          {/* Subtle Bottom Gradient for readable text */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Arrow */}
          <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur transition duration-300 group-hover:rotate-45 group-hover:bg-blue-600 shadow-lg">
            <ArrowUpRight size={20} />
          </div>


          {/* Bottom label */}
          <div className="absolute bottom-6 left-6">

            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              PROJECT_{project.number}
            </p>

            <p className="mt-1 text-sm font-medium">
              {project.title}
            </p>

          </div>

        </div>

      </div>

    </motion.article>
  );
}
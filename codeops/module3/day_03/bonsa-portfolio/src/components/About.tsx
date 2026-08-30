import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { principles } from "../data/about";

export default function About() {
  return (
    <section
      id="about"
      className="border-b border-white/10 py-32 lg:ml-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-blue-500">
            06 / ABOUT
          </p>

          <h2 className="mt-5 max-w-5xl text-5xl font-bold leading-[1] tracking-[-0.05em] md:text-7xl">
            I don't just build software.
            <br />
            <span className="text-neutral-600">
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
            <p className="max-w-2xl text-lg leading-9 text-neutral-400">
              I'm a software engineer focused on backend development
              and quality engineering. I enjoy building systems,
              understanding how they work, and finding ways to make
              them more reliable.
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-neutral-600">
              My interests sit across backend engineering, API
              development, test automation, mobile and web testing,
              databases, and practical AI applications.
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-neutral-600">
              I believe good engineering is not only about writing
              code that works. It's about understanding the problem,
              designing for failure, testing assumptions, and
              continuously improving the result.
            </p>


            {/* Location */}
            <div className="mt-10 flex items-center gap-3 text-xs text-neutral-500">
              <MapPin
                size={15}
                className="text-blue-500"
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
            className="rounded-2xl border border-white/10 bg-[#090909] p-7"
          >

            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">

              <span className="font-mono text-[10px] text-neutral-600">
                SYSTEM_PROFILE
              </span>

              <span className="text-[10px] text-green-400">
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
            <div className="mt-10 rounded-lg border border-white/5 bg-black p-5 font-mono text-xs leading-7">

              <p className="text-neutral-600">
                {"// engineering philosophy"}
              </p>

              <p>
                <span className="text-blue-400">
                  const
                </span>{" "}
                quality ={" "}
                <span className="text-yellow-400">
                  "continuous improvement"
                </span>
                ;
              </p>

              <p>
                <span className="text-blue-400">
                  const
                </span>{" "}
                mindset ={" "}
                <span className="text-yellow-400">
                  "build + break"
                </span>
                ;
              </p>

            </div>

          </motion.div>

        </div>


        {/* Principles */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">

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
                className="group bg-[#080808] p-8 transition hover:bg-[#0c0c0c]"
              >

                <Icon
                  size={20}
                  className="text-neutral-600 transition group-hover:text-blue-500"
                />

                <h3 className="mt-8 text-sm font-semibold tracking-widest">
                  {principle.title}
                </h3>

                <p className="mt-4 text-xs leading-6 text-neutral-600">
                  {principle.description}
                </p>

              </motion.div>
            );
          })}

        </div>


        {/* Resume */}
        <div className="mt-10 flex justify-end">

          <a
            href="/resume.pdf"
            className="group flex items-center gap-2 text-xs text-neutral-500 transition hover:text-white"
          >
            Download Resume

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

      <span className="font-mono text-[9px] tracking-widest text-neutral-700">
        {label}
      </span>

      <span
        className={
          green
            ? "text-xs text-green-400"
            : "text-xs text-neutral-400"
        }
      >
        {value}
      </span>

    </div>
  );
}
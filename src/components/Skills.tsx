"use client";

import { motion } from "framer-motion";

const skills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Node.js", "Express", "PostgreSQL", "MongoDB",
  "Git", "Docker", "Figma", "REST APIs"
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative z-10 w-full max-w-5xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Umiejętności</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-lg">
          Technologie, z którymi pracuję na co dzień, budując nowoczesne projekty internetowe.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap gap-4"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            variants={item}
            whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
            className="glass-card px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <span className="text-zinc-200 font-medium">{skill}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Nowoczesna platforma sprzedażowa z pełnym panelem administracyjnym, płatnościami Stripe i autoryzacją użytkowników.",
    tags: ["Next.js", "Tailwind CSS", "Prisma", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105153ce67?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "System analityczny SaaS do zarządzania zasobami firmy, obejmujący zaawansowane wykresy i integrację z wieloma API.",
    tags: ["React", "TypeScript", "Recharts", "Node.js"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    id: 3,
    title: "Portfolio Template",
    description: "Minimalistyczny szablon portfolio dla twórców wykorzystujący glassmorphism i animacje framer-motion.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10 w-full max-w-5xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ostatnie <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Projekty</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl text-lg">
          Zobacz wybrane realizacje, nad którymi ostatnio pracowałem.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={index === 0 ? "md:col-span-2 glass-card rounded-2xl overflow-hidden group" : "glass-card rounded-2xl overflow-hidden group"}
          >
            <div className={`relative ${index === 0 ? "h-80 md:h-96" : "h-64"} w-full overflow-hidden`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-zinc-400 mb-6 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand-400 transition-colors">
                  <Terminal className="w-4 h-4" /> Kod
                </a>
                <a href={project.live} className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand-400 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

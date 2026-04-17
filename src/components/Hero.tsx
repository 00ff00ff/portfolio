"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Briefcase, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full bg-black z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-brand-500/30 glass text-brand-300 text-sm font-medium tracking-wider uppercase"
          >
            Dostępny do współpracy
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Cześć, jestem <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Marcin</span>
            <br />
            <span className="text-white">Full-Stack Developer</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tworzę nowoczesne, wydajne i skalowalne aplikacje internetowe. Specjalizuję się w React, Next.js oraz technologiach chmurowych.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto shadow-[0_0_40px_rgba(124,58,237,0.4)]"
            >
              Zobacz Projekty
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="/game"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            >
              Zagraj w Minigrę 🏎️
            </a>
            
            <a 
              href="#contact"
              className="px-8 py-4 glass border border-white/10 hover:border-white/20 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Kontakt
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <Terminal className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-brand-400 transition-colors">
              <Briefcase className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:kontakt@example.com" className="text-zinc-500 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
      </motion.div>
    </section>
  );
}

import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import InteractiveWhale from "@/components/InteractiveWhale";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <InteractiveWhale />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      
      <footer className="py-8 text-center text-zinc-500 border-t border-white/5 text-sm mt-20">
        <p>© {new Date().getFullYear()} Marcin. Wszelkie prawa zastrzeżone.</p>
        <p className="mt-2">Stworzone z Next.js, Tailwind CSS & Framer Motion</p>
      </footer>
    </div>
  );
}

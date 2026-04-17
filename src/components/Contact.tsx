"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative z-10 w-full max-w-5xl mx-auto px-6 border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Bądźmy w <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Kontakcie</span>
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md text-lg">
            Masz pomysł na projekt lub szukasz programisty do swojego zespołu? Napisz do mnie.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="font-medium text-zinc-200">kontakt@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Lokalizacja</p>
                <p className="font-medium text-zinc-200">Warszawa, Polska (Remote)</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-2xl relative"
        >
          <div className="absolute inset-0 bg-brand-500/5 rounded-2xl filter blur-xl -z-10"></div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Imię i nazwisko</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-white transition-all"
                placeholder="Jan Kowalski"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-white transition-all"
                placeholder="jan@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Wiadomość</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-white transition-all resize-none"
                placeholder="W czym mogę Ci pomóc?"
              ></textarea>
            </div>
            
            <button className="w-full px-6 py-4 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all">
              Wyślij Wiadomość
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

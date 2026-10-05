'use client';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-32 w-full px-6 max-w-4xl mx-auto text-center" id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Let's Build <span className="text-gradient">Together</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg">
          Ready to collaborate on the next big AI innovation or build robust software solutions? Establish a secure connection via the channels below.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:Gargmanan7289@gmail.com" className="flex items-center gap-3 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all group text-gray-300 hover:text-white">
            <Mail size={20} className="text-brand-primary" />
            <span className="font-medium">Email</span>
          </a>
          
          <a href="https://github.com/Manan7289" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all group text-gray-300 hover:text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span className="font-medium">GitHub</span>
          </a>

          <a href="https://linkedin.com/in/manan-garg-85012b318" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all group text-gray-300 hover:text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a66c2]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            <span className="font-medium">LinkedIn</span>
          </a>

          <a href="tel:+919897848251" className="flex items-center gap-3 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all group text-gray-300 hover:text-white">
            <Phone size={20} className="text-brand-accent" />
            <span className="font-medium">Phone</span>
          </a>
        </div>

        <div className="mt-32 pb-8 text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
          <span>&copy; 2026 Manan Garg</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full inline-block"></span>
          <span>Designed & Engineered with precision.</span>
        </div>
      </motion.div>
    </section>
  );
}

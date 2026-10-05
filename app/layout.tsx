import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manan Garg | Software Engineer",
  description: "AI & ML Enthusiast / Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col relative bg-dark-bg text-foreground selection:bg-brand-primary/30">
        
        {/* Subtle radial gradient background for depth */}
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#030712] to-[#030712]"></div>
        
        <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-lg tracking-wide text-white">
              Manan<span className="text-gray-500">Garg</span>
            </div>
            <div className="flex gap-8 text-sm font-medium hidden md:flex text-gray-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </nav>

        <main className="flex-grow pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}

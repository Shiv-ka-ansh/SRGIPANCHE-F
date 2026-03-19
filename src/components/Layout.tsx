import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary selection:text-black">
      <div className="bg-noise" />
      
      {/* Brutalist Marquee Banner */}
      <div className="bg-primary text-black py-2 overflow-hidden relative z-50 border-b-4 border-black">
        <div className="flex w-[200%] animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 whitespace-nowrap font-display text-xl uppercase tracking-wider">
              <Zap size={20} className="fill-black" /> 
              <span>PANACHE 2K26 IS LIVE</span>
              <span className="text-secondary font-bold">•</span>
              <span>SECURE YOUR TICKETS NOW</span>
            </div>
          ))}
        </div>
      </div>
      
      <Navbar />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </div>
  );
}

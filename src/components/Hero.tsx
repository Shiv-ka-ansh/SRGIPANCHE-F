import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-03-28T09:00:00').getTime();
    const endDate = new Date('2026-03-31T23:59:59').getTime();
    const now = new Date().getTime();
    
    const distance = targetDate - now;

    if (distance < 0) {
      if (now < endDate) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isLive: false,
      isEnded: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const textX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const imageX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const imageY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-8 border-2 border-white/20 px-4 py-2 flex items-center gap-4 font-sans font-bold uppercase tracking-widest text-sm bg-surface/50 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 text-primary"><Calendar size={16} /> 
              MARCH 28-31
              </span>
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span className="flex items-center gap-2 text-secondary"><MapPin size={16} /> 
              SRGI COLLEGE CAMPUS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              style={{ x: textX, y: textY }}
              className="text-[12vw] lg:text-[8rem] font-display leading-[0.85] tracking-tight text-white mb-6 uppercase relative z-20"
            >
              <span className="glitch-text" data-text="IGNITE">IGNITE</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                THE CHAOS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              style={{ x: textX, y: textY }}
              className="text-lg md:text-xl text-text-muted mb-10 max-w-lg font-sans leading-relaxed relative z-20"
            >
              Four days of relentless innovation, brutal competition, and pure adrenaline. The ultimate tech and cultural festival is back.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto relative z-20"
            >
              <MagneticButton to="/dashboard" className="btn-brutal btn-brutal-primary w-full sm:w-auto text-lg py-4 px-8">
                GET TICKETS <Zap size={20} className="ml-2" />
              </MagneticButton>
              <MagneticButton to="/events" className="btn-brutal w-full sm:w-auto text-lg py-4 px-8">
                EXPLORE EVENTS <ArrowRight size={20} className="ml-2" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Visuals & Countdown */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              style={{ x: imageX, y: imageY }}
              className="relative z-10"
            >
              <div className="aspect-[3/4] border-4 border-white overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10" />
                <img 
                  src="https://picsum.photos/seed/cyberpunk/800/1000" 
                  alt="Festival Vibe" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-primary" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-secondary" />
            </motion.div>
            
            {/* Brutalist Countdown Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ x: textX, y: textY }}
              className="absolute -bottom-10 -left-4 lg:-left-20 bg-surface border-4 border-primary p-6 z-20 shadow-[12px_12px_0px_#FF00FF]"
            >
              <div className="font-sans font-bold text-primary uppercase tracking-widest mb-4 text-sm flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full animate-pulse", timeLeft.isLive ? "bg-accent" : "bg-primary")} />
                {timeLeft.isEnded ? "SYSTEM OFFLINE" : timeLeft.isLive ? "PROTOCOL ACTIVE" : "SYSTEM LAUNCH IN"}
              </div>
              <div className="flex gap-4 md:gap-6">
                {Object.entries(timeLeft)
                  .filter(([key]) => typeof timeLeft[key as keyof typeof timeLeft] === 'number')
                  .map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-display text-white leading-none">
                        {value.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs font-sans font-bold text-text-muted uppercase tracking-wider mt-1">{unit}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

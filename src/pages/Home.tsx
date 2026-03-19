import { Hero } from '../components/Hero';
import { EventZones } from '../components/EventZones';
import { FeaturedEvents } from '../components/FeaturedEvents';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/MagneticButton';

export function Home() {
  return (
    <Layout>
      <Hero />
      
      {/* Brutalist About Section */}
      <section className="py-32 bg-primary text-black relative overflow-hidden" id="about">
        {/* Decorative background text */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10 flex flex-col justify-between">
          <div className="font-display text-[10vw] leading-none whitespace-nowrap">PANACHE PANACHE PANACHE</div>
          <div className="font-display text-[10vw] leading-none whitespace-nowrap text-right">LEGACY LEGACY LEGACY</div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8 leading-[0.9]">
                <TextReveal text="THE LEGACY OF" />
                <span className="text-white drop-shadow-[4px_4px_0px_#000]">PANACHE</span>
              </h2>
              <div className="w-24 h-2 bg-black mb-8" />
              <p className="font-sans font-bold text-xl mb-6 leading-relaxed uppercase tracking-wide">
                Since its inception, PANACHE has been the crucible where raw talent meets unparalleled opportunity. It's not just a college fest; it's a global phenomenon.
              </p>
              <p className="font-sans font-medium text-lg mb-12 leading-relaxed uppercase tracking-wide opacity-80">
                In 2026, we are pushing the limits further. With cutting-edge cyber challenges, breathtaking cultural performances, and intense technical hackathons, PANACHE 2K26 is designed to elevate the human experience.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'EVENTS', value: '50+' },
                  { label: 'COLLEGES', value: '12' },
                  { label: 'FOOTFALL', value: '15k' },
                  { label: 'PRIZE POOL', value: '5k' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_#000] transform hover:-translate-y-2 transition-transform">
                    <div className="text-4xl md:text-5xl font-display text-black mb-2">{stat.value}</div>
                    <div className="text-sm font-sans font-bold text-black uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square border-8 border-black relative shadow-[16px_16px_0px_#000] overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/festival/800/800" 
                  alt="Festival Crowd" 
                  className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-secondary border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_#000] animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="font-display text-3xl text-white transform -rotate-12">TECH</span>
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_#000] animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <span className="font-display text-3xl text-black transform rotate-12">CULTURE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <EventZones />
      <FeaturedEvents />
      
      {/* CTA Section */}
      <section className="py-32 bg-secondary text-black text-center border-y-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwaC04djhaIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIj48L3BhdGg+Cjwvc3ZnPg==')] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter mb-8 text-white drop-shadow-[6px_6px_0px_#000]">
            READY TO JOIN US?
          </h2>
          <p className="font-sans font-bold text-xl md:text-2xl mb-12 max-w-3xl mx-auto uppercase tracking-widest">
            Join thousands of innovators, creators, and competitors. Secure your spot at PANACHE 2K26 today.
          </p>
          <MagneticButton to="/register" className="inline-block px-12 py-6 bg-primary text-black font-display text-3xl uppercase tracking-widest border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all">
            REGISTER NOW
          </MagneticButton>
        </div>
      </section>
    </Layout>
  );
}

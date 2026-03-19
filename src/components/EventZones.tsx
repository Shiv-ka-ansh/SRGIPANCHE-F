import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Music } from 'lucide-react';

export function EventZones() {
  const zones = [
    {
      id: 'technical',
      title: 'TECHNICAL',
      icon: <Cpu size={32} className="text-black" />,
      bg: 'bg-primary',
      border: 'border-primary',
      shadow: 'hover:shadow-[8px_8px_0px_#CCFF00]',
      description: 'Hackathons, coding challenges, and robotics competitions pushing the boundaries of innovation.',
      image: 'https://picsum.photos/seed/tech/800/600'
    },
    {
      id: 'cyber',
      title: 'CYBER',
      icon: <Shield size={32} className="text-black" />,
      bg: 'bg-accent',
      border: 'border-accent',
      shadow: 'hover:shadow-[8px_8px_0px_#00FFFF]',
      description: 'CTF challenges, security audits, and ethical hacking tournaments for the cyber elite.',
      image: 'https://picsum.photos/seed/cyber/800/600'
    },
    {
      id: 'general',
      title: 'GENERAL',
      icon: <Zap size={32} className="text-black" />,
      bg: 'bg-yellow-400',
      border: 'border-yellow-400',
      shadow: 'hover:shadow-[8px_8px_0px_#FBBF24]',
      description: 'E-sports, debates, quizzes, and strategy games testing your mental agility.',
      image: 'https://picsum.photos/seed/esports/800/600'
    },
    {
      id: 'cultural',
      title: 'CULTURAL',
      icon: <Music size={32} className="text-black" />,
      bg: 'bg-secondary',
      border: 'border-secondary',
      shadow: 'hover:shadow-[8px_8px_0px_#FF00FF]',
      description: 'Battle of bands, dance-offs, and artistic showcases celebrating creative expression.',
      image: 'https://picsum.photos/seed/concert/800/600'
    }
  ];

  return (
    <section className="py-24 bg-surface border-y-4 border-border relative overflow-hidden" id="zones">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMTExIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display text-white mb-4 uppercase tracking-wide"
          >
            FESTIVAL <span className="text-primary">ZONES</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted font-sans text-lg max-w-2xl mx-auto uppercase tracking-widest"
          >
            CHOOSE YOUR BATTLEGROUND. MAKE YOUR MARK.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {zones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-brutal flex flex-col group ${zone.shadow} hover:-translate-y-2`}
            >
              <div className="h-48 overflow-hidden relative border-b-2 border-border group-hover:border-white transition-colors">
                <div 
                  className="absolute inset-0 bg-cover bg-center md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${zone.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className={`w-14 h-14 ${zone.bg} flex items-center justify-center mb-6 border-2 border-black transform -rotate-6 group-hover:rotate-0 transition-transform`}>
                  {zone.icon}
                </div>
                <h3 className="text-3xl font-display text-white mb-4 uppercase tracking-wider">
                  {zone.title}
                </h3>
                <p className="text-text-muted font-sans text-sm leading-relaxed uppercase tracking-wide">
                  {zone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

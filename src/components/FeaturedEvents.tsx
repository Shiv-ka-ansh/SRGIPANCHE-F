import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { EVENT_CATEGORIES } from '../lib/eventData';
import { EventModal } from './EventModal';

export function FeaturedEvents() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Display a selection of events from the hardcoded data
  const featuredList = [
    { ...EVENT_CATEGORIES.technical.events.find(e => e.name === 'WAR OF MACHINES')!, category: 'TECHNICAL', image: EVENT_CATEGORIES.technical.image, description: EVENT_CATEGORIES.technical.events.find(e => e.name === 'WAR OF MACHINES')?.description },
    { ...EVENT_CATEGORIES.cultural.events.find(e => e.name === 'TANZ & TWIST (Group)')!, category: 'CULTURAL', image: EVENT_CATEGORIES.cultural.image, description: EVENT_CATEGORIES.cultural.events.find(e => e.name === 'TANZ & TWIST (Group)')?.description },
    { ...EVENT_CATEGORIES.cyber.events.find(e => e.name === 'ONLINE GAMING')!, category: 'CYBER', image: EVENT_CATEGORIES.cyber.image, description: EVENT_CATEGORIES.cyber.events.find(e => e.name === 'ONLINE GAMING')?.description },
  ];

  const getCatColor = (cat: string) => {
    switch (cat) {
      case 'TECHNICAL': return '#00FFFF';
      case 'CULTURAL': return '#FF00FF';
      case 'CYBER': return '#FF6B00';
      default: return '#CCFF00';
    }
  };

  return (
    <section className="py-32 bg-[#050505] border-b-4 border-[#333] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-anton text-white mb-4 uppercase tracking-wide"
            >
              FEATURED <span className="text-[#FF00FF]">EVENTS</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#888] font-space text-lg max-w-xl uppercase tracking-widest"
            >
              THE MOST ANTICIPATED SHOWDOWNS OF PANACHE 2K26.
            </motion.p>
          </div>
          <MagneticButton 
            to="/events" 
            className="btn-brutal btn-brutal-primary shrink-0"
          >
            VIEW ALL EVENTS <ArrowRight size={20} className="ml-2" />
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredList.map((event, index) => {
            const color = getCatColor(event.category);
            return (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121212] border-4 border-[#333] flex flex-col group hover:-translate-y-2 transition-all cursor-pointer"
                style={{ 
                  boxShadow: '8px 8px 0px #333',
                }}
                onClick={() => {
                  setSelectedEvent(event);
                  setIsModalOpen(true);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${color}`;
                  (e.currentTarget as HTMLElement).style.borderColor = color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #333';
                  (e.currentTarget as HTMLElement).style.borderColor = '#333';
                }}
              >
                <div className="h-56 relative overflow-hidden border-b-4 border-[#333]">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 right-4 text-black px-4 py-1 text-sm font-anton uppercase tracking-widest border-2 border-black transform rotate-3 group-hover:rotate-0 transition-transform" style={{ backgroundColor: color }}>
                    {event.category}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-anton text-white mb-2 uppercase tracking-wide group-hover:transition-colors" style={{ '--hover-color': color } as any}>
                    {event.name}
                  </h3>
                  
                  {event.description && (
                    <p className="text-[#888] font-space text-xs uppercase tracking-wider mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="space-y-4 mb-8 pt-6 border-t-2 border-[#333]">
                    <div className="flex items-center justify-between font-space text-sm text-white uppercase tracking-wider">
                      <span>Entry Fee</span>
                      <span className="font-anton text-2xl" style={{ color }}>₹{event.amount}</span>
                    </div>
                    {'subEvents' in event && event.subEvents && (
                      <div className="font-space text-xs text-[#888] uppercase tracking-wider">
                        Includes: {(event.subEvents as string[]).slice(0, 3).join(', ')}...
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    to="/register"
                    className="btn-brutal w-full text-center mt-auto"
                  >
                    REGISTER NOW
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </section>
  );
}

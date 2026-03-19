import { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Filter, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { EVENT_CATEGORIES } from '../lib/eventData';
import { EventModal } from '../components/EventModal';

// Flatten all events for display
const allEvents = Object.entries(EVENT_CATEGORIES).flatMap(([key, cat]) =>
  cat.events.map((ev) => ({
    id: `${key}-${ev.name}`,
    name: ev.name,
    amount: ev.amount,
    category: cat.label,
    categoryKey: key,
    color: cat.color,
    image: cat.image,
    description: ev.description,
    subEvents: ev.subEvents,
  }))
);

export function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'General', 'Technical', 'Cultural', 'Cyber'];

  const filteredEvents = useMemo(() => {
    let result = allEvents;

    if (activeCategory !== 'All') {
      result = result.filter(e => e.category === activeCategory);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.name.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <Layout>
      <div className="pt-12 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">

          <div className="text-center mb-16 pt-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-anton text-white mb-6 uppercase tracking-tight"
            >
              EXPLORE <span className="text-[#00FFFF]">EVENTS</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#888] font-space text-xl max-w-2xl mx-auto uppercase tracking-widest"
            >
              DISCOVER THE ULTIMATE LINEUP OF COMPETITIONS, WORKSHOPS, AND PERFORMANCES.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="bg-[#121212] border-4 border-[#333] p-6 mb-16 flex flex-col md:flex-row gap-6 justify-between items-center top-32 z-30" style={{ boxShadow: '12px 12px 0px #333' }}>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-3 font-space font-bold text-sm uppercase tracking-widest border-2 transition-all",
                    activeCategory === category
                      ? "bg-[#CCFF00] text-black border-[#CCFF00] shadow-[4px_4px_0px_#FF00FF] translate-x-[-2px] translate-y-[-2px]"
                      : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" size={20} />
              <input
                type="text"
                placeholder="SEARCH EVENTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050505] border-2 border-[#333] py-4 pl-12 pr-4 text-white font-space font-bold uppercase tracking-widest focus:outline-none focus:border-[#CCFF00] focus:shadow-[4px_4px_0px_#CCFF00] transition-all placeholder:text-[#888]"
              />
            </div>
          </div>

          {/* Event Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-[#121212] border-4 border-[#333] flex flex-col group hover:-translate-y-2 transition-all cursor-pointer"
                  style={{ boxShadow: '8px 8px 0px #333' }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${event.color}`;
                    (e.currentTarget as HTMLElement).style.borderColor = event.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #333';
                    (e.currentTarget as HTMLElement).style.borderColor = '#333';
                  }}
                >
                  <div className="h-40 relative overflow-hidden border-b-4 border-[#333]">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                    <div
                      className="absolute top-4 right-4 text-black px-4 py-1 text-xs font-anton uppercase tracking-widest border-2 border-black transform rotate-3 group-hover:rotate-0 transition-transform"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-anton text-white mb-2 uppercase tracking-wide">{event.name}</h3>

                    {event.description && (
                      <p className="text-[#888] font-space text-[10px] uppercase tracking-wider mb-3 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    )}

                    {event.subEvents && (
                      <div className="bg-[#050505] p-2 border-l-2 border-[#CCFF00] mb-4">
                        <p className="font-space text-[10px] text-[#CCFF00] uppercase tracking-tighter">
                          GAMES: {event.subEvents.join(' • ')}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6 pt-4 border-t-2 border-[#333]">
                      <span className="font-space font-bold text-sm text-[#888] uppercase tracking-wider">Entry Fee</span>
                      <span className="font-anton text-3xl" style={{ color: event.color }}>₹{event.amount}</span>
                    </div>

                    <Link
                      to="/register"
                      className="btn-brutal w-full text-center mt-auto"
                    >
                      REGISTER NOW <Zap size={18} className="ml-2 inline" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-[#121212] border-4 border-dashed border-[#333]">
              <Filter size={64} className="mx-auto text-[#333] mb-6" />
              <h3 className="text-3xl font-anton text-white mb-4 uppercase tracking-widest">NO EVENTS FOUND</h3>
              <p className="text-[#888] font-space uppercase tracking-widest">TRY ADJUSTING YOUR FILTERS OR SEARCH QUERY.</p>
            </div>
          )}
        </div>
      </div>

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
    </Layout>
  );
}

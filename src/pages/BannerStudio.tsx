import React, { useState } from 'react';
import { bannerData, CATEGORIES, CategoryType } from '../data/bannerData';
import BannerRenderer from '../components/BannerRenderer';
import { motion } from 'framer-motion';
import { Filter, Download, ExternalLink, Image as ImageIcon } from 'lucide-react';

export function BannerStudio() {

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = bannerData.filter(event => {
    const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex items-center gap-6">
        <div className="w-20 h-20 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-2">
           <img src="/logo.png" alt="Panache Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-5xl font-black mb-1 tracking-tighter uppercase italic">
            Banner <span className="text-[#CCFF00]">Studio</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg">
            PANACHE 2K26 Flex Banner Generator. 4' x 6' Design System.
            Total events: <span className="text-white font-bold">{bannerData.length}</span>
          </p>
        </div>
      </div>


      {/* Controls */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-y border-white/10 py-8">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === 'ALL' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
          >
            ALL
          </button>
          {(Object.keys(CATEGORIES) as CategoryType[]).map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border`}
              style={{ 
                backgroundColor: selectedCategory === cat ? CATEGORIES[cat].color : 'transparent',
                borderColor: CATEGORIES[cat].color,
                color: selectedCategory === cat ? '#000' : CATEGORIES[cat].color,
                opacity: selectedCategory === cat || selectedCategory === 'ALL' ? 1 : 0.4
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search event..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-white/30 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col"
          >
            <div className="relative mb-6 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl transition-transform hover:-translate-y-2">
               <BannerRenderer data={event} scale={1} />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                    <Download size={20} />
                  </button>
                  <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                    <ImageIcon size={20} />
                  </button>
               </div>
            </div>
            
            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="text-lg font-black tracking-tight uppercase" style={{ color: CATEGORIES[event.category].color }}>
                  {event.name}
                </h3>
                <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-1">
                  {event.category} • {event.fee}
                </p>
              </div>
              <div className="text-[10px] font-mono text-white/20">
                #PANACHE26-{event.id.toUpperCase()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-20 opacity-20 italic">
          No events found for your search/filter.
        </div>
      )}

      {/* Footer info */}
      <div className="max-w-7xl mx-auto mt-32 border-t border-white/10 pt-12 pb-20 flex flex-col md:flex-row justify-between gap-8 items-center text-white/40 text-xs">
        <div>© 2026 SRGI JHANSI. PANACHE TEAM.</div>
        <div className="flex gap-8">
            <a href="#" className="hover:text-white underline underline-offset-4">PRINT GUIDELINES</a>
            <a href="#" className="hover:text-white underline underline-offset-4">CMYK PROFILES</a>
            <a href="#" className="hover:text-white underline underline-offset-4">FONTS PACK</a>
        </div>
      </div>
    </div>
  );
}


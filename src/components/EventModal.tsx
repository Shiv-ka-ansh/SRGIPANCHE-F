import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, ScrollText, Zap } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    name: string;
    description?: string;
    amount: number;
    category: string;
    color: string;
    image: string;
    subEvents?: string[];
    rules?: string[];
    coordinators?: { name: string; phone: string }[];
  } | null;
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-[#121212] border-4 border-[#333] overflow-hidden flex flex-col md:flex-row"
            style={{ 
              boxShadow: `16px 16px 0px ${event.color}`,
              borderColor: event.color 
            }}
          >
            {/* Left Side: Image & Category */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-[#333]">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div 
                className="absolute top-6 left-6 px-4 py-1 font-anton text-sm uppercase tracking-widest text-black border-2 border-black -rotate-2"
                style={{ backgroundColor: event.color }}
              >
                {event.category}
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="flex-grow p-8 md:p-12 overflow-y-auto max-h-[80vh] md:max-h-[70vh]">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-none bg-[#333] text-white hover:bg-white hover:text-black transition-colors border-2 border-[#333] hover:border-black"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <h2 className="text-4xl md:text-5xl font-anton text-white uppercase tracking-tight mb-4 leading-none">
                  {event.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="font-anton text-3xl" style={{ color: event.color }}>₹{event.amount}</span>
                  <span className="text-[#888] font-space text-xs uppercase tracking-widest border-l-2 border-[#333] pl-4">ENTRY FEE</span>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="mb-10">
                  <p className="text-[#CCC] font-space text-lg leading-relaxed border-l-4 p-4 bg-white/5" style={{ borderColor: event.color }}>
                    {event.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Rules Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ScrollText size={20} style={{ color: event.color }} />
                    <h4 className="font-anton text-xl text-white uppercase tracking-wider">EVENT RULES</h4>
                  </div>
                  <ul className="space-y-3">
                    {event.rules ? (
                      event.rules.map((rule, index) => (
                        <li key={index} className="flex gap-3 text-sm text-[#888] font-space leading-snug">
                          <span className="text-white font-bold" style={{ color: event.color }}>{index + 1}.</span>
                          {rule}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-[#666] font-space italic">Rules will be announced soon.</li>
                    )}
                  </ul>
                </div>

                {/* Coordinators Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <User size={20} style={{ color: event.color }} />
                    <h4 className="font-anton text-xl text-white uppercase tracking-wider">COORDINATORS</h4>
                  </div>
                  <div className="space-y-4">
                    {event.coordinators ? (
                      event.coordinators.map((coord, index) => (
                        <div key={index} className="bg-[#1a1a1a] p-4 border-2 border-[#333] group hover:border-white transition-colors">
                          <p className="font-anton text-white uppercase tracking-widest mb-1">{coord.name}</p>
                          <a 
                            href={`tel:${coord.phone}`} 
                            className="flex items-center gap-2 text-xs font-space text-[#888] hover:text-white transition-colors"
                          >
                            <Phone size={12} style={{ color: event.color }} />
                            {coord.phone}
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[#666] font-space italic">TBA</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a 
                  href="/register" 
                  className="btn-brutal flex-grow text-center text-xl py-6"
                  style={{ backgroundColor: event.color, color: '#000' }}
                >
                  PROCEED TO REGISTER <Zap size={24} className="ml-2 inline" />
                </a>
                <button 
                  onClick={onClose}
                  className="btn-brutal border-[#333] hover:border-white text-white px-8 py-6 uppercase font-anton tracking-widest"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

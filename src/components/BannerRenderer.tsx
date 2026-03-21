import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EventBannerData, CATEGORIES } from '../data/bannerData';

interface BannerRendererProps {
  data: EventBannerData;
  scale?: number;
}

const BannerRenderer: React.FC<BannerRendererProps> = ({ data, scale = 1 }) => {
  const categoryInfo = CATEGORIES[data.category];
  
  // 4 feet x 6 feet -> 4:6 aspect ratio
  // Standard preview size: 400px x 600px
  const width = 400 * scale;
  const height = 600 * scale;

  return (
    <div 
      className="relative overflow-hidden flex flex-col items-center justify-between text-white"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        backgroundColor: '#050505',
        fontFamily: "'Inter', 'Impact', sans-serif"
      }}
    >
      {/* Grain / Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />

      {/* [TOP] -> Logo / College Name */}
      <div className="w-full p-4 flex justify-between items-start z-10">
        <div className="text-[10px] font-bold tracking-tight text-left">
          <div className="opacity-70">SRGI JHANSI PRESENTS</div>
          <div style={{ color: categoryInfo.color }}>{data.logo}</div>
        </div>
        <div className="px-2 py-0.5 text-[8px] font-black tracking-widest border rounded" style={{ borderColor: categoryInfo.color, color: categoryInfo.color }}>
          {categoryInfo.chipText}
        </div>
      </div>

      {/* [CENTER] -> Event Name */}
      <div className="w-full px-6 z-10 text-center flex flex-col items-center justify-center flex-grow -mt-8">
        <h1 
          className="text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase mb-2"
          style={{ 
            color: '#FFFFFF',
            WebkitTextStroke: `1px ${categoryInfo.color}` 
          }}
        >
          {data.name}
        </h1>
        <p className="italic text-xs opacity-80" style={{ fontFamily: 'serif' }}>
          "{data.tagline}"
        </p>
      </div>

      {/* [MID] -> Event Visual / Illustration */}
      <div className="relative w-full h-1/3 flex items-center justify-center px-4 -mt-4">
        {data.image ? (
          <img 
            src={data.image} 
            alt={data.name}
            className="w-full h-full object-cover opacity-80 mix-blend-screen"
            style={{ filter: `drop-shadow(0 0 10px ${categoryInfo.color}33)` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
             <div className="text-[8px] text-center px-10 italic">
               Visual: {data.visualConcept}
             </div>
          </div>
        )}
        {/* Border accents */}

        <div className="absolute left-4 right-4 top-0 border-t opacity-30" style={{ borderColor: categoryInfo.color }}></div>
        <div className="absolute left-4 right-4 bottom-0 border-b opacity-30" style={{ borderColor: categoryInfo.color }}></div>
      </div>

      {/* Middle Badges */}
      <div className="w-full flex justify-center gap-4 mb-4 z-10 px-4">
        {data.teamBadge && (
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-bold border border-white/20 uppercase tracking-widest">
                {data.teamBadge}
            </div>
        )}
        <div className="px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest" style={{ backgroundColor: categoryInfo.color, color: '#050505' }}>
            REG FEE: {data.fee}
        </div>
      </div>

      {/* [BOTTOM] -> Footer Strip */}
      <div 
        className="w-full flex items-center justify-between px-4 py-3 z-10"
        style={{ backgroundColor: categoryInfo.color }}
      >
        <div className="flex flex-col">
          <div className="text-[10px] font-black text-black">SRGI Jhansi</div>
          <div className="text-[8px] font-bold text-black/70">srgipanache.in</div>
        </div>
        
        <div className="text-center">
            <div className="text-[10px] font-black text-black uppercase">Event Date: 20-21 MARCH 2026</div>
        </div>

        <div className="bg-white p-1 rounded-sm shadow-sm">
          <QRCodeSVG value={`https://srgipanache.in/register?event=${data.id}`} size={32} />
        </div>
      </div>
      
      {/* Print Safe Zone Indicator (Developer only) */}
      <div className="absolute inset-[10px] border border-white/5 pointer-events-none border-dashed rounded-sm"></div>
    </div>
  );
};

export default BannerRenderer;

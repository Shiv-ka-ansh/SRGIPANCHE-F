import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { TextReveal } from '../components/TextReveal';

const galleryImages = [
  { id: 1, url: 'https://picsum.photos/seed/concert1/800/600', title: 'EDM Nite', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, url: 'https://picsum.photos/seed/hackathon/600/600', title: '24H Hackathon', span: 'col-span-1 row-span-1' },
  { id: 3, url: 'https://picsum.photos/seed/robotics/600/600', title: 'Robo Wars', span: 'col-span-1 row-span-1' },
  { id: 4, url: 'https://picsum.photos/seed/crowd/800/1200', title: 'Main Stage Crowd', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 5, url: 'https://picsum.photos/seed/gaming/600/600', title: 'Valorant Finals', span: 'col-span-1 row-span-1' },
  { id: 6, url: 'https://picsum.photos/seed/dance/600/600', title: 'Street Dance', span: 'col-span-1 row-span-1' },
  { id: 7, url: 'https://picsum.photos/seed/neon/1200/600', title: 'Cyberpunk Cosplay', span: 'col-span-1 md:col-span-3 row-span-1' },
];

const records = [
  { label: 'ATTENDEES', value: '12,500+' },
  { label: 'EVENTS HOSTED', value: '45' },
  { label: 'COLLEGES', value: '80+' },
  { label: 'PRIZE DISTRIBUTED', value: '$35K' },
];

export function Gallery() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 md:px-12 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-4">
            <TextReveal text="PANACHE 2K26" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              THE AFTERMATH
            </span>
          </h1>
          <div className="w-24 h-2 bg-primary mb-6" />
          <p className="text-lg text-text-muted max-w-2xl font-sans">
            A look back at the chaos, the glory, and the unforgettable moments from last year's festival. Records were broken, legends were made.
          </p>
        </motion.div>

        {/* Records Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          {records.map((record, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border-2 border-white/10 p-6 text-center hover:border-primary transition-colors group"
            >
              <div className="text-4xl md:text-5xl font-display text-white group-hover:text-primary transition-colors mb-2">
                {record.value}
              </div>
              <div className="text-xs md:text-sm font-sans font-bold text-text-muted uppercase tracking-widest">
                {record.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brutalist Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group overflow-hidden border-2 border-white/10 hover:border-primary transition-colors ${img.span}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Label */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-display text-2xl text-white uppercase tracking-wider">
                  {img.title}
                </h3>
                <div className="w-12 h-1 bg-primary mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

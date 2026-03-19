import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

export function Team() {
  const teamCategories = [
    {
      title: "CORE COMMAND",
      color: "primary",
      members: [
        { name: "ALEX MERCER", role: "FESTIVAL DIRECTOR", image: "https://picsum.photos/seed/alex/400/400" },
        { name: "SARAH CHEN", role: "HEAD OF OPERATIONS", image: "https://picsum.photos/seed/sarah/400/400" },
        { name: "MARCUS JOHNSON", role: "TECHNICAL LEAD", image: "https://picsum.photos/seed/marcus/400/400" },
        { name: "ELENA RODRIGUEZ", role: "CULTURAL HEAD", image: "https://picsum.photos/seed/elena/400/400" }
      ]
    },
    {
      title: "TECHNICAL VANGUARD",
      color: "accent",
      members: [
        { name: "DAVID KIM", role: "HACKATHON LEAD", image: "https://picsum.photos/seed/david/400/400" },
        { name: "PRIYA PATEL", role: "CYBERSEC CHIEF", image: "https://picsum.photos/seed/priya/400/400" },
        { name: "JAMES WILSON", role: "ROBOTICS HEAD", image: "https://picsum.photos/seed/james/400/400" },
        { name: "ANITA DESAI", role: "AI/ML COORDINATOR", image: "https://picsum.photos/seed/anita/400/400" }
      ]
    },
    {
      title: "CREATIVE SYNDICATE",
      color: "secondary",
      members: [
        { name: "LEO CARMICHAEL", role: "DESIGN LEAD", image: "https://picsum.photos/seed/leo/400/400" },
        { name: "MAYA LIN", role: "MEDIA & PR", image: "https://picsum.photos/seed/maya/400/400" },
        { name: "SAMUEL OAK", role: "STAGE MANAGER", image: "https://picsum.photos/seed/samuel/400/400" },
        { name: "CHLOE ZHANG", role: "CONTENT CHIEF", image: "https://picsum.photos/seed/chloe/400/400" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-32 min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display text-white mb-6 uppercase tracking-tight"
            >
              MEET THE <span className="text-primary">ARCHITECTS</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-text-muted font-sans text-xl max-w-2xl mx-auto uppercase tracking-widest"
            >
              THE MINDS BEHIND THE CHAOS. THE CREATORS OF PANACHE 2K26.
            </motion.p>
          </div>

          <div className="space-y-32">
            {teamCategories.map((category, catIndex) => (
              <motion.div 
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-6 mb-12">
                  <h2 className={`text-4xl md:text-5xl font-display text-${category.color} uppercase tracking-wider m-0`}>
                    {category.title}
                  </h2>
                  <div className={`h-1 flex-grow bg-${category.color} opacity-20`} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.members.map((member, memberIndex) => (
                    <div key={memberIndex} className={`card-brutal group relative overflow-hidden border-4 border-border hover:border-${category.color} hover:shadow-[8px_8px_0px_var(--color-${category.color})] transition-all`}>
                      <div className={`absolute inset-0 bg-${category.color} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0`} />
                      
                      <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
                        <div className={`w-32 h-32 mb-6 border-4 border-border group-hover:border-black transition-colors overflow-hidden transform -rotate-3 group-hover:rotate-0 duration-300 bg-surface`}>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                          />
                        </div>
                        
                        <h3 className="text-2xl font-display text-white group-hover:text-black transition-colors uppercase tracking-wider mb-2">
                          {member.name}
                        </h3>
                        <p className={`text-sm font-sans font-bold text-${category.color} group-hover:text-black/80 transition-colors uppercase tracking-widest mb-6`}>
                          {member.role}
                        </p>
                        
                        <div className="flex gap-3 mt-auto">
                          <a href="#" className="w-10 h-10 border-2 border-border group-hover:border-black/20 flex items-center justify-center text-text-muted group-hover:text-black hover:bg-black hover:!text-white transition-all">
                            <Linkedin size={16} />
                          </a>
                          <a href="#" className="w-10 h-10 border-2 border-border group-hover:border-black/20 flex items-center justify-center text-text-muted group-hover:text-black hover:bg-black hover:!text-white transition-all">
                            <Twitter size={16} />
                          </a>
                          <a href="#" className="w-10 h-10 border-2 border-border group-hover:border-black/20 flex items-center justify-center text-text-muted group-hover:text-black hover:bg-black hover:!text-white transition-all">
                            <Github size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}

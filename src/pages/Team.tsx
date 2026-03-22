import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

export function Team() {
  const teamCategories = [
    {
      title: "YOUTHVERSE MENTORS",
      color: "primary",
      members: [
        { name: "JEETENDRA MOHAN KHARE", role: "COORDINATOR", image: "https://ui-avatars.com/api/?name=JEETENDRA+MOHAN+KHARE&background=random" },
        { name: "JITENDRA RAI", role: "FACULTY ADVISOR", image: "https://ui-avatars.com/api/?name=JITENDRA+RAI&background=random" },
        { name: "VK SINGH", role: "FACULTY ADVISOR", image: "https://ui-avatars.com/api/?name=VK+SINGH&background=random" }
      ]
    },
    {
      title: "YOUTHVERSE CORE",
      color: "accent",
      members: [
        { name: "TANISH AGRAWAL", role: "PRESIDENT", image: "https://ui-avatars.com/api/?name=TANISH+AGRAWAL&background=random" },
        { name: "PIYUSH MALVIYA", role: "VICE PRESIDENT", image: "https://ui-avatars.com/api/?name=PIYUSH+MALVIYA&background=random" }
      ]
    },
    {
      title: "TREASURY NEXUS",
      color: "secondary",
      members: [
        { name: "SHIVANSH GUPTA", role: "HEAD", image: "https://ui-avatars.com/api/?name=SHIVANSH+GUPTA&background=random" },
        { name: "SAKSHAM OJHA", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=SAKSHAM+OJHA&background=random" },
        
      ]
    },
    {
      title: "NEURAL ARCHITECTS",
      color: "primary",
      members: [
        { name: "VARUN PIRONIYA", role: "HEAD", image: "https://ui-avatars.com/api/?name=VARUN+PIRONIYA&background=random" },
        { name: "KRISH KUMAR AHIRWAR", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=KRISH+KUMAR+AHIRWAR&background=random" }
      ]
    },
    {
      title: "TECH INNOVATORS",
      color: "accent",
      members: [
        { name: "AKASH RAYKWAR", role: "HEAD", image: "https://ui-avatars.com/api/?name=AKASH+RAYKWAR&background=random" },
        { name: "ANUJ GAUR", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=ANUJ+GAUR&background=random" },
      ]
    },
    {
      title: "CYBER SYNDICATE",
      color: "secondary",
      members: [
        { name: "RASHID KHAN", role: "HEAD", image: "https://ui-avatars.com/api/?name=RASHID+KHAN&background=random" },
        { name: "ABHISHEK JATAV", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=ABHISHEK+JATAV&background=random" }
      ]
    },
    {
      title: "TREASURY COMMAND",
      color: "primary",
      members: [
        { name: "SEJAL AGARWAL", role: "HEAD", image: "https://ui-avatars.com/api/?name=SEJAL+AGARWAL&background=random" },
        { name: "JAGRAT BHATT", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=JAGRAT+BHATT&background=random" }
      ]
    },
    {
      title: "GUEST DIMENSION",
      color: "accent",
      members: [
        { name: "KHUSHI CHATURVEDI", role: "HEAD", image: "https://ui-avatars.com/api/?name=KHUSHI+CHATURVEDI&background=random" },
        { name: "AYUSHI GUPTA", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=AYUSHI+GUPTA&background=random" }
      ]
    },
    {
      title: "ASTRAL ARTS",
      color: "secondary",
      members: [
        { name: "RAJ SHARMA", role: "HEAD", image: "https://ui-avatars.com/api/?name=RAJ+SHARMA&background=random" },
        { name: "NIMESH RAI", role: "CO.HEAD", image: "https://ui-avatars.com/api/?name=NIMESH+RAI&background=random" },
        { name: "PRAKSHAM KUSHWAHA", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=PRAKSHAM+KUSHWAHA&background=random" },
      ]
    },
    {
      title: "EVENT COSMOS",
      color: "primary",
      members: [
        { name: "ROHIT SONI", role: "HEAD", image: "https://ui-avatars.com/api/?name=ROHIT+SONI&background=random" },
        { name: "USHMA TALREJA", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=USHMA+TALREJA&background=random" },
        
      ]
    },
    {
      title: "IMAGINATION REALM",
      color: "accent",
      members: [
        { name: "MANISHI NIGAM", role: "HEAD", image: "https://ui-avatars.com/api/?name=MANISHI+NIGAM&background=random" },
        { name: "NANDINI SAHU", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=NANDINI+SAHU&background=random" },
        
      ]
    },
    {
      title: "DATA SYNTHESIZERS",
      color: "secondary",
      members: [
        { name: "SWEETY RAIKWAR", role: "HEAD", image: "https://ui-avatars.com/api/?name=SWEETY+RAIKWAR&background=random" },
        { name: "SHRADHA PARYA", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=SHRADHA+PARYA&background=random" }
      ]
    },
    {
      title: "DIGITAL GALAXY",
      color: "primary",
      members: [
        { name: "JAHNAVI PANDEY", role: "HEAD", image: "https://ui-avatars.com/api/?name=JAHNAVI+PANDEY&background=random" },
        { name: "ISHITA BAJPAYEE", role: "JR.HEAD", image: "https://ui-avatars.com/api/?name=ISHITA+BAJPAYEE&background=random" }
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

                <div className="flex flex-wrap justify-center gap-8">
                  {category.members.map((member, memberIndex) => (
                    <div key={memberIndex} className={`w-full sm:w-72 lg:w-80 flex-none card-brutal group relative overflow-hidden border-4 border-border hover:border-${category.color} hover:shadow-[8px_8px_0px_var(--color-${category.color})] transition-all`}>

                      <div className={`absolute inset-0 bg-${category.color} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0`} />
                      
                      <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
                        <div className={`w-32 h-32 mb-6 border-4 border-border group-hover:border-black transition-colors overflow-hidden transform -rotate-3 group-hover:rotate-0 duration-300 bg-surface`}>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
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

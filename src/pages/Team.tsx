import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

export function Team() {
  const teamCategories = [
    {
      title: "YOUTHVERSE MENTORS",
      color: "primary",
      members: [
        {
          name: "JEETENDRA MOHAN KHARE",
          role: "COORDINATOR",
          image: "/team/mentors/jeetendra-mohan-khare.png",
        },
        {
          name: "JITENDRA RAI",
          role: "FACULTY ADVISOR",
          image: "/team/mentors/jitendra-rai.png",
        },
        {
          name: "VK SINGH",
          role: "FACULTY ADVISOR",
          image: "/team/mentors/vk-singh.png",
        },
      ],
    },
    {
      title: "YOUTHVERSE CORE",
      color: "accent",
      members: [
        {
          name: "TANISH AGRAWAL",
          role: "PRESIDENT",
          image: "/team/core/tanish-agrawal.png",
        },
        {
          name: "PIYUSH MALVIYA",
          role: "VICE PRESIDENT",
          image: "/team/core/piyush-malviya.png",
        },
      ],
    },
    {
      title: "TREASURY NEXUS",
      color: "secondary",
      members: [
        {
          name: "SHIVANSH GUPTA",
          role: "HEAD",
          image: "/team/FINANCIAL HEAD/shivansh.jpg",
        },
        {
          name: "SAKSHAM OJHA",
          role: "JR.HEAD",
          image: "/team/FINANCIAL JR.HEAD/IMG_20250803_171901819.jpg",
        },
      ],
    },
    {
      title: "NEURAL ARCHITECTS",
      color: "primary",
      members: [
        {
          name: "VARUN PIRONIYA",
          role: "HEAD",
          image: "/team/TECHNICAL HEAD/IMG_20260102_223401_030.jpg",
        },
        {
          name: "KRISH KUMAR AHIRWAR",
          role: "JR.HEAD",
          image: "/team/TECHNICAL JR.HEAD/krish.jpeg",
        },
      ],
    },
    {
      title: "IMAGINATION REALM",
      color: "accent",
      members: [
        {
          name: "MANISHI NIGAM",
          role: "HEAD",
          image: "/team/CREATIVITY HEAD/IMG-20251208-WA0043(1).jpg",
        },
        {
          name: "NANDINI SAHU",
          role: "JR.HEAD",
          image: "/team/CREATIVITY JR.HEAD/IMG_20250502_185106.jpg",
        },
      ],
    },
    {
      title: "TREASURY COMMAND",
      color: "primary",
      members: [
        {
          name: "SEJAL AGARWAL",
          role: "HEAD",
          image: "/team/PROMOTIONAL HEAD/IMG-20260321-WA0003.jpg",
        },
        {
          name: "JAGRAT BHATT",
          role: "JR.HEAD",
          image: "/team/PROMOTIONAL JR.HEAD/IMG_20260122_124048.jpg",
        },
      ],
    },
    {
      title: "CULTURAL EVENT",
      color: "secondary",
      members: [
        {
          name: "RAJ SHARMA",
          role: "HEAD",
          image: "/team/CULTURAL EVENT HEAD/IMG_20260321_181235.jpg",
        },
        {
          name: "NIMESH RAI",
          role: "CO.HEAD",
          image: "/team/CULTURAL EVENT CO.HEAD/IMG-20260305-WA0015.jpg",
        },
        {
          name: "PRAKSHAM KUSHWAHA",
          role: "JR.HEAD",
          image: "/team/CULTURAL EVENT JR.HEAD/Screenshot_2025-09-20-07-11-42-815_com.lemon.lvoverseas-edit.jpg",
        },
      ],
    },
    {
      title: "GENERAL EVENT",
      color: "primary",
      members: [
        {
          name: "ROHIT SONI",
          role: "HEAD",
          image: "/team/GENERAL EVENT HEAD/IMG_20260215_185330_739~2.jpg",
        },
        {
          name: "USHMA TALREJA",
          role: "JR.HEAD",
          image: "/team/GENERAL EVENT JR.HEAD/IMG_20260321_173407.jpg",
        },
      ],
    },
    {
      title: "CYBER EVENT",
      color: "secondary",
      members: [
        {
          name: "RASHID KHAN",
          role: "HEAD",
          image: "/team/CYBER EVENT HEAD/IMG_4157.jpeg",
        },
        {
          name: "ABHISHEK JATAV",
          role: "JR.HEAD",
          image: "/team/CYBER EVENT JR.HEAD/IMG-20260321-WA0885.jpg",
        },
      ],
    },
    {
      title: "TECHNICAL EVENT",
      color: "accent",
      members: [
        {
          name: "AKASH RAYKWAR",
          role: "HEAD",
          image: "/team/TECHNICAL EVENT HEAD/AKASH RAYKWAR ELECTRICAL ENGINEER 3RD YEAR.jpg",
        },
        {
          name: "ANUJ GAUR",
          role: "JR.HEAD",
          image: "/team/TECHNICAL EVENT JR.HEAD/Anuj Gaur (technical event).jpg",
        },
      ],
    },
    {
      title: "GUEST DIMENSION",
      color: "accent",
      members: [
        {
          name: "KHUSHI CHATURVEDI",
          role: "HEAD",
          image: "/team/HOSPITALITY HEAD/IMG_1810.JPG",
        },
        {
          name: "AYUSHI GUPTA",
          role: "JR.HEAD",
          image: "/team/HOSPITALITY JR.HEAD/SAVE_20260321_173122.jpg",
        },
      ],
    },
    {
      title: "DATA SYNTHESIZERS",
      color: "secondary",
      members: [
        {
          name: "SWEETY RAIKWAR",
          role: "HEAD",
          image: "/team/RESULT COMPILATION HEAD/IMG_20260321_174548.jpg",
        },
        {
          name: "SHRADHA PARYA",
          role: "JR.HEAD",
          image: "/team/RESULT COMPILATION JR.HEAD/_storage_emulated_0_WhatsApp_Media_WhatsApp Documents_Snapchat-1940705106.jpg",
        },
      ],
    },
    {
      title: "DIGITAL GALAXY",
      color: "primary",
      members: [
        {
          name: "JAHNAVI PANDEY",
          role: "HEAD",
          image: "/team/SOCIAL MEDIA HEAD/Snapchat-1028698020(1).jpg",
        },
        {
          name: "ISHITA BAJPAYEE",
          role: "JR.HEAD",
          image: "/team/SOCIAL MEDIA JR.HEAD/Snapchat-1239257296.jpg",
        },
      ],
    },
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
                        <div className={`w-32 h-32 mb-6 border-4 border-border group-hover:border-black transition-colors overflow-hidden transform -rotate-3 group-hover:rotate-0 duration-300 bg-transparent`}>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                          />
                        </div>
                        
                        <h3 className="text-2xl font-display text-white group-hover:text-black transition-colors uppercase tracking-wider mb-2">
                          {member.name}
                        </h3>
                        <p className={`text-sm font-sans font-bold text-${category.color} group-hover:text-black/80 transition-colors uppercase tracking-widest mb-6`}>
                          {member.role}
                        </p>
                        
                        {/* <div className="flex gap-3 mt-auto">
                          <a href="#" className="w-10 h-10 border-2 border-border group-hover:border-black/20 flex items-center justify-center text-text-muted group-hover:text-black hover:bg-black hover:!text-white transition-all">
                            <Linkedin size={16} />
                          </a>
                          <a href="#" className="w-10 h-10 border-2 border-border group-hover:border-black/20 flex items-center justify-center text-text-muted group-hover:text-black hover:bg-black hover:!text-white transition-all">
                            <Github size={16} />
                          </a>
                        </div> */}
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

export const EVENT_CATEGORIES: Record<string, {
  label: string;
  color: string;
  image: string;
  events: { 
    name: string; 
    amount: number; 
    isTeam?: boolean; 
    isFlat?: boolean;
    subEvents?: string[];
    description?: string;
    rules?: string[];
    coordinators?: { name: string; phone: string }[];
  }[];
}> = {
  general: {
    label: 'General',
    color: '#CCFF00',
    image: '/assets/events/general.png',
    events: [
      { 
        name: 'TREASURE SAFARI', 
        amount: 50, 
        isTeam: true,
        description: 'Get ready for an adventure filled with mystery, excitement, and teamwork! Treasure Safari is a thrilling treasure hunt where participants race against time to decode clues and reach the final destination.',
        rules: [
          'Participants will compete in teams of three members.',
          'A series of clues and puzzles will be provided at each stage.',
          'Each clue leads to the next checkpoint, testing logic and coordination.',
          'The team that successfully solves all clues and reaches the end first emerges as the winner.'
        ]
      },
      { 
        name: 'PARICHARCHA', 
        amount: 50, 
        description: 'Paricharcha is an engaging debate competition where participants present their ideas, challenge perspectives, and showcase their speaking skills.',
        rules: [
          'Topics will be provided for discussion.',
          'Focus on clarity, confidence, and logical arguments.',
          'Judging will be based on content, delivery, and rebuttal.'
        ]
      },
      { 
        name: 'NAIL ART', 
        amount: 50, 
        description: 'Unleash your creativity and showcase your artistic flair with Nail Art! This event is all about transforming nails into stunning works of art using unique designs and techniques.',
        rules: [
          'Participants will create creative and innovative nail designs.',
          'Focus on creativity, precision, and overall presentation.',
          'Judging will be based on originality, detailing, and aesthetic appeal.'
        ]
      },
      { 
        name: 'ATTIRE', 
        amount: 100, 
        description: 'Step into the spotlight and let your style tell a story! Attire is a vibrant ramp-based event where participants showcase their creativity, confidence, and fashion sense through thoughtfully curated outfits.',
        rules: [
          'Participants will present their look based on the given theme.',
          'Focus on creativity, confidence, and overall presentation.',
          'Judging will be based on styling, expression, and stage presence.'
        ]
      },
      { 
        name: 'SANYOG SE', 
        amount: 25, 
        description: 'What if luck is all you need to win? Sanyog Se is an exciting luck-based event where every draw brings a new surprise and endless anticipation.',
        rules: [
          'Participants will take part in a random lucky draw.',
          'Each pick unlocks a surprise outcome, making every moment thrilling.',
          'No skills required—just trust your luck and enjoy the ride!'
        ]
      },
      { 
        name: 'SAND ART', 
        amount: 50, 
        description: 'Watch creativity come alive, one grain at a time! Sand Art is a captivating event where imagination meets skill, transforming simple sand into stunning visual stories.',
        rules: [
          'Participants will create unique designs and patterns using sand.',
          'Focus on creativity, detailing, and presentation.',
          'Judging will be based on originality, technique, and overall visual impact.'
        ]
      },
      { 
        name: 'CROSSWORD', 
        amount: 50, 
        description: 'Put your vocabulary and thinking skills to the test! Crossword is a fun and engaging word puzzle event that challenges your knowledge and presence of mind.',
        rules: [
          'Participants will solve a crossword puzzle within a given time.',
          'Focus on vocabulary, logical thinking, and speed.',
          'Judging will be based on accuracy and completion time.'
        ]
      },
      { 
        name: 'ISHTEHAR', 
        amount: 50, 
        description: 'Turn your ideas into impactful visuals! Ishtehar is a poster-making event where creativity meets expression, allowing participants to convey powerful messages through art.',
        rules: [
          'Participants will design posters based on the given theme.',
          'Focus on creativity, clarity of message, and visual appeal.',
          'Judging will be based on originality, design, and presentation.'
        ]
      },
      { 
        name: 'FACE PAINTING', 
        amount: 50, 
        description: 'Turn faces into living canvases and let your imagination run wild! Face Painting is a vibrant and expressive event where creativity, colors, and artistry come together to create stunning transformations.',
        rules: [
          'Participants will design and paint creative themes on faces.',
          'Focus on creativity, detailing, and color harmony.',
          'Judging will be based on originality, precision, and overall impact.'
        ]
      },
      { 
        name: 'RANGOLI', 
        amount: 50, 
        description: 'Not just colors, it’s a whole vibe! Rangoli is where creativity meets tradition, and the ground becomes your canvas to create something truly eye-catching.',
        rules: [
          'Participants will design vibrant rangoli based on the given theme.',
          'Show your creativity, symmetry, and color game.',
          'Judging will be based on originality, detailing, and overall impact.'
        ]
      },
      { 
        name: 'ARM WRESTLING', 
        amount: 50, 
        description: 'Ready to test your strength and dominance? Arm Wrestling is a high-energy face-off where power, technique, and determination come into play!',
        rules: [
          'Participants will compete in one-on-one arm wrestling matches.',
          'Focus on strength, grip, and strategy.',
          'Winners will advance through knockout rounds to claim victory.'
        ]
      },
      { 
        name: 'SELFIE MANIAC', 
        amount: 50, 
        description: 'Unleash your inner selfie star in the Selfie Maniac Event! This fun-filled competition is all about confidence, creativity, and capturing your best self in the most unique way possible.' 
      },
      { 
        name: 'ESPRIT DE CORPS', 
        amount: 50, 
        isTeam: true,
        description: 'Step into the spirit of teamwork with Esprit De Corps, an event that celebrates unity, coordination, and collective strength.',
        rules: [
          'This event will test your communication, trust, leadership, and team synergy in exciting and competitive tasks.'
        ]
      },
      { 
        name: 'THE SLOGANEER', 
        amount: 50, 
        description: 'Unleash the power of words in Sloganeer, where creativity meets impact! This event challenges participants to craft short, catchy, and meaningful slogans.' 
      },
      { 
        name: 'THE PERFECT CLICK', 
        amount: 50, 
        description: 'Showcase your photography skills in the Perfect Click Event! This exciting competition is all about capturing the perfect shot that tells a story.' 
      },
    ]
  },
  technical: {
    label: 'Technical',
    color: '#00FFFF',
    image: '/assets/events/technical.png',
    events: [
      { name: 'POSTER PRESENTATION', amount: 50, description: 'Design and present a scientific poster on cutting-edge technical topics.' },
      { name: 'CIRCUIT JHAMELA', amount: 50, description: 'Debug complex electronic circuits and prove your hardware expertise.' },
      { name: 'THE MECHANIST', amount: 50, description: 'Assemble and disassemble mechanical components under a ticking clock.' },
      { name: 'SKY SCRAPPER', amount: 50, description: 'Build the tallest and strongest structure using limited industrial materials.' },
      { name: 'SOLID HAI BOSS', amount: 100, description: 'A high-level technical quiz testing your knowledge across engineering streams.' },
      { name: 'ALTITUDE WINNER', amount: 100, description: 'Design a craft that can fly the highest or longest in this aeronautical challenge.' },
      { 
        name: 'WAR OF MACHINES', 
        amount: 100,
        description: 'The ultimate robot combat where engineering meets destruction. Witness machines battle for glory.',
        rules: [
          'Robots must be within weight limits (max 15kg).',
          'No explosives or liquid based weapons allowed.',
          'Battle will last 3 minutes or until one robot is immobilized.',
          'Decision of the judges will be final.'
        ],
        coordinators: [
          { name: 'Rahul Sharma', phone: '+91 9876543210' },
          { name: 'Priya Singh', phone: '+91 8765432109' }
        ]
      },
      { name: 'WORTHY TRASH', amount: 50, description: 'Create functional or artistic items from discarded technological waste.' },
    ]
  },
  cultural: {
    label: 'Cultural',
    color: '#FF00FF',
    image: '/assets/events/cultural.png',
    events: [
      { name: 'PERSONA', amount: 100, description: 'A talent hunt to find the most charismatic and versatile personality of Panache.' },
      { name: 'SUR SPARDHA', amount: 50, description: 'Showcase your vocal talent in this intense solo singing competition.' },
      { name: 'TANZ & TWIST (Solo)', amount: 150, description: 'Express yourself through the power of solo dance and choreography.' },
      { 
        name: 'TANZ & TWIST (Group)', 
        amount: 500, 
        isTeam: true,
        isFlat: true,
        description: 'A spectacular fusion of dance, rhythm, and synchronization. Teams compete for the crown of the dance floor.',
        rules: [
          'Minimum 4 and maximum 12 members per team.',
          'Time limit: 5-8 minutes.',
          'Props are allowed but must be cleared immediately after performance.',
          'Choice of music is open but must be submitted in advance.'
        ],
        coordinators: [
          { name: 'Ananya Verma', phone: '+91 7654321098' }
        ]
      },
      { name: 'NUKKAD NATAK', amount: 500, isTeam: true, isFlat: true, description: 'Powerful street plays that address social issues with drama and energy.' },
      { name: 'STAND-UP COMEDY', amount: 50, description: 'Tickle the funny bone and win the crowd over with your wit and humor.' },
      { name: 'DRAMATICS', amount: 50, isTeam: true, description: 'A stage play competition where teams bring कहानियाँ (stories) to life.' },
    ]
  },
  cyber: {
    label: 'Cyber',
    color: '#FF6B00',
    image: '/assets/events/cyber.png',
    events: [
      { name: 'CODE DEBUGGER', amount: 50, description: 'Find and fix complex bugs in code to prove your programming prowess.' },
      { name: 'BLIND VIEWER', amount: 50, description: 'A unique challenge where you have to type or code with your screen or eyes off.' },
      { name: 'BATTLE WITH BYTE', amount: 50, description: 'A fast-paced competitive programming contest for the coding ninjas.' },
      { name: 'GUESS THE TECH', amount: 50, description: 'Identify tech brands, gadgets, and concepts from cryptic clues and logos.' },
      {
        name: 'ONLINE GAMING',
        amount: 50,
        isTeam: true,
        subEvents: ['BGMI', 'Free Fire', 'Mini Militia', '8 Ball Pool', 'RC24', 'FIFA/E-Football', 'Tekken 3'],
        description: 'Competitive e-sports tournament featuring the most popular games. Prove your skills in the digital arena.',
        rules: [
          'No use of hacks or third-party tools.',
          'Players must bring their own devices and accessories.',
          'Internet connection will be provided, but backup is recommended.',
          'Tournament format will be shared on the day of event.'
        ],
        coordinators: [
          { name: 'Vikram Aditya', phone: '+91 6543210987' }
        ]
      },
    ]
  }
};

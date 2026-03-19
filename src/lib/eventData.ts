export const EVENT_CATEGORIES: Record<string, {
  label: string;
  color: string;
  image: string;
  events: { 
    name: string; 
    amount: number; 
    isTeam?: boolean; 
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
        description: 'Unravel mysteries and find hidden riches in this ultimate campus-wide treasure hunt.'
      },
      { name: 'THE PERFECT CLICK', amount: 50, description: 'Capture the essence of Panache through your lens in this photography challenge.' },
      { name: 'NAIL ART', amount: 50, description: 'Let your fingernails be the canvas for your most creative and vibrant designs.' },
      { name: 'PARICHARCHA', amount: 50, description: 'Engage in a battle of wits and words in this stimulating group discussion.' },
      { name: 'SELFIE MANIAC', amount: 50, description: 'Show off your best angles and creativity in the ultimate selfie competition.' },
      { name: 'ATTIRE', amount: 100, description: 'Walk the ramp and showcase your unique style and fashion statement.' },
      { name: 'SANYOG SE', amount: 25, description: 'A fun game of luck and chance where anyone can be a winner.' },
      { name: 'SAND ART', amount: 50, description: 'Construct intricate and beautiful masterpieces using nothing but sand and water.' },
      { name: 'THE SLOGANEER', amount: 50, description: 'Craft powerful and catchy slogans that resonate with the spirit of the fest.' },
      { name: 'ISTEHAAAR', amount: 50, description: 'Design compelling advertisements and posters for real or imaginary products.' },
      { name: 'ESPRIT DE CORPS', amount: 50, isTeam: true, description: 'A team-building challenge that tests your coordination and collective spirit.' },
      { name: 'CROSSWORD', amount: 50, description: 'Solve complex puzzles and test your vocabulary in this classic word game.' },
      { name: 'FACE PAINTING', amount: 50, description: 'Transform faces into living art with your exceptional brush and color skills.' },
      { name: 'LITERARY', amount: 50, description: 'A showcase of creative writing, poetry, and linguistic prowess.' },
      { name: 'FINE ARTS', amount: 50, description: 'Display your traditional art skills, from sketching to painting on canvas.' },
      { name: 'ARM WRESTLING', amount: 50, description: 'A test of raw strength and endurance in a classic one-on-one showdown.' },
      { name: 'RANGOLI', amount: 50, description: 'Create stunning traditional patterns on the floor with vibrant colors.' },
      { name: 'MEHENDI', amount: 50, description: 'Apply intricate and beautiful henna designs in this traditional art competition.' },
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
      { name: 'NUKKAD NATAK', amount: 500, isTeam: true, description: 'Powerful street plays that address social issues with drama and energy.' },
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

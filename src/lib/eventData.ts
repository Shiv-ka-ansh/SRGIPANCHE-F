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
    coordinators?: { name: string; phone: string; branch?: string; year?: string }[];
    bannerImage?: string;
  }[];

}> = {
  general: {
    label: 'General',
    color: '#CCFF00',
    image: '/assets/events/general.png',
    events: [
      { 
        name: 'TREASURE SAFARI', 
        amount: 70, 
        isTeam: true,
        description: 'Get ready for an adventure filled with mystery, excitement, and teamwork! Treasure Safari is a thrilling treasure hunt where participants race against time to decode clues and reach the final destination.',
        rules: [
          'Participants will compete in teams of three members.',
          'A series of clues and puzzles will be provided at each stage.',
          'Each clue leads to the next checkpoint, testing logic and coordination.',
          'The team that successfully solves all clues and reaches the end first emerges as the winner.'
        ],
        bannerImage: '/banners/treasure-safari.png',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'THE PERFECT CLICK', 
        amount: 50, 
        description: 'Showcase your photography skills in the Perfect Click Event! This exciting competition is all about capturing the perfect shot that tells a story.',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        bannerImage: '/banners/nail-art.png',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        bannerImage: '/banners/paricharcha.png',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'SELFIE MANIAC', 
        amount: 50, 
        description: 'Unleash your inner selfie star in the Selfie Maniac Event! This fun-filled competition is all about confidence, creativity, and capturing your best self in the most unique way possible.',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'SANYOG SE', 
        amount: 40, 
        description: 'What if luck is all you need to win? Sanyog Se is an exciting luck-based event where every draw brings a new surprise and endless anticipation.',
        rules: [
          'Participants will take part in a random lucky draw.',
          'Each pick unlocks a surprise outcome, making every moment thrilling.',
          'No skills required—just trust your luck and enjoy the ride!'
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'THE SLOGANEER', 
        amount: 50, 
        description: 'Unleash the power of words in Sloganeer, where creativity meets impact! This event challenges participants to craft short, catchy, and meaningful slogans.',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'ISTEHAAAR', 
        amount: 50, 
        description: 'Turn your ideas into impactful visuals! Istehaaar is a poster-making event where creativity meets expression, allowing participants to convey powerful messages through art.',
        rules: [
          'Participants will design posters based on the given theme.',
          'Focus on creativity, clarity of message, and visual appeal.',
          'Judging will be based on originality, design, and presentation.'
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'ESPRIT DE CORPS', 
        amount: 50, 
        isTeam: true,
        description: 'Step into the spirit of teamwork with Esprit De Corps, an event that celebrates unity, coordination, and collective strength.',
        rules: [
          'This event will test your communication, trust, leadership, and team synergy in exciting and competitive tasks.'
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'LITERARY', 
        amount: 50, 
        description: 'Showcase your prowess with words in this literature-focused event.',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'FINE ARTS', 
        amount: 50, 
        description: 'A competition to celebrate mastery over traditional and contemporary fine arts.',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
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
        ],
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      },
      { 
        name: 'MEHENDI', 
        amount: 50, 
        description: 'Display your creativity and precision with intricate Mehendi designs.',
        coordinators: [
          { name: 'ROHIT SONI (HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '7275030175' },
          { name: 'USHMA TALREJA (JR.HEAD)', branch: 'BTECH CSDS', year: '2ND', phone: '7355359229' },
          { name: 'ALOK YADAV', branch: 'BTECH CS CORE', year: '3RD', phone: '7785010642' }
        ]
      }
    ]
  },
  technical: {
    label: 'Technical',
    color: '#00FFFF',
    image: '/assets/events/technical.png',
    events: [
      { 
        name: 'POSTER PRESENTATION', 
        amount: 50, 
        description: 'Design and present a scientific poster on cutting-edge technical topics.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
      { 
        name: 'CIRCUIT JHAMELA', 
        amount: 50, 
        description: 'Debug complex electronic circuits and prove your hardware expertise.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
      { 
        name: 'THE MECHANIST', 
        amount: 50, 
        description: 'Assemble and disassemble mechanical components under a ticking clock.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
      { 
        name: 'SKY SCRAPPER', 
        amount: 50, 
        description: 'Build the tallest and strongest structure using limited industrial materials.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
      { 
        name: 'SOLID HAI BOSS', 
        amount: 100, 
        description: 'A high-level technical quiz testing your knowledge across engineering streams.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
      { 
        name: 'ALTITUDE WINNER', 
        amount: 100, 
        description: 'Design a craft that can fly the highest or longest in this aeronautical challenge.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
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
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ],
        bannerImage: '/banners/war-of-machines.png'
      },
      { 
        name: 'WORTHY TRASH', 
        amount: 50, 
        description: 'Create functional or artistic items from discarded technological waste.',
        coordinators: [
          { name: 'AKASH RAYKWAR (HEAD)', branch: 'BTECH EE', year: '3RD', phone: '7880410256' },
          { name: 'ANUJ GAUR (JR.HEAD)', branch: 'BTECH CS IOT', year: '3RD', phone: '9598091526' },
          { name: 'NISHANT KUSHWAHA', branch: 'BTECH AIML', year: '2ND', phone: '9151645739' }
        ]
      },
    ]
  },
  cultural: {
    label: 'Cultural',
    color: '#FF00FF',
    image: '/assets/events/cultural.png',
    events: [
      { 
        name: 'PERSONA', 
        amount: 100, 
        description: 'A talent hunt to find the most charismatic and versatile personality of Panache.',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'SUR SPARDHA', 
        amount: 50, 
        description: 'Showcase your vocal talent in this intense solo singing competition.',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'TANZ & TWIST', 
        amount: 150, 
        description: 'Express yourself through the power of solo dance and choreography.', 
        bannerImage: '/banners/tanz-twist-solo.png',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'TANZ & TWIST (GROUP)', 
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
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'NUKKAD NATAK', 
        amount: 500, 
        isTeam: true, 
        isFlat: true, 
        description: 'Powerful street plays that address social issues with drama and energy.',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'STAND-UP COMEDY', 
        amount: 50, 
        description: 'Tickle the funny bone and win the crowd over with your wit and humor.',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'DRAMATICS', 
        amount: 50, 
        isTeam: true, 
        description: 'A stage play competition where teams bring कहानियाँ (stories) to life.',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
      { 
        name: 'PANACHE GOT TALENT', 
        amount: 50, 
        description: 'Showcase your unique talents to the whole crowd in this ultimate stage performance.',
        coordinators: [
          { name: 'RAJ SHARMA (HEAD)', branch: 'BTECH CS IOT', year: 'FINAL', phone: '9935619362' },
          { name: 'NIMESH RAI (CO.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6392888566' },
          { name: 'PRAKSHAM KUSHWAHA (JR.HEAD)', branch: 'BTECH AIML', year: '3RD', phone: '9889418043' },
          { name: 'ABHINENDRA UPAYDHAY', branch: 'BTECH AIML', year: '3RD', phone: '9129220191' }
        ]
      },
    ]
  },
  cyber: {
    label: 'Cyber',
    color: '#FF6B00',
    image: '/assets/events/cyber.png',
    events: [
      { 
        name: 'CODE DEBUGGER', 
        amount: 50, 
        description: 'Find and fix complex bugs in code to prove your programming prowess.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      { 
        name: 'BLIND VIEWER', 
        amount: 50, 
        description: 'A unique challenge where you have to type or code with your screen or eyes off.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      { 
        name: 'BATTLE WITH BYTE', 
        amount: 50, 
        description: 'A fast-paced competitive programming contest for the coding ninjas.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      { 
        name: 'GUESS THE TECH', 
        amount: 50, 
        description: 'Identify tech brands, gadgets, and concepts from cryptic clues and logos.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      }
    ]
  },
  gaming: {
    label: 'Online Gaming',
    color: '#FFD700',
    image: '/assets/events/cyber.png',
    events: [
      {
        name: 'BGMI',
        amount: 60,
        isTeam: true,
        description: 'Battlegrounds Mobile India Tournament.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      {
        name: 'FREE FIRE',
        amount: 60,
        isTeam: true,
        description: 'Free Fire E-sports Tournament.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      {
        name: 'MINI MILITIA',
        amount: 60,
        isTeam: true,
        description: 'Doodle Army 2: Mini Militia Combat.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      {
        name: '8 BALL POOL',
        amount: 60,
        isTeam: true,
        description: 'Classic 8 Ball Pool Tournament.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      {
        name: 'RC24',
        amount: 60,
        isTeam: true,
        description: 'Real Cricket 24 Mobile Tournament.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      {
        name: 'FIFA/E-FOOTBALL',
        amount: 60,
        isTeam: true,
        description: 'Football E-sports Championship.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      },
      {
        name: 'TEKKEN 3',
        amount: 60,
        isTeam: true,
        description: 'Classic Fighting Game Tournament.',
        coordinators: [
          { name: 'RASHID KHAN (HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '7518553177' },
          { name: 'ABHISHEK JATAV (JR.HEAD)', branch: 'BTECH CS CORE', year: 'FINAL', phone: '6386187250' }
        ]
      }
    ]
  }
};

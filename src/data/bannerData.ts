export type CategoryType = 'GENERAL' | 'TECHNICAL' | 'CULTURAL' | 'CYBER';

export interface EventBannerData {
  id: string;
  name: string;
  category: CategoryType;
  color: string;
  tagline: string;
  fee: string;
  teamBadge?: string;
  visualConcept: string;
  nameStyle: string;
  logo: string;
  image?: string;
}


export const CATEGORIES: Record<CategoryType, { color: string; chipText: string }> = {
  GENERAL: { color: '#CCFF00', chipText: 'GENERAL' },
  TECHNICAL: { color: '#00FFFF', chipText: 'TECHNICAL' },
  CULTURAL: { color: '#FF00FF', chipText: 'CULTURAL' },
  CYBER: { color: '#FF6B00', chipText: 'CYBER' }
};

export const bannerData: EventBannerData[] = [
  // --- GENERAL EVENTS ---
  {
    id: 'treasure-safari',
    name: 'TREASURE SAFARI',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Clues. Chaos. Championship.',
    fee: '₹50 / PERSON',
    teamBadge: 'TEAM EVENT • 3 MEMBERS',
    visualConcept: 'Ek stylized treasure map + magnifying glass silhouette, torn map edges, compass rose glowing in #CCFF00. Team of 3 shadow figures running toward X mark.',
    nameStyle: 'TREASURE SAFARI — jagged, adventure font',
    logo: 'PANACHE 2k26',
    image: '/banners/treasure-safari.png'
  },

  {
    id: 'paricharcha',
    name: 'PARICHARCHA',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Speak Up. Stand Out.',
    fee: '₹50',
    visualConcept: 'Two mic silhouettes facing each other, speech bubbles with "..." overlapping in neon yellow. Bold podium/stage in background.',
    nameStyle: 'PARICHARCHA — clean serif, strong',
    logo: 'PANACHE 2k26',
    image: '/banners/paricharcha.png'
  },

  {
    id: 'nail-art',
    name: 'NAIL ART',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Your Nails, Your Canvas.',
    fee: '₹50',
    visualConcept: 'Close-up of hands with intricate nail designs, brushes and palette arranged around. Glitter effect on nails in neon green tones.',
    nameStyle: 'NAIL ART — elegant, thin + bold contrast',
    logo: 'PANACHE 2k26',
    image: '/banners/nail-art.png'
  },

  {
    id: 'attire',
    name: 'ATTIRE',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Walk In. Own The Room.',
    fee: '₹100',
    visualConcept: 'Ramp/runway perspective from below, spotlights in neon green. Stylized silhouette of model walking with flowing outfit.',
    nameStyle: 'ATTIRE — fashion magazine style, large spaced letters',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'sanyog-se',
    name: 'SANYOG SE',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Luck Is The Only Skill You Need.',
    fee: '₹30',
    visualConcept: 'Lucky draw drum / spinning wheel with question marks. Stars and sparkles in #CCFF00. Lucky charm icons (dice, clover, coin).',
    nameStyle: 'SANYOG SE — playful, rounded bold',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'sand-art',
    name: 'SAND ART',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'One Grain At A Time.',
    fee: '₹50',
    visualConcept: 'Hand pouring sand forming an intricate scene/portrait. Sand granules shown in close-up with warm glow contrasting dark background.',
    nameStyle: 'SAND ART — sandy, grainy texture in the letters',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'crossword',
    name: 'CROSSWORD',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Fill The Grid. Rule The Room.',
    fee: '₹50',
    visualConcept: 'Giant crossword grid partially filled, glowing letters in neon yellow. Pencil cutting through the grid diagonally.',
    nameStyle: 'CROSSWORD — typewriter/monospace font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'ishtehar',
    name: 'ISHTEHAR',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Your Message. Your Art.',
    fee: '₹50',
    visualConcept: 'Vintage poster-on-poster concept — a hand holding up a painted poster. Bold brushstrokes and splatter effect in neon green.',
    nameStyle: 'ISHTEHAR — hand-drawn bold style',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'face-painting',
    name: 'FACE PAINTING',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Transform. Mesmerize. Win.',
    fee: '₹50',
    visualConcept: 'Half-face split — one side natural, other side with vivid face paint design in neon colors. Brushes crossed underneath.',
    nameStyle: 'FACE PAINTING — colorful drip effect on letters',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'rangoli',
    name: 'RANGOLI',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Colors That Speak Louder Than Words.',
    fee: '₹50',
    visualConcept: 'Top-down view of a geometric rangoli design, colors bleeding into dark background, #CCFF00 as dominant accent color in the design.',
    nameStyle: 'RANGOLI — decorative, mandala-inspired lettering',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'arm-wrestling',
    name: 'ARM WRESTLING',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Strength Meets Willpower.',
    fee: '₹50',
    visualConcept: 'Two forearms locked in arm wrestling position, muscles defined, neon green glow on veins/outline. Power burst behind.',
    nameStyle: 'ARM WRESTLING — heavy, blocky, 3D extrusion in #CCFF00',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'selfie-maniac',
    name: 'SELFIE MANIAC',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Strike A Pose. Steal The Show.',
    fee: '₹50',
    visualConcept: 'Phone screen showing a selfie with crazy expressions, heart & star emojis floating around, camera flash burst in neon green.',
    nameStyle: 'SELFIE MANIAC — social-media font, playful',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'esprit-de-corps',
    name: 'ESPRIT DE CORPS',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'One Team. One Spirit.',
    fee: '₹50 / PERSON',
    teamBadge: 'TEAM EVENT',
    visualConcept: '4 hands joining in the center (team handstack), neon green energy lines radiating outward. Unity/shield symbol in background.',
    nameStyle: 'ESPRIT DE CORPS — military bold font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'sloganeer',
    name: 'THE SLOGANEER',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Words That Hit Different.',
    fee: '₹50',
    visualConcept: 'Giant megaphone with words/letters bursting out, bold typography fragments flying in the background.',
    nameStyle: 'THE SLOGANEER — impact font with diagonal cut',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'perfect-click',
    name: 'THE PERFECT CLICK',
    category: 'GENERAL',
    color: '#CCFF00',
    tagline: 'Frame It. Own It.',
    fee: '₹50',
    visualConcept: 'Camera shutter circle as the central element, shutter blades in neon green. Silhouette of photographer kneeling with camera.',
    nameStyle: 'THE PERFECT CLICK — clean sans-serif, aperture "O" in logo',
    logo: 'PANACHE 2k26'
  },

  // --- TECHNICAL EVENTS ---
  {
    id: 'poster-presentation',
    name: 'POSTER PRESENTATION',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Your Research. Center Stage.',
    fee: '₹50',
    visualConcept: 'Scientific diagram/flowchart fragments glowing in cyan on dark background. Projecter beam from below lighting up the central poster frame.',
    nameStyle: 'POSTER PRESENTATION — clean technical font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'circuit-jhamela',
    name: 'CIRCUIT JHAMELA',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Find The Bug. Fix The World.',
    fee: '₹50',
    visualConcept: 'Exploded circuit board view, traces glowing neon cyan, one broken component with spark. Magnifying glass hovering over the fault point.',
    nameStyle: 'CIRCUIT JHAMELA — PCB trace font style',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'mechanist',
    name: 'THE MECHANIST',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Build It. Break It. Beat The Clock.',
    fee: '₹50',
    visualConcept: 'Mechanical gears, wrenches, bolts arranged around a central gear that glows cyan. Stopwatch shown in top corner.',
    nameStyle: 'THE MECHANIST — industrial stencil font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'sky-scrapper',
    name: 'SKY SCRAPPER',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'How High Can You Go?',
    fee: '₹50',
    visualConcept: 'Tall structure silhouette (built from straw/blocks) reaching toward sky, measuring ruler alongside, cyan glow at the top peak.',
    nameStyle: 'SKY SCRAPPER — tall compressed font, vertical emphasis',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'solid-hai-boss',
    name: 'SOLID HAI BOSS',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Kitna Solid Hai? Prove It.',
    fee: '₹100',
    visualConcept: 'Brain with circuits inside, glowing cyan sparks. Quiz bowl / buzzers with lightning bolt. Casual yet confident vibe.',
    nameStyle: 'SOLID HAI BOSS — desi-bold hybrid font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'altitude-winner',
    name: 'ALTITUDE WINNER',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Design It. Launch It. Dominate It.',
    fee: '₹100',
    visualConcept: 'Paper plane / drone soaring upward with vapor trail in cyan. Altitude meter gauge on the side. Sky with stars in dark background.',
    nameStyle: 'ALTITUDE WINNER — aerodynamic slanted font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'war-of-machines',
    name: 'WAR OF MACHINES',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Only One Machine Leaves Standing.',
    fee: '₹100',
    teamBadge: 'ROBOT COMBAT',
    visualConcept: 'Two battle robots facing off, sparks flying, arena floor visible. Dramatic cyan lightning between them. Danger/caution tape border.',
    nameStyle: 'WAR OF MACHINES — battle-damaged, cracked metal 3D letters',
    logo: 'PANACHE 2k26',
    image: '/banners/war-of-machines.png'
  },

  {
    id: 'worthy-trash',
    name: 'WORTHY TRASH',
    category: 'TECHNICAL',
    color: '#00FFFF',
    tagline: 'Junk In. Genius Out.',
    fee: '₹50',
    visualConcept: 'E-waste / tech scrap pile with one glowing creation emerging from it (like a phoenix). Recycling symbol with a circuit pattern.',
    nameStyle: 'WORTHY TRASH — grunge + clean split font',
    logo: 'PANACHE 2k26'
  },

  // --- CULTURAL EVENTS ---
  {
    id: 'persona',
    name: 'PERSONA',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: 'One Stage. Infinite Personalities.',
    fee: '₹100',
    teamBadge: 'TALENT HUNT',
    visualConcept: 'Split dramatic portrait — half formal, half wild/expressive. Spotlight from above, stage curtains on sides. Crown motif in magenta.',
    nameStyle: 'PERSONA — large serif italic, theater vibes',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'sur-spardha',
    name: 'SUR SPARDHA',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: 'Teri Awaaz. Tera Manch.',
    fee: '₹50',
    teamBadge: 'SOLO SINGING',
    visualConcept: 'Mic stand at center, sound waves radiating in magenta neon. Musical notes floating around. Stage spotlight beam from above.',
    nameStyle: 'SUR SPARDHA — musical flowing script with bold backing',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'tanz-twist-solo',
    name: 'TANZ & TWIST (Solo)',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: "Move Like No One's Watching. Win Like Everyone Is.",
    fee: '₹150',
    teamBadge: 'SOLO DANCE',
    visualConcept: 'Solo dancer silhouette mid-leap, motion blur trails in magenta. Dynamic diagonal composition, stage floor reflection visible.',
    nameStyle: 'TANZ & TWIST SOLO — dance-kinetic font, letters slightly tilted',
    logo: 'PANACHE 2k26',
    image: '/banners/tanz-twist-solo.png'
  },

  {
    id: 'tanz-twist-group',
    name: 'TANZ & TWIST (Group)',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: 'When They Move Together, The Ground Shakes.',
    fee: '₹500 FLAT / TEAM',
    teamBadge: 'GROUP DANCE • 4–12 MEMBERS',
    visualConcept: '6–8 dancer silhouettes in synchronized formation, magenta smoke/fog. Energy lines showing group movement and sync.',
    nameStyle: 'TANZ & TWIST GROUP — bold GROUP badge on top',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'nukkad-natak',
    name: 'NUKKAD NATAK',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: 'Sadak Ko Stage Banao.',
    fee: '₹500 FLAT / TEAM',
    teamBadge: 'STREET PLAY • TEAM EVENT',
    visualConcept: 'Street corner setting — cobblestone floor, small crowd watching. Actors frozen in dramatic pose, magenta spotlight from above. Old theatre masks (comedy/tragedy) in background.',
    nameStyle: 'NUKKAD NATAK — rustic hand-painted style lettering',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'stand-up-comedy',
    name: 'STAND-UP COMEDY',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: 'Make Them Laugh. Make Them Applaud.',
    fee: '₹50',
    visualConcept: 'Lone mic stand on dark stage, spotlight beam, "HA HA HA" text floating around in magenta speech bubbles. Laughing emoji integrated into design.',
    nameStyle: 'STAND-UP COMEDY — playful wavy letters',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'dramatics',
    name: 'DRAMATICS',
    category: 'CULTURAL',
    color: '#FF00FF',
    tagline: 'Every Story Deserves A Stage.',
    fee: '₹50 / PERSON',
    teamBadge: 'TEAM STAGE PLAY',
    visualConcept: 'Theater masks (one laughing, one crying) large in center, curtain draping on sides. Cast shadows in magenta on dark stage floor.',
    nameStyle: 'DRAMATICS — classic serif with theatrical flair',
    logo: 'PANACHE 2k26'
  },

  // --- CYBER EVENTS ---
  {
    id: 'code-debugger',
    name: 'CODE DEBUGGER',
    category: 'CYBER',
    color: '#FF6B00',
    tagline: 'Find The Error. Earn The Glory.',
    fee: '₹50',
    visualConcept: 'Dark terminal screen with red error lines, one glowing orange cursor fixing the bug. Binary rain (Matrix-style) in background fading out.',
    nameStyle: 'CODE DEBUGGER — monospace terminal font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'blind-viewer',
    name: 'BLIND VIEWER',
    category: 'CYBER',
    color: '#FF6B00',
    tagline: 'Type Without Seeing. Win Without Stopping.',
    fee: '₹50',
    visualConcept: 'Keyboard with blindfold draped over the monitor. Orange glow emanating from keyboard keys. Question mark over the screen.',
    nameStyle: 'BLIND VIEWER — inverted/hidden letters effect',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'battle-with-byte',
    name: 'BATTLE WITH BYTE',
    category: 'CYBER',
    color: '#FF6B00',
    tagline: 'Fastest Fingers. Sharpest Mind.',
    fee: '₹50',
    visualConcept: 'Two laptops facing each other like dueling swords, code streams colliding in the middle with an orange explosion of data.',
    nameStyle: 'BATTLE WITH BYTE — aggressive, sharp-edged tech font',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'guess-the-tech',
    name: 'GUESS THE TECH',
    category: 'CYBER',
    color: '#FF6B00',
    tagline: 'Kitna Jaanta Hai Tech Ko?',
    fee: '₹50',
    visualConcept: 'Blurred/pixelated tech logos and gadget silhouettes in background. Magnifying glass revealing one logo in center. Question mark motif heavy.',
    nameStyle: 'GUESS THE TECH — pixelated + bold hybrid',
    logo: 'PANACHE 2k26'
  },
  {
    id: 'online-gaming',
    name: 'ONLINE GAMING',
    category: 'CYBER',
    color: '#FF6B00',
    tagline: 'Login. Dominate. Win.',
    fee: '₹50 / PERSON',
    teamBadge: 'TEAM EVENT',
    visualConcept: 'Gaming controller silhouette glowing orange, sub-game logos (BGMI, Free Fire, etc.) arranged in a 3×3 grid style behind. "E-SPORTS" badge top-right.',
    nameStyle: 'ONLINE GAMING — gaming/esports aggressive font',
    logo: 'PANACHE 2k26'
  }
];

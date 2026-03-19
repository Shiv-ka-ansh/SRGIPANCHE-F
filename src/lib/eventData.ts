export const EVENT_CATEGORIES: Record<string, {
  label: string;
  color: string;
  events: { name: string; amount: number; subEvents?: string[] }[];
}> = {
  general: {
    label: 'General',
    color: '#CCFF00',
    events: [
      { name: 'TREASURE SAFARI', amount: 50 },
      { name: 'THE PERFECT CLICK', amount: 50 },
      { name: 'NAIL ART', amount: 50 },
      { name: 'PARICHARCHA', amount: 50 },
      { name: 'SELFIE MANIAC', amount: 50 },
      { name: 'ATTIRE', amount: 100 },
      { name: 'SANYOG SE', amount: 25 },
      { name: 'SAND ART', amount: 50 },
      { name: 'THE SLOGANEER', amount: 50 },
      { name: 'ISTEHAAAR', amount: 50 },
      { name: 'ESPRIT DE CORPS', amount: 50 },
      { name: 'CROSSWORD', amount: 50 },
      { name: 'FACE PAINTING', amount: 50 },
      { name: 'LITERARY', amount: 50 },
      { name: 'FINE ARTS', amount: 50 },
      { name: 'ARM WRESTLING', amount: 50 },
      { name: 'RANGOLI', amount: 50 },
      { name: 'MEHENDI', amount: 50 },
    ]
  },
  technical: {
    label: 'Technical',
    color: '#00FFFF',
    events: [
      { name: 'POSTER PRESENTATION', amount: 50 },
      { name: 'CIRCUIT JHAMELA', amount: 50 },
      { name: 'THE MECHANIST', amount: 50 },
      { name: 'SKY SCRAPPER', amount: 50 },
      { name: 'SOLID HAI BOSS', amount: 100 },
      { name: 'ALTITUDE WINNER', amount: 100 },
      { name: 'WAR OF MACHINES', amount: 100 },
      { name: 'WORTHY TRASH', amount: 50 },
    ]
  },
  cultural: {
    label: 'Cultural',
    color: '#FF00FF',
    events: [
      { name: 'PERSONA', amount: 100 },
      { name: 'SUR SPARDHA', amount: 50 },
      { name: 'TANZ & TWIST (Solo)', amount: 150 },
      { name: 'TANZ & TWIST (Group)', amount: 500 },
      { name: 'NUKKAD NATAK', amount: 500 },
      { name: 'STAND-UP COMEDY', amount: 50 },
      { name: 'DRAMATICS', amount: 50 },
    ]
  },
  cyber: {
    label: 'Cyber',
    color: '#FF6B00',
    events: [
      { name: 'CODE DEBUGGER', amount: 50 },
      { name: 'BLIND VIEWER', amount: 50 },
      { name: 'BATTLE WITH BYTE', amount: 50 },
      { name: 'GUESS THE TECH', amount: 50 },
      {
        name: 'ONLINE GAMING',
        amount: 50,
        subEvents: ['BGMI', 'Free Fire', 'Mini Militia', '8 Ball Pool', 'RC24', 'FIFA/E-Football', 'Tekken 3']
      },
    ]
  }
};

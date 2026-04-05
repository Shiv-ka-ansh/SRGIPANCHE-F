import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/api';

interface ScheduleEntry {
  _id: string;
  day: string;
  date: string;
  time: string;
  eventName: string;
  category: string;
  venue: string;
  description: string;
  order: number;
}

export function Schedule() {
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await api.get('/schedule');
        if (data.success && data.entries.length > 0) {
          setEntries(data.entries);
        }
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  // Group entries by day
  const grouped: Record<string, ScheduleEntry[]> = {};
  entries.forEach(e => {
    if (!grouped[e.day]) grouped[e.day] = [];
    grouped[e.day].push(e);
  });

  // Fallback data if API returns nothing
  const fallbackData = [
    {
      date: 'OCTOBER 15, 2026',
      day: 'DAY 1: THE INCEPTION',
      color: 'primary',
      events: [
        { time: '09:00 AM', title: 'OPENING CEREMONY', venue: 'MAIN AUDITORIUM', type: 'GENERAL' },
        { time: '11:00 AM', title: 'HACKATHON KICKOFF', venue: 'INNOVATION LAB', type: 'TECHNICAL' },
        { time: '02:00 PM', title: 'CYBER SECURITY PANEL', venue: 'HALL B', type: 'CYBER' },
        { time: '06:00 PM', title: 'EDM NIGHT', venue: 'OPEN GROUNDS', type: 'CULTURAL' },
      ]
    },
    {
      date: 'OCTOBER 16, 2026',
      day: 'DAY 2: THE GRIND',
      color: 'secondary',
      events: [
        { time: '10:00 AM', title: 'ROBO WARS', venue: 'TECH ARENA', type: 'TECHNICAL' },
        { time: '01:00 PM', title: 'E-SPORTS TOURNAMENT', venue: 'GAMING LOUNGE', type: 'GENERAL' },
        { time: '04:00 PM', title: 'CAPTURE THE FLAG', venue: 'CYBER CENTER', type: 'CYBER' },
        { time: '07:30 PM', title: 'BATTLE OF BANDS', venue: 'MAIN STAGE', type: 'CULTURAL' },
      ]
    },
    {
      date: 'OCTOBER 17, 2026',
      day: 'DAY 3: THE CLIMAX',
      color: 'accent',
      events: [
        { time: '09:00 AM', title: 'HACKATHON JUDGING', venue: 'INNOVATION LAB', type: 'TECHNICAL' },
        { time: '12:00 PM', title: 'STARTUP PITCH', venue: 'SEMINAR HALL', type: 'GENERAL' },
        { time: '03:00 PM', title: 'DANCE OFF', venue: 'MAIN STAGE', type: 'CULTURAL' },
        { time: '08:00 PM', title: 'CLOSING CEREMONY', venue: 'MAIN AUDITORIUM', type: 'GENERAL' },
      ]
    }
  ];

  const useFallback = entries.length === 0 && !loading;

  const getTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'TECHNICAL': return 'bg-[#00FFFF] text-black border-black';
      case 'CYBER': return 'bg-[#FF6B00] text-black border-black';
      case 'CULTURAL': return 'bg-[#FF00FF] text-black border-black';
      default: return 'bg-[#CCFF00] text-black border-black';
    }
  };

  const getDayColor = (dayIdx: number) => {
    const colors = ['#CCFF00', '#FF00FF', '#00FFFF'];
    return colors[dayIdx % colors.length];
  };

  // Build schedule data for rendering
  const scheduleData = useFallback
    ? fallbackData.map((d, i) => ({
        dayLabel: d.day,
        dateLabel: d.date,
        color: getDayColor(i),
        events: d.events.map(ev => ({ time: ev.time, title: ev.title, venue: ev.venue, type: ev.type })),
      }))
    : Object.entries(grouped).map(([day, evts], i) => ({
        dayLabel: day,
        dateLabel: evts[0]?.date || '',
        color: getDayColor(i),
        events: evts.map(e => ({ time: e.time, title: e.eventName, venue: e.venue, type: e.category })),
      }));

  return (
    <Layout>
      <div className="pt-24 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12">

          <div className="text-center mb-24">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-anton text-white mb-6 uppercase tracking-tight"
            >
              EVENT <span className="text-[#CCFF00]">SCHEDULE</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#888] font-space text-xl max-w-2xl mx-auto uppercase tracking-widest"
            >
              PLAN YOUR FESTIVAL EXPERIENCE. FIVE DAYS OF NON-STOP ACTION.
            </motion.p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#CCFF00]" size={48} />
            </div>
          )}

          {!loading && (
            <div className="max-w-5xl mx-auto space-y-24">
              {scheduleData.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: dayIndex * 0.1 }}
                  className="relative"
                >
                  {/* Day Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 relative z-10">
                    <div
                      className="w-24 h-24 border-4 border-black flex flex-col items-center justify-center shrink-0 transform -rotate-6"
                      style={{ backgroundColor: day.color, boxShadow: '8px 8px 0px #FFF' }}
                    >
                      <span className="text-sm font-space font-bold text-black uppercase tracking-widest">{day.dateLabel.split(' ')[0]?.substring(0, 3)}</span>
                      <span className="text-4xl font-anton text-black leading-none">{day.dateLabel.split(' ')[1]?.replace(',', '') || ''}</span>
                    </div>
                    <div className="bg-[#121212] border-4 border-[#333] p-6 flex-grow" style={{ boxShadow: '8px 8px 0px #333' }}>
                      <h2 className="text-4xl font-anton uppercase tracking-wider" style={{ color: day.color }}>{day.dayLabel}</h2>
                      <p className="text-[#888] font-space font-bold flex items-center gap-3 text-sm mt-3 uppercase tracking-widest">
                        <Calendar size={18} /> {day.dateLabel}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8 pl-12 md:pl-32 relative">
                    <div className="absolute left-12 md:left-[8.5rem] top-0 bottom-0 w-2 bg-[#333]" />

                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="relative bg-[#121212] p-8 border-4 border-[#333] hover:border-white transition-all group hover:-translate-y-1" style={{ boxShadow: '8px 8px 0px #333' }}>
                        <div
                          className="absolute -left-12 md:-left-[5.5rem] top-1/2 -translate-y-1/2 w-8 h-8 bg-[#050505] border-4 transition-colors z-10"
                          style={{ borderColor: day.color }}
                        />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <h3 className="text-2xl font-anton text-white mb-4 uppercase tracking-wider group-hover:text-[#CCFF00] transition-colors">{event.title}</h3>
                            <div className="flex flex-wrap items-center gap-6 font-space font-bold text-sm text-[#888] uppercase tracking-widest">
                              <span className="flex items-center gap-2">
                                <Clock size={18} style={{ color: day.color }} /> {event.time}
                              </span>
                              <span className="flex items-center gap-2">
                                <MapPin size={18} style={{ color: day.color }} /> {event.venue}
                              </span>
                            </div>
                          </div>
                          <span className={`px-4 py-2 text-sm font-anton uppercase tracking-widest border-2 shrink-0 transform rotate-3 group-hover:rotate-0 transition-transform ${getTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

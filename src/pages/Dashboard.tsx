import { useEffect, useState } from 'react';
import { useAuth } from '../lib/firebase';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Ticket, Bell, Loader2, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { user, profile, loading: authLoading, signIn } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [events, setEvents] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tickets' | 'notifications'>('tickets');
  const [registering, setRegistering] = useState(false);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventToRegister = queryParams.get('event');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const q = query(collection(db, 'registrations'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const userRegs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        setRegistrations(userRegs);

        const eventIds = [...new Set(userRegs.map(r => r.eventId))];
        if (eventToRegister && !eventIds.includes(eventToRegister)) {
          eventIds.push(eventToRegister);
        }

        const eventsData: Record<string, any> = {};
        for (const id of eventIds as string[]) {
          const eventDoc = await getDoc(doc(db, 'events', id));
          if (eventDoc.exists()) {
            eventsData[id] = { id: eventDoc.id, ...eventDoc.data() };
          }
        }
        setEvents(eventsData);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, eventToRegister]);

  const handleRegister = async (eventId: string) => {
    if (!user) return;
    setRegistering(true);
    try {
      const newReg = {
        userId: user.uid,
        eventId,
        status: 'pending',
        qrCodeData: `${user.uid}-${eventId}-${Date.now()}`,
        registeredAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, 'registrations'), newReg);
      setRegistrations([...registrations, { id: docRef.id, ...newReg }]);
      
      window.history.replaceState({}, '', '/dashboard');
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
          <Loader2 className="animate-spin text-primary" size={64} />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwaC04djhaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC41Ij48L3BhdGg+Cjwvc3ZnPg==')] pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface p-12 border-4 border-border shadow-[16px_16px_0px_#CCFF00] text-center max-w-lg w-full relative z-10"
          >
            <div className="w-24 h-24 bg-primary flex items-center justify-center mx-auto mb-8 border-4 border-black transform -rotate-6">
              <Ticket size={48} className="text-black" />
            </div>
            <h2 className="text-4xl font-display text-white mb-4 uppercase tracking-wider">ACCESS DENIED</h2>
            <p className="text-text-muted font-sans font-bold uppercase tracking-widest mb-10">LOGIN REQUIRED TO VIEW TICKETS AND MANAGE REGISTRATIONS.</p>
            <button
              onClick={signIn}
              className="btn-brutal btn-brutal-primary w-full py-5 text-xl"
            >
              AUTHENTICATE NOW <Zap size={24} className="ml-2 inline" />
            </button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="text-black" size={20} />;
      case 'rejected': return <XCircle className="text-white" size={20} />;
      default: return <Clock className="text-black" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-primary text-black border-black';
      case 'rejected': return 'bg-red-600 text-white border-black';
      default: return 'bg-yellow-400 text-black border-black';
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-32 min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-display text-white mb-4 uppercase tracking-tight"
              >
                WELCOME, <span className="text-primary">{profile?.name?.split(' ')[0]}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-muted font-sans text-xl uppercase tracking-widest"
              >
                MANAGE YOUR PANACHE 2K26 EXPERIENCE.
              </motion.p>
            </div>
            
            <div className="flex gap-4 bg-surface p-2 border-4 border-border shadow-[8px_8px_0px_#333]">
              <button
                onClick={() => setActiveTab('tickets')}
                className={cn(
                  "px-8 py-3 font-sans font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-3",
                  activeTab === 'tickets' ? "bg-white text-black border-2 border-black" : "text-text-muted hover:text-white border-2 border-transparent"
                )}
              >
                <Ticket size={20} /> TICKETS
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={cn(
                  "px-8 py-3 font-sans font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-3",
                  activeTab === 'notifications' ? "bg-white text-black border-2 border-black" : "text-text-muted hover:text-white border-2 border-transparent"
                )}
              >
                <Bell size={20} /> UPDATES
              </button>
            </div>
          </div>

          {/* Pending Registration from URL */}
          {eventToRegister && events[eventToRegister] && !registrations.find(r => r.eventId === eventToRegister) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 bg-secondary p-8 border-4 border-black shadow-[12px_12px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div>
                <h3 className="text-3xl font-display text-black mb-2 uppercase tracking-wider">COMPLETE REGISTRATION</h3>
                <p className="text-black/80 font-sans font-bold uppercase tracking-widest">YOU SELECTED <span className="text-white bg-black px-2 py-1 mx-1">{events[eventToRegister].title}</span>. CONFIRM TO REGISTER.</p>
              </div>
              <button
                onClick={() => handleRegister(eventToRegister)}
                disabled={registering}
                className="btn-brutal bg-black text-white border-black hover:bg-white hover:text-black hover:border-white shadow-[6px_6px_0px_#FFF] disabled:opacity-50 flex items-center gap-3 text-lg py-4 px-8"
              >
                {registering ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle2 size={24} />}
                CONFIRM REGISTRATION
              </button>
            </motion.div>
          )}

          {/* Content */}
          {activeTab === 'tickets' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {registrations.length > 0 ? (
                registrations.map((reg, index) => {
                  const event = events[reg.eventId];
                  if (!event) return null;
                  
                  return (
                    <motion.div
                      key={reg.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-surface border-4 border-border flex flex-col sm:flex-row shadow-[12px_12px_0px_#333] hover:shadow-[12px_12px_0px_#CCFF00] hover:border-primary transition-all group"
                    >
                      {/* QR Code Section */}
                      <div className="p-8 bg-black flex flex-col items-center justify-center border-b-4 sm:border-b-0 sm:border-r-4 border-border sm:w-2/5 shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwaC04djhaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC41Ij48L3BhdGg+Cjwvc3ZnPg==')] pointer-events-none opacity-30" />
                        <div className="bg-white p-4 mb-6 border-4 border-white relative z-10 group-hover:scale-105 transition-transform">
                          <QRCodeSVG 
                            value={reg.qrCodeData} 
                            size={120}
                            level="H"
                            includeMargin={false}
                          />
                        </div>
                        <div className={cn("px-4 py-2 text-sm font-display uppercase tracking-widest border-2 flex items-center gap-2 relative z-10", getStatusColor(reg.status))}>
                          {getStatusIcon(reg.status)}
                          {reg.status}
                        </div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="p-8 flex flex-col justify-between flex-grow bg-surface relative">
                        {/* Ticket Notch */}
                        <div className="hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-12 bg-background border-r-4 border-t-4 border-b-4 border-border rounded-r-full" />
                        
                        <div>
                          <div className="text-sm font-display uppercase tracking-widest text-primary mb-4 bg-primary/10 inline-block px-3 py-1 border border-primary/30">
                            {event.category}
                          </div>
                          <h3 className="text-3xl font-display text-white mb-6 uppercase tracking-wider line-clamp-2">
                            {event.title}
                          </h3>
                          
                          <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 font-sans font-bold text-sm text-text-muted uppercase tracking-widest">
                              <Calendar size={18} className="text-white" />
                              <span className="truncate">{event.date ? format(new Date(event.date), 'MMM dd, yyyy • HH:mm') : 'TBA'}</span>
                            </div>
                            <div className="flex items-center gap-3 font-sans font-bold text-sm text-text-muted uppercase tracking-widest">
                              <MapPin size={18} className="text-white" />
                              <span className="truncate">{event.venue}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm font-sans font-bold text-text-muted uppercase tracking-widest border-t-4 border-dashed border-border pt-6 mt-4 flex justify-between items-center">
                          <span>TICKET ID:</span>
                          <span className="text-white bg-border px-3 py-1">{reg.id.substring(0, 8).toUpperCase()}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-32 bg-surface border-4 border-dashed border-border">
                  <Ticket size={64} className="mx-auto text-border mb-6" />
                  <h3 className="text-3xl font-display text-white mb-4 uppercase tracking-widest">NO TICKETS YET</h3>
                  <p className="text-text-muted font-sans uppercase tracking-widest mb-10">YOU HAVEN'T REGISTERED FOR ANY EVENTS.</p>
                  <Link 
                    to="/events"
                    className="btn-brutal btn-brutal-primary text-lg py-4 px-8"
                  >
                    BROWSE EVENTS <Zap size={20} className="ml-2 inline" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-surface border-4 border-border p-12 shadow-[12px_12px_0px_#333] max-w-4xl mx-auto">
              <div className="text-center py-20">
                <Bell size={64} className="mx-auto text-border mb-6" />
                <h3 className="text-3xl font-display text-white mb-4 uppercase tracking-widest">SYSTEM QUIET</h3>
                <p className="text-text-muted font-sans uppercase tracking-widest">WE'LL NOTIFY YOU WHEN YOUR REGISTRATION STATUS CHANGES OR WHEN THE EVENT APPROACHES.</p>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </Layout>
  );
}

import { useEffect, useState, FormEvent } from 'react';
import { useAuth } from '../lib/firebase';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar, MapPin, Users, Plus, Edit, Trash2, CheckCircle, XCircle, Loader2, ShieldAlert, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export function Admin() {
  const { user, profile, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'registrations'>('events');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    date: '',
    venue: '',
    image: '',
    maxCapacity: 100,
    tags: ''
  });

  useEffect(() => {
    if (!user || profile?.role !== 'admin') {
      setLoading(false);
      return;
    }

    fetchData();
  }, [user, profile]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const eventsQ = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
      const eventsSnap = await getDocs(eventsQ);
      setEvents(eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const regsQ = query(collection(db, 'registrations'), orderBy('registeredAt', 'desc'));
      const regsSnap = await getDocs(regsQ);
      setRegistrations(regsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const eventData = {
        ...formData,
        maxCapacity: Number(formData.maxCapacity),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        currentRegistrations: editingEvent ? editingEvent.currentRegistrations : 0,
        createdAt: editingEvent ? editingEvent.createdAt : serverTimestamp(),
        createdBy: editingEvent ? editingEvent.createdBy : user.uid
      };

      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), eventData);
      } else {
        await addDoc(collection(db, 'events'), eventData);
      }
      
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event. Check console.");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS EVENT? THIS ACTION IS IRREVERSIBLE.")) return;
    try {
      await deleteDoc(doc(db, 'events', id));
      fetchData();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateRegistrationStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
      fetchData();
    } catch (error) {
      console.error("Error updating registration:", error);
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

  if (!user || profile?.role !== 'admin') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwaC04djhaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC41Ij48L3BhdGg+Cjwvc3ZnPg==')] pointer-events-none" />
          <div className="bg-surface p-12 border-4 border-red-500 shadow-[16px_16px_0px_#EF4444] text-center max-w-lg w-full relative z-10">
            <ShieldAlert size={64} className="text-red-500 mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl font-display text-white mb-4 uppercase tracking-wider">RESTRICTED AREA</h2>
            <p className="text-text-muted font-sans font-bold uppercase tracking-widest">YOU DO NOT HAVE CLEARANCE TO VIEW THIS SECTOR.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-32 min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-display text-white mb-4 uppercase tracking-tight"
              >
                COMMAND <span className="text-secondary">CENTER</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-muted font-sans text-xl uppercase tracking-widest"
              >
                MANAGE EVENTS, REGISTRATIONS, AND SYSTEM ANALYTICS.
              </motion.p>
            </div>
            
            <div className="flex gap-4 bg-surface p-2 border-4 border-border shadow-[8px_8px_0px_#333]">
              <button
                onClick={() => setActiveTab('events')}
                className={cn(
                  "px-8 py-3 font-sans font-bold text-sm uppercase tracking-widest transition-all",
                  activeTab === 'events' ? "bg-white text-black border-2 border-black" : "text-text-muted hover:text-white border-2 border-transparent"
                )}
              >
                EVENTS
              </button>
              <button
                onClick={() => setActiveTab('registrations')}
                className={cn(
                  "px-8 py-3 font-sans font-bold text-sm uppercase tracking-widest transition-all",
                  activeTab === 'registrations' ? "bg-white text-black border-2 border-black" : "text-text-muted hover:text-white border-2 border-transparent"
                )}
              >
                REGISTRATIONS
              </button>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-surface p-8 border-4 border-border shadow-[8px_8px_0px_#333] hover:shadow-[8px_8px_0px_#00FFFF] hover:border-accent transition-all">
              <div className="text-text-muted font-sans font-bold text-sm uppercase tracking-widest mb-4">TOTAL EVENTS</div>
              <div className="text-6xl font-display text-white">{events.length}</div>
            </div>
            <div className="bg-surface p-8 border-4 border-border shadow-[8px_8px_0px_#333] hover:shadow-[8px_8px_0px_#CCFF00] hover:border-primary transition-all">
              <div className="text-text-muted font-sans font-bold text-sm uppercase tracking-widest mb-4">TOTAL REGISTRATIONS</div>
              <div className="text-6xl font-display text-primary">{registrations.length}</div>
            </div>
            <div className="bg-surface p-8 border-4 border-border shadow-[8px_8px_0px_#333] hover:shadow-[8px_8px_0px_#FF00FF] hover:border-secondary transition-all">
              <div className="text-text-muted font-sans font-bold text-sm uppercase tracking-widest mb-4">PENDING APPROVALS</div>
              <div className="text-6xl font-display text-secondary">
                {registrations.filter(r => r.status === 'pending').length}
              </div>
            </div>
          </div>

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-display text-white uppercase tracking-wider">EVENT DATABASE</h2>
                <button 
                  onClick={() => {
                    setEditingEvent(null);
                    setFormData({
                      title: '', description: '', category: 'Technical', date: '', venue: '', image: '', maxCapacity: 100, tags: ''
                    });
                    setIsModalOpen(true);
                  }}
                  className="btn-brutal btn-brutal-primary flex items-center gap-2"
                >
                  <Plus size={20} /> ADD EVENT
                </button>
              </div>

              <div className="bg-surface border-4 border-border shadow-[12px_12px_0px_#333] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black border-b-4 border-border">
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">EVENT</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">CATEGORY</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">DATE & VENUE</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">CAPACITY</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id} className="border-b-2 border-border hover:bg-white/5 transition-colors">
                          <td className="p-6">
                            <div className="font-display text-xl text-white uppercase tracking-wider mb-2">{event.title}</div>
                            <div className="font-sans text-sm text-text-muted truncate max-w-xs uppercase tracking-wide">{event.description}</div>
                          </td>
                          <td className="p-6">
                            <span className="px-3 py-1 bg-border text-white font-sans font-bold text-xs uppercase tracking-widest border-2 border-transparent">
                              {event.category}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="font-sans font-bold text-sm text-white flex items-center gap-3 mb-2 uppercase tracking-widest">
                              <Calendar size={16} className="text-primary" />
                              {event.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'TBA'}
                            </div>
                            <div className="font-sans font-bold text-sm text-text-muted flex items-center gap-3 uppercase tracking-widest">
                              <MapPin size={16} className="text-secondary" />
                              {event.venue}
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="font-sans font-bold text-sm text-white flex items-center gap-3 uppercase tracking-widest">
                              <Users size={16} className="text-accent" />
                              {event.currentRegistrations || 0} / {event.maxCapacity}
                            </div>
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex items-center justify-end gap-4">
                              <button 
                                onClick={() => {
                                  setEditingEvent(event);
                                  setFormData({
                                    title: event.title,
                                    description: event.description,
                                    category: event.category,
                                    date: event.date,
                                    venue: event.venue,
                                    image: event.image || '',
                                    maxCapacity: event.maxCapacity,
                                    tags: (event.tags || []).join(', ')
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="p-3 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <div>
              <h2 className="text-3xl font-display text-white mb-8 uppercase tracking-wider">REGISTRATION LOGS</h2>
              
              <div className="bg-surface border-4 border-border shadow-[12px_12px_0px_#333] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black border-b-4 border-border">
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">USER ID</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">EVENT</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">DATE</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest">STATUS</th>
                        <th className="p-6 font-sans font-bold text-sm text-white uppercase tracking-widest text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => {
                        const event = events.find(e => e.id === reg.eventId);
                        return (
                          <tr key={reg.id} className="border-b-2 border-border hover:bg-white/5 transition-colors">
                            <td className="p-6">
                              <div className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">{reg.userId.substring(0, 8)}...</div>
                            </td>
                            <td className="p-6">
                              <div className="font-display text-lg text-white uppercase tracking-wider mb-1">{event?.title || 'UNKNOWN EVENT'}</div>
                              <div className="font-sans font-bold text-xs text-text-muted uppercase tracking-widest">{event?.category}</div>
                            </td>
                            <td className="p-6">
                              <div className="font-sans font-bold text-sm text-white uppercase tracking-widest">
                                {reg.registeredAt ? format(reg.registeredAt.toDate(), 'MMM dd, yyyy') : 'N/A'}
                              </div>
                            </td>
                            <td className="p-6">
                              <span className={cn(
                                "px-3 py-1 font-sans font-bold text-xs uppercase tracking-widest border-2",
                                reg.status === 'approved' ? 'bg-primary text-black border-primary' :
                                reg.status === 'rejected' ? 'bg-red-600 text-white border-red-600' :
                                'bg-yellow-400 text-black border-yellow-400'
                              )}>
                                {reg.status}
                              </span>
                            </td>
                            <td className="p-6 text-right">
                              {reg.status === 'pending' && (
                                <div className="flex items-center justify-end gap-4">
                                  <button 
                                    onClick={() => handleUpdateRegistrationStatus(reg.id, 'approved')}
                                    className="p-3 border-2 border-primary text-primary hover:bg-primary hover:text-black transition-colors"
                                    title="Approve"
                                  >
                                    <CheckCircle size={18} />
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateRegistrationStatus(reg.id, 'rejected')}
                                    className="p-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle size={18} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-surface p-8 md:p-12 border-4 border-border shadow-[16px_16px_0px_#CCFF00] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-4xl font-display text-white mb-8 uppercase tracking-wider">
              {editingEvent ? 'EDIT EVENT PROTOCOL' : 'INITIALIZE NEW EVENT'}
            </h2>
            
            <form onSubmit={handleSaveEvent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">TITLE</label>
                  <input 
                    required type="text" 
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">CATEGORY</label>
                  <select 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                  >
                    <option value="Technical">TECHNICAL</option>
                    <option value="Cyber">CYBER</option>
                    <option value="General">GENERAL</option>
                    <option value="Cultural">CULTURAL</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">DESCRIPTION</label>
                <textarea 
                  required rows={4}
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">DATE & TIME</label>
                  <input 
                    required type="datetime-local" 
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">VENUE</label>
                  <input 
                    required type="text" 
                    value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})}
                    className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">MAX CAPACITY</label>
                  <input 
                    required type="number" min="1"
                    value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: Number(e.target.value)})}
                    className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">IMAGE URL (OPTIONAL)</label>
                  <input 
                    type="url" 
                    value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans font-bold text-sm text-text-muted uppercase tracking-widest">TAGS (COMMA SEPARATED)</label>
                <input 
                  type="text" placeholder="E.G. AI, CODING, TEAM"
                  value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})}
                  className="w-full bg-background border-2 border-border p-4 text-white font-sans font-bold uppercase tracking-widest focus:border-primary focus:shadow-[4px_4px_0px_#CCFF00] focus:outline-none transition-all"
                />
              </div>

              <div className="flex justify-end gap-6 pt-8 mt-8 border-t-4 border-border">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="btn-brutal"
                >
                  ABORT
                </button>
                <button 
                  type="submit"
                  className="btn-brutal btn-brutal-primary"
                >
                  EXECUTE SAVE <Zap size={20} className="ml-2" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}

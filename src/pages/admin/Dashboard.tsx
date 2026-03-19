import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle2, User, Hash, Phone, Mail, BookOpen, ChevronDown } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import api from '../../lib/api';
import { EVENT_CATEGORIES } from '../../lib/eventData';
import toast, { Toaster } from 'react-hot-toast';

interface StudentData {
  _id: string;
  fullName: string;
  rollNo: string;
  course: string;
  branch: string;
  section: string;
  year: string;
  mobileNo: string;
  email: string;
  status: string;
}

interface SelectedEvent {
  category: string;
  eventName: string;
  amount: number;
  subEvent?: string;
}

const categoryKeys = Object.keys(EVENT_CATEGORIES);

export function Dashboard() {
  const { user, logout } = useAuth();
  const [tokenInput, setTokenInput] = useState('');
  const [student, setStudent] = useState<StudentData | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const [selectedEvents, setSelectedEvents] = useState<SelectedEvent[]>([]);
  const [subEventSelections, setSubEventSelections] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const handleVerify = async () => {
    if (tokenInput.length !== 6) {
      toast.error('Token must be 6 digits');
      return;
    }
    setVerifying(true);
    setStudent(null);
    setSelectedEvents([]);
    setRegistrationDone(false);
    try {
      const { data } = await api.post('/students/verify-token', { token: tokenInput });
      if (data.success) {
        setStudent(data.student);
        toast.success('Student found!', { style: { background: '#CCFF00', color: '#050505', borderRadius: 0, border: '4px solid #050505' } });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Token verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const toggleEvent = (category: string, eventName: string, amount: number, hasSubEvents: boolean) => {
    const exists = selectedEvents.find(e => e.eventName === eventName && e.category === category);
    if (exists) {
      setSelectedEvents(selectedEvents.filter(e => !(e.eventName === eventName && e.category === category)));
    } else {
      if (hasSubEvents) {
        const sub = subEventSelections[eventName];
        if (!sub) {
          toast.error('Please select a sub-event first');
          return;
        }
        setSelectedEvents([...selectedEvents, { category, eventName, amount, subEvent: sub }]);
      } else {
        setSelectedEvents([...selectedEvents, { category, eventName, amount }]);
      }
    }
  };

  const totalAmount = selectedEvents.reduce((sum, e) => sum + e.amount, 0);

  const handleConfirm = async () => {
    if (!student || selectedEvents.length === 0) return;
    setSubmitting(true);
    try {
      const { data } = await api.post('/event-registrations', {
        studentId: student._id,
        events: selectedEvents,
      });
      if (data.success) {
        toast.success('Events registered successfully!');
        setRegistrationDone(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to register events');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="pt-24 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 md:px-12 max-w-5xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-anton text-white uppercase tracking-tight"
              >
                ADMIN <span className="text-[#CCFF00]">PANEL</span>
              </motion.h1>
              <p className="font-space text-[#888] text-sm uppercase tracking-widest mt-1">Event Registration System</p>
            </div>
            <button
              onClick={logout}
              className="font-space font-bold text-sm uppercase tracking-widest border-2 border-[#333] text-[#888] px-6 py-3 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Token Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121212] border-4 border-[#333] p-6 md:p-8 mb-8"
            style={{ boxShadow: '8px 8px 0px #333' }}
          >
            <label className="block font-space font-bold uppercase text-[#CCFF00] mb-4 text-sm">Enter Student Token</label>
            <div className="flex gap-4">
              <input
                type="text"
                maxLength={6}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-[#050505] font-anton text-3xl text-[#CCFF00] tracking-[0.5em] text-center border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                placeholder="000000"
              />
              <button
                onClick={handleVerify}
                disabled={verifying || tokenInput.length !== 6}
                className="bg-[#CCFF00] text-[#050505] font-anton text-xl uppercase px-8 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {verifying ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
                VERIFY
              </button>
            </div>
          </motion.div>

          {/* Student Card */}
          <AnimatePresence>
            {student && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="bg-[#121212] border-4 border-[#CCFF00] p-6 md:p-8 mb-8"
                style={{ boxShadow: '8px 8px 0px #CCFF00' }}
              >
                <h3 className="font-anton text-2xl text-[#CCFF00] uppercase tracking-wider mb-6 flex items-center gap-3">
                  <User size={24} /> Student Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: <User size={16} />, label: 'Name', value: student.fullName },
                    { icon: <Hash size={16} />, label: 'Roll No', value: student.rollNo },
                    { icon: <BookOpen size={16} />, label: 'Course', value: student.course },
                    { icon: <BookOpen size={16} />, label: 'Branch', value: student.branch },
                    { icon: <BookOpen size={16} />, label: 'Section', value: student.section },
                    { icon: <BookOpen size={16} />, label: 'Year', value: student.year },
                    { icon: <Phone size={16} />, label: 'Mobile', value: student.mobileNo },
                    { icon: <Mail size={16} />, label: 'Email', value: student.email },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#050505] border-2 border-[#333] p-4">
                      <span className="font-space text-[#888] text-xs uppercase tracking-widest flex items-center gap-2 mb-1">{item.icon} {item.label}</span>
                      <span className="font-space font-bold text-white text-sm uppercase">{item.value}</span>
                    </div>
                  ))}
                </div>
                {student.status === 'processed' && (
                  <div className="mt-4 bg-yellow-400/10 border-2 border-yellow-400 p-4">
                    <p className="font-space font-bold text-yellow-400 text-sm uppercase tracking-wider">⚠ This student has already been processed. You can still add more events.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Selection */}
          {student && !registrationDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#121212] border-4 border-[#333] p-6 md:p-8"
              style={{ boxShadow: '8px 8px 0px #333' }}
            >
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categoryKeys.map(key => {
                  const cat = EVENT_CATEGORIES[key];
                  const isActive = activeCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className="font-anton text-lg uppercase tracking-wider px-6 py-3 border-4 transition-all"
                      style={{
                        borderColor: isActive ? cat.color : '#333',
                        backgroundColor: isActive ? cat.color : 'transparent',
                        color: isActive ? '#050505' : cat.color,
                        boxShadow: isActive ? `4px 4px 0px #050505` : 'none',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Events List */}
              <div className="space-y-3">
                {EVENT_CATEGORIES[activeCategory].events.map((event) => {
                  const isSelected = selectedEvents.some(e => e.eventName === event.name && e.category === activeCategory);
                  const catColor = EVENT_CATEGORIES[activeCategory].color;

                  return (
                    <div
                      key={event.name}
                      className="flex items-center justify-between p-4 border-2 transition-all cursor-pointer hover:bg-white/5"
                      style={{
                        borderColor: isSelected ? catColor : '#333',
                        backgroundColor: isSelected ? `${catColor}10` : 'transparent',
                      }}
                      onClick={() => {
                        if (!event.subEvents) toggleEvent(activeCategory, event.name, event.amount, false);
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="w-6 h-6 border-4 flex items-center justify-center shrink-0"
                          style={{ borderColor: catColor, backgroundColor: isSelected ? catColor : 'transparent' }}
                        >
                          {isSelected && <CheckCircle2 size={14} color="#050505" />}
                        </div>
                        <span className="font-space font-bold text-white text-sm uppercase tracking-wider">{event.name}</span>
                        {event.subEvents && (
                          <div className="flex items-center gap-2">
                            <select
                              className="bg-[#050505] font-space text-xs text-white border-2 border-[#333] p-2 outline-none focus:border-[#CCFF00]"
                              value={subEventSelections[event.name] || ''}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                e.stopPropagation();
                                setSubEventSelections({ ...subEventSelections, [event.name]: e.target.value });
                              }}
                            >
                              <option value="">Select Game</option>
                              {event.subEvents.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))}
                            </select>
                            <button
                              className="font-space text-xs font-bold uppercase px-3 py-2 border-2 transition-all"
                              style={{
                                borderColor: catColor,
                                backgroundColor: isSelected ? catColor : 'transparent',
                                color: isSelected ? '#050505' : catColor
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleEvent(activeCategory, event.name, event.amount, true);
                              }}
                            >
                              {isSelected ? 'Remove' : 'Add'}
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="font-anton text-xl shrink-0 ml-4" style={{ color: catColor }}>₹{event.amount}</span>
                    </div>
                  );
                })}
              </div>

              {/* Total + Confirm */}
              <div className="mt-8 pt-8 border-t-4 border-[#333]">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-anton text-2xl text-white uppercase tracking-wider">Total:</span>
                  <span className="font-anton text-4xl text-[#CCFF00]">₹{totalAmount}</span>
                </div>

                {selectedEvents.length > 0 && (
                  <div className="mb-6 bg-[#050505] border-2 border-[#333] p-4">
                    <p className="font-space text-xs text-[#888] uppercase tracking-widest mb-2">Selected Events ({selectedEvents.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvents.map((ev, i) => (
                        <span key={i} className="font-space text-xs font-bold bg-[#121212] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 uppercase">
                          {ev.eventName}{ev.subEvent ? ` (${ev.subEvent})` : ''} — ₹{ev.amount}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleConfirm}
                  disabled={submitting || selectedEvents.length === 0}
                  className="w-full font-anton text-2xl uppercase tracking-widest bg-[#CCFF00] text-[#050505] py-5 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  style={{ boxShadow: '8px 8px 0px #050505' }}
                >
                  {submitting ? <Loader2 className="animate-spin" size={28} /> : <CheckCircle2 size={28} />}
                  {submitting ? 'Processing...' : 'Confirm & Register Events →'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Registration Complete */}
          {registrationDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121212] border-4 border-[#CCFF00] p-8 text-center"
              style={{ boxShadow: '16px 16px 0px #CCFF00' }}
            >
              <CheckCircle2 size={64} className="text-[#CCFF00] mx-auto mb-4" />
              <h2 className="font-anton text-3xl text-[#CCFF00] uppercase mb-2">Events Registered!</h2>
              <p className="font-space text-[#888] text-sm uppercase tracking-wider mb-6">
                {selectedEvents.length} events • Total ₹{totalAmount} • Confirmation email sent
              </p>
              <button
                onClick={() => {
                  setStudent(null);
                  setTokenInput('');
                  setSelectedEvents([]);
                  setRegistrationDone(false);
                }}
                className="font-anton text-xl uppercase bg-[#CCFF00] text-[#050505] px-8 py-4 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all"
              >
                Process Next Student →
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </Layout>
  );
}

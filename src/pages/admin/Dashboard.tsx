import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle2, User, Hash, Phone, Mail, BookOpen, Users, List, Edit, X, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { ConfirmModal } from '../../components/ConfirmModal';
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
  token: string;
  emailSent?: boolean;
}

interface GroupMember {
  _id: string;
  fullName: string;
  rollNo: string;
  branch: string;
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
  const [activeTab, setActiveTab] = useState<'single' | 'group' | 'students'>('single');

  // Universal Event Selection States
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const [selectedEvents, setSelectedEvents] = useState<SelectedEvent[]>([]);
  const [subEventSelections, setSubEventSelections] = useState<Record<string, string>>({});
  
  // Single Registration States
  const [tokenInput, setTokenInput] = useState('');
  const [student, setStudent] = useState<StudentData | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  // Group Registration States
  const [groupTokenInput, setGroupTokenInput] = useState('');
  const [verifyingGroupMember, setVerifyingGroupMember] = useState(false);
  const [groupMembersList, setGroupMembersList] = useState<GroupMember[]>([]);

  // All Students States
  const [allStudents, setAllStudents] = useState<StudentData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [resendingEmails, setResendingEmails] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);

  // Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmLabel?: string;
    confirmColor?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const { data } = await api.get('/students', {
        params: { search: searchQuery, branch: branchFilter }
      });
      if (data.success) {
        setAllStudents(data.students);
      }
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleVerifySingle = async () => {
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

  const handleVerifyGroupMember = async () => {
    if (groupTokenInput.length !== 6) {
      toast.error('Token must be 6 digits');
      return;
    }
    setVerifyingGroupMember(true);
    try {
      const { data } = await api.post('/students/verify-token', { token: groupTokenInput });
      if (data.success) {
        const newMember = data.student;
        if (groupMembersList.some(m => m._id === newMember._id)) {
          toast.error('Student is already in the team');
        } else if (newMember.status === 'processed') {
          toast.error('This student is already processed/registered elsewhere', { style: { background: 'red', color: 'white' } });
        } else {
          setGroupMembersList([...groupMembersList, {
            _id: newMember._id,
            fullName: newMember.fullName,
            rollNo: newMember.rollNo,
            branch: newMember.branch,
            status: newMember.status
          }]);
          setGroupTokenInput('');
          toast.success('Team Member Added', { style: { background: '#CCFF00', color: '#050505', borderRadius: 0, border: '4px solid #050505' } });
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Token verification failed');
    } finally {
      setVerifyingGroupMember(false);
    }
  };

  const removeGroupMember = (id: string) => {
    setGroupMembersList(groupMembersList.filter(m => m._id !== id));
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

  const handleConfirmSingle = async () => {
    if (!student || selectedEvents.length === 0) return;
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Registration',
      message: `Are you sure you have received ₹${totalAmount}? This will register ${student.fullName} for ${selectedEvents.length} events.`,
      confirmLabel: 'Confirm & Register',
      confirmColor: '#CCFF00',
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await executeConfirmSingle();
      }
    });
  };

  const executeConfirmSingle = async () => {
    setSubmitting(true);
    try {
      const { data } = await api.post('/event-registrations', {
        studentId: student._id,
        events: selectedEvents,
        isGroup: false,
      });
      if (data.success) {
        toast.success(`Events registered! Total: ₹${totalAmount}`, { duration: 5000 });
        // Reset dashboard directly as requested: "success hone ke baad bapas se admin dashboard pe aajayega"
        setStudent(null);
        setTokenInput('');
        setSelectedEvents([]);
        setRegistrationDone(false); // We can skip the success state and just reset
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to register events');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmGroup = async () => {
    if (selectedEvents.length === 0) {
      toast.error('Please select at least one event first');
      return;
    }
    if (groupMembersList.length === 0) {
      toast.error('Please add team members');
      return;
    }
    
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Group Registration',
      message: `Are you sure you have received ₹${totalAmount} for this team of ${groupMembersList.length} members?`,
      confirmLabel: 'Confirm Team',
      confirmColor: '#CCFF00',
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        await executeConfirmGroup();
      }
    });
  };

  const executeConfirmGroup = async () => {
    setSubmitting(true);
    try {
      const leader = groupMembersList[0];
      const participantIds = groupMembersList.map(m => m._id);
      const groupNames = groupMembersList.map(m => m.fullName);

      const { data } = await api.post('/event-registrations', {
        studentId: leader._id,
        events: selectedEvents,
        isGroup: true,
        groupMembers: groupNames,
        participantIds: participantIds
      });
      if (data.success) {
        toast.success(`Group Events registered! Total: ₹${totalAmount}`, { duration: 5000 });
        // Reset dashboard
        setGroupMembersList([]);
        setGroupTokenInput('');
        setSelectedEvents([]);
        setRegistrationDone(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to register events');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    try {
      const { data } = await api.put(`/students/${editingStudent._id}`, editingStudent);
      if (data.success) {
        toast.success('Student details updated');
        setEditingStudent(null);
        fetchStudents();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update student');
    }
  };

  const handleResendFailed = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Resend All Failed Emails',
      message: 'Are you sure you want to resend tokens to ALL students who haven\'t received their email yet? This might take a few moments.',
      confirmLabel: 'Resend All',
      confirmColor: '#FF00FF', // Branded Magenta for resend
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        setResendingEmails(true);
        try {
          const { data } = await api.post('/students/resend-failed');
          if (data.success) {
            toast.success(data.message, { duration: 5000 });
            fetchStudents();
          }
        } catch (error: any) {
          toast.error(error.response?.data?.error || 'Failed to resend emails');
        } finally {
          setResendingEmails(false);
        }
      }
    });
  };

  const handleResendToStudent = async (id: string) => {
    setResendingEmails(true);
    try {
      const { data } = await api.post(`/students/${id}/resend`);
      if (data.success) {
        toast.success('Email sent to student');
        fetchStudents();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to resend email');
    } finally {
      setResendingEmails(false);
    }
  };

  // Renders the Event Selection Component reused in both Single and Group flows
  const EventSelectionUI = ({ showOnlyTeam = false }: { showOnlyTeam?: boolean }) => {
    // Filter categories that have team events if showOnlyTeam is true
    const filteredCategoryKeys = showOnlyTeam 
      ? categoryKeys.filter(key => EVENT_CATEGORIES[key].events.some(e => e.isTeam))
      : categoryKeys;

    // Ensure activeCategory is valid for the current view
    useEffect(() => {
      if (showOnlyTeam && !filteredCategoryKeys.includes(activeCategory)) {
        setActiveCategory(filteredCategoryKeys[0] || categoryKeys[0]);
      }
    }, [showOnlyTeam, filteredCategoryKeys]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#121212] border-4 border-[#333] p-6 md:p-8 mb-8"
        style={{ boxShadow: '8px 8px 0px #333' }}
      >
        <h3 className="font-anton text-2xl text-[#CCFF00] uppercase tracking-wider mb-6 flex items-center gap-3">
          <List size={24} /> {showOnlyTeam ? 'Select Team Event' : 'Select Events'}
        </h3>
        
        {/* Category Selection */}
        {showOnlyTeam ? (
          <div className="mb-8">
            <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-3">Select Category</label>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-[#050505] text-[#CCFF00] font-anton text-xl uppercase tracking-widest border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors cursor-pointer"
            >
              {filteredCategoryKeys.map(key => (
                <option key={key} value={key}>{EVENT_CATEGORIES[key].label}</option>
              ))}
            </select>
          </div>
        ) : (
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
        )}

        {/* Events List */}
        <div className="space-y-3">
          {EVENT_CATEGORIES[activeCategory].events
            .filter(event => !showOnlyTeam || event.isTeam)
            .map((event) => {
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
          {showOnlyTeam && EVENT_CATEGORIES[activeCategory].events.filter(e => e.isTeam).length === 0 && (
            <p className="font-space text-[#888] text-center py-4 uppercase tracking-[0.2em] animate-pulse">No team events in this category</p>
          )}
        </div>

        <div className="mt-8 pt-8 border-t-4 border-[#333] flex items-center justify-between">
          <span className="font-anton text-2xl text-white uppercase tracking-wider">Total:</span>
          <span className="font-anton text-4xl text-[#CCFF00]">₹{totalAmount}</span>
        </div>
        {selectedEvents.length > 0 && (
          <div className="mt-4 bg-[#050505] border-2 border-[#333] p-4">
            <p className="font-space text-xs text-[#888] uppercase tracking-widest mb-2">Selected Events ({selectedEvents.length}):</p>
            <div className="flex flex-wrap gap-2">
              {selectedEvents.map((ev, i) => (
                <span key={i} className="font-space text-xs font-bold bg-[#121212] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 uppercase">
                  {ev.eventName}{ev.subEvent ? ` (${ev.subEvent})` : ''} - ₹{ev.amount}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="pt-24 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-anton text-white uppercase tracking-tight"
              >
                ADMIN <span className="text-[#CCFF00]">PANEL</span>
              </motion.h1>
              <p className="font-space text-[#888] text-sm uppercase tracking-widest mt-1">Event Registration & Management</p>
            </div>
            <button
              onClick={logout}
              className="font-space font-bold text-sm uppercase tracking-widest border-2 border-[#333] text-[#888] px-6 py-3 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#121212] border-2 border-[#333] p-2">
            {[
              { id: 'single', label: 'Single Registration', icon: <User size={18} /> },
              { id: 'group', label: 'Group Registration', icon: <Users size={18} /> },
              { id: 'students', label: 'All Students', icon: <List size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setStudent(null);
                  setTokenInput('');
                  setGroupTokenInput('');
                  setGroupMembersList([]);
                  setSelectedEvents([]);
                  setRegistrationDone(false);
                }}
                className={`font-space font-bold text-sm uppercase tracking-widest px-6 py-3 flex items-center gap-2 border-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#CCFF00] text-[#050505] border-[#050505] shadow-[4px_4px_0px_#050505]'
                    : 'bg-transparent text-[#888] border-transparent hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* ==== SINGLE REGISTRATION FLOW ==== */}
          {activeTab === 'single' && !registrationDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl">
              {/* Token Search */}
              <div
                className="bg-[#121212] border-4 border-[#333] p-6 md:p-8 mb-8"
                style={{ boxShadow: '8px 8px 0px #333' }}
              >
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-4 text-sm">
                  Enter Student Token
                </label>
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
                    onClick={handleVerifySingle}
                    disabled={verifying || tokenInput.length !== 6}
                    className="bg-[#CCFF00] text-[#050505] font-anton text-xl uppercase px-8 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {verifying ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
                    VERIFY
                  </button>
                </div>
              </div>

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

              {/* Single Flow Event Selection & Confirm */}
              {student && (
                <>
                  <EventSelectionUI />
                  <button
                    onClick={handleConfirmSingle}
                    disabled={submitting || selectedEvents.length === 0}
                    className="w-full mt-4 font-anton text-2xl uppercase tracking-widest bg-[#CCFF00] text-[#050505] py-5 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    style={{ boxShadow: '8px 8px 0px #050505' }}
                  >
                    {submitting ? <Loader2 className="animate-spin" size={28} /> : <CheckCircle2 size={28} />}
                    {submitting ? 'Processing...' : 'Confirm & Register Student →'}
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* ==== GROUP REGISTRATION FLOW ==== */}
          {activeTab === 'group' && !registrationDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl">
              
              {/* Step 1: Event Selection First */}
              <EventSelectionUI showOnlyTeam={true} />

              {/* Step 2: Assemble Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121212] border-4 border-[#333] p-6 md:p-8 mb-8"
                style={{ boxShadow: '8px 8px 0px #333' }}
              >
                <h3 className="font-anton text-2xl text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Users size={24} /> Assemble Team
                </h3>

                {/* Token Adder */}
                <div className="flex gap-4 mb-8 border-b-2 border-[#333] pb-8">
                  <input
                    type="text"
                    maxLength={6}
                    value={groupTokenInput}
                    onChange={(e) => setGroupTokenInput(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-[#050505] font-anton text-2xl text-white tracking-[0.5em] text-center border-4 border-[#333] p-3 outline-none focus:border-[#CCFF00] transition-colors"
                    placeholder="000000"
                  />
                  <button
                    onClick={handleVerifyGroupMember}
                    disabled={verifyingGroupMember || groupTokenInput.length !== 6}
                    className="bg-[#333] text-white font-space font-bold uppercase tracking-widest px-8 border-4 border-[#333] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {verifyingGroupMember ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                    ADD MEMBER
                  </button>
                </div>

                {/* Team Members List */}
                <div className="space-y-3">
                  {groupMembersList.map((m, index) => (
                    <div key={m._id} className="flex items-center justify-between bg-[#050505] border-2 border-[#222] p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-anton text-[#050505] ${index === 0 ? 'bg-[#CCFF00]' : 'bg-[#fff]'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-space font-bold text-white uppercase text-sm">{m.fullName}</p>
                          <p className="font-space text-[#888] uppercase text-xs tracking-wider">{m.branch} • {m.rollNo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {index === 0 && <span className="font-space text-xs font-bold bg-[#CCFF00] text-[#050505] px-2 py-1 uppercase tracking-widest">Team Leader</span>}
                        <button onClick={() => removeGroupMember(m._id)} className="text-red-500 hover:text-red-700 p-2 border-2 border-transparent hover:border-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {groupMembersList.length === 0 && (
                    <p className="font-space text-[#888] uppercase tracking-widest text-center py-4">No team members added yet. Type tokens above to add.</p>
                  )}
                </div>

              </motion.div>

              {/* Group Confirm Button */}
              <button
                onClick={handleConfirmGroup}
                disabled={submitting || selectedEvents.length === 0 || groupMembersList.length === 0}
                className="w-full font-anton text-2xl uppercase tracking-widest bg-[#CCFF00] text-[#050505] py-5 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ boxShadow: '8px 8px 0px #050505' }}
              >
                {submitting ? <Loader2 className="animate-spin" size={28} /> : <CheckCircle2 size={28} />}
                {submitting ? 'Processing...' : 'Confirm & Register Team →'}
              </button>
            </motion.div>
          )}

          {/* ==== REGISTRATION COMPLETE VIEW ==== */}
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
                  setGroupTokenInput('');
                  setGroupMembersList([]);
                  setSelectedEvents([]);
                  setRegistrationDone(false);
                }}
                className="font-anton text-xl uppercase bg-[#CCFF00] text-[#050505] px-8 py-4 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all"
              >
                Process Next Registration →
              </button>
            </motion.div>
          )}

          {/* ==== ALL STUDENTS TAB ==== */}
          {activeTab === 'students' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Search & Filter Bar */}
              <div className="bg-[#121212] border-4 border-[#333] p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between" style={{ boxShadow: '8px 8px 0px #333' }}>
                <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" size={18} />
                    <input
                      type="text"
                      placeholder="Search Name, Roll No..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#050505] border-2 border-[#333] py-3 pl-12 pr-4 text-white font-space uppercase text-sm focus:border-[#CCFF00] outline-none"
                    />
                  </div>
                  <button onClick={fetchStudents} className="bg-[#CCFF00] text-[#050505] font-anton px-6 border-2 border-transparent hover:bg-white transition-colors">
                    Search
                  </button>
                  <button 
                    onClick={handleResendFailed} 
                    disabled={resendingEmails}
                    className="bg-[#121212] border-4 border-[#CCFF00] text-[#CCFF00] font-anton px-6 py-2 uppercase hover:bg-[#CCFF00] hover:text-[#050505] transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {resendingEmails ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
                    Resend Failed
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-space font-bold uppercase text-[#888] text-xs">Branch:</span>
                  <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="bg-[#050505] text-white border-2 border-[#333] p-3 font-space uppercase text-sm outline-none focus:border-[#CCFF00]"
                  >
                    <option value="All">All Branches</option>
                    <option value="BTECH">B.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="MBA">MBA</option>
                    <option value="POLYTECHNIC">Polytechnic</option>
                  </select>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-[#121212] border-4 border-[#333] overflow-hidden relative" style={{ boxShadow: '8px 8px 0px #333' }}>
                {loadingStudents && (
                  <div className="absolute inset-0 bg-[#050505]/80 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-[#CCFF00]" size={48} />
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#050505] border-b-4 border-[#333]">
                        {['Name / Roll', 'Contact', 'Course', 'Token', 'Actions'].map(h => (
                          <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allStudents.map(s => (
                        <tr key={s._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="font-space font-bold text-white text-sm uppercase">{s.fullName}</div>
                            <div className="font-space text-[#aaa] text-xs uppercase tracking-wider">{s.rollNo}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-space text-[#aaa] text-xs flex items-center gap-2 mb-1"><Phone size={12}/> {s.mobileNo}</div>
                            <div className="font-space text-[#aaa] text-xs flex items-center gap-2"><Mail size={12}/> {s.email}</div>
                          </td>
                          <td className="p-4 font-space text-[#aaa] text-sm uppercase">
                            {s.course} • {s.branch} • Year {s.year}
                          </td>
                          <td className="p-4">
                            <span className="font-space font-bold text-[#CCFF00] text-sm tracking-[0.2em]">{s.token}</span>
                            <div className="mt-1">
                              {s.emailSent ? (
                                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 uppercase font-bold border border-green-500/20">Sent</span>
                              ) : (
                                <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 uppercase font-bold border border-red-500/20">Failed</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingStudent(s)}
                                className="font-space font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 border-[#888] text-[#888] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors flex items-center gap-1"
                              >
                                <Edit size={12} /> Edit
                              </button>
                              <button
                                onClick={() => handleResendToStudent(s._id)}
                                disabled={resendingEmails}
                                className="font-space font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 border-white/20 text-white/50 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors flex items-center gap-1 disabled:opacity-50"
                              >
                                <Mail size={12} /> Email
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {allStudents.length === 0 && !loadingStudents && (
                        <tr><td colSpan={5} className="p-12 text-center font-space text-[#888] uppercase tracking-widest">No students found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      <ConfirmModal
        {...confirmModal}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        loading={submitting || resendingEmails}
      />

      {/* ==== EDIT STUDENT MODAL ==== */}
      <AnimatePresence>
        {editingStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#121212] border-4 border-[#CCFF00] p-6 md:p-8 overflow-y-auto max-h-[90vh]"
              style={{ boxShadow: '12px 12px 0px #CCFF00' }}
            >
              <div className="flex justify-between items-center mb-6 border-b-2 border-[#333] pb-4">
                <h3 className="font-anton text-3xl text-[#CCFF00] uppercase tracking-wider">Edit Student</h3>
                <button onClick={() => setEditingStudent(null)} className="text-[#888] hover:text-white transition-colors">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleUpdateStudent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editingStudent.fullName}
                      onChange={(e) => setEditingStudent({...editingStudent, fullName: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Roll No</label>
                    <input
                      type="text"
                      value={editingStudent.rollNo}
                      onChange={(e) => setEditingStudent({...editingStudent, rollNo: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Mobile No</label>
                    <input
                      type="text"
                      value={editingStudent.mobileNo}
                      onChange={(e) => setEditingStudent({...editingStudent, mobileNo: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Email</label>
                    <input
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Course</label>
                    <input
                      type="text"
                      value={editingStudent.course}
                      onChange={(e) => setEditingStudent({...editingStudent, course: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Branch</label>
                    <input
                      type="text"
                      value={editingStudent.branch}
                      onChange={(e) => setEditingStudent({...editingStudent, branch: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Section</label>
                    <input
                      type="text"
                      value={editingStudent.section}
                      onChange={(e) => setEditingStudent({...editingStudent, section: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Year</label>
                    <input
                      type="text"
                      value={editingStudent.year}
                      onChange={(e) => setEditingStudent({...editingStudent, year: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#CCFF00]"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t-2 border-[#333]">
                  <button type="submit" className="flex-1 bg-[#CCFF00] text-[#050505] font-anton text-xl uppercase py-4 border-2 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditingStudent(null)} className="flex-1 bg-transparent text-[#888] font-anton text-xl uppercase py-4 border-2 border-[#888] hover:border-white hover:text-white transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layout } from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, Users, Calendar, Download, Plus, Trash2, Edit, Loader2, ShieldCheck,
  UserPlus, FileDown, LogOut, Ticket, Search, X, Mail
} from 'lucide-react';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../lib/auth';
import api from '../../lib/api';
import toast, { Toaster } from 'react-hot-toast';
import { ConfirmModal } from '../../components/ConfirmModal';


type Tab = 'overview' | 'students' | 'events' | 'registrations' | 'schedule' | 'users' | 'export';

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
  { key: 'students', label: 'Students', icon: <Users size={18} /> },
  { key: 'events', label: 'Events Catalog', icon: <Ticket size={18} /> },
  { key: 'registrations', label: 'Registrations', icon: <Calendar size={18} /> },
  { key: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
  { key: 'users', label: 'Admin Users', icon: <ShieldCheck size={18} /> },
  { key: 'export', label: 'Export', icon: <Download size={18} /> },
];

export function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>(
    (user?.role === 'superadmin' || user?.allowedTabs?.includes('overview')) ? 'overview' : (user?.allowedTabs?.[0] as Tab || 'students')
  );
  const [loading, setLoading] = useState(false);

  // Overview / Analytics
  const [stats, setStats] = useState<any>(null);
  
  // Students
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [editingStudent, setEditingStudent] = useState<any>(null);

  // Events
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventForm, setEventForm] = useState({ 
    category: '', 
    name: '', 
    amount: 0, 
    subEvents: '', 
    color: '#00FFFF',
    description: '',
    rulesText: '',
    coordinatorsText: ''
  });

  // Registrations
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [editingReg, setEditingReg] = useState<any>(null);
  const [resendingRegId, setResendingRegId] = useState<string | null>(null);

  // Enhancement 1: Events category filter
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('All');

  // Enhancement 2: Registrations admin filter
  const [regAdminFilter, setRegAdminFilter] = useState<string>('All');

  // Enhancement 3: Daily summary toggle
  const [showDailySummary, setShowDailySummary] = useState(false);

  // Enhancement 4: Export filters
  const [exportFilters, setExportFilters] = useState({
    category: 'All',
    subEvent: 'All',
    regType: 'All',
    eventName: 'All',
  });
  const [exportType, setExportType] = useState<'raw' | 'full' | 'event-wise'>('raw');
  
  // Schedule
  const [scheduleEntries, setScheduleEntries] = useState<any[]>([]);
  const [scheduleForm, setScheduleForm] = useState({ day: 'Day 1', date: '', time: '', eventName: '', category: '', venue: '', description: '', order: 0 });
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  
  // Users
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin', allowedTabs: ['students', 'registrations'] });

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
    if (activeTab === 'overview') fetchAnalytics();
    if (activeTab === 'students') fetchStudents();
    if (activeTab === 'events' || activeTab === 'registrations' || activeTab === 'export') fetchEventsList();
    if (activeTab === 'registrations' || activeTab === 'export') fetchRegistrations();
    if (activeTab === 'schedule') fetchSchedule();
    if (activeTab === 'users') fetchUsers();
  }, [activeTab]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/analytics');
      setStats(data.stats);
    } catch { toast.error('Failed to load analytics'); }
    setLoading(false);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/students', { params: { search: searchQuery, branch: branchFilter }});
      setStudents(data.students);
    } catch { toast.error('Failed to load students'); }
    setLoading(false);
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    try {
      await api.put(`/students/${editingStudent._id}`, editingStudent);
      toast.success('Student updated');
      setEditingStudent(null);
      fetchStudents();
    } catch { toast.error('Failed to update student'); }
  };

  const fetchEventsList = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/events');
      setEventsList(data.events);
    } catch { toast.error('Failed to load events'); }
    setLoading(false);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const subEventsArray = eventForm.subEvents ? eventForm.subEvents.split(',').map(s => s.trim()).filter(Boolean) : [];
      const rulesArray = eventForm.rulesText ? eventForm.rulesText.split('\n').map(s => s.trim()).filter(Boolean) : [];
      const coordinatorsArray = eventForm.coordinatorsText ? eventForm.coordinatorsText.split('\n').map(line => {
        const [name, phone] = line.split(':').map(s => s.trim());
        return name ? { name, phone: phone || '' } : null;
      }).filter(Boolean) : [];

      const payload = { 
        ...eventForm, 
        subEvents: subEventsArray,
        rules: rulesArray,
        coordinators: coordinatorsArray
      };

      if (editingEvent) {
        await api.put(`/events/${editingEvent}`, payload);
        toast.success('Event updated');
      } else {
        await api.post('/events', payload);
        toast.success('Event added');
      }
      setIsEventModalOpen(false);
      setEditingEvent(null);
      setEventForm({ 
        category: '', 
        name: '', 
        amount: 0, 
        subEvents: '', 
        color: '#00FFFF',
        description: '',
        rulesText: '',
        coordinatorsText: ''
      });
      fetchEventsList();
    } catch { toast.error('Failed to save event'); }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Deleted');
      fetchEventsList();
    } catch { toast.error('Failed to delete'); }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/event-registrations');
      setRegistrations(data.registrations);
    } catch { toast.error('Failed to load registrations'); }
    setLoading(false);
  };

  const handleUpdateReg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;
    try {
      await api.put(`/event-registrations/${editingReg._id}`, {
        studentName: editingReg.studentName,
        rollNo: editingReg.rollNo,
        totalAmount: editingReg.totalAmount,
        isGroup: editingReg.isGroup,
        events: editingReg.events,
        remark: editingReg.remark
      });
      toast.success('Registration updated');
      setEditingReg(null);
      fetchRegistrations();
    } catch { toast.error('Failed to update registration'); }
  };

  const handleDeleteReg = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Registration',
      message: 'ARE YOU SURE? THIS WILL PERMANENTLY DELETE THIS REGISTRATION! THIS ACTION CANNOT BE UNDONE.',
      confirmLabel: 'Delete Forever',
      confirmColor: '#FF0000',
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        setLoading(true);
        try {
          await api.delete(`/event-registrations/${id}`);
          toast.success('Registration deleted');
          setEditingReg(null);
          fetchRegistrations();
        } catch { 
          toast.error('Failed to delete registration'); 
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleResendRegEmail = async (id: string) => {
    setResendingRegId(id);
    try {
      const { data } = await api.post(`/event-registrations/${id}/resend`);
      if (data.success) {
        toast.success('Confirmation email resent successfully');
        fetchRegistrations();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to resend email');
    } finally {
      setResendingRegId(null);
    }
  };

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/schedule');
      setScheduleEntries(data.entries);
    } catch { toast.error('Failed to load schedule'); }
    setLoading(false);
  };

  const handleSaveSchedule = async () => {
    try {
      if (editingSchedule) {
        await api.put(`/schedule/${editingSchedule}`, scheduleForm);
        toast.success('Schedule updated');
      } else {
        await api.post('/schedule', scheduleForm);
        toast.success('Schedule entry added');
      }
      setEditingSchedule(null);
      setScheduleForm({ day: 'Day 1', date: '', time: '', eventName: '', category: '', venue: '', description: '', order: 0 });
      fetchSchedule();
    } catch { toast.error('Failed to save schedule entry'); }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm('Delete this schedule entry?')) return;
    try {
      await api.delete(`/schedule/${id}`);
      toast.success('Deleted');
      fetchSchedule();
    } catch { toast.error('Failed to delete'); }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users');
      setAdminUsers(data.users);
    } catch { toast.error('Failed to load users'); }
    setLoading(false);
  };

  const handleCreateAdmin = async () => {
    try {
      await api.post('/users', newAdmin);
      toast.success('Admin created');
      setNewAdmin({ name: '', email: '', password: '', role: 'admin', allowedTabs: ['students', 'registrations'] });
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create admin');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('Deleted');
      fetchUsers();
    } catch { toast.error('Failed to delete'); }
  };

  const handleExportEventWise = async (type: 'csv' | 'excel') => {
    try {
      const res = await api.get(`/export/event-participants`, {
        responseType: 'blob',
        params: { format: type },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `panache-event-participants.${type === 'csv' ? 'csv' : 'xlsx'}`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`Event-wise list downloaded!`);
    } catch {
      toast.error('Export failed');
    }
  };

  const handleExport = async (type: 'csv' | 'excel') => {
    try {
      const params: Record<string, string> = {
        noTotal: 'true',
      };
      if (exportFilters.category !== 'All') params.category = exportFilters.category;
      if (exportFilters.eventName !== 'All') params.eventName = exportFilters.eventName;
      if (exportFilters.subEvent !== 'All') params.subEvent = exportFilters.subEvent;
      if (exportFilters.regType !== 'All') params.regType = exportFilters.regType;

      const res = await api.get(`/export/${type}`, {
        responseType: 'blob',
        params,
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;

      const parts = [
        'panache',
        exportFilters.category !== 'All' ? exportFilters.category.toLowerCase() : null,
        exportFilters.eventName !== 'All' ? exportFilters.eventName.toLowerCase().replace(/\s+/g, '-') : null,
        exportFilters.subEvent !== 'All' ? exportFilters.subEvent.toLowerCase().replace(/\s+/g, '-') : null,
        exportFilters.regType !== 'All' ? exportFilters.regType : null,
      ].filter(Boolean);
      a.download = `${parts.join('-')}.${type === 'csv' ? 'csv' : 'xlsx'}`;

      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`${type.toUpperCase()} downloaded`);
    } catch { toast.error('Export failed'); }
  };

  const inputClass = "w-full bg-[#050505] font-space text-white text-sm border-2 border-[#333] p-3 outline-none focus:border-[#CCFF00] transition-colors";
  const labelClass = "block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2";

  // Enhancement 1: Filtered events list
  const filteredEventsList = eventCategoryFilter === 'All'
    ? eventsList
    : eventsList.filter(ev => ev.category?.toLowerCase() === eventCategoryFilter.toLowerCase());

  // Enhancement 2: Admin filter options + filtered registrations + payment summary
  const adminOptions = ['All', ...Array.from(
    new Set(registrations.map((r: any) => r.processedBy?.name).filter(Boolean))
  )];
  const filteredRegistrations = regAdminFilter === 'All'
    ? registrations
    : registrations.filter((r: any) => r.processedBy?.name === regAdminFilter);
  const adminPaymentSummary: Record<string, number> = registrations.reduce((acc: any, r: any) => {
    const name = r.processedBy?.name || 'Unknown';
    acc[name] = (acc[name] || 0) + (r.totalAmount || 0);
    return acc;
  }, {});

  // Enhancement 3: Daily summary
  const dailySummary: Record<string, { count: number; revenue: number }> = registrations.reduce((acc: any, r: any) => {
    const dateKey = r.processedAt
      ? new Date(r.processedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Unknown';
    if (!acc[dateKey]) acc[dateKey] = { count: 0, revenue: 0 };
    acc[dateKey].count += 1;
    acc[dateKey].revenue += r.totalAmount || 0;
    return acc;
  }, {});
  const sortedDailySummary = Object.entries(dailySummary).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });

  // Enhancement 4: Export sub-event + admin options
  const exportSubEventOptions = ['All', ...Array.from(new Set(
    eventsList
      .filter(ev => exportFilters.category === 'All' || ev.category?.toLowerCase() === exportFilters.category.toLowerCase())
      .flatMap((ev: any) => ev.subEvents || [])
      .filter(Boolean)
  ))];
  const exportAdminOptions = ['All', ...Array.from(
    new Set(registrations.map((r: any) => r.processedBy?.name).filter(Boolean))
  )];

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="pt-24 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-anton text-white uppercase tracking-tight">
                {user?.role === 'superadmin' ? 'SUPER ' : ''}<span className="text-[#FF00FF]">ADMIN</span>
              </h1>
              <p className="font-space text-[#888] text-xs uppercase tracking-widest mt-1">
                {user?.role === 'superadmin' ? 'Full System Control' : 'System Access Restricted'}
              </p>
            </div>
            <button onClick={logout} className="font-space font-bold text-xs uppercase tracking-widest border-2 border-[#333] text-[#888] px-4 py-2 hover:border-red-500 hover:text-red-500 transition-colors flex items-center gap-2">
              <LogOut size={14} /> Logout
            </button>
          </div>

          {/* Tab Bar */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#121212] border-2 border-[#333] p-2">
            {TABS.filter(t => user?.role === 'superadmin' || user?.allowedTabs?.includes(t.key)).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-space font-bold text-xs uppercase tracking-widest px-4 py-3 flex items-center gap-2 border-2 transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#CCFF00] text-[#050505] border-[#050505] shadow-[4px_4px_0px_#050505]'
                    : 'bg-transparent text-[#888] border-transparent hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#CCFF00]" size={48} />
            </div>
          )}

          {/* ==== OVERVIEW ==== */}
          {!loading && activeTab === 'overview' && stats && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Students" value={stats.totalStudents} color="#CCFF00" />
                <StatCard label="Total Registered" value={stats.processedStudents} color="#00FFFF" />
                {user?.role === 'superadmin' && <StatCard label="Total Revenue" value={`₹${stats.totalRevenue}`} color="#FF00FF" />}
              </div>
              {user?.role === 'superadmin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stats.categoryBreakdown && Object.keys(stats.categoryBreakdown).length > 0 && (
                    <div className="bg-[#121212] border-4 border-[#333] p-6" style={{ boxShadow: '8px 8px 0px #333' }}>
                      <h3 className="font-anton text-xl text-[#CCFF00] uppercase mb-6">Revenue by Category</h3>
                      <div className="space-y-4">
                        {Object.entries(stats.categoryBreakdown).map(([cat, amt]: [string, any]) => (
                          <div key={cat} className="flex items-center justify-between border-b border-[#333] pb-3">
                            <div className="flex items-center gap-3">
                              <span className="font-space font-bold text-white text-sm uppercase tracking-wider">{cat}</span>
                              <span className="font-space font-bold text-[10px] text-[#00FFFF] border border-[#00FFFF]/30 bg-[#00FFFF]/5 px-2 py-0.5 tracking-wider">
                                {stats.categoryCounts?.[cat] || 0} REGS
                              </span>
                            </div>
                            <span className="font-anton text-xl text-[#CCFF00]">₹{amt as string|number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {stats.branchBreakdown && Object.keys(stats.branchBreakdown).length > 0 && (
                    <div className="bg-[#121212] border-4 border-[#333] p-6" style={{ boxShadow: '8px 8px 0px #333' }}>
                      <h3 className="font-anton text-xl text-[#00FFFF] uppercase mb-6">Registrations by Branch</h3>
                      <div className="space-y-4">
                        {Object.entries(stats.branchBreakdown).map(([branch, count]: [string, any]) => (
                          <div key={branch} className="flex items-center justify-between border-b border-[#333] pb-3">
                            <span className="font-space font-bold text-white text-sm uppercase tracking-wider">{branch}</span>
                            <span className="font-anton text-xl text-[#00FFFF]">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==== STUDENTS ==== */}
          {!loading && activeTab === 'students' && (
            <div className="space-y-6">
              <div className="bg-[#121212] border-4 border-[#333] p-6 flex flex-col md:flex-row gap-4 justify-between" style={{ boxShadow: '8px 8px 0px #333' }}>
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

              <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#050505] border-b-4 border-[#333]">
                        {['Name', 'Roll No', 'Token', 'Course/Branch', 'Contact', 'Joined At', 'Actions'].map(h => (
                          <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s: any) => (
                        <tr key={s._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                          <td className="p-4 font-space font-bold text-white text-sm">{s.fullName}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{s.rollNo}</td>
                          <td className="p-4 font-space font-bold text-[#CCFF00] text-sm tracking-[0.2em]">{s.token}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">
                            <span className="text-white font-bold">{s.course}</span><br/>
                            {s.branch}
                          </td>
                          <td className="p-4 font-space text-[#aaa] text-xs">
                             <span className="text-white">{s.mobileNo}</span><br/>
                             {s.email}
                          </td>
                          <td className="p-4 font-space text-[#888] text-xs leading-tight">
                            {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '-'}<br/>
                            <span className="opacity-60">{s.createdAt ? new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setEditingStudent(s)}
                              className="font-space font-bold text-xs uppercase tracking-widest px-3 py-1 border-2 border-[#888] text-[#888] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors flex items-center gap-2"
                            >
                              <Edit size={12} /> Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr><td colSpan={9} className="p-12 text-center font-space text-[#888] uppercase tracking-widest">No students found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==== EVENTS CATALOG ==== */}
          {!loading && activeTab === 'events' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="font-anton text-3xl text-white uppercase">Events Catalog</h2>
                <button 
                  onClick={() => {
                    setEditingEvent(null);
                    setEventForm({ 
                      category: '', 
                      name: '', 
                      amount: 0, 
                      subEvents: '', 
                      color: '#00FFFF',
                      description: '',
                      rulesText: '',
                      coordinatorsText: ''
                    });
                    setIsEventModalOpen(true);
                  }}
                  className="bg-[#CCFF00] text-[#050505] font-anton px-6 py-3 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all flex items-center gap-2"
                >
                  <Plus size={20} /> Add New Event
                </button>
              </div>

              {/* Category Filter */}
              <div className="bg-[#121212] border-4 border-[#333] p-4 flex flex-wrap gap-2" style={{ boxShadow: '8px 8px 0px #333' }}>
                {['All', 'General', 'Technical', 'Cultural', 'Cyber'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setEventCategoryFilter(cat)}
                    className={`font-anton uppercase tracking-widest px-5 py-2 border-2 text-sm transition-all ${
                      eventCategoryFilter === cat
                        ? 'bg-[#CCFF00] text-[#050505] border-[#050505] shadow-[4px_4px_0px_#050505]'
                        : 'bg-transparent text-[#888] border-[#333] hover:border-[#CCFF00] hover:text-[#CCFF00]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <span className="ml-auto font-space text-xs text-[#888] uppercase tracking-widest self-center">
                  {filteredEventsList.length} event{filteredEventsList.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#050505] border-b-4 border-[#333]">
                        {['Category', 'Event Name', 'Amount', 'Description', 'Sub Events', 'Color', 'Actions'].map(h => (
                          <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEventsList.map((ev: any) => (
                        <tr key={ev._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                          <td className="p-4 font-space font-bold text-white text-sm uppercase">{ev.category}</td>
                          <td className="p-4 font-space font-bold text-white text-sm uppercase">{ev.name}</td>
                          <td className="p-4 font-anton text-[#CCFF00] text-lg">₹{ev.amount}</td>
                          <td className="p-4 font-space text-[#aaa] text-[10px] uppercase line-clamp-2 max-w-xs">{ev.description || '-'}</td>
                          <td className="p-4 font-space text-[#aaa] text-xs uppercase">{ev.subEvents?.join(', ') || '-'}</td>
                          <td className="p-4">
                            <div className="w-6 h-6 border-2 border-white" style={{ backgroundColor: ev.color }}></div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button onClick={() => { 
                                setEditingEvent(ev._id); 
                                setEventForm({
                                  ...ev, 
                                  subEvents: ev.subEvents?.join(', ') || '',
                                  rulesText: ev.rules?.join('\n') || '',
                                  coordinatorsText: ev.coordinators?.map((c: any) => `${c.name}:${c.phone}`).join('\n') || '',
                                  description: ev.description || ''
                                }); 
                                setIsEventModalOpen(true);
                              }} className="p-2 border border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#050505] transition-colors">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => handleDeleteEvent(ev._id)} className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                <Trash2 size={14} />
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

          {/* ==== REGISTRATIONS ==== */}
          {!loading && activeTab === 'registrations' && (
            <div className="space-y-4">

              {/* Daily Summary Toggle */}
              <div className="bg-[#121212] border-4 border-[#333]" style={{ boxShadow: '8px 8px 0px #333' }}>
                <button
                  onClick={() => setShowDailySummary(prev => !prev)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-anton text-xl text-[#CCFF00] uppercase tracking-widest">
                    Daily Registration Summary
                  </span>
                  <span className="font-space text-xs text-[#888] uppercase tracking-widest border-2 border-[#333] px-3 py-1">
                    {showDailySummary ? 'Hide ▲' : 'Show ▼'}
                  </span>
                </button>

                {showDailySummary && (
                  <div className="border-t-2 border-[#333] overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#050505]">
                          <th className="p-4 font-space font-bold text-xs text-[#888] uppercase tracking-widest">Date</th>
                          <th className="p-4 font-space font-bold text-xs text-[#888] uppercase tracking-widest">Registrations</th>
                          <th className="p-4 font-space font-bold text-xs text-[#888] uppercase tracking-widest">Revenue Collected</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedDailySummary.map(([date, data]) => (
                          <tr key={date} className="border-t border-[#222] hover:bg-white/5 transition-colors">
                            <td className="p-4 font-space font-bold text-white text-sm">{date}</td>
                            <td className="p-4 font-anton text-[#00FFFF] text-2xl">{data.count}</td>
                            <td className="p-4 font-anton text-[#CCFF00] text-2xl">₹{data.revenue}</td>
                          </tr>
                        ))}
                        {sortedDailySummary.length === 0 && (
                          <tr>
                            <td colSpan={3} className="p-8 text-center font-space text-[#888] uppercase tracking-widest">
                              No registrations yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Admin Filter + Summary Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filter Dropdown */}
                <div className="bg-[#121212] border-4 border-[#333] p-4 md:col-span-1" style={{ boxShadow: '8px 8px 0px #333' }}>
                  <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">
                    Filter by Admin
                  </label>
                  <select
                    value={regAdminFilter}
                    onChange={(e) => setRegAdminFilter(e.target.value)}
                    className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space uppercase text-sm outline-none focus:border-[#CCFF00]"
                  >
                    {adminOptions.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Per-Admin Payment Cards */}
                <div className="md:col-span-2 bg-[#121212] border-4 border-[#333] p-4" style={{ boxShadow: '8px 8px 0px #333' }}>
                  <p className="font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-3">Payment Collected Per Admin</p>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(adminPaymentSummary).map(([name, total]) => (
                      <div
                        key={name}
                        onClick={() => setRegAdminFilter(name === regAdminFilter ? 'All' : name)}
                        className={`cursor-pointer border-2 px-4 py-2 transition-all ${
                          regAdminFilter === name
                            ? 'border-[#CCFF00] bg-[#CCFF00]/10'
                            : 'border-[#333] hover:border-[#888]'
                        }`}
                      >
                        <p className="font-space font-bold text-white text-xs uppercase tracking-widest">{name}</p>
                        <p className="font-anton text-[#CCFF00] text-xl">₹{total as number}</p>
                      </div>
                    ))}
                    {Object.keys(adminPaymentSummary).length === 0 && (
                      <p className="font-space text-[#666] text-xs uppercase">No data yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Registrations Table */}
              <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#050505] border-b-4 border-[#333]">
                        {['S.No.', 'Token No.', 'Student/Team Leader', 'Roll No', 'Mobile No.', 'Branch', 'Type', 'Events', 'Total', 'Date', 'Actions'].map(h => (
                          <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((r: any, index: number) => (
                        <tr key={r._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                          <td className="p-4 font-space font-bold text-white text-sm">
                            {index + 1}
                          </td>
                          <td className="p-4 font-space text-[#CCFF00] text-sm font-bold uppercase tracking-wider">
                            {r.token || "-"}
                          </td>
                          <td className="p-4">
                            <div className="font-space font-bold text-white text-sm">{r.studentName}</div>
                            {r.isGroup && r.groupMembers && r.groupMembers.length > 0 && (
                              <div className="font-space text-[#aaa] text-xs mt-1">+{r.groupMembers.length} members</div>
                            )}
                          </td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{r.rollNo}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{r.mobileNo || "-"}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm uppercase">{r.branch || "-"}</td>
                          <td className="p-4">
                              {r.isGroup 
                                ? <span className="text-[#FF00FF] font-space text-xs font-bold border border-[#FF00FF] px-2 py-1 uppercase">Group</span>
                                : <span className="text-[#00FFFF] font-space text-xs font-bold border border-[#00FFFF] px-2 py-1 uppercase">Single</span>
                              }
                          </td>
                          <td className="p-4 font-space text-[#aaa] text-sm">
                            {r.events.map((e: any) => e.eventName).join(', ')}
                          </td>
                          <td className="p-4 font-anton text-[#CCFF00] text-lg">₹{r.totalAmount}</td>
                          {/* <td className="p-4 font-space text-[#aaa] text-sm">{r.processedBy?.name || 'N/A'}</td> */}
                          <td className="p-4 font-space text-[#888] text-xs leading-tight">
                            {new Date(r.processedAt).toLocaleDateString()}<br/>
                            <span className="opacity-60">{new Date(r.processedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                               <button
                                 onClick={() => setEditingReg(r)}
                                 className="font-space font-bold text-xs uppercase tracking-widest px-3 py-1 border-2 border-[#888] text-[#888] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors flex items-center gap-2"
                               >
                                 <Edit size={12} /> Edit
                               </button>
                               <button
                                  onClick={() => handleResendRegEmail(r._id)}
                                  disabled={resendingRegId === r._id}
                                  className="font-space font-bold text-xs uppercase tracking-widest px-3 py-1 border-2 border-[#888] text-[#888] hover:border-[#FF00FF] hover:text-[#FF00FF] transition-colors flex items-center gap-2 disabled:opacity-50"
                                  title="Resend Confirmation Email"
                                >
                                  {resendingRegId === r._id ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
                                  Resend
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

          {/* ==== SCHEDULE MANAGER ==== */}
          {!loading && activeTab === 'schedule' && (
            <div className="space-y-8">
              <div className="bg-[#121212] border-4 border-[#333] p-6" style={{ boxShadow: '8px 8px 0px #333' }}>
                <h3 className="font-anton text-xl text-[#CCFF00] uppercase mb-6">{editingSchedule ? 'Edit Entry' : 'Add Schedule Entry'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select value={scheduleForm.day} onChange={e => setScheduleForm({...scheduleForm, day: e.target.value})} className={inputClass}>
                    <option value="Day 1">Day 1</option>
                    <option value="Day 2">Day 2</option>
                    <option value="Day 3">Day 3</option>
                  </select>
                  <input placeholder="Date" value={scheduleForm.date} onChange={e => setScheduleForm({...scheduleForm, date: e.target.value})} className={inputClass} />
                  <input placeholder="Time" value={scheduleForm.time} onChange={e => setScheduleForm({...scheduleForm, time: e.target.value})} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input placeholder="Event Name" value={scheduleForm.eventName} onChange={e => setScheduleForm({...scheduleForm, eventName: e.target.value})} className={inputClass} />
                  <input placeholder="Category" value={scheduleForm.category} onChange={e => setScheduleForm({...scheduleForm, category: e.target.value})} className={inputClass} />
                  <input placeholder="Venue" value={scheduleForm.venue} onChange={e => setScheduleForm({...scheduleForm, venue: e.target.value})} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <input placeholder="Description" value={scheduleForm.description} onChange={e => setScheduleForm({...scheduleForm, description: e.target.value})} className={inputClass} />
                  </div>
                  <input type="number" placeholder="Order" value={scheduleForm.order} onChange={e => setScheduleForm({...scheduleForm, order: Number(e.target.value)})} className={inputClass} />
                </div>
                <div className="flex gap-4">
                  <button onClick={handleSaveSchedule} className="bg-[#CCFF00] text-[#050505] font-space font-bold text-sm uppercase px-6 py-3 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all flex items-center gap-2">
                    <Plus size={16} /> {editingSchedule ? 'Update' : 'Add Entry'}
                  </button>
                  {editingSchedule && (
                    <button onClick={() => { setEditingSchedule(null); setScheduleForm({ day: 'Day 1', date: '', time: '', eventName: '', category: '', venue: '', description: '', order: 0 }); }} className="font-space font-bold text-sm uppercase px-6 py-3 border-2 border-[#888] text-[#888] hover:text-white hover:border-white transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#050505] border-b-4 border-[#333]">
                        {['Day', 'Time', 'Event', 'Category', 'Venue', 'Actions'].map(h => (
                          <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleEntries.map((entry: any) => (
                        <tr key={entry._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                          <td className="p-4 font-space font-bold text-white text-sm">{entry.day}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{entry.time}</td>
                          <td className="p-4 font-space font-bold text-white text-sm">{entry.eventName}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{entry.category}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{entry.venue}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button onClick={() => { setEditingSchedule(entry._id); setScheduleForm(entry); }} className="p-2 border border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#050505] transition-colors">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => handleDeleteSchedule(entry._id)} className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                <Trash2 size={14} />
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

          {/* ==== ADMIN USERS ==== */}
          {!loading && activeTab === 'users' && (
            <div className="space-y-8">
              <div className="bg-[#121212] border-4 border-[#333] p-6" style={{ boxShadow: '8px 8px 0px #333' }}>
                <h3 className="font-anton text-xl text-[#CCFF00] uppercase mb-6">Create Admin User</h3>
                
                {/* Hidden fields to trick browser auto-fill */}
                <input type="text" style={{ display: 'none' }} aria-hidden="true" />
                <input type="password" style={{ display: 'none' }} aria-hidden="true" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <input 
                    placeholder="Name" 
                    value={newAdmin.name} 
                    onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} 
                    className={inputClass} 
                    autoComplete="off"
                  />
                  <input 
                    placeholder="Email" 
                    type="email" 
                    value={newAdmin.email} 
                    onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} 
                    className={inputClass} 
                    autoComplete="new-email"
                  />
                  <PasswordInput 
                    placeholder="Password" 
                    value={newAdmin.password} 
                    onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} 
                    className={inputClass} 
                    autoComplete="new-password"
                  />
                  <select 
                    value={newAdmin.role} 
                    onChange={e => setNewAdmin({...newAdmin, role: e.target.value as any})} 
                    className={inputClass}
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>

                {newAdmin.role === 'admin' && (
                  <div className="mb-6">
                    <label className={labelClass}>Tab Access Permissions</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {TABS.map(tab => (
                        <label key={tab.key} className={`flex items-center gap-2 p-2 border-2 cursor-pointer transition-all ${newAdmin.allowedTabs.includes(tab.key) ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]' : 'border-[#222] text-[#888]'}`}>
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={newAdmin.allowedTabs.includes(tab.key)}
                            onChange={() => {
                              const current = newAdmin.allowedTabs;
                              const updated = current.includes(tab.key) 
                                ? current.filter(t => t !== tab.key)
                                : [...current, tab.key];
                              setNewAdmin({...newAdmin, allowedTabs: updated});
                            }}
                          />
                          <div className={`w-4 h-4 border flex items-center justify-center ${newAdmin.allowedTabs.includes(tab.key) ? 'bg-[#CCFF00] border-[#CCFF00]' : 'border-[#444]'}`}>
                            {newAdmin.allowedTabs.includes(tab.key) && <X size={10} className="text-black" />}
                          </div>
                          <span className="font-space text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={handleCreateAdmin} className="bg-[#CCFF00] text-[#050505] font-space font-bold text-sm uppercase px-6 py-3 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all flex items-center gap-2">
                  <UserPlus size={16} /> Create Admin
                </button>
              </div>

              <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#050505] border-b-4 border-[#333]">
                        {['Name', 'Email', 'Role', 'Created', 'Actions'].map(h => (
                          <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((u: any) => (
                        <tr key={u._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                          <td className="p-4 font-space font-bold text-white text-sm">{u.name}</td>
                          <td className="p-4 font-space text-[#aaa] text-sm">{u.email}</td>
                          <td className="p-4">
                            <span className={`font-space font-bold text-xs uppercase px-3 py-1 border-2 ${u.role === 'superadmin' ? 'border-[#FF00FF] text-[#FF00FF]' : 'border-[#00FFFF] text-[#00FFFF]'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 font-space text-[#888] text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                             <button onClick={() => handleDeleteUser(u._id)} className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                <Trash2 size={14} />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==== EXPORT ==== */}
          {!loading && activeTab === 'export' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="font-anton text-4xl text-white uppercase tracking-tight">Export <span className="text-[#CCFF00]">Center</span></h2>
                <div className="flex bg-[#121212] border-2 border-[#333] p-1">
                  {(['raw', 'full', 'event-wise'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setExportType(type)}
                      className={`font-space font-bold text-[10px] uppercase tracking-widest px-4 py-2 transition-all ${
                        exportType === type
                          ? 'bg-[#CCFF00] text-[#050505]'
                          : 'text-[#888] hover:text-white'
                      }`}
                    >
                      {type === 'raw' ? 'Custom Filtered' : type === 'full' ? 'Full Report' : 'Event-Wise'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#121212] border-4 border-[#333] p-8 relative overflow-hidden" style={{ boxShadow: '12px 12px 0px #333' }}>
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-bl-full -mr-16 -mt-16 blur-2xl" />
                
                <div className="relative z-10 space-y-8">
                  {/* Report Description */}
                  <div className="border-l-4 border-[#CCFF00] pl-6 py-2">
                    <h3 className="font-anton text-2xl text-white uppercase mb-2">
                      {exportType === 'raw' && "Custom Filtered Data"}
                      {exportType === 'full' && "Full Registration Report"}
                      {exportType === 'event-wise' && "Event-wise Participant List"}
                    </h3>
                    <p className="font-space text-sm text-[#888] max-w-2xl leading-relaxed">
                      {exportType === 'raw' && "Export raw registration data with custom filters. Best for specific analysis or importing into other tools."}
                      {exportType === 'full' && "A comprehensive 5-sheet Excel workbook containing Summary, Category-wise, Event-wise (with Token IDs), Student Details, and Group Registrations. (Excel Only)"}
                      {exportType === 'event-wise' && "A grouped list of all registered participants (including group members and token IDs), sorted by category and event. Perfect for on-ground event management."}
                    </p>
                  </div>

                  {/* Filters (Only for Raw Data) */}
                  {exportType === 'raw' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-[#050505] border-2 border-[#333]">
                      <div>
                        <label className="block font-space font-bold text-[10px] text-[#555] uppercase tracking-[0.2em] mb-3">Event Category</label>
                        <select
                          value={exportFilters.category}
                          onChange={(e) => setExportFilters({ ...exportFilters, category: e.target.value, subEvent: 'All' })}
                          className="w-full bg-[#121212] text-white border border-[#333] p-3 font-space uppercase text-xs outline-none focus:border-[#CCFF00] transition-colors"
                        >
                          {['All', 'General', 'Technical', 'Cultural', 'Cyber'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-space font-bold text-[10px] text-[#555] uppercase tracking-[0.2em] mb-3">Sub Event</label>
                        <select
                          value={exportFilters.subEvent}
                          onChange={(e) => setExportFilters({ ...exportFilters, subEvent: e.target.value })}
                          className="w-full bg-[#121212] text-white border border-[#333] p-3 font-space uppercase text-xs outline-none focus:border-[#CCFF00] transition-colors"
                          disabled={exportSubEventOptions.length <= 1}
                        >
                          {exportSubEventOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-space font-bold text-[10px] text-[#555] uppercase tracking-[0.2em] mb-3">Reg Type</label>
                        <select
                          value={exportFilters.regType}
                          onChange={(e) => setExportFilters({ ...exportFilters, regType: e.target.value })}
                          className="w-full bg-[#121212] text-white border border-[#333] p-3 font-space uppercase text-xs outline-none focus:border-[#CCFF00] transition-colors"
                        >
                          <option value="All">All Types</option>
                          <option value="single">Single</option>
                          <option value="group">Group</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-space font-bold text-[10px] text-[#555] uppercase tracking-[0.2em] mb-3">Event Name</label>
                        <select
                          value={exportFilters.eventName}
                          onChange={(e) => setExportFilters({ ...exportFilters, eventName: e.target.value })}
                          className="w-full bg-[#121212] text-white border border-[#333] p-3 font-space uppercase text-xs outline-none focus:border-[#CCFF00] transition-colors"
                        >
                          <option value="All">All Events</option>
                          {eventsList
                            .filter(ev => exportFilters.category === 'All' || ev.category?.toLowerCase() === exportFilters.category.toLowerCase())
                            .map(ev => (
                              <option key={ev._id} value={ev.name}>{ev.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        if (exportType === 'full') {
                          try {
                            const loadId = toast.loading('Generating full report with participant tokens...');
                            const res = await api.get('/export/full-report', { responseType: 'blob', params: { format: 'excel' } });
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `Panache-Full-Report-${new Date().toISOString().split('T')[0]}.xlsx`;
                            a.click();
                            toast.dismiss(loadId);
                            toast.success('✅ Full report downloaded! (Includes Token IDs)');
                          } catch { toast.dismiss(); toast.error('Export failed'); }
                        } else if (exportType === 'event-wise') {
                          handleExportEventWise('excel');
                        } else {
                          handleExport('excel');
                        }
                      }}
                      className="flex-1 bg-[#CCFF00] text-[#050505] font-anton text-xl uppercase py-5 border-4 border-[#050505] shadow-[6px_6px_0px_#050505] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3"
                    >
                      <FileDown size={24} /> Download Excel
                    </motion.button>
                    
                    {exportType !== 'full' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => exportType === 'event-wise' ? handleExportEventWise('csv') : handleExport('csv')}
                        className="flex-1 bg-transparent text-[#CCFF00] font-anton text-xl uppercase py-5 border-4 border-[#CCFF00] shadow-[6px_6px_0px_#CCFF00] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3"
                      >
                        <FileDown size={24} /> Download CSV
                      </motion.button>
                    )}
                  </div>

                  {exportType === 'raw' && !Object.values(exportFilters).every(v => v === 'All') && (
                    <div className="flex flex-wrap gap-2 animate-in slide-in-from-bottom-2 duration-300">
                      <span className="font-space text-[10px] text-[#555] uppercase tracking-widest self-center">Active Filters:</span>
                      {Object.entries(exportFilters).map(([key, val]) =>
                        val !== 'All' ? (
                          <span key={key} className="font-space text-[10px] font-bold uppercase bg-[#CCFF00]/5 border border-[#CCFF00]/30 text-[#CCFF00] px-3 py-1 tracking-widest flex items-center gap-2">
                            {key}: {val}
                            <button onClick={() => setExportFilters({ ...exportFilters, [key]: 'All' })} className="hover:text-white transition-colors">×</button>
                          </span>
                        ) : null
                      )}
                    </div>
                  )}

                  <p className="font-space text-[9px] text-[#444] uppercase tracking-[0.3em] text-center pt-4 border-t border-[#333]/30">
                    System Generation Timestamp: {new Date().toLocaleString('en-IN')} • Secure Export Portal
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* EDIT STUDENT MODAL (Portal) */}
      {createPortal(
        <AnimatePresence>
          {editingStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#121212] border-4 border-[#CCFF00] p-6 md:p-8 overflow-y-auto max-h-[90vh]"
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
        </AnimatePresence>,
        document.body
      )}

      {/* EDIT REGISTRATION MODAL (Portal) */}
      {createPortal(
        <AnimatePresence>
        {editingReg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#121212] border-4 border-[#FF00FF] p-6 md:p-8 overflow-y-auto max-h-[90vh]"
              style={{ boxShadow: '12px 12px 0px #FF00FF' }}
            >
              <div className="flex justify-between items-center mb-6 border-b-2 border-[#333] pb-4">
                <h3 className="font-anton text-3xl text-[#FF00FF] uppercase tracking-wider">Edit Registration</h3>
                <button onClick={() => setEditingReg(null)} className="text-[#888] hover:text-white transition-colors">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleUpdateReg} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Student Name</label>
                    <input
                      type="text"
                      value={editingReg.studentName}
                      onChange={(e) => setEditingReg({...editingReg, studentName: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#FF00FF]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Roll No</label>
                    <input
                      type="text"
                      value={editingReg.rollNo}
                      onChange={(e) => setEditingReg({...editingReg, rollNo: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#FF00FF]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Total Amount (₹)</label>
                    <input
                      type="number"
                      value={editingReg.totalAmount}
                      onChange={(e) => setEditingReg({...editingReg, totalAmount: Number(e.target.value)})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#FF00FF]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Registration Type</label>
                    <select
                      value={editingReg.isGroup ? 'true' : 'false'}
                      onChange={(e) => setEditingReg({...editingReg, isGroup: e.target.value === 'true'})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#FF00FF]"
                      required
                    >
                      <option value="false">SINGLE</option>
                      <option value="true">GROUP</option>
                    </select>
                  </div>
                </div>

                {/* EVENTS LIST IN REGISTRATION MODAL */}
                <div className="mt-6">
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-3">Registered Events</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto bg-[#050505] p-4 border-2 border-[#333]">
                        {eventsList.map(event => {
                            const isSelected = editingReg.events.some((e: any) => e.eventName === event.name);
                            return (
                                <label key={event._id} className={`flex items-center gap-3 p-2 border-2 transition-all cursor-pointer ${isSelected ? 'border-[#CCFF00] bg-[#CCFF00]/5' : 'border-[#222] opacity-60'}`}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {
                                            let newEvents;
                                            if (isSelected) {
                                                newEvents = editingReg.events.filter((e: any) => e.eventName !== event.name);
                                            } else {
                                                newEvents = [...editingReg.events, { eventName: event.name, amount: event.amount, category: event.category }];
                                            }
                                            // Auto recalculate amount
                                            const newTotal = newEvents.reduce((sum: number, ev: any) => sum + (ev.amount || 0), 0);
                                            setEditingReg({...editingReg, events: newEvents, totalAmount: newTotal});
                                        }}
                                        className="hidden"
                                    />
                                    <div className={`w-4 h-4 border-2 flex items-center justify-center ${isSelected ? 'border-[#CCFF00] bg-[#CCFF00]' : 'border-[#444]'}`}>
                                        {isSelected && <X size={10} className="text-[#050505]" />}
                                    </div>
                                    <span className="font-space text-xs font-bold uppercase tracking-wider text-white truncate">{event.name}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* REMARK FIELD */}
                <div className="mt-6">
                    <label className="block font-space font-bold text-xs text-[#888] uppercase tracking-widest mb-2">Remark (Reason for change)</label>
                    <textarea 
                      placeholder="Enter reason for updating this registration..."
                      value={editingReg.remark || ''}
                      onChange={(e) => setEditingReg({...editingReg, remark: e.target.value})}
                      className="w-full bg-[#050505] text-white border-2 border-[#333] p-3 font-space text-sm focus:outline-none focus:border-[#FF00FF] h-20 resize-none"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t-2 border-[#333]">
                  <button type="submit" className="flex-[2] bg-[#FF00FF] text-white font-anton text-xl uppercase py-4 border-2 border-white hover:bg-[#CCFF00] hover:text-black transition-all">
                    Update Registration
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDeleteReg(editingReg._id)}
                    className="flex-1 bg-red-600 text-white font-anton text-xl uppercase py-4 border-2 border-red-800 hover:bg-red-500 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={20} /> Delete
                  </button>
                  <button type="button" onClick={() => setEditingReg(null)} className="flex-1 bg-transparent text-[#888] font-anton text-xl uppercase py-4 border-2 border-[#888] hover:border-white hover:text-white transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}

      {/* EDIT EVENT MODAL (Portal) */}
      {createPortal(
        <AnimatePresence>
        {isEventModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#121212] border-4 border-[#CCFF00] p-6 md:p-8 overflow-y-auto max-h-[90vh]"
              style={{ boxShadow: '12px 12px 0px #CCFF00' }}
            >
              <div className="flex justify-between items-center mb-6 border-b-2 border-[#333] pb-4">
                <h3 className="font-anton text-3xl text-[#CCFF00] uppercase tracking-wider">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                <button onClick={() => setIsEventModalOpen(false)} className="text-[#888] hover:text-white transition-colors">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Event Name</label>
                    <input placeholder="E.G. CODING COMPETITION" value={eventForm.name} onChange={e => setEventForm({...eventForm, name: e.target.value})} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <input placeholder="E.G. TECHNICAL" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Amount (₹)</label>
                    <input type="number" placeholder="0" value={eventForm.amount || ''} onChange={e => setEventForm({...eventForm, amount: Number(e.target.value)})} className={inputClass} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Sub Events (comma separated)</label>
                    <input placeholder="Round 1, Final Round..." value={eventForm.subEvents} onChange={e => setEventForm({...eventForm, subEvents: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Event Color</label>
                    <div className="flex gap-2 items-center bg-[#050505] border-2 border-[#333] p-3">
                        <input type="color" value={eventForm.color} onChange={e => setEventForm({...eventForm, color: e.target.value})} className="w-full h-8 border-0 bg-transparent cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div>
                    <label className={labelClass}>Description</label>
                    <textarea placeholder="Tell us about the event..." value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className={inputClass + " h-24 resize-none"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Rules (One per line)</label>
                        <textarea placeholder="1. Respect everyone&#10;2. No cheating" value={eventForm.rulesText} onChange={e => setEventForm({...eventForm, rulesText: e.target.value})} className={inputClass + " h-32 resize-none"} />
                    </div>
                    <div>
                        <label className={labelClass}>Coordinators (Format: Name:Phone)</label>
                        <textarea placeholder="John Doe:9876543210&#10;Jane Smith:1234567890" value={eventForm.coordinatorsText} onChange={e => setEventForm({...eventForm, coordinatorsText: e.target.value})} className={inputClass + " h-32 resize-none"} />
                    </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t-2 border-[#333]">
                  <button type="submit" className="flex-1 bg-[#CCFF00] text-[#050505] font-anton text-xl uppercase py-4 border-2 border-[#050505] hover:bg-[#FF00FF] hover:text-white transition-all">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                  <button type="button" onClick={() => setIsEventModalOpen(false)} className="flex-1 bg-transparent text-[#888] font-anton text-xl uppercase py-4 border-2 border-[#888] hover:border-white hover:text-white transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}

      {/* MODALS */}
      <ConfirmModal
        {...confirmModal}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        loading={loading}
      />
    </Layout>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-[#121212] p-6 border-4 transition-all hover:translate-y-[-4px]" style={{ borderColor: color, boxShadow: `8px 8px 0px ${color}` }}>
      <div className="font-space font-bold text-xs uppercase tracking-widest mb-3" style={{ color: '#888' }}>{label}</div>
      <div className="font-anton text-5xl" style={{ color }}>{value}</div>
    </div>
  );
}

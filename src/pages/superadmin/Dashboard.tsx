import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { motion } from 'framer-motion';
import {
  BarChart3, Users, Calendar, Download, Plus, Trash2, Edit, Loader2, ShieldCheck,
  DollarSign, UserPlus, FileDown, RefreshCw, LogOut, Eye, EyeOff
} from 'lucide-react';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../lib/auth';
import api from '../../lib/api';
import toast, { Toaster } from 'react-hot-toast';

type Tab = 'overview' | 'students' | 'registrations' | 'schedule' | 'users' | 'export';

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
  { key: 'students', label: 'Students', icon: <Users size={18} /> },
  { key: 'registrations', label: 'Registrations', icon: <Calendar size={18} /> },
  { key: 'schedule', label: 'Schedule', icon: <Calendar size={18} /> },
  { key: 'users', label: 'Admin Users', icon: <ShieldCheck size={18} /> },
  { key: 'export', label: 'Export', icon: <Download size={18} /> },
];

export function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(false);

  // Overview / Analytics
  const [stats, setStats] = useState<any>(null);
  // Students
  const [students, setStudents] = useState<any[]>([]);
  // Registrations
  const [registrations, setRegistrations] = useState<any[]>([]);
  // Schedule
  const [scheduleEntries, setScheduleEntries] = useState<any[]>([]);
  const [scheduleForm, setScheduleForm] = useState({ day: 'Day 1', date: '', time: '', eventName: '', category: '', venue: '', description: '', order: 0 });
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  // Users
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin' });

  useEffect(() => {
    if (activeTab === 'overview') fetchAnalytics();
    if (activeTab === 'students') fetchStudents();
    if (activeTab === 'registrations') fetchRegistrations();
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
      const { data } = await api.get('/students');
      setStudents(data.students);
    } catch { toast.error('Failed to load students'); }
    setLoading(false);
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/event-registrations');
      setRegistrations(data.registrations);
    } catch { toast.error('Failed to load registrations'); }
    setLoading(false);
  };

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/schedule');
      setScheduleEntries(data.entries);
    } catch { toast.error('Failed to load schedule'); }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users');
      setAdminUsers(data.users);
    } catch { toast.error('Failed to load users'); }
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

  const handleCreateAdmin = async () => {
    try {
      await api.post('/users', newAdmin);
      toast.success('Admin created');
      setNewAdmin({ name: '', email: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed to create admin'); }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this admin user?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('Deleted');
      fetchUsers();
    } catch { toast.error('Failed to delete'); }
  };

  const handleExport = async (type: 'csv' | 'excel') => {
    try {
      const res = await api.get(`/export/${type}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'csv' ? 'panache-2k26-registrations.csv' : 'panache-2k26-registrations.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(`${type.toUpperCase()} downloaded`);
    } catch { toast.error('Export failed'); }
  };

  const inputClass = "w-full bg-[#050505] font-space text-white text-sm border-2 border-[#333] p-3 outline-none focus:border-[#CCFF00] transition-colors";

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="pt-24 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 md:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-anton text-white uppercase tracking-tight">
                SUPER <span className="text-[#FF00FF]">ADMIN</span>
              </h1>
              <p className="font-space text-[#888] text-xs uppercase tracking-widest mt-1">Full System Control</p>
            </div>
            <button onClick={logout} className="font-space font-bold text-xs uppercase tracking-widest border-2 border-[#333] text-[#888] px-4 py-2 hover:border-red-500 hover:text-red-500 transition-colors flex items-center gap-2">
              <LogOut size={14} /> Logout
            </button>
          </div>

          {/* Tab Bar */}
          <div className="flex flex-wrap gap-2 mb-8 bg-[#121212] border-2 border-[#333] p-2">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-space font-bold text-xs uppercase tracking-widest px-4 py-3 flex items-center gap-2 border-2 transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#CCFF00] text-[#050505] border-[#050505]'
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
                <StatCard label="Processed" value={stats.processedStudents} color="#00FFFF" />
                <StatCard label="Total Revenue" value={`₹${stats.totalRevenue}`} color="#FF00FF" />
              </div>
              {stats.categoryBreakdown && Object.keys(stats.categoryBreakdown).length > 0 && (
                <div className="bg-[#121212] border-4 border-[#333] p-6" style={{ boxShadow: '8px 8px 0px #333' }}>
                  <h3 className="font-anton text-xl text-[#CCFF00] uppercase mb-6">Revenue by Category</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.categoryBreakdown).map(([cat, amt]: [string, any]) => (
                      <div key={cat} className="flex items-center justify-between border-b border-[#333] pb-3">
                        <span className="font-space font-bold text-white text-sm uppercase tracking-wider">{cat}</span>
                        <span className="font-anton text-xl text-[#CCFF00]">₹{amt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==== STUDENTS ==== */}
          {!loading && activeTab === 'students' && (
            <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#050505] border-b-4 border-[#333]">
                      {['Name', 'Roll No', 'Course', 'Branch', 'Year', 'Mobile', 'Email', 'Status'].map(h => (
                        <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s: any) => (
                      <tr key={s._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                        <td className="p-4 font-space font-bold text-white text-sm">{s.fullName}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{s.rollNo}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{s.course}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{s.branch}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{s.year}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{s.mobileNo}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{s.email}</td>
                        <td className="p-4">
                          <span className={`font-space font-bold text-xs uppercase px-3 py-1 border-2 ${s.status === 'processed' ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-[#888] text-[#888]'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr><td colSpan={8} className="p-12 text-center font-space text-[#888] uppercase tracking-widest">No students registered yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==== REGISTRATIONS ==== */}
          {!loading && activeTab === 'registrations' && (
            <div className="bg-[#121212] border-4 border-[#333] overflow-hidden" style={{ boxShadow: '8px 8px 0px #333' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#050505] border-b-4 border-[#333]">
                      {['Student', 'Roll No', 'Events', 'Total', 'Processed By', 'Date'].map(h => (
                        <th key={h} className="p-4 font-space font-bold text-xs text-[#CCFF00] uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r: any) => (
                      <tr key={r._id} className="border-b border-[#222] hover:bg-white/5 transition-colors">
                        <td className="p-4 font-space font-bold text-white text-sm">{r.studentName}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{r.rollNo}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">
                          {r.events.map((e: any) => e.eventName).join(', ')}
                        </td>
                        <td className="p-4 font-anton text-[#CCFF00] text-lg">₹{r.totalAmount}</td>
                        <td className="p-4 font-space text-[#aaa] text-sm">{r.processedBy?.name || 'N/A'}</td>
                        <td className="p-4 font-space text-[#888] text-sm">{new Date(r.processedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {registrations.length === 0 && (
                      <tr><td colSpan={6} className="p-12 text-center font-space text-[#888] uppercase tracking-widest">No event registrations yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==== SCHEDULE MANAGER ==== */}
          {!loading && activeTab === 'schedule' && (
            <div className="space-y-8">
              {/* Add / Edit Form */}
              <div className="bg-[#121212] border-4 border-[#333] p-6" style={{ boxShadow: '8px 8px 0px #333' }}>
                <h3 className="font-anton text-xl text-[#CCFF00] uppercase mb-6">{editingSchedule ? 'Edit Entry' : 'Add Schedule Entry'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <select value={scheduleForm.day} onChange={e => setScheduleForm({...scheduleForm, day: e.target.value})} className={inputClass}>
                    <option value="Day 1">Day 1</option>
                    <option value="Day 2">Day 2</option>
                    <option value="Day 3">Day 3</option>
                  </select>
                  <input placeholder="Date (e.g. Oct 15, 2026)" value={scheduleForm.date} onChange={e => setScheduleForm({...scheduleForm, date: e.target.value})} className={inputClass} />
                  <input placeholder="Time (e.g. 10:00 AM)" value={scheduleForm.time} onChange={e => setScheduleForm({...scheduleForm, time: e.target.value})} className={inputClass} />
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

              {/* Existing Entries */}
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
                      {scheduleEntries.length === 0 && (
                        <tr><td colSpan={6} className="p-12 text-center font-space text-[#888] uppercase tracking-widest">No schedule entries yet</td></tr>
                      )}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <input placeholder="Name" value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} className={inputClass} />
                  <input placeholder="Email" type="email" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} className={inputClass} />
                  <PasswordInput 
                    placeholder="Password" 
                    value={newAdmin.password} 
                    onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} 
                    className={inputClass} 
                  />
                  <select value={newAdmin.role} onChange={e => setNewAdmin({...newAdmin, role: e.target.value})} className={inputClass}>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
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
                          <td className="p-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121212] border-4 border-[#CCFF00] p-8 text-center cursor-pointer hover:translate-y-[-4px] transition-all"
                style={{ boxShadow: '8px 8px 0px #CCFF00' }}
                onClick={() => handleExport('csv')}
              >
                <FileDown size={48} className="text-[#CCFF00] mx-auto mb-4" />
                <h3 className="font-anton text-2xl text-[#CCFF00] uppercase mb-2">Export CSV</h3>
                <p className="font-space text-[#888] text-sm uppercase tracking-wider">Download all registrations as CSV file</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#121212] border-4 border-[#00FFFF] p-8 text-center cursor-pointer hover:translate-y-[-4px] transition-all"
                style={{ boxShadow: '8px 8px 0px #00FFFF' }}
                onClick={() => handleExport('excel')}
              >
                <FileDown size={48} className="text-[#00FFFF] mx-auto mb-4" />
                <h3 className="font-anton text-2xl text-[#00FFFF] uppercase mb-2">Export Excel</h3>
                <p className="font-space text-[#888] text-sm uppercase tracking-wider">Download formatted Excel spreadsheet</p>
              </motion.div>
            </div>
          )}

        </div>
      </div>
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

import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Loader2, CheckCircle2, Copy, Check } from 'lucide-react';
import api from '../lib/api';
import toast, { Toaster } from 'react-hot-toast';

export function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNo: '',
    course: '',
    branch: '',
    section: '',
    year: '',
    mobileNo: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!/^[6-9]\d{9}$/.test(formData.mobileNo)) {
      toast.error('Invalid mobile number', {
        style: { background: '#FF00FF', color: '#050505', borderRadius: '0', border: '4px solid #050505' }
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/students/register', formData);
      if (data.success) {
        setToken(data.token);
        setSuccess(true);
        toast.success('Registration successful!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    toast.success('Token copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <Layout>
        <Toaster position="top-right" />
        <div className="pt-24 pb-32 min-h-screen bg-[#050505] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#121212] border-4 border-[#CCFF00] p-8 md:p-12 max-w-lg w-full text-center"
            style={{ boxShadow: '16px 16px 0px #CCFF00' }}
          >
            <div className="bg-[#CCFF00] w-20 h-20 flex items-center justify-center mx-auto mb-8 border-4 border-[#050505]">
              <CheckCircle2 size={48} color="#050505" />
            </div>
            <h1 className="font-anton text-4xl text-[#CCFF00] mb-2 uppercase tracking-wider">Registration Complete!</h1>
            <p className="font-space text-[#aaa] mb-8 uppercase text-sm font-bold">Save this token — you'll need it at the venue</p>

            <div className="bg-[#050505] border-4 border-[#CCFF00] p-8 mb-8" style={{ boxShadow: '8px 8px 0px #CCFF00' }}>
              <p className="font-space text-[#aaa] text-xs uppercase tracking-widest mb-2">Your Token</p>
              <div className="font-anton text-6xl text-[#CCFF00] tracking-[0.3em] mb-4">{token}</div>
              <button
                onClick={copyToken}
                className="bg-[#CCFF00] text-[#050505] font-space font-bold uppercase text-sm px-6 py-3 border-4 border-[#050505] hover:bg-[#FF00FF] transition-colors flex items-center gap-2 mx-auto"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Token'}
              </button>
            </div>

            <p className="font-space text-[#666] text-xs uppercase">
              A confirmation email has been sent to <span className="text-white">{formData.email}</span>
            </p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="pt-24 pb-32 min-h-screen bg-[#050505]">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">

          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-anton text-white mb-4 uppercase tracking-tight"
            >
              REGISTER <span className="text-[#CCFF00]">NOW</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#888] font-space text-lg uppercase tracking-widest"
            >
              Join PANACHE 2K26 — fill in your details below
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-[#121212] border-4 border-[#333] p-8 md:p-12 space-y-6"
            style={{ boxShadow: '12px 12px 0px #333' }}
          >
            {/* Full Name */}
            <div>
              <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Full Name</label>
              <input
                type="text" name="fullName" required
                value={formData.fullName} onChange={handleChange}
                className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                placeholder="YOUR FULL NAME"
              />
            </div>

            {/* Roll No + Course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Roll Number</label>
                <input
                  type="text" name="rollNo" required
                  value={formData.rollNo} onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors uppercase"
                  placeholder="E.G. 2200123"
                />
              </div>
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Course</label>
                <select
                  name="course" required
                  value={formData.course} onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Branch + Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Branch</label>
                <input
                  type="text" name="branch" required
                  value={formData.branch} onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                  placeholder="E.G. CSE, ECE, ME"
                />
              </div>
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Section</label>
                <input
                  type="text" name="section" required
                  value={formData.section} onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                  placeholder="E.G. A, B, C"
                />
              </div>
            </div>

            {/* Year + Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Year</label>
                <select
                  name="year" required
                  value={formData.year} onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="5th">5th Year</option>
                </select>
              </div>
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Mobile Number</label>
                <input
                  type="tel" name="mobileNo" required
                  value={formData.mobileNo} onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                  placeholder="10-DIGIT MOBILE"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Email Address</label>
              <input
                type="email" name="email" required
                value={formData.email} onChange={handleChange}
                className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                placeholder="YOUR@EMAIL.COM"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-anton text-2xl uppercase tracking-widest bg-[#CCFF00] text-[#050505] py-5 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#00FFFF] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={28} /> : <UserPlus size={28} />}
              {loading ? 'Registering...' : 'Register →'}
            </button>
          </motion.form>

        </div>
      </div>
    </Layout>
  );
}

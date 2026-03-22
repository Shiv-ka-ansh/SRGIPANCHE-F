import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Loader2, CheckCircle2, Copy, Check, X, Ticket, QrCode, CreditCard, FileText, List } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    try {
      const { data } = await api.post('/students/register', formData);
      if (data.success) {
        setToken(data.token);
        setSuccess(true);
        toast.success('Registration successful!', {
          style: { background: '#CCFF00', color: '#050505', borderRadius: '0', border: '4px solid #050505' }
        });
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Registration failed';
      setError(msg);
      toast.error(msg, {
        style: { background: '#FF00FF', color: '#050505', borderRadius: '0', border: '4px solid #050505' }
      });
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
        <div className="pt-24 pb-32 min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#121212] border-4 border-[#CCFF00] p-6 md:p-10 max-w-[480px] w-full text-center relative"
            style={{ 
              boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)',
            }}
          >
            {/* Visual offset border for cyberpunk feel */}
            <div className="absolute -right-2 -bottom-2 w-full h-full border-4 border-[#CCFF00] -z-10 bg-[#CCFF00]/10" />
            
            <div className="bg-[#CCFF00] w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 border-4 border-[#050505] shadow-[0_0_15px_#CCFF00]">
              <CheckCircle2 size={40} className="md:w-12 md:h-12" color="#050505" />
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl text-[#CCFF00] mb-2 uppercase tracking-wider leading-tight">
              Registration Complete!
            </h1>
            <p className="font-space text-[#aaa] mb-8 uppercase text-[10px] md:text-xs font-bold tracking-widest px-2">
              Save this token — you'll need it at the venue
            </p>

            {/* Token Box */}
            <div className="bg-[#050505] border-4 border-[#CCFF00] p-6 md:p-8 mb-8 relative overflow-hidden group shadow-[inset_0_0_10px_rgba(204,255,0,0.1)] hover:shadow-[0_0_20px_rgba(204,255,0,0.15)] transition-shadow">
              <p className="font-space text-[#aaa] text-[10px] uppercase tracking-[0.2em] mb-4">Your Registration Token</p>
              
              <div className="font-anton text-5xl md:text-6xl text-[#CCFF00] tracking-[0.2em] mb-6 flex justify-center items-center overflow-hidden">
                <span className="whitespace-nowrap">{token}</span>
              </div>
              
              <button
                onClick={copyToken}
                className="w-full bg-[#CCFF00] text-[#050505] font-space font-bold uppercase text-sm py-4 rounded-[8px] border-2 border-transparent hover:bg-[#d4ff33] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Token'}
              </button>
            </div>

            {/* Next Steps Checklist */}
            <div className="text-left bg-[#050505]/50 border-2 border-[#333] p-5 md:p-6 mb-8 group hover:border-[#CCFF00]/30 transition-colors">
              <h3 className="font-display text-xl text-[#CCFF00] mb-5 uppercase tracking-wider border-b border-[#333] pb-2 inline-block">
                What's Next?
              </h3>
              <ul className="space-y-4">
                {[
                  "Take a screenshot or copy this token.",
                  "Visit the PANACHE Control Room at SRGI Campus.",
                  "Show this token to the desk coordinator.",
                  "Select your events & collect your INVOICE."
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-4 group/item">
                    <div className="w-[22px] h-[22px] border-2 border-[#CCFF00] flex items-center justify-center shrink-0 rounded-sm bg-[#CCFF00]/5 group-hover/item:bg-[#CCFF00]/20 transition-colors">
                      <Check size={14} className="text-[#CCFF00] stroke-[3]" />
                    </div>
                    <span className="font-space text-[11px] md:text-xs text-white uppercase font-bold leading-tight flex-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-space text-[#666] text-[10px] uppercase leading-relaxed px-4">
              A confirmation email has been sent to <br/>
              <span className="text-white border-b border-[#CCFF00] break-all">{formData.email}</span>
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

          {/* How it Works Guide */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-12">
            {[
              { icon: UserPlus, title: "REGISTER", desc: "Get token" },
              { icon: QrCode, title: "VERIFY", desc: "Visit Desk" },
              { icon: List, title: "SELECT", desc: "Events list" },
              { icon: FileText, title: "INVOICE", desc: "Pay fee" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-[#121212] border border-[#333] md:border-2 p-2 md:p-4 text-center group hover:border-[#CCFF00] transition-colors"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#333] group-hover:bg-[#CCFF00] text-white group-hover:text-[#050505] flex items-center justify-center mx-auto mb-2 md:mb-3 transform -skew-x-12 transition-colors">
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="font-anton text-[9px] md:text-sm text-[#CCFF00] mb-0.5 md:mb-1 tracking-wider uppercase">{step.title}</h3>
                <p className="font-space text-[7px] md:text-[10px] text-[#666] leading-tight uppercase font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-[#121212] border-4 border-[#333] p-8 md:p-12 space-y-6"
            style={{ boxShadow: "12px 12px 0px #333" }}
          >
            {/* Error Message Box */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border-4 border-red-500 p-4 mb-6"
                >
                  <p className="font-space font-bold text-red-500 text-sm uppercase tracking-wider flex items-center gap-2">
                    <X size={18} /> {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full Name */}
            <div>
              <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                placeholder="YOUR FULL NAME"
              />
            </div>

            {/* Roll No + Course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNo"
                  required
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors uppercase"
                  placeholder="E.G. 2200123"
                />
              </div>
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                  Course
                </label>
                <select
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Polytechnic">Polytechnic</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Branch + Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                  placeholder="E.G. CSE, ECE, ME"
                />
              </div>
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  required
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                  placeholder="E.G. A, B, C"
                />
              </div>
            </div>

            {/* Year + Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                  Year
                </label>
                <select
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  required
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                  placeholder="10-DIGIT MOBILE"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
                placeholder="YOUR@EMAIL.COM"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-anton text-2xl uppercase tracking-widest bg-[#CCFF00] text-[#050505] py-5 border-4 border-[#050505] hover:bg-[#FF00FF] hover:text-white hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#00FFFF] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={28} />
              ) : (
                <UserPlus size={28} />
              )}
              {loading ? "Registering..." : "Register →"}
            </button>
          </motion.form>
        </div>
      </div>
    </Layout>
  );
}

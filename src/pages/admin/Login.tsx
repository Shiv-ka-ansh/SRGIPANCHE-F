import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { Lock, AlertCircle, X } from 'lucide-react';
import { PasswordInput } from '../../components/PasswordInput';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        login(data.token, data.user);
        toast.success('Logged in successfully', {
          style: { background: '#CCFF00', color: '#050505', borderRadius: '0', border: '4px solid #050505' }
        });
        
        if (data.user.role === 'superadmin') {
          navigate('/superadmin/dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      setErrorMsg(errorMessage);
      setShowError(true);
      // Removed duplicate toast because of our custom right-side alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {showError && (
        <div className="fixed top-8 right-8 z-50">
          <div className="bg-[#121212] border-4 border-[#FF00FF] p-6 pr-12 max-w-sm w-full relative"
               style={{ boxShadow: '8px 8px 0px #FF00FF' }}>
            <button 
              onClick={() => setShowError(false)}
              className="absolute top-2 right-2 text-[#FF00FF] hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex flex-row items-center gap-4">
              <AlertCircle size={40} color="#FF00FF" className="animate-pulse flex-shrink-0" />
              <div className="flex flex-col">
                <h2 className="font-anton text-2xl text-[#FF00FF] mb-1 uppercase tracking-wide">Login Error</h2>
                <p className="font-space text-white text-sm font-bold uppercase mb-1">
                  {errorMsg}
                </p>
                <p className="font-space text-[#ccc] text-xs">Please verify your credentials.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-[#121212] border-4 border-[#CCFF00] p-8 max-w-md w-full"
           style={{ boxShadow: '12px 12px 0px #CCFF00' }}>
        <div className="flex items-center justify-center mb-8">
          <div className="bg-[#CCFF00] p-4 border-4 border-[#050505]">
            <Lock size={32} color="#050505" />
          </div>
        </div>
        
        <h1 className="font-anton text-4xl text-[#CCFF00] text-center mb-2 tracking-wide uppercase">Admin Login</h1>
        <p className="font-space text-[#ccc] text-center mb-8 uppercase text-sm font-bold">Authorized Personnel Only</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@panache.com"
            />
          </div>
          
          <PasswordInput
            label="Password"
            required
            className="w-full bg-[#050505] font-space text-white border-4 border-[#333] p-4 outline-none focus:border-[#CCFF00] transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full font-anton text-2xl uppercase tracking-widest bg-[#CCFF00] text-[#050505] py-4 border-4 border-[#050505] hover:bg-[#FF00FF] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#00FFFF] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? 'Authenticating...' : 'Access System →'}
          </button>
        </form>
      </div>
    </div>
  );
}

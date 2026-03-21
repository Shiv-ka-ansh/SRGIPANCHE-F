import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { MagneticButton } from './MagneticButton';

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    // { name: 'Schedule', path: '/schedule' },
    { name: 'Team', path: '/team' },
    // { name: 'Gallery', path: '/gallery' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <header
      className={cn(
        'fixed top-12 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-40 transition-all duration-300',
        isScrolled ? 'top-4' : 'top-12'
      )}
    >
      <div className="bg-surface/90 backdrop-blur-xl border-2 border-white/10 rounded-none md:rounded-full px-6 py-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-24 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
            <img src="/logo.png" alt="Panache Logo" className="w-full h-full object-contain" />
          </div>

        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'font-sans font-bold text-sm uppercase tracking-widest transition-all hover:text-primary relative group',
                location.pathname === link.path ? 'text-primary' : 'text-white'
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300",
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === 'superadmin' && (
                <Link
                  to="/superadmin/dashboard"
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#FF00FF] hover:text-white transition-colors"
                >
                  <ShieldAlert size={18} />
                  <span>Super Admin</span>
                </Link>
              )}
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors"
                >
                  <LayoutDashboard size={18} />
                  <span>Admin</span>
                </Link>
              )}
              <button
                onClick={logout}
                className="w-10 h-10 border-2 border-white/20 flex items-center justify-center text-white hover:border-secondary hover:text-secondary hover:bg-secondary/10 transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <MagneticButton
              to="/admin/login"
              className="btn-brutal btn-brutal-primary text-sm py-2"
            >
              Admin Login
            </MagneticButton>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-surface border-2 border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'font-display text-3xl uppercase py-2 border-b border-white/10',
                  location.pathname === link.path ? 'text-primary' : 'text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-4 flex flex-col gap-4">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 font-sans font-bold text-lg uppercase text-white hover:text-primary"
                >
                  <LayoutDashboard size={24} />
                  Admin Dashboard
                </Link>
                {user.role === 'superadmin' && (
                  <Link
                    to="/superadmin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 font-sans font-bold text-lg uppercase text-secondary hover:text-white"
                  >
                    <ShieldAlert size={24} />
                    Super Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 font-sans font-bold text-lg uppercase text-red-500 mt-4"
                >
                  <LogOut size={24} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-brutal btn-brutal-primary w-full text-center mt-6 py-4 text-xl"
              >
                Admin Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

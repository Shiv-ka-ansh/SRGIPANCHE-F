import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from '../pages/Home';
import { Events } from '../pages/Events';
import { Schedule } from '../pages/Schedule';
import { Team } from '../pages/Team';
import { Gallery } from '../pages/Gallery';
import { Register } from '../pages/Register';
import { PageTransition } from './PageTransition';
import { ProtectedRoute } from './ProtectedRoute';
import { Login as AdminLogin } from '../pages/admin/Login';
import { Dashboard as AdminDashboard } from '../pages/admin/Dashboard';
import { Dashboard as SuperAdminDashboard } from '../pages/superadmin/Dashboard';

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/schedule" element={<PageTransition><Schedule /></PageTransition>} />
          <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

          {/* Auth Routes */}
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/superadmin/login" element={<PageTransition><AdminLogin /></PageTransition>} />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requireAdmin>
                <PageTransition><AdminDashboard /></PageTransition>
              </ProtectedRoute>
            } 
          />

          {/* SuperAdmin Routes */}
          <Route 
            path="/superadmin/dashboard" 
            element={
              <ProtectedRoute requireSuperAdmin>
                <PageTransition><SuperAdminDashboard /></PageTransition>
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

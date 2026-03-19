import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin, requireSuperAdmin }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#CCFF00] flex items-center justify-center font-anton text-2xl tracking-widest">
        LOADING...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireSuperAdmin && user.role !== 'superadmin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (requireAdmin && user.role !== 'admin' && user.role !== 'superadmin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

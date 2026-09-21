import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SEOHead } from '../../components/shared/SEOHead';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Building2, ShieldCheck, UserCheck, Eye, Lock, Mail, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types/database';

export const LoginPage: React.FC = () => {
  const { loginAs, setRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Default to visitor or infer from email
      if (email.includes('admin')) {
        loginAs('admin');
        navigate('/admin/dashboard');
      } else if (email.includes('agent')) {
        loginAs('agent');
        navigate('/agent/dashboard');
      } else {
        loginAs('visitor');
        navigate(from === '/login' ? '/' : from);
      }
      setIsLoading(false);
    }, 600);
  };

  const handleFastRoleLogin = (role: UserRole) => {
    loginAs(role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'agent') {
      navigate('/agent/dashboard');
    } else {
      navigate(from === '/login' ? '/' : from);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 sm:px-6 bg-brand-stone-100">
      <SEOHead title="Client & Advisory Portal Login" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-brand-stone-200 shadow-modal space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brand-dark mx-auto flex items-center justify-center text-brand-gold shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="font-display font-bold text-2xl text-brand-dark">
            Portal Access
          </h1>
          <p className="text-xs text-brand-stone-500">
            Sign in to manage saved residences or access role-gated advisory consoles.
          </p>
        </div>

        {/* 1-Click Role Testing Switcher */}
        <div className="p-4 rounded-2xl bg-brand-stone-50 border border-brand-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-brand-stone-600 uppercase tracking-wider">
              Instant Demo Personas
            </span>
            <span className="text-[10px] text-brand-gold-dark font-semibold">1-Click Sign-In</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleFastRoleLogin('visitor')}
              className="p-2.5 rounded-xl border border-brand-stone-200 hover:border-brand-dark hover:bg-white text-brand-stone-700 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
            >
              <Eye className="w-4 h-4 text-brand-gold" />
              <span>Visitor</span>
            </button>

            <button
              onClick={() => handleFastRoleLogin('agent')}
              className="p-2.5 rounded-xl border border-brand-stone-200 hover:border-brand-dark hover:bg-white text-brand-stone-700 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
            >
              <UserCheck className="w-4 h-4 text-brand-gold" />
              <span>Agent</span>
            </button>

            <button
              onClick={() => handleFastRoleLogin('admin')}
              className="p-2.5 rounded-xl border border-brand-stone-200 hover:border-brand-dark hover:bg-white text-brand-stone-700 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleCustomLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@havencrest-realty.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant="gold"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Authenticate & Proceed
          </Button>
        </form>

        {/* Notice on Role Gating */}
        <div className="text-center pt-2 border-t border-brand-stone-100">
          <p className="text-[11px] text-brand-stone-400">
            Agent and Admin accounts are strictly invite-only. Public registrations are provisioned as Client/Visitor accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

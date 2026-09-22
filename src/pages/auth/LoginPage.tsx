import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SEOHead } from '../../components/shared/SEOHead';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { UserRole } from '../../types/database';

export const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('agent');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/';

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const success = login(email, password, role);
      setIsLoading(false);

      if (success) {
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'agent') {
          navigate('/agent/dashboard');
        } else {
          navigate(from === '/login' ? '/' : from);
        }
      } else {
        setError('Invalid credentials or role. Please try again.');
      }
    }, 600);
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
            Sign in to access your advisory console.
          </p>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleCustomLogin} className="space-y-4">
          {error && (
            <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-brand-stone-700 uppercase tracking-wider">
              Portal Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  role === 'agent' 
                    ? 'border-brand-dark bg-brand-dark text-brand-gold font-semibold' 
                    : 'border-brand-stone-200 text-brand-stone-600 hover:bg-brand-stone-50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span className="text-xs">Agent</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  role === 'admin' 
                    ? 'border-brand-dark bg-brand-dark text-brand-gold font-semibold' 
                    : 'border-brand-stone-200 text-brand-stone-600 hover:bg-brand-stone-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Admin</span>
              </button>
            </div>
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="name@havencrest-realty.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
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
            Agent and Admin accounts are strictly invite-only. Credentials are automatically provided by system administrators.
          </p>
        </div>
      </div>
    </div>
  );
};

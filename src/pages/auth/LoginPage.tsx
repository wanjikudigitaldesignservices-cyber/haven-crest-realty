import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { Building2, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, isLoading, role } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'agent') {
        navigate('/agent/dashboard');
      } else {
        navigate(from === '/login' ? '/' : from);
      }
    }
  }, [isLoading, isAuthenticated, role, navigate, from]);

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: from }
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 sm:px-6 bg-brand-stone-100">
      <SEOHead title="Client & Advisory Portal Login" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-brand-stone-200 shadow-modal space-y-8 text-center">
        <div className="space-y-2">
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

        <div className="pt-4">
          <Button
            onClick={handleLogin}
            variant="gold"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Authenticate & Proceed
          </Button>
        </div>

        <div className="pt-2 border-t border-brand-stone-100">
          <p className="text-[11px] text-brand-stone-400">
            Agent and Admin accounts are securely managed via Auth0. 
            Credentials are automatically provided by system administrators.
          </p>
        </div>
      </div>
    </div>
  );
};

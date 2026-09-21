import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, ArrowLeft, UserCircle } from 'lucide-react';

export const ForbiddenPage: React.FC = () => {
  const { role } = useAuthStore();

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-brand-stone-100">
      <SEOHead title="403 Access Forbidden" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-rose-200 shadow-modal text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
            HTTP 403 · Access Denied
          </span>
          <h1 className="font-display font-extrabold text-2xl text-brand-dark">
            Role Permission Required
          </h1>
          <p className="text-xs text-brand-stone-600 leading-relaxed">
            Your current active role (<span className="font-bold text-brand-dark">{role}</span>) does not possess the requisite security clearance to view this internal brokerage route.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="gold" size="sm" leftIcon={<UserCircle className="w-3.5 h-3.5" />}>
              Switch Persona
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

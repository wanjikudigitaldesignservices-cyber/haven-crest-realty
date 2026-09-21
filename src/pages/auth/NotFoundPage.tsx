import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-brand-stone-100">
      <SEOHead title="404 Page Not Found" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-brand-stone-200 shadow-modal text-center space-y-6">
        <div className="w-16 h-16 bg-brand-stone-100 text-brand-stone-600 rounded-full flex items-center justify-center mx-auto">
          <Compass className="w-9 h-9 text-brand-gold" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            HTTP 404 · Navigation Error
          </span>
          <h1 className="font-display font-extrabold text-2xl text-brand-dark">
            Residence or Page Not Found
          </h1>
          <p className="text-xs text-brand-stone-600 leading-relaxed">
            The requested address does not correspond to an active route. Please verify the URL or return to our portfolio index.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="gold" size="sm" leftIcon={<Home className="w-3.5 h-3.5" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link to="/buy">
            <Button variant="outline" size="sm">
              Explore Residences
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

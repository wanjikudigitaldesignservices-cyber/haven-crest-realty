import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { useSavedStore } from '../../store/savedStore';
import { useAuthStore } from '../../store/authStore';
import { 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Compass, 
  UserCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { savedIds } = useSavedStore();
  const { role, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-brand-dark/95 backdrop-blur-md py-3.5 shadow-md border-b border-white/10'
            : 'bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-dark p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-brand-dark rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-brand-gold" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
                  {SITE_CONFIG.shortName}
                </span>
                <span className="text-[10px] tracking-widest text-brand-gold uppercase font-semibold mt-1">
                  Luxury Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {SITE_CONFIG.navLinks.slice(0, 7).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-gold font-semibold bg-white/5'
                        : 'text-brand-stone-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to="/search"
                className="p-2 rounded-full text-brand-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Search Properties"
              >
                <Search className="w-4 h-4" />
              </Link>

              <Link
                to="/saved"
                className="relative p-2 rounded-full text-brand-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Saved Properties"
              >
                <Heart className="w-4 h-4" />
                {savedIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-gold text-brand-dark font-bold text-[10px] rounded-full flex items-center justify-center">
                    {savedIds.length}
                  </span>
                )}
              </Link>

              {/* Portal Jump or Valuation CTA */}
              {role === 'admin' ? (
                <Link to="/admin/dashboard">
                  <Button variant="gold" size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                    Admin CRM
                  </Button>
                </Link>
              ) : role === 'agent' ? (
                <Link to="/agent/dashboard">
                  <Button variant="gold" size="sm" leftIcon={<UserCircle className="w-3.5 h-3.5" />}>
                    Agent Portal
                  </Button>
                </Link>
              ) : (
                <Link to="/valuation">
                  <Button variant="gold" size="sm">
                    Request Valuation
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                to="/saved"
                className="relative p-2 text-brand-stone-300 hover:text-white"
              >
                <Heart className="w-5 h-5" />
                {savedIds.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-brand-dark font-bold text-[9px] rounded-full flex items-center justify-center">
                    {savedIds.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-brand-stone-200 hover:text-white hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-brand-dark/98 backdrop-blur-xl lg:hidden pt-24 px-6 pb-8 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link
              to="/search"
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-white font-medium text-sm"
            >
              <Search className="w-4 h-4 text-brand-gold" />
              <span>Search Properties & Filters</span>
            </Link>

            <div className="divide-y divide-white/10">
              {SITE_CONFIG.navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-3 text-base font-medium text-brand-stone-200 hover:text-brand-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link to="/schedule-viewing" className="block">
                <Button variant="outline" className="w-full text-white border-white/20">
                  Schedule a Viewing
                </Button>
              </Link>
              <Link to="/valuation" className="block">
                <Button variant="gold" className="w-full">
                  Request Property Valuation
                </Button>
              </Link>

              {/* Portal Quick Access for logged-in agent/admin */}
              {role === 'admin' && (
                <Link to="/admin/dashboard" className="block">
                  <Button variant="secondary" className="w-full">
                    Go to Admin Dashboard
                  </Button>
                </Link>
              )}
              {role === 'agent' && (
                <Link to="/agent/dashboard" className="block">
                  <Button variant="secondary" className="w-full">
                    Go to Agent Dashboard
                  </Button>
                </Link>
              )}
            </div>

            <div className="pt-4 text-xs text-brand-stone-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                {SITE_CONFIG.phone}
              </span>
              <Link to="/faq" className="hover:underline">
                Client FAQs
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

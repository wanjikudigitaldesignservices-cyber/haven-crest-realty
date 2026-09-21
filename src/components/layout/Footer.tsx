import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { Building2, Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-stone-300 pt-16 pb-12 border-t border-brand-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-dark p-0.5">
                <div className="w-full h-full bg-brand-dark rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-brand-gold" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] tracking-widest text-brand-gold uppercase font-semibold">
                  Private Brokerage & Advisory
                </span>
              </div>
            </Link>

            <p className="text-sm text-brand-stone-400 max-w-sm leading-relaxed">
              Curating prime residential estates, architectural landmarks, and luxury investment portfolios for high-net-worth individuals and global institutions.
            </p>

            <div className="pt-2 space-y-2 text-sm text-brand-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Properties */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">
              Properties
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buy" className="hover:text-brand-gold transition-colors">Residential for Sale</Link></li>
              <li><Link to="/rent" className="hover:text-brand-gold transition-colors">Luxury Rentals</Link></li>
              <li><Link to="/search" className="hover:text-brand-gold transition-colors">Search All Listings</Link></li>
              <li><Link to="/neighborhoods" className="hover:text-brand-gold transition-colors">Neighborhood Guides</Link></li>
              <li><Link to="/saved" className="hover:text-brand-gold transition-colors">Saved Residences</Link></li>
            </ul>
          </div>

          {/* Column 3: Advisory & Services */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">
              Advisory Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/valuation" className="hover:text-brand-gold transition-colors">Property Valuation</Link></li>
              <li><Link to="/schedule-viewing" className="hover:text-brand-gold transition-colors">Schedule Private Viewing</Link></li>
              <li><Link to="/financing" className="hover:text-brand-gold transition-colors">Financing & Mortgages</Link></li>
              <li><Link to="/agents" className="hover:text-brand-gold transition-colors">Senior Brokers</Link></li>
              <li><Link to="/blog" className="hover:text-brand-gold transition-colors">Market Insights & Reports</Link></li>
            </ul>
          </div>

          {/* Column 4: Agency & Legal */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-xs">
              Agency & Compliance
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Our Brokerage</Link></li>
              <li><Link to="/careers" className="hover:text-brand-gold transition-colors">Careers & Partnerships</Link></li>
              <li><Link to="/faq" className="hover:text-brand-gold transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Concierge</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Licensed Real Estate Brokerage Firm · Estate Agents Registration Board Compliant</span>
          </div>
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

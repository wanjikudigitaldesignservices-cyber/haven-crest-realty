import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { ContactForm } from '../../components/forms/ContactForm';
import { Award, Briefcase, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const openPositions = [
    {
      title: 'Senior Managing Broker — Prime Residential (Karen & Muthaiga)',
      department: 'Private Brokerage',
      type: 'Full-time / High Commission Tier',
      location: 'Karen Pavilion Office',
      description: 'Lead high-value representation for multi-acre trophy compounds and diplomatic missions. Requires 7+ years proven track record and EARB license.',
    },
    {
      title: 'Investment Portfolio Analyst — Commercial & Land Parcels',
      department: 'Capital Markets',
      type: 'Full-time',
      location: 'Upper Hill & Hybrid',
      description: 'Perform financial underwriting, DCF yield modeling, and highest-and-best-use analyses for institutional property funds.',
    },
    {
      title: 'Private Client Concierge & Conveyance Specialist',
      department: 'Client Operations',
      type: 'Full-time',
      location: 'Nairobi Prime',
      description: 'Manage VIP viewing logistics, security escort clearances, title validation, and post-transaction escrow administration.',
    },
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SEOHead
        title="Careers & Brokerage Partnerships"
        description="Join East Africa's leading private luxury real estate brokerage. Explore opportunities for senior brokers, investment analysts, and client advisory specialists."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Elite Talent & Broker Partnerships
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Advance Your Advisory Career
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          Haven Crest provides world-class marketing infrastructure, proprietary off-market mandates, and industry-leading commission structures for high-performing real estate professionals.
        </p>
      </div>

      {/* Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-3">
          <Sparkles className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-bold text-base text-brand-dark">Proprietary Trophy Mandates</h3>
          <p className="text-xs text-brand-stone-600 leading-relaxed">
            Gain immediate access to verified institutional sellers, embassy portfolios, and off-market listings unavailable anywhere else.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-3">
          <TrendingUp className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-bold text-base text-brand-dark">Uncapped Commission Tiers</h3>
          <p className="text-xs text-brand-stone-600 leading-relaxed">
            Progressive commission structures rewarding exceptional transaction volume, with prompt institutional settlement.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-3">
          <Award className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-bold text-base text-brand-dark">Full Legal & Marketing Support</h3>
          <p className="text-xs text-brand-stone-600 leading-relaxed">
            Dedicated in-house legal counsel, drone architectural videography, and global digital syndication for every mandate.
          </p>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">
          Current Opportunities
        </h2>
        <div className="space-y-4">
          {openPositions.map((pos, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:shadow-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark font-semibold">
                    {pos.department}
                  </span>
                  <span className="text-brand-stone-400">·</span>
                  <span className="text-brand-stone-600 font-medium">{pos.type}</span>
                  <span className="text-brand-stone-400">·</span>
                  <span className="text-brand-stone-600">{pos.location}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-brand-dark">
                  {pos.title}
                </h3>
                <p className="text-xs text-brand-stone-600 leading-relaxed">
                  {pos.description}
                </p>
              </div>

              <Link to="/contact">
                <Button variant="gold" size="sm" className="whitespace-nowrap">
                  Apply for Position
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Confidential Inquiry Form */}
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-stone-100 border border-brand-stone-200 space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="font-display font-bold text-2xl text-brand-dark">
            Confidential Broker Onboarding Inquiry
          </h3>
          <p className="text-xs text-brand-stone-500">
            If you represent established luxury real estate portfolios, connect with our Managing Partners under mutual non-disclosure.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

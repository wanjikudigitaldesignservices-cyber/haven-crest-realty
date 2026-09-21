import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { Building2, ShieldCheck, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SEOHead
        title="About Our Brokerage"
        description={`Learn about ${SITE_CONFIG.name}, East Africa's leading private luxury real estate advisory and brokerage firm.`}
      />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Institutional Fiduciary Legacy
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Redefining Prime Residential Advisory
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          Founded with a clear mandate: to represent high-net-worth individuals, diplomatic families, and institutional investors with uncompromising discretion, analytical rigor, and bespoke representation.
        </p>
      </div>

      {/* Narrative & Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            alt="Estate Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="font-display font-bold text-xl">The Gold Standard in East African Real Estate</p>
            <p className="text-xs text-brand-stone-300">Over 14 years of discreet transactional leadership</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-brand-stone-700 leading-relaxed">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">
            Our Fiduciary Commitment
          </h2>
          <p>
            In a market where high-value property transactions often lack transparency, Haven Crest serves as a bastion of rigorous due diligence. We independently verify cadastral registry deeds, validate topographical boundaries against riparian reserve laws, and conduct environmental and structural assessments before bringing any mandate to the market.
          </p>
          <p>
            Our clients benefit from private access to off-market estates, discrete non-disclosure protections, and direct counsel from experienced real estate attorneys and charter valuation surveyors.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-brand-stone-100 border border-brand-stone-200">
              <p className="font-display font-bold text-2xl text-brand-dark">KES 24B+</p>
              <p className="text-xs text-brand-stone-500">Gross Transaction Advisory</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-stone-100 border border-brand-stone-200">
              <p className="font-display font-bold text-2xl text-brand-dark">98%</p>
              <p className="text-xs text-brand-stone-500">Confidential Mandate Retention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <h3 className="font-display font-bold text-2xl text-center text-brand-dark">
          Core Pillars of Representation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-brand-stone-200 shadow-card space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
            <h4 className="font-display font-bold text-lg text-brand-dark">Absolute Discretion</h4>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              We uphold strict confidentiality. Off-market trophy assets are shown exclusively to pre-vetted buyers under signed non-disclosure agreements.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-brand-stone-200 shadow-card space-y-3">
            <Award className="w-8 h-8 text-brand-gold" />
            <h4 className="font-display font-bold text-lg text-brand-dark">Due Diligence Integrity</h4>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              Every title, mutation form, physical beacon, and county clearance certificate is authenticated prior to exchange.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-brand-stone-200 shadow-card space-y-3">
            <TrendingUp className="w-8 h-8 text-brand-gold" />
            <h4 className="font-display font-bold text-lg text-brand-dark">Data-Driven Valuations</h4>
            <p className="text-xs text-brand-stone-600 leading-relaxed">
              Our appraisal models evaluate replacement cost, recent comparable transactional deeds, and prime corridor land indexes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-12 text-center space-y-6">
        <h3 className="font-display font-bold text-2xl sm:text-3xl max-w-xl mx-auto">
          Ready to Discuss Your Property Acquisition or Sale?
        </h3>
        <p className="text-xs sm:text-sm text-brand-stone-300 max-w-md mx-auto">
          Schedule a private conversation with our managing partners at our Karen Pavilion offices.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/contact">
            <Button variant="gold">Contact Concierge</Button>
          </Link>
          <Link to="/agents">
            <Button variant="outline" className="text-white border-white/20">
              Meet the Brokers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

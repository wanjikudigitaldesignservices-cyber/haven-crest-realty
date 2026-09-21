import React from 'react';
import { ValuationForm } from '../../components/forms/ValuationForm';
import { SEOHead } from '../../components/shared/SEOHead';
import { ShieldCheck, TrendingUp, Award, Clock } from 'lucide-react';

export const ValuationPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="Request Confidential Property Valuation"
        description="Receive an authoritative, data-backed comparative market appraisal for your prime residential estate or luxury property."
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Appraisal & Disposition
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-dark">
          Confidential Valuation Dossier
        </h1>
        <p className="text-sm text-brand-stone-600 leading-relaxed">
          Accurately pricing prime real estate requires more than simple square footage algorithms. Our senior appraisers cross-reference recent land indices, replacement cost metrics, and verified private buyer demand.
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-brand-stone-200 shadow-sm flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-brand-dark">100% Confidential</p>
            <p className="text-brand-stone-500">Non-disclosure guaranteed</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-stone-200 shadow-sm flex items-center gap-3">
          <Clock className="w-6 h-6 text-brand-gold shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-brand-dark">24-Hour Dispatch</p>
            <p className="text-brand-stone-500">Comprehensive comparative report</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-stone-200 shadow-sm flex items-center gap-3">
          <Award className="w-6 h-6 text-brand-gold shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-brand-dark">Chartered Valuers</p>
            <p className="text-brand-stone-500">Institution of Surveyors of Kenya</p>
          </div>
        </div>
      </div>

      {/* Main Valuation Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card">
        <ValuationForm />
      </div>
    </div>
  );
};

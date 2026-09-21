import React from 'react';
import { SEOHead } from '../../components/shared/SEOHead';
import { SITE_CONFIG } from '../../config/site';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title="Terms of Brokerage & Service"
        description="Legal terms and conditions governing property representation and browsing with Haven Crest Real Estate."
      />

      <div className="space-y-3 border-b border-brand-stone-200 pb-6">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Legal Framework
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
          Terms of Service & Brokerage Representation
        </h1>
        <p className="text-xs text-brand-stone-500">
          Last Updated: March 2026 · Governed by the Laws of the Republic of Kenya & EARB Guidelines
        </p>
      </div>

      <div className="prose prose-slate text-xs sm:text-sm text-brand-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">1. Licensing & Statutory Authorization</h2>
          <p>
            {SITE_CONFIG.name} is a licensed corporate estate agency authorized under the Estate Agents Act (Cap 533, Laws of Kenya). All managing brokers maintain active practicing licenses registered with the Estate Agents Registration Board (EARB).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">2. Accuracy of Listing Particulars</h2>
          <p>
            While every effort is made to guarantee the accuracy of property dimensions, boundaries, architectural specifications, and photographs, descriptions are intended as a general guide. Intending purchasers or tenants must satisfy themselves by physical inspection and formal registry search through their independent legal counsel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">3. Intellectual Property & Photography Rights</h2>
          <p>
            All architectural photography, video tours, floor plans, and market analysis dossiers are the proprietary intellectual property of {SITE_CONFIG.name}. Reproduction without prior written authorization is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">4. Payment Processing (Phase 1 Status)</h2>
          <p>
            Online financial transactions via IntaSend (M-Pesa / Cards) are integrated for future phases and currently disabled. No booking fees or holding deposits are processed directly through the public website. All escrow settlements are handled via verified bank-to-bank conveyancing accounts.
          </p>
        </section>
      </div>
    </div>
  );
};

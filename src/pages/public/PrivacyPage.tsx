import React from 'react';
import { SEOHead } from '../../components/shared/SEOHead';
import { SITE_CONFIG } from '../../config/site';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title="Privacy Policy & Fiduciary Data Protection"
        description="Privacy policy and data governance practices at Haven Crest Real Estate."
      />

      <div className="space-y-3 border-b border-brand-stone-200 pb-6">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Regulatory Compliance
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
          Privacy & Fiduciary Confidentiality Policy
        </h1>
        <p className="text-xs text-brand-stone-500">
          Last Updated: March 2026 · Compliant with the Kenya Data Protection Act (2019) and International GDPR Principles
        </p>
      </div>

      <div className="prose prose-slate text-xs sm:text-sm text-brand-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">1. Commitment to Client Confidentiality</h2>
          <p>
            {SITE_CONFIG.name} ("Haven Crest", "we", "our") operates on strict fiduciary principles. Due to the high-profile nature of our buyers, sellers, diplomats, and institutional principals, data security and non-disclosure are integral to our operational protocols.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">2. Information We Collect</h2>
          <p>We collect information exclusively necessary to deliver real estate brokerage and valuation services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact coordinates (full name, email address, phone/WhatsApp number).</li>
            <li>Property valuation parameters (address, square meterage, bedroom count, asset specifications).</li>
            <li>Government-issued identification and security clearance tokens for private viewing protocol.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">3. Non-Disclosure & Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or syndicate client information to commercial third parties. Your personal data is only shared with accredited legal conveyancers, financial escrow institutions, and the Ministry of Lands strictly upon your explicit instruction during active transactions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">4. Bot Mitigation & Honeypot Fields</h2>
          <p>
            To protect our systems from malicious automation, our public forms employ hidden bot-trap fields and rate-limiting heuristics (max 5 submissions per hour per IP address).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-brand-dark">5. Contact Our Data Protection Officer</h2>
          <p>
            Inquiries regarding personal records, data erasure, or confidentiality agreements should be directed to our Legal Fiduciary Desk at{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-dark font-semibold underline">
              {SITE_CONFIG.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

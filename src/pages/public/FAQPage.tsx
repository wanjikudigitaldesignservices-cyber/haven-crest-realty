import React, { useState } from 'react';
import { SEOHead } from '../../components/shared/SEOHead';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What legal due diligence is conducted prior to listing a property with Haven Crest?",
      answer: "Every property undergoing representation by Haven Crest undergoes mandatory triple-verification: (1) Official title search at the Central Land Registry, (2) Topographical survey and physical beacon confirmation against cadastral mutation forms, and (3) County land rate and rent clearance verification. We do not represent properties with encumbrances or unresolved riparian disputes."
    },
    {
      question: "Can non-resident or foreign nationals acquire residential property in Kenya?",
      answer: "Yes. Foreign nationals and international corporations may acquire leasehold residential property (typically 99-year renewable leases) across urban enclaves in Nairobi without restriction. Agricultural land requires specific exemptions under the Land Control Act. Our conveyance partners handle foreign exchange remittance clearances and title registration."
    },
    {
      question: "How does Haven Crest handle confidential or off-market property sales?",
      answer: "We maintain a private 'Trophy Desk' for prominent owners, diplomats, and business leaders who require complete anonymity. Off-market residences are never published online. They are presented strictly to pre-vetted, verified buyers who have signed binding Non-Disclosure Agreements (NDAs)."
    },
    {
      question: "What are the typical transactional costs for buyers in Nairobi?",
      answer: "Purchasers should budget for: (1) Statutory Stamp Duty of 4% of market value (for properties within municipal boundaries), (2) Legal conveyance fees of approximately 1% to 2% + VAT, and (3) Nominal registration and search filing fees."
    },
    {
      question: "What is the procedure for scheduling a private viewing?",
      answer: "Due to high diplomatic and ambassadorial security standards, viewings must be scheduled at least 24 hours in advance via our online booking form or direct concierge desk. Security pre-clearance and identification are confirmed prior to entry."
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="Frequently Asked Questions (FAQ)"
        description="Answers to common questions regarding prime property acquisition, legal conveyance, off-market sales, and foreign ownership in Kenya."
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Client Advisory
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-brand-dark">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-brand-stone-600 leading-relaxed">
          Guidance on legal conveyance, title verification, foreign ownership regulations, and discrete brokerage representation.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-brand-stone-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-brand-stone-50/50 transition-colors"
              >
                <span className="font-display font-bold text-base sm:text-lg text-brand-dark">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-gold shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-stone-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-brand-stone-600 leading-relaxed border-t border-brand-stone-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-brand-stone-100 border border-brand-stone-200 text-center space-y-4">
        <h3 className="font-display font-bold text-xl text-brand-dark">Have an inquiry not answered here?</h3>
        <p className="text-xs text-brand-stone-500 max-w-md mx-auto">
          Our senior managing brokers are available for confidential consultations.
        </p>
        <Link to="/contact">
          <Button variant="gold" size="sm">Contact Brokerage Desk</Button>
        </Link>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SEOHead } from '../../components/shared/SEOHead';
import { formatCurrencyFull, formatCurrency } from '../../lib/utils';
import { Calculator, ShieldCheck, Banknote, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export const FinancingGuidePage: React.FC = () => {
  // Interactive Mortgage Calculator
  const [propertyPrice, setPropertyPrice] = useState<number>(180000000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(13.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);

  const loanAmount = propertyPrice * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  // Stamp duty calculation (Kenya prime residential: 4% urban, 2% rural)
  const stampDuty = propertyPrice * 0.04;
  const legalConveyanceFee = Math.max(propertyPrice * 0.015, 250000);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SEOHead
        title="Luxury Real Estate Financing & Mortgage Advisory"
        description="Comprehensive mortgage guides, stamp duty calculations, and private banking conveyance frameworks for prime property buyers."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Capital Structuring & Mortgages
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Financing & Acquisition Guide
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          Informational guidance on private banking facilities, offshore mortgage structures, and statutory conveyance costs in Kenya.
        </p>
      </div>

      {/* Calculator Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            <h2 className="font-display font-bold text-2xl text-brand-dark">
              Prime Mortgage Estimator
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-brand-stone-600 mb-1">
                <span>Property Purchase Price</span>
                <span className="text-brand-dark">{formatCurrency(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min={20000000}
                max={500000000}
                step={5000000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-brand-dark cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone-600 mb-1">
                  Deposit / Down Payment
                </label>
                <select
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg border border-brand-stone-300 bg-white"
                >
                  <option value={10}>10% Deposit</option>
                  <option value={20}>20% Deposit (Standard)</option>
                  <option value={30}>30% Deposit</option>
                  <option value={40}>40% Deposit</option>
                  <option value={50}>50% Deposit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone-600 mb-1">
                  Indicative Rate
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg border border-brand-stone-300 bg-white"
                >
                  <option value={9.5}>9.5% (USD Prime Facility)</option>
                  <option value={12.0}>12.0% (Private Wealth KES)</option>
                  <option value={13.5}>13.5% (Standard Commercial Bank)</option>
                  <option value={15.0}>15.0%</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone-600 mb-1">
                  Tenor (Years)
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg border border-brand-stone-300 bg-white"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-brand-dark text-white space-y-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
            Estimated Monthly Obligation
          </span>
          <p className="font-display font-bold text-3xl sm:text-4xl text-white">
            {formatCurrencyFull(Math.round(monthlyPayment))}
            <span className="text-xs font-normal text-brand-stone-400"> / month</span>
          </p>

          <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-brand-stone-300">
            <div className="flex justify-between">
              <span>Principal Loan Amount:</span>
              <span className="text-white font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated 4% Urban Stamp Duty:</span>
              <span className="text-white font-semibold">{formatCurrency(stampDuty)}</span>
            </div>
            <div className="flex justify-between">
              <span>Legal Conveyance & Escrow:</span>
              <span className="text-white font-semibold">{formatCurrency(legalConveyanceFee)}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/contact" className="block">
              <Button variant="gold" size="sm" className="w-full">
                Connect with Private Wealth Banker
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Breakdown Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-brand-stone-700 leading-relaxed">
        <div className="p-6 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 space-y-2">
          <Banknote className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-bold text-base text-brand-dark">1. Stamp Duty & Statutory Taxes</h3>
          <p className="text-xs text-brand-stone-600">
            Urban properties in Nairobi incur a statutory 4% Stamp Duty assessed on the higher of government valuation or contract price. Agricultural acreage incurs 2%.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 space-y-2">
          <ShieldCheck className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-bold text-base text-brand-dark">2. Escrow & Title Conveyance</h3>
          <p className="text-xs text-brand-stone-600">
            Funds are deposited into independent stakeholder escrow accounts held by Tier-1 commercial banks until completion documents and registered title deeds are exchanged.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 space-y-2">
          <HelpCircle className="w-6 h-6 text-brand-gold" />
          <h3 className="font-display font-bold text-base text-brand-dark">3. Non-Resident & Diaspora Buyers</h3>
          <p className="text-xs text-brand-stone-600">
            Foreign nationals may acquire 99-year leasehold residential property in Kenya without limitation. We facilitate central bank clearance and tax compliance certificates.
          </p>
        </div>
      </div>
    </div>
  );
};

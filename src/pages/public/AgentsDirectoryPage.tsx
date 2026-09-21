import React, { useState } from 'react';
import { useAgents } from '../../hooks/useAgents';
import { AgentCard } from '../../components/agent/AgentCard';
import { SEOHead } from '../../components/shared/SEOHead';
import { Award, ShieldCheck, Users } from 'lucide-react';

export const AgentsDirectoryPage: React.FC = () => {
  const { data: agents = [], isLoading } = useAgents();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialties = [
    'all',
    'Trophy Estates',
    'Diplomatic Relocation',
    'Luxury Penthouses',
    'Off-Plan Advisory',
    'Investment Portfolios',
  ];

  const filteredAgents = selectedSpecialty === 'all'
    ? agents
    : agents.filter((a) => a.specialties?.includes(selectedSpecialty));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="Senior Brokerage Partners & Advisors"
        description="Meet the private advisory team at Haven Crest Real Estate. Dedicated specialists in prime residential acquisitions, valuations, and diplomatic relocations."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Fiduciary Leadership
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Senior Advisory Partners
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          Our licensed brokers combine institutional financial acumen, discreet representation, and encyclopedic knowledge of Nairobi's prime property registries.
        </p>
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSpecialty === spec
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white border border-brand-stone-200 text-brand-stone-700 hover:bg-brand-stone-100'
            }`}
          >
            {spec === 'all' ? 'All Specialties' : spec}
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-brand-stone-400">Loading directory...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}

      {/* Brokerage Commitment Strip */}
      <div className="p-8 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <Award className="w-6 h-6 text-brand-gold mx-auto" />
          <h4 className="font-display font-bold text-sm text-brand-dark">Licensed & Certified</h4>
          <p className="text-xs text-brand-stone-500">Board-certified Estate Agents Registration Board brokers</p>
        </div>
        <div className="space-y-1">
          <ShieldCheck className="w-6 h-6 text-brand-gold mx-auto" />
          <h4 className="font-display font-bold text-sm text-brand-dark">Discreet Fiduciary Conduct</h4>
          <p className="text-xs text-brand-stone-500">Non-disclosure protocols protecting client identities</p>
        </div>
        <div className="space-y-1">
          <Users className="w-6 h-6 text-brand-gold mx-auto" />
          <h4 className="font-display font-bold text-sm text-brand-dark">Concierge Client Representation</h4>
          <p className="text-xs text-brand-stone-500">End-to-end legal conveyance, title search, and advisory</p>
        </div>
      </div>
    </div>
  );
};

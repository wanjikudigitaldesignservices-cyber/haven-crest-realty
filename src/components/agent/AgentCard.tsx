import React from 'react';
import { Link } from 'react-router-dom';
import { Agent } from '../../types/database';
import { Phone, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const profile = agent.profile;
  const slug = profile?.full_name?.toLowerCase().replace(/\s+/g, '-') || agent.id;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-brand-stone-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
      <div className="relative aspect-[4/3] bg-brand-stone-100 overflow-hidden">
        <img
          src={
            profile?.avatar_url ||
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
          }
          alt={profile?.full_name || 'Agent'}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-brand-dark/80 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-xs font-medium flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-brand-gold" />
          <span>{agent.years_experience}+ Years Experience</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/agents/${slug}`} className="hover:text-brand-gold-dark transition-colors">
            <h3 className="font-display font-bold text-lg text-brand-dark">
              {profile?.full_name || 'Senior Broker'}
            </h3>
          </Link>
          <p className="text-xs text-brand-stone-500 font-medium mt-0.5">
            Lic: {agent.license_number || 'REA-NAI-0842'}
          </p>

          <p className="text-xs text-brand-stone-600 line-clamp-2 mt-3 leading-relaxed">
            {agent.bio}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {agent.specialties?.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-brand-stone-100 text-brand-stone-700 text-[10px] font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-brand-stone-100 flex items-center gap-2">
          {agent.whatsapp_number && (
            <a
              href={`https://wa.me/${agent.whatsapp_number.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
              >
                WhatsApp
              </Button>
            </a>
          )}

          <Link to={`/agents/${slug}`} className="flex-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

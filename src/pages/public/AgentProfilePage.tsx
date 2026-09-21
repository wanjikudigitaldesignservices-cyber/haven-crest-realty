import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAgent } from '../../hooks/useAgents';
import { useProperties } from '../../hooks/useProperties';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ContactForm } from '../../components/forms/ContactForm';
import { SEOHead } from '../../components/shared/SEOHead';
import { Phone, MessageSquare, Award, CheckCircle, Mail, MapPin } from 'lucide-react';

export const AgentProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: agent, isLoading } = useAgent(slug);
  const { data: allProperties = [] } = useProperties();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-dark border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <h1 className="font-display font-bold text-3xl text-brand-dark">Broker Profile Not Found</h1>
        <Link to="/agents">
          <Button variant="gold">View Senior Brokers Directory</Button>
        </Link>
      </div>
    );
  }

  const profile = agent.profile;
  const agentProperties = allProperties.filter((p) => p.agent_id === agent.id);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title={`${profile?.full_name || 'Senior Broker'} | Private Brokerage Partner`}
        description={agent.bio?.slice(0, 160) || undefined}
        ogImage={profile?.avatar_url || undefined}
      />

      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={
            profile?.avatar_url ||
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
          }
          alt={profile?.full_name || 'Agent'}
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover object-top border-2 border-brand-gold/40 shadow-md shrink-0"
        />

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Senior Managing Broker · {agent.years_experience} Yrs Experience</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
              {profile?.full_name}
            </h1>
            <p className="text-xs text-brand-stone-500 font-medium">
              Registration License: {agent.license_number || 'EARB-NAI-0842'}
            </p>
          </div>

          <p className="text-sm text-brand-stone-700 leading-relaxed max-w-2xl">
            {agent.bio}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
            {agent.specialties?.map((spec, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-brand-stone-100 text-brand-stone-800 text-xs font-medium border border-brand-stone-200"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Contact Action Bar */}
          <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
            {agent.whatsapp_number && (
              <a
                href={`https://wa.me/${agent.whatsapp_number.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Direct WhatsApp
                </Button>
              </a>
            )}

            {profile?.phone && (
              <a href={`tel:${profile.phone}`}>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  {profile.phone}
                </Button>
              </a>
            )}

            <Button
              variant="gold"
              size="sm"
              onClick={() => setIsContactModalOpen(true)}
              leftIcon={<Mail className="w-4 h-4" />}
            >
              Send Confidential Message
            </Button>
          </div>
        </div>
      </div>

      {/* Active Listings Represented by Agent */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-brand-stone-200 pb-3">
          <h2 className="font-display font-bold text-2xl text-brand-dark">
            Active Portfolio ({agentProperties.length} Residences)
          </h2>
          <span className="text-xs text-brand-stone-500">Exclusively Represented</span>
        </div>

        {agentProperties.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-brand-stone-200 text-xs text-brand-stone-500">
            No public properties currently assigned. Check back shortly for new mandates.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>

      {/* Contact Agent Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={`Message ${profile?.full_name}`}
        description="Submit your confidential inquiry directly to this broker."
      >
        <ContactForm />
      </Modal>
    </div>
  );
};

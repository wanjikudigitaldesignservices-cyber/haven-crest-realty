import React from 'react';
import { SITE_CONFIG } from '../../config/site';
import { SEOHead } from '../../components/shared/SEOHead';
import { ContactForm } from '../../components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead
        title="Contact Private Advisory Desk"
        description="Get in touch with Haven Crest Real Estate. Private client consultations, viewing requests, and estate representation."
      />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
          Private Concierge
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-dark">
          Connect with Our Advisory Team
        </h1>
        <p className="text-sm sm:text-base text-brand-stone-600 leading-relaxed">
          Whether you are acquiring a trophy asset, listing an estate, or seeking diplomatic relocation services, our partners are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card space-y-6">
          <h2 className="font-display font-bold text-2xl text-brand-dark">
            Send a Confidential Message
          </h2>
          <ContactForm />
        </div>

        {/* Right Column: Office & Direct Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-dark text-white rounded-3xl p-8 space-y-6 shadow-card border border-brand-gold/20">
            <h3 className="font-display font-bold text-xl text-brand-gold">
              Nairobi Managing Offices
            </h3>

            <div className="space-y-4 text-sm text-brand-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Karen Pavilion Offices</p>
                  <p>{SITE_CONFIG.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Line</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-brand-gold transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Private Inquiries</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-brand-gold transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Advisory Hours</p>
                  <p>Monday – Friday: 08:30 – 18:00 EAT</p>
                  <p>Saturday: By Private Appointment Only</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="gold"
                  size="md"
                  className="w-full text-xs"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Direct WhatsApp Concierge
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

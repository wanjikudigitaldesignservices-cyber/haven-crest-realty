import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/site';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Save, CheckCircle2, Webhook, ShieldAlert, Cpu } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [agencyName, setAgencyName] = useState(SITE_CONFIG.name);
  const [phone, setPhone] = useState(SITE_CONFIG.phone);
  const [email, setEmail] = useState(SITE_CONFIG.email);
  const [address, setAddress] = useState(SITE_CONFIG.address);
  const [routingAlgorithm, setRoutingAlgorithm] = useState<'round_robin' | 'neighborhood_specialist'>('neighborhood_specialist');
  const [webhookUrl, setWebhookUrl] = useState(import.meta.env.VITE_MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/lead-dispatcher');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardShell portal="admin">
      <SEOHead title="Brokerage Platform Settings | Admin" />

      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
            Brokerage Platform Settings
          </h1>
          <p className="text-xs text-brand-stone-500 mt-1">
            Configure platform branding, automated lead dispatching algorithms, and external CRM webhooks.
          </p>
        </div>

        {isSaved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Platform configurations and automation routing parameters updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Agency Particulars */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-stone-200 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-brand-dark border-b border-brand-stone-100 pb-2">
              1. Agency Branding & Public Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Brokerage Legal Entity Name"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
              />
              <Input
                label="Direct Office Telephone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Concierge Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Registered Headquarters Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Lead Routing Automation Engine */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-stone-100 pb-2">
              <Cpu className="w-4 h-4 text-brand-gold" />
              <h3 className="font-display font-bold text-base text-brand-dark">
                2. Automated Lead Assignment Engine (Layer 6 & Layer 11)
              </h3>
            </div>

            <div className="space-y-3 text-xs text-brand-stone-600">
              <Select
                label="Lead Routing Algorithm"
                value={routingAlgorithm}
                onChange={(e) => setRoutingAlgorithm(e.target.value as any)}
              >
                <option value="neighborhood_specialist">
                  Neighborhood Specialization (Match agent expertise first, fallback to round-robin)
                </option>
                <option value="round_robin">
                  Strict Round-Robin (Equally cycle across all active brokers)
                </option>
              </Select>
              <p className="text-[11px] text-brand-stone-400">
                New viewing appointments and valuation dossiers will be automatically assigned to qualifying agents based on this heuristic.
              </p>
            </div>
          </div>

          {/* External Webhooks & Make.com CRM Sync */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-stone-100 pb-2">
              <Webhook className="w-4 h-4 text-brand-gold" />
              <h3 className="font-display font-bold text-base text-brand-dark">
                3. External Webhook & CRM Integration (Make.com)
              </h3>
            </div>

            <Input
              label="Make.com / WhatsApp Alert Webhook URL"
              placeholder="https://hook.eu1.make.com/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              helperText="Dispatched automatically on every new lead insertion for instant WhatsApp agent notifications."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="gold" leftIcon={<Save className="w-4 h-4" />}>
              Save Platform Configuration
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};

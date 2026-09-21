import React, { useState } from 'react';
import { useAgents, useUpdateAgentMutation } from '../../hooks/useAgents';
import { mockDb } from '../../lib/supabaseClient';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Textarea } from '../../components/ui/Input';
import { Users, UserPlus, Check, X, Shield, Phone, MessageSquare } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const AdminAgentsPage: React.FC = () => {
  const { data: agents = [], isLoading } = useAgents();
  const updateMutation = useUpdateAgentMutation();
  const queryClient = useQueryClient();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLicense, setNewLicense] = useState('');
  const [newBio, setNewBio] = useState('');

  const handleToggleActive = (id: string, current: boolean) => {
    updateMutation.mutate({ id, updates: { is_active: !current } });
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `usr-agent-${Date.now()}`;
    mockDb.addAgent({
      id: newId,
      bio: newBio || 'Senior advisor specializing in prime East African real estate.',
      years_experience: 5,
      specialties: ['Trophy Estates', 'Diplomatic Relocation'],
      license_number: newLicense || 'EARB-NAI-9999',
      whatsapp_number: newPhone || '+254700000000',
      is_active: true,
      profile: {
        id: newId,
        role: 'agent',
        full_name: newFullName,
        phone: newPhone,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        created_at: new Date().toISOString(),
      },
    });

    queryClient.invalidateQueries({ queryKey: ['agents'] });
    setIsAddModalOpen(false);
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewLicense('');
    setNewBio('');
  };

  return (
    <DashboardShell portal="admin">
      <SEOHead title="Managing Agents Governance | Admin CRM" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              Managing Brokers & Agents
            </h1>
            <p className="text-xs text-brand-stone-500 mt-1">
              Invite authorized brokers, manage practicing licenses, and configure lead routing eligibility.
            </p>
          </div>

          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Invite & Provision Agent
          </Button>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-stone-50 border-b border-brand-stone-200 text-[10px] font-bold text-brand-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Agent Name</th>
                  <th className="py-3 px-4">EARB License</th>
                  <th className="py-3 px-4">Specialties</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-stone-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-brand-stone-400">Loading...</td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-brand-stone-50/60">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              agent.profile?.avatar_url ||
                              'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'
                            }
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-brand-stone-200"
                          />
                          <div>
                            <span className="font-bold text-brand-dark block">
                              {agent.profile?.full_name || 'Agent'}
                            </span>
                            <span className="text-[11px] text-brand-stone-500">
                              {agent.whatsapp_number}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-brand-stone-700">
                        {agent.license_number}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {agent.specialties?.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-brand-stone-100 text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            agent.is_active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {agent.is_active ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(agent.id, agent.is_active)}
                          className={`h-7 text-xs px-2.5 ${
                            agent.is_active
                              ? 'text-rose-600 border-rose-200 hover:bg-rose-50'
                              : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          {agent.is_active ? 'Suspend' : 'Reactivate'}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Agent Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision New Broker Account"
        description="Invite an authorized broker with licensed EARB credentials."
      >
        <form onSubmit={handleCreateAgent} className="space-y-4">
          <Input
            label="Full Legal Name *"
            required
            placeholder="e.g. Sophia Montgomery"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Corporate Email *"
              type="email"
              required
              placeholder="s.montgomery@havencrest-realty.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Input
              label="WhatsApp Phone Number *"
              required
              placeholder="+254 711 222 333"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </div>

          <Input
            label="EARB Practicing License Number *"
            required
            placeholder="EARB-NAI-2041"
            value={newLicense}
            onChange={(e) => setNewLicense(e.target.value)}
          />

          <Textarea
            label="Bio / Track Record Summary"
            rows={3}
            placeholder="Experience with diplomatic enclaves, investment trusts, and luxury transactions..."
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Create & Provision Account
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
};

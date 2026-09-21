import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLeads, useUpdateLeadStatusMutation } from '../../hooks/useLeads';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../lib/utils';
import { LeadStatus } from '../../types/database';
import { 
  Inbox, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronRight,
  Filter
} from 'lucide-react';

export const AgentLeadsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: leads = [], isLoading } = useLeads();
  const updateStatusMutation = useUpdateLeadStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const agentLeads = leads.filter((l) => l.assigned_agent_id === user?.id || user?.role === 'agent');
  const filtered = selectedStatus === 'all' ? agentLeads : agentLeads.filter((l) => l.status === selectedStatus);

  const handleAdvanceStatus = (id: string, current: LeadStatus) => {
    const nextStatusMap: Record<LeadStatus, LeadStatus> = {
      new: 'contacted',
      contacted: 'qualified',
      qualified: 'closed',
      closed: 'closed',
    };
    updateStatusMutation.mutate({ id, status: nextStatusMap[current] });
  };

  const getStatusBadge = (status: LeadStatus) => {
    const styles = {
      new: 'bg-amber-50 text-amber-700 border-amber-200',
      contacted: 'bg-blue-50 text-blue-700 border-blue-200',
      qualified: 'bg-purple-50 text-purple-700 border-purple-200',
      closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <DashboardShell portal="agent">
      <SEOHead title="Leads & Client Pipeline" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              Assigned Client Pipeline
            </h1>
            <p className="text-xs text-brand-stone-500 mt-1">
              Manage prospective buyers, viewing itineraries, and property valuation requests.
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-brand-stone-200 text-xs">
            {(['all', 'new', 'contacted', 'qualified', 'closed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                  selectedStatus === st
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-stone-600 hover:text-brand-dark'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 py-20 text-center text-brand-stone-400">Loading pipeline...</div>
          ) : filtered.length === 0 ? (
            <div className="col-span-2 py-16 text-center bg-white rounded-2xl border border-brand-stone-200 p-8 space-y-2">
              <p className="font-display font-bold text-lg text-brand-dark">No inquiries in this pipeline stage</p>
              <p className="text-xs text-brand-stone-500">Select "All" to view all assigned leads.</p>
            </div>
          ) : (
            filtered.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl p-6 border border-brand-stone-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-card transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-brand-dark">
                          {lead.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-stone-100 text-brand-stone-700">
                          {lead.type}
                        </span>
                      </div>
                      <p className="text-xs text-brand-stone-500 mt-0.5">
                        Received: {formatDate(lead.created_at)}
                      </p>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>

                  {/* Viewing details or valuation specs */}
                  {lead.preferred_date && (
                    <div className="p-2.5 rounded-xl bg-brand-stone-50 border border-brand-stone-200 text-xs text-brand-stone-700 flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>
                        <strong className="text-brand-dark">Requested Viewing:</strong> {lead.preferred_date} ({lead.preferred_time})
                      </span>
                    </div>
                  )}

                  {lead.valuation_property_type && (
                    <div className="p-2.5 rounded-xl bg-brand-stone-50 border border-brand-stone-200 text-xs text-brand-stone-700">
                      <p>
                        <strong className="text-brand-dark">Valuation Target:</strong> {lead.valuation_property_type} ({lead.valuation_bedrooms} Beds)
                      </p>
                      <p className="text-brand-stone-500">{lead.valuation_address}</p>
                    </div>
                  )}

                  {lead.message && (
                    <p className="text-xs text-brand-stone-600 bg-white p-3 rounded-xl border border-brand-stone-100 leading-relaxed italic">
                      "{lead.message}"
                    </p>
                  )}
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-brand-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50 h-8"
                        leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                      >
                        WhatsApp
                      </Button>
                    </a>

                    <a href={`tel:${lead.phone}`}>
                      <Button variant="secondary" size="sm" className="text-xs h-8" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                        Call
                      </Button>
                    </a>
                  </div>

                  {lead.status !== 'closed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAdvanceStatus(lead.id, lead.status)}
                      className="text-xs font-semibold text-brand-dark hover:text-brand-gold h-8 gap-1"
                    >
                      <span>Advance Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  );
};

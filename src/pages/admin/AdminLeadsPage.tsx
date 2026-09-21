import React, { useState } from 'react';
import { useLeads, useUpdateLeadStatusMutation } from '../../hooks/useLeads';
import { useAgents } from '../../hooks/useAgents';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../lib/utils';
import { LeadStatus } from '../../types/database';
import { 
  Inbox, 
  Phone, 
  MessageSquare, 
  UserCheck, 
  Filter, 
  CheckCircle,
  Calendar,
  Download
} from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const { data: leads = [], isLoading } = useLeads();
  const { data: agents = [] } = useAgents();
  const updateStatusMutation = useUpdateLeadStatusMutation();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = statusFilter === 'all' ? leads : leads.filter((l) => l.status === statusFilter);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleAssignAgent = (id: string, agentId: string) => {
    const current = leads.find((l) => l.id === id);
    if (current) {
      updateStatusMutation.mutate({
        id,
        status: current.status,
        assignedAgentId: agentId || undefined,
      });
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Name,Phone,Email,Type,Status,Assigned Agent,Date"]
      .concat(leads.map(l => `"${l.name}","${l.phone}","${l.email || ''}","${l.type}","${l.status}","${l.assigned_agent?.profile?.full_name || 'Unassigned'}","${l.created_at}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `haven_crest_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardShell portal="admin">
      <SEOHead title="Master CRM Leads Pipeline | Admin" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              Agency Master CRM Leads
            </h1>
            <p className="text-xs text-brand-stone-500 mt-1">
              Real-time central log of viewing bookings, valuation dossiers, and prospective buyer inquiries.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Pipeline (CSV)
          </Button>
        </div>

        {/* Status Filter Bar */}
        <div className="flex gap-2 border-b border-brand-stone-200 pb-2 overflow-x-auto">
          {(['all', 'new', 'contacted', 'qualified', 'closed'] as const).map((st) => {
            const count = st === 'all' ? leads.length : leads.filter((l) => l.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize flex items-center gap-1.5 transition-all ${
                  statusFilter === st
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-stone-600 hover:text-brand-dark hover:bg-brand-stone-200/60'
                }`}
              >
                <span>{st}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === st ? 'bg-white/20 text-white' : 'bg-brand-stone-200 text-brand-stone-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-stone-50 border-b border-brand-stone-200 text-[10px] font-bold text-brand-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Client Contact</th>
                  <th className="py-3 px-4">Lead Type</th>
                  <th className="py-3 px-4">Target / Specifics</th>
                  <th className="py-3 px-4">Pipeline Status</th>
                  <th className="py-3 px-4">Assigned Broker</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-stone-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-brand-stone-400">Loading pipeline...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-brand-stone-400">
                      No leads match the "{statusFilter}" stage.
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-stone-50/60">
                      <td className="py-3 px-4">
                        <span className="font-bold text-brand-dark block">{lead.name}</span>
                        <span className="text-[11px] text-brand-stone-500">{lead.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-stone-100 text-brand-stone-700">
                          {lead.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-brand-stone-600">
                        {lead.property?.title ||
                          lead.valuation_property_type ||
                          lead.message ||
                          'General Portfolio Inquiry'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="rounded-lg border border-brand-stone-300 py-1 px-2 text-[11px] font-semibold uppercase bg-white focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.assigned_agent_id || ''}
                          onChange={(e) => handleAssignAgent(lead.id, e.target.value)}
                          className="rounded-lg border border-brand-stone-300 py-1 px-2 text-xs bg-white focus:outline-none"
                        >
                          <option value="">-- Unassigned --</option>
                          {agents.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.profile?.full_name || a.id}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-brand-stone-500 text-[11px]">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^\d]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-brand-stone-100 text-brand-stone-700 hover:bg-brand-stone-200"
                            title="Call client"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

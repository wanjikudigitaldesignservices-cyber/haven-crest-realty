import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useProperties } from '../../hooks/useProperties';
import { useLeads } from '../../hooks/useLeads';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { 
  Building2, 
  Inbox, 
  PlusCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  Eye
} from 'lucide-react';

export const AgentDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: properties = [] } = useProperties();
  const { data: leads = [] } = useLeads();

  const agentProperties = properties.filter((p) => p.agent_id === user?.id || user?.role === 'agent');
  const agentLeads = leads.filter((l) => l.assigned_agent_id === user?.id || user?.role === 'agent');
  const newLeadsCount = agentLeads.filter((l) => l.status === 'new').length;

  return (
    <DashboardShell portal="agent">
      <SEOHead title="Agent Workspace Dashboard" />

      <div className="space-y-8">
        {/* Header with Greeting & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Managing Broker Portal
            </span>
            <h1 className="font-display font-extrabold text-3xl text-brand-dark">
              Welcome, {user?.full_name?.split(' ')[0] || 'Broker'}
            </h1>
            <p className="text-xs text-brand-stone-500 mt-0.5">
              Review your assigned client pipeline, viewing requests, and listing status.
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/agent/listings/new">
              <Button variant="gold" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Create New Listing
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Mandates</span>
              <Building2 className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">{agentProperties.length}</p>
            <p className="text-[11px] text-brand-stone-500">Represented residences</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">New Inquiries</span>
              <Inbox className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">{newLeadsCount}</p>
            <p className="text-[11px] text-amber-600 font-medium">Require broker contact</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Pipeline</span>
              <TrendingUp className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">{agentLeads.length}</p>
            <p className="text-[11px] text-brand-stone-500">Assigned buyer/seller leads</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">34.2%</p>
            <p className="text-[11px] text-emerald-600 font-medium">Above market benchmark</p>
          </div>
        </div>

        {/* Two-Column Grid: Recent Leads & Managed Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-stone-100 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-dark">
                Assigned Inquiries & Leads
              </h3>
              <Link to="/agent/leads" className="text-xs font-semibold text-brand-gold-dark hover:underline">
                View All Leads
              </Link>
            </div>

            {agentLeads.length === 0 ? (
              <p className="text-xs text-brand-stone-400 py-6 text-center">No assigned inquiries yet.</p>
            ) : (
              <div className="divide-y divide-brand-stone-100 space-y-2">
                {agentLeads.slice(0, 4).map((lead) => (
                  <div key={lead.id} className="pt-2 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-dark">{lead.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-stone-100 text-brand-stone-700 font-semibold uppercase">
                          {lead.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-stone-500 line-clamp-1">{lead.message || lead.phone}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Managed Listings */}
          <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-stone-100 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-dark">
                My Property Listings
              </h3>
              <Link to="/agent/listings" className="text-xs font-semibold text-brand-gold-dark hover:underline">
                Manage All Listings
              </Link>
            </div>

            {agentProperties.length === 0 ? (
              <p className="text-xs text-brand-stone-400 py-6 text-center">No listings drafted yet.</p>
            ) : (
              <div className="divide-y divide-brand-stone-100 space-y-2">
                {agentProperties.slice(0, 4).map((prop) => (
                  <div key={prop.id} className="pt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80'}
                        alt={prop.title}
                        className="w-12 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-brand-dark line-clamp-1">{prop.title}</h4>
                        <span className="text-[11px] text-brand-stone-500">{formatCurrency(prop.price)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={prop.status} />
                      <Link to={`/agent/listings/${prop.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

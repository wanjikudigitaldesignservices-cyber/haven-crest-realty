import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useProperties, useUpdatePropertyStatusMutation } from '../../hooks/useProperties';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { PlusCircle, Edit, ExternalLink, Trash2, Send } from 'lucide-react';
import { PropertyStatus } from '../../types/database';

export const AgentListingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: properties = [], isLoading } = useProperties();
  const updateStatusMutation = useUpdatePropertyStatusMutation();
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'pending_approval' | 'draft'>('all');

  const agentProperties = properties.filter((p) => p.agent_id === user?.id || user?.role === 'agent');
  const filtered = activeTab === 'all' ? agentProperties : agentProperties.filter((p) => p.status === activeTab);

  const handleSubmitForApproval = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'pending_approval' });
  };

  return (
    <DashboardShell portal="agent">
      <SEOHead title="Manage Listings | Agent Portal" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              My Real Estate Listings
            </h1>
            <p className="text-xs text-brand-stone-500 mt-1">
              Create, update, and submit luxury property mandates for administrative approval.
            </p>
          </div>

          <Link to="/agent/listings/new">
            <Button variant="gold" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Draft New Property
            </Button>
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 border-b border-brand-stone-200 pb-2 overflow-x-auto">
          {(['all', 'published', 'pending_approval', 'draft'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-brand-dark text-white'
                  : 'text-brand-stone-600 hover:text-brand-dark hover:bg-brand-stone-200/60'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-stone-50 border-b border-brand-stone-200 text-[10px] font-bold text-brand-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Updated</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-stone-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-brand-stone-400">
                      Loading listings...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-brand-stone-400">
                      No listings found for this category.
                    </td>
                  </tr>
                ) : (
                  filtered.map((property) => (
                    <tr key={property.id} className="hover:bg-brand-stone-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80'}
                            alt={property.title}
                            className="w-12 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <span className="font-bold text-brand-dark line-clamp-1">
                              {property.title}
                            </span>
                            <span className="text-[11px] text-brand-stone-500">
                              {property.neighborhood?.name || 'Exclusive'} · {property.address}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 uppercase font-semibold text-[10px] text-brand-stone-600">
                        {property.listing_type}
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-dark">
                        {formatCurrency(property.price)}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={property.status} />
                      </td>
                      <td className="py-3 px-4 text-brand-stone-500 text-[11px]">
                        {formatDate(property.updated_at || property.created_at)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {property.status === 'draft' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSubmitForApproval(property.id)}
                              className="h-7 text-[11px] px-2 text-brand-gold-dark border-brand-gold/40"
                              leftIcon={<Send className="w-3 h-3" />}
                              title="Submit for admin moderation"
                            >
                              Submit
                            </Button>
                          )}
                          <Link to={`/agent/listings/${property.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <Edit className="w-3.5 h-3.5 text-brand-stone-600" />
                            </Button>
                          </Link>
                          <Link to={`/property/${property.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <ExternalLink className="w-3.5 h-3.5 text-brand-stone-600" />
                            </Button>
                          </Link>
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

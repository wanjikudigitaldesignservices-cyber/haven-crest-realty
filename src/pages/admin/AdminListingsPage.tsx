import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties, useUpdatePropertyStatusMutation } from '../../hooks/useProperties';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Check, X, Archive, Eye, CheckSquare, PlusCircle } from 'lucide-react';
import { PropertyStatus } from '../../types/database';

export const AdminListingsPage: React.FC = () => {
  const { data: properties = [], isLoading } = useProperties();
  const updateStatusMutation = useUpdatePropertyStatusMutation();
  const [activeTab, setActiveTab] = useState<'all' | 'pending_approval' | 'published' | 'draft' | 'archived'>('pending_approval');

  const filtered = activeTab === 'all'
    ? properties
    : properties.filter((p) => p.status === activeTab);

  const handleSetStatus = (id: string, status: PropertyStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <DashboardShell portal="admin">
      <SEOHead title="Listing Moderation & Approvals | Admin CRM" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
              Listings Moderation & Governance
            </h1>
            <p className="text-xs text-brand-stone-500 mt-1">
              Review agent submissions, audit title clearances, and publish or archive property records.
            </p>
          </div>

          <Link to="/agent/listings/new">
            <Button variant="gold" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Create Direct Mandate
            </Button>
          </Link>
        </div>

        {/* Tab Filter */}
        <div className="flex gap-2 border-b border-brand-stone-200 pb-2 overflow-x-auto">
          {(['pending_approval', 'published', 'draft', 'archived', 'all'] as const).map((tab) => {
            const count = tab === 'all' ? properties.length : properties.filter((p) => p.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize flex items-center gap-1.5 transition-all ${
                  activeTab === tab
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-stone-600 hover:text-brand-dark hover:bg-brand-stone-200/60'
                }`}
              >
                <span>{tab.replace('_', ' ')}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-brand-stone-200 text-brand-stone-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Listings Moderation Table */}
        <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-stone-50 border-b border-brand-stone-200 text-[10px] font-bold text-brand-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Listing Agent</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-stone-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-brand-stone-400">Loading...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-brand-stone-400">
                      No listings under "{activeTab.replace('_', ' ')}"
                    </td>
                  </tr>
                ) : (
                  filtered.map((prop) => (
                    <tr key={prop.id} className="hover:bg-brand-stone-50/60">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prop.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80'}
                            alt=""
                            className="w-12 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <span className="font-bold text-brand-dark block">{prop.title}</span>
                            <span className="text-[11px] text-brand-stone-500">{prop.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-brand-stone-700">
                        {prop.agent?.profile?.full_name || 'Direct Brokerage'}
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-dark">
                        {formatCurrency(prop.price)}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={prop.status} />
                      </td>
                      <td className="py-3 px-4 text-brand-stone-500 text-[11px]">
                        {formatDate(prop.updated_at || prop.created_at)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {prop.status !== 'published' && (
                            <Button
                              variant="gold"
                              size="sm"
                              onClick={() => handleSetStatus(prop.id, 'published')}
                              className="h-7 text-xs px-2 text-brand-dark font-semibold"
                              leftIcon={<Check className="w-3 h-3" />}
                              title="Approve and Publish to live site"
                            >
                              Publish
                            </Button>
                          )}
                          {prop.status === 'pending_approval' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetStatus(prop.id, 'draft')}
                              className="h-7 text-xs px-2 text-rose-600 border-rose-200 hover:bg-rose-50"
                              leftIcon={<X className="w-3 h-3" />}
                              title="Reject back to draft"
                            >
                              Reject
                            </Button>
                          )}
                          {prop.status === 'published' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetStatus(prop.id, 'archived')}
                              className="h-7 text-xs px-2 text-brand-stone-600"
                              leftIcon={<Archive className="w-3 h-3" />}
                              title="Archive listing"
                            >
                              Archive
                            </Button>
                          )}
                          <Link to={`/property/${prop.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <Eye className="w-3.5 h-3.5 text-brand-stone-600" />
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

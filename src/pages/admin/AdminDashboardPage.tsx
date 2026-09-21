import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties, useUpdatePropertyStatusMutation } from '../../hooks/useProperties';
import { useLeads } from '../../hooks/useLeads';
import { useAgents } from '../../hooks/useAgents';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { 
  ShieldCheck, 
  CheckSquare, 
  Users, 
  Inbox, 
  TrendingUp, 
  AlertCircle, 
  Check, 
  X,
  ArrowRight
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { data: properties = [] } = useProperties();
  const { data: leads = [] } = useLeads();
  const { data: agents = [] } = useAgents();
  const updateStatusMutation = useUpdatePropertyStatusMutation();

  const pendingListings = properties.filter((p) => p.status === 'pending_approval');
  const publishedListings = properties.filter((p) => p.status === 'published');
  const totalPortfolioValue = publishedListings.reduce((sum, p) => sum + p.price, 0);

  const handleApprove = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'published' });
  };

  const handleReject = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'draft' });
  };

  return (
    <DashboardShell portal="admin">
      <SEOHead title="Executive Administration Dashboard" />

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Executive Governance
            </span>
            <h1 className="font-display font-extrabold text-3xl text-brand-dark">
              Brokerage Master Dashboard
            </h1>
            <p className="text-xs text-brand-stone-500 mt-0.5">
              Supervise listing moderations, agent allocations, and real-time CRM lead pipelines.
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/admin/listings">
              <Button variant="gold" size="sm" leftIcon={<CheckSquare className="w-4 h-4" />}>
                Review Moderation ({pendingListings.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Executive KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Published Portfolio</span>
              <TrendingUp className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="font-display font-bold text-2xl sm:text-3xl text-brand-dark truncate">
              {formatCurrency(totalPortfolioValue)}
            </p>
            <p className="text-[11px] text-brand-stone-500">{publishedListings.length} live public residences</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Moderation Queue</span>
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">{pendingListings.length}</p>
            <p className="text-[11px] text-amber-600 font-medium">Awaiting administrator approval</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">CRM Lead Inquiries</span>
              <Inbox className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">{leads.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium">Viewings, valuations & contacts</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-brand-stone-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Brokers</span>
              <Users className="w-5 h-5 text-brand-gold" />
            </div>
            <p className="font-display font-bold text-3xl text-brand-dark">{agents.length}</p>
            <p className="text-[11px] text-brand-stone-500">Licensed managing advisors</p>
          </div>
        </div>

        {/* Listings Moderation Queue */}
        <div className="bg-white rounded-2xl border border-brand-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-brand-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-brand-gold" />
              <h3 className="font-display font-bold text-lg text-brand-dark">
                Listings Moderation Queue ({pendingListings.length})
              </h3>
            </div>
            <Link to="/admin/listings" className="text-xs font-semibold text-brand-gold-dark hover:underline">
              View Moderation Board
            </Link>
          </div>

          {pendingListings.length === 0 ? (
            <div className="py-12 text-center text-xs text-brand-stone-400 space-y-1">
              <p className="font-semibold text-brand-dark">Moderation queue is clear</p>
              <p>All agent listings are currently reviewed and published.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-stone-50 border-b border-brand-stone-200 text-[10px] font-bold text-brand-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Property</th>
                    <th className="py-3 px-4">Agent</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-stone-100">
                  {pendingListings.map((prop) => (
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
                        {prop.agent?.profile?.full_name || 'Assigned Agent'}
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-dark">
                        {formatCurrency(prop.price)}
                      </td>
                      <td className="py-3 px-4 text-brand-stone-500 text-[11px]">
                        {formatDate(prop.created_at)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="gold"
                            size="sm"
                            onClick={() => handleApprove(prop.id)}
                            className="h-7 text-xs px-2.5"
                            leftIcon={<Check className="w-3 h-3" />}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(prop.id)}
                            className="h-7 text-xs px-2 text-rose-600 border-rose-200 hover:bg-rose-50"
                            leftIcon={<X className="w-3 h-3" />}
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
};

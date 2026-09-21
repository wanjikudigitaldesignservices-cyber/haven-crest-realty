import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SITE_CONFIG } from '../../config/site';
import { 
  Building2, 
  LayoutDashboard, 
  Home, 
  PlusCircle, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  Layers,
  Inbox,
  CheckSquare
} from 'lucide-react';

interface DashboardShellProps {
  children: React.ReactNode;
  portal: 'agent' | 'admin';
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children, portal }) => {
  const { user, role, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const agentLinks = [
    { label: 'Overview', href: '/agent/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', href: '/agent/listings', icon: Home },
    { label: 'Create Listing', href: '/agent/listings/new', icon: PlusCircle },
    { label: 'Assigned Leads', href: '/agent/leads', icon: Inbox },
    { label: 'Profile & Settings', href: '/agent/settings', icon: Settings },
  ];

  const adminLinks = [
    { label: 'Executive KPIs', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Listings Moderation', href: '/admin/listings', icon: CheckSquare },
    { label: 'Agents Management', href: '/admin/agents', icon: Users },
    { label: 'Leads CRM Pipeline', href: '/admin/leads', icon: Inbox },
    { label: 'Content & CMS', href: '/admin/content', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  const navLinks = portal === 'admin' ? adminLinks : agentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brand-stone-100 flex flex-col lg:flex-row">
      {/* Mobile Top Nav */}
      <div className="lg:hidden bg-brand-dark text-white px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-5 h-5 text-brand-gold" />
          <span className="font-display font-bold text-base">
            {portal === 'admin' ? 'Admin CRM' : 'Agent Portal'}
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-brand-stone-300 hover:text-white"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-dark text-brand-stone-300 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center text-brand-dark font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-base leading-none">
                {SITE_CONFIG.shortName}
              </h2>
              <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider">
                {portal === 'admin' ? 'Admin Portal' : 'Agent Workspace'}
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'}
            alt={user?.full_name || 'User'}
            className="w-10 h-10 rounded-full object-cover border border-brand-gold/40"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.full_name}</p>
            <p className="text-[11px] text-brand-gold font-medium uppercase tracking-wider">{role}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-gold text-brand-dark font-semibold'
                    : 'text-brand-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 text-xs">
          <Link
            to="/"
            className="flex items-center justify-between text-brand-stone-400 hover:text-white p-2 rounded hover:bg-white/5 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-rose-400 hover:text-rose-300 p-2 rounded hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar on Desktop */}
        <div className="hidden lg:flex items-center justify-between bg-white border-b border-brand-stone-200 px-8 py-3.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-brand-stone-500">
            <span>Portal</span>
            <span>/</span>
            <span className="font-semibold text-brand-stone-900 capitalize">
              {location.pathname.split('/')[2] || 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="text-xs text-brand-stone-600 hover:text-brand-dark flex items-center gap-1">
              <span>View live site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

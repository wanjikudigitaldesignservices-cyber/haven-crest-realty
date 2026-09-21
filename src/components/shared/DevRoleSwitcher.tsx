import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, UserCheck, Eye, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DevRoleSwitcher: React.FC = () => {
  const { role, user, setRole } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-brand-dark/95 backdrop-blur-md border border-brand-gold/40 text-white rounded-xl shadow-modal overflow-hidden transition-all text-xs">
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/5 transition-colors w-full"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-[11px] text-brand-gold">
            Role: {role}
          </span>
          <span className="text-brand-stone-400 text-[11px] truncate max-w-[100px]">
            ({user?.full_name?.split(' ')[0]})
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-brand-stone-400" /> : <ChevronUp className="w-3.5 h-3.5 text-brand-stone-400" />}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="p-3 border-t border-white/10 space-y-3 min-w-[240px]">
            <div>
              <p className="text-[10px] text-brand-stone-400 uppercase tracking-wider font-semibold mb-1.5">
                Switch Active Persona:
              </p>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setRole('visitor')}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg border text-[10px] transition-all ${
                    role === 'visitor'
                      ? 'bg-brand-gold text-brand-dark font-bold border-brand-gold'
                      : 'border-white/10 hover:bg-white/10 text-brand-stone-300'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 mb-1" />
                  Visitor
                </button>
                <button
                  onClick={() => setRole('agent')}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg border text-[10px] transition-all ${
                    role === 'agent'
                      ? 'bg-brand-gold text-brand-dark font-bold border-brand-gold'
                      : 'border-white/10 hover:bg-white/10 text-brand-stone-300'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 mb-1" />
                  Agent
                </button>
                <button
                  onClick={() => setRole('admin')}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg border text-[10px] transition-all ${
                    role === 'admin'
                      ? 'bg-brand-gold text-brand-dark font-bold border-brand-gold'
                      : 'border-white/10 hover:bg-white/10 text-brand-stone-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 mb-1" />
                  Admin
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1">
              <p className="text-[10px] text-brand-stone-400 uppercase tracking-wider font-semibold">
                Quick Portal Navigation:
              </p>
              <div className="flex flex-col gap-1">
                <Link
                  to="/"
                  className="flex items-center justify-between text-brand-stone-300 hover:text-white px-2 py-1 rounded hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Public Front-End</span>
                  <ExternalLink className="w-3 h-3 text-brand-stone-400" />
                </Link>
                <Link
                  to="/agent/dashboard"
                  className="flex items-center justify-between text-brand-stone-300 hover:text-white px-2 py-1 rounded hover:bg-white/5"
                  onClick={() => {
                    setRole('agent');
                    setIsOpen(false);
                  }}
                >
                  <span>Agent Dashboard</span>
                  <ExternalLink className="w-3 h-3 text-brand-stone-400" />
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-between text-brand-stone-300 hover:text-white px-2 py-1 rounded hover:bg-white/5"
                  onClick={() => {
                    setRole('admin');
                    setIsOpen(false);
                  }}
                >
                  <span>Admin Dashboard</span>
                  <ExternalLink className="w-3 h-3 text-brand-stone-400" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

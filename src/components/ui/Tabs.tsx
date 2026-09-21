import React from 'react';
import { cn } from '../../lib/utils';

interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn("flex space-x-1 border-b border-brand-stone-200 overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-all whitespace-nowrap relative border-b-2 flex items-center gap-2",
              isActive
                ? "border-brand-dark text-brand-dark font-semibold"
                : "border-transparent text-brand-stone-500 hover:text-brand-stone-800 hover:border-brand-stone-300"
            )}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  isActive
                    ? "bg-brand-dark text-white font-normal"
                    : "bg-brand-stone-200 text-brand-stone-700"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

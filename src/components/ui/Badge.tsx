import React from 'react';
import { cn } from '../../lib/utils';
import { PropertyStatus, ListingType } from '../../types/database';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'outline' | 'success' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-brand-stone-100 text-brand-stone-800 border-brand-stone-200',
    gold: 'bg-brand-gold/15 text-brand-gold-dark border-brand-gold/30 font-semibold',
    outline: 'border border-brand-stone-300 text-brand-stone-700 bg-transparent',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: PropertyStatus }> = ({ status }) => {
  switch (status) {
    case 'published':
      return <Badge variant="success">Published</Badge>;
    case 'pending_approval':
      return <Badge variant="warning">Pending Approval</Badge>;
    case 'draft':
      return <Badge variant="default">Draft</Badge>;
    case 'archived':
      return <Badge variant="outline">Archived</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const ListingTypeBadge: React.FC<{ type: ListingType }> = ({ type }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-brand-dark/80 backdrop-blur-md text-white shadow-sm">
      For {type === 'buy' ? 'Sale' : 'Rent'}
    </span>
  );
};

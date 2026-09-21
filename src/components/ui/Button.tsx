import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-[0.98]";

    const variantStyles = {
      primary: "bg-brand-dark hover:bg-brand-charcoal text-white shadow-sm focus-visible:ring-brand-dark",
      secondary: "bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-stone-900 focus-visible:ring-brand-stone-400",
      gold: "bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-semibold shadow-sm focus-visible:ring-brand-gold",
      outline: "border border-brand-stone-300 hover:border-brand-dark text-brand-stone-800 hover:bg-brand-stone-50 focus-visible:ring-brand-dark",
      ghost: "hover:bg-brand-stone-100 text-brand-stone-700 hover:text-brand-stone-900 focus-visible:ring-brand-stone-300",
      danger: "bg-rose-600 hover:bg-rose-700 text-white focus-visible:ring-rose-500",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-13 px-7 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

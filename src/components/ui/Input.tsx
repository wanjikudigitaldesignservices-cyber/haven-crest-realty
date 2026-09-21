import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, leftIcon, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-brand-stone-700 tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-stone-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-brand-stone-300 bg-white px-3.5 py-2.5 text-sm text-brand-stone-900 transition-colors placeholder:text-brand-stone-400 focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark disabled:bg-brand-stone-50 disabled:opacity-60",
              leftIcon && "pl-10",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-brand-stone-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-brand-stone-700 tracking-wide uppercase">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-brand-stone-300 bg-white px-3.5 py-2.5 text-sm text-brand-stone-900 transition-colors placeholder:text-brand-stone-400 focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark disabled:bg-brand-stone-50 disabled:opacity-60 min-h-[100px]",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-brand-stone-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, children, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-brand-stone-700 tracking-wide uppercase">
            {label}
          </label>
        )}
        <select
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-brand-stone-300 bg-white px-3.5 py-2.5 text-sm text-brand-stone-900 transition-colors focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark disabled:bg-brand-stone-50 disabled:opacity-60",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

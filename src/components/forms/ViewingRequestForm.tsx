import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ViewingRequestSchema, ViewingRequestFormData } from '../../lib/validators';
import { useSubmitLeadMutation } from '../../hooks/useLeads';
import { Input, Textarea, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { HoneypotField } from './HoneypotField';
import confetti from 'canvas-confetti';
import { CheckCircle2, Calendar, Clock, ShieldCheck } from 'lucide-react';

interface ViewingRequestFormProps {
  propertyId?: string;
  propertyTitle?: string;
  onSuccess?: () => void;
}

export const ViewingRequestForm: React.FC<ViewingRequestFormProps> = ({
  propertyId,
  propertyTitle,
  onSuccess,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitLeadMutation = useSubmitLeadMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ViewingRequestFormData>({
    resolver: zodResolver(ViewingRequestSchema),
    defaultValues: {
      property_id: propertyId || '',
      preferred_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferred_time: '14:00 - 16:00',
    },
  });

  const onSubmit = async (data: ViewingRequestFormData) => {
    // Bot check
    if (data.honeypot) {
      console.warn('Bot trap triggered');
      return;
    }

    await submitLeadMutation.mutateAsync({
      type: 'viewing',
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
      property_id: propertyId || null,
      assigned_agent_id: null,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
    });

    setIsSubmitted(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    reset();
    if (onSuccess) onSuccess();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 space-y-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-bold text-lg text-brand-dark">Viewing Request Received</h4>
          <p className="text-xs text-brand-stone-600 max-w-sm mx-auto leading-relaxed">
            Our private brokerage concierge will contact you within 2 business hours to confirm security clearance and itinerary for {propertyTitle || 'your selected property'}.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
          className="mt-2 text-xs"
        >
          Book Another Date
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <HoneypotField register={register} />

      {propertyTitle && (
        <div className="p-3 bg-brand-stone-100 rounded-xl text-xs text-brand-stone-700">
          <span className="font-semibold text-brand-dark">Selected Residence:</span> {propertyTitle}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Your Full Name *"
          placeholder="e.g. Lady Sarah Bennett"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Phone Number (WhatsApp) *"
          placeholder="+254 712 345 678"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Input
        label="Email Address (Optional)"
        type="email"
        placeholder="client@organization.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Preferred Date *"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          error={errors.preferred_date?.message}
          {...register('preferred_date')}
        />
        <Select
          label="Preferred Time Slot *"
          error={errors.preferred_time?.message}
          {...register('preferred_time')}
        >
          <option value="10:00 - 12:00">Morning (10:00 - 12:00)</option>
          <option value="12:00 - 14:00">Midday (12:00 - 14:00)</option>
          <option value="14:00 - 16:00">Afternoon (14:00 - 16:00)</option>
          <option value="16:00 - 18:00">Sunset Twilight (16:00 - 18:00)</option>
        </Select>
      </div>

      <Textarea
        label="Special Viewing Notes or Security Requirements"
        placeholder="Mention any specific requirements (e.g., diplomatic escort, helicopter landing, dual buyers)..."
        rows={2}
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="gold"
          className="w-full"
          isLoading={submitLeadMutation.isPending}
        >
          Confirm Private Viewing Itinerary
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-stone-500">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
        <span>Discreet representation. Non-disclosure agreements available upon request.</span>
      </div>
    </form>
  );
};

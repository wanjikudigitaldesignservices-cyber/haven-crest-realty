import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValuationRequestSchema, ValuationRequestFormData } from '../../lib/validators';
import { useSubmitLeadMutation } from '../../hooks/useLeads';
import { Input, Textarea, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { HoneypotField } from './HoneypotField';
import confetti from 'canvas-confetti';
import { CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

interface ValuationFormProps {
  onSuccess?: () => void;
}

export const ValuationForm: React.FC<ValuationFormProps> = ({ onSuccess }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitLeadMutation = useSubmitLeadMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValuationRequestFormData>({
    resolver: zodResolver(ValuationRequestSchema),
    defaultValues: {
      valuation_property_type: 'Estate / Villa',
      valuation_bedrooms: 4,
    },
  });

  const onSubmit = async (data: ValuationRequestFormData) => {
    if (data.honeypot) return;

    await submitLeadMutation.mutateAsync({
      type: 'valuation',
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
      property_id: null,
      assigned_agent_id: null,
      valuation_property_type: data.valuation_property_type,
      valuation_bedrooms: data.valuation_bedrooms,
      valuation_address: data.valuation_address,
    });

    setIsSubmitted(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    reset();
    if (onSuccess) onSuccess();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 px-6 space-y-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="font-display font-bold text-xl text-brand-dark">Valuation Dossier Initiated</h4>
        <p className="text-xs text-brand-stone-600 max-w-md mx-auto leading-relaxed">
          Our Senior Valuations Partner has received your submission. We are compiling comparative market transactions, recent land indices, and replacement cost modeling for your asset. Expect our confidential report within 24 hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
          className="mt-2 text-xs"
        >
          Submit Another Property
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <HoneypotField register={register} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name *"
          placeholder="e.g. Dr. Arthur M. Vance"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Phone / WhatsApp Contact *"
          placeholder="+254 700 123 456"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="avance@capital-partners.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Asset Category *"
          error={errors.valuation_property_type?.message}
          {...register('valuation_property_type')}
        >
          <option value="Estate / Villa">Detached Luxury Estate / Villa</option>
          <option value="Townhouse">Gated Townhouse</option>
          <option value="Penthouse">Sky Penthouse / Duplex</option>
          <option value="Land Parcel">Multi-Acre Land / Development Plot</option>
          <option value="Commercial">Commercial / Mixed-Use</option>
        </Select>

        <Input
          label="Number of Bedrooms *"
          type="number"
          min={1}
          max={30}
          error={errors.valuation_bedrooms?.message}
          {...register('valuation_bedrooms')}
        />
      </div>

      <Input
        label="Property Location / Address *"
        placeholder="e.g. Muringa Drive, Karen, Nairobi (or approximate zone)"
        error={errors.valuation_address?.message}
        {...register('valuation_address')}
      />

      <Textarea
        label="Key Features, Recent Renovations, or Acreage"
        placeholder="e.g. 2.5 acres, solar microgrid, renovated Italian kitchen, heated pool..."
        rows={3}
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="gold"
          className="w-full"
          leftIcon={<TrendingUp className="w-4 h-4" />}
          isLoading={submitLeadMutation.isPending}
        >
          Generate Confidential Valuation Dossier
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-stone-500">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
        <span>Strict fiduciary confidentiality. Your asset details will never be made public.</span>
      </div>
    </form>
  );
};

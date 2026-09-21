import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, ContactFormData } from '../../lib/validators';
import { useSubmitLeadMutation } from '../../hooks/useLeads';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { HoneypotField } from './HoneypotField';
import { CheckCircle2, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitLeadMutation = useSubmitLeadMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;

    await submitLeadMutation.mutateAsync({
      type: 'contact',
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message,
      property_id: null,
      assigned_agent_id: null,
    });

    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 space-y-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
        <h4 className="font-display font-bold text-lg text-brand-dark">Message Dispatched</h4>
        <p className="text-xs text-brand-stone-600 max-w-sm mx-auto">
          Thank you for contacting our brokerage. A senior partner will respond to your inquiry shortly.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
          className="text-xs mt-2"
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <HoneypotField register={register} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name *"
          placeholder="e.g. James Mwangi"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Phone Number *"
          placeholder="+254 700 000 000"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="james@domain.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Textarea
        label="How can our advisory team assist you? *"
        placeholder="Inquire about a listing, market consultation, or diplomatic relocation..."
        rows={4}
        error={errors.message?.message}
        {...register('message')}
      />

      <Button
        type="submit"
        variant="gold"
        className="w-full"
        leftIcon={<Send className="w-4 h-4" />}
        isLoading={submitLeadMutation.isPending}
      >
        Send Confidential Message
      </Button>
    </form>
  );
};

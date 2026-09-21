import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgentProfileSchema, AgentProfileFormData } from '../../lib/validators';
import { useAuthStore } from '../../store/authStore';
import { useAgent, useUpdateAgentMutation } from '../../hooks/useAgents';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { SEOHead } from '../../components/shared/SEOHead';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, Save, User, ShieldCheck } from 'lucide-react';

export const AgentSettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { data: agent } = useAgent(user?.id);
  const updateMutation = useUpdateAgentMutation();
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AgentProfileFormData>({
    resolver: zodResolver(AgentProfileSchema),
  });

  useEffect(() => {
    if (agent) {
      setValue('bio', agent.bio || '');
      setValue('years_experience', agent.years_experience || 0);
      setValue('license_number', agent.license_number || '');
      setValue('whatsapp_number', agent.whatsapp_number || '');
      setValue('specialties', agent.specialties || ['Trophy Estates']);
      setValue('is_active', agent.is_active);
    }
  }, [agent, setValue]);

  const onSubmit = async (data: AgentProfileFormData) => {
    if (agent) {
      await updateMutation.mutateAsync({
        id: agent.id,
        updates: data,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <DashboardShell portal="agent">
      <SEOHead title="Broker Profile & Advisory Settings" />

      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-dark">
            Broker Profile & Settings
          </h1>
          <p className="text-xs text-brand-stone-500 mt-1">
            Update your public profile, board registration license, specialties, and client communication channels.
          </p>
        </div>

        {isSaved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile and contact information successfully updated across brokerage portals.</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-stone-200 shadow-card space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-brand-stone-100 pb-6">
            <img
              src={
                user?.avatar_url ||
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=140&q=80'
              }
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold/40"
            />
            <div>
              <h3 className="font-display font-bold text-base text-brand-dark">
                {user?.full_name}
              </h3>
              <p className="text-xs text-brand-stone-500">
                Senior Managing Broker · Licensed EARB
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Textarea
              label="Professional Bio & Experience Summary *"
              rows={4}
              error={errors.bio?.message}
              {...register('bio')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Registration License Number *"
                error={errors.license_number?.message}
                {...register('license_number')}
              />
              <Input
                label="Years of Prime Experience *"
                type="number"
                error={errors.years_experience?.message}
                {...register('years_experience')}
              />
            </div>

            <Input
              label="Direct WhatsApp Contact *"
              placeholder="+254 712 345 678"
              error={errors.whatsapp_number?.message}
              {...register('whatsapp_number')}
            />
          </div>

          <div className="pt-6 border-t border-brand-stone-100 flex items-center justify-end gap-3">
            <Button
              type="submit"
              variant="gold"
              isLoading={updateMutation.isPending}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Profile Settings
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};

'use client';

import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { TrainingForm } from '@/app/components/forms/training-form';

export default function NewTrainingPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!isAdmin) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Training"
        description="Create a new training session"
      />
      
      <div className="card p-6">
        <TrainingForm />
      </div>
    </div>
  );
}

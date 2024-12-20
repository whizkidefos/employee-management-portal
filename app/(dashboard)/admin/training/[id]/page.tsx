'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { TrainingForm } from '@/app/components/forms/training-form';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface EditTrainingPageProps {
  params: {
    id: string;
  };
}

export default function EditTrainingPage({ params }: EditTrainingPageProps) {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [training, setTraining] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTraining() {
      try {
        const data = await adminApi.getTraining(params.id);
        setTraining(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch training details');
        console.error('Error fetching training:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchTraining();
    }
  }, [params.id, isAdmin, isLoading]);

  if (isLoading || loading) {
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

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Edit Training"
          description="Update training information"
        />
        
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit ${training?.title}`}
        description="Update training information"
      />
      
      <div className="card p-6">
        <TrainingForm
          initialData={training}
          isEdit
          trainingId={params.id}
        />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { ShiftForm } from '@/app/components/forms/shift-form';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function NewShiftPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await adminApi.getEmployees();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchEmployees();
    }
  }, [isAdmin, isLoading]);

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
          title="Add New Shift"
          description="Create a new shift schedule"
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
        title="Add New Shift"
        description="Create a new shift schedule"
      />
      
      <div className="card p-6">
        <ShiftForm employees={employees} />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { PaymentForm } from '@/app/components/forms/payment-form';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface EditPaymentPageProps {
  params: {
    id: string;
  };
}

export default function EditPaymentPage({ params }: EditPaymentPageProps) {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [payment, setPayment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [paymentData, employeesData] = await Promise.all([
          adminApi.getPayment(params.id),
          adminApi.getEmployees()
        ]);
        setPayment(paymentData);
        setEmployees(employeesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch payment details');
        console.error('Error fetching payment:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchData();
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
          title="Edit Payment"
          description="Update payment information"
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
        title={`Edit Payment for ${payment?.employeeName}`}
        description="Update payment information"
      />
      
      <div className="card p-6">
        <PaymentForm
          initialData={payment}
          employees={employees}
          isEdit
          paymentId={params.id}
        />
      </div>
    </div>
  );

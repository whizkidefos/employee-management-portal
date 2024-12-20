'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { PaymentForm } from '@/app/components/forms/payment-form';
import { adminApi } from '@/app/lib/api';

export default function NewPaymentPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await adminApi.getEmployees();
        setEmployees(data);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      }
    }

    if (!isLoading && isAdmin) {
      fetchEmployees();
    }
  }, [isAdmin, isLoading]);

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
        title="Add New Payment"
        description="Create a new payment record"
      />
      
      <div className="card p-6">
        <PaymentForm employees={employees} />
      </div>
    </div>
  );

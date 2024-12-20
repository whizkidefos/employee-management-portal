'use client';

import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { EmployeeForm } from '@/app/components/forms/employee-form';

export default function NewEmployeePage() {
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
        title="Add New Employee"
        description="Create a new employee profile"
      />
      
      <div className="card p-6">
        <EmployeeForm />
      </div>
    </div>
  );
}

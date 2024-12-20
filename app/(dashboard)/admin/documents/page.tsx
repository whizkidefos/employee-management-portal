'use client';

import { useState } from 'react';
import { PageHeader } from '@/app/components/page-header';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
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
        title="Document Verification"
        description="Review and verify employee documents"
      />
      
      {/* Document verification interface will be added here */}
      <div className="card p-6">
        <p className="text-light-text/60 dark:text-dark-text/60">
          Document verification functionality coming soon...
        </p>
      </div>
    </div>
  );
}

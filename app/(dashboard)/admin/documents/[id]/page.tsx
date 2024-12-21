'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { DocumentForm } from '@/app/components/forms/document-form';
import { adminApi } from '@/app/lib/api';
import { Document } from '@/app/lib/api/types';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface EditDocumentPageProps {
  params: {
    id: string;
  };
}

export default function EditDocumentPage({ params }: EditDocumentPageProps) {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [documentData, employeesData] = await Promise.all([
          adminApi.getDocument(params.id),
          adminApi.getEmployees()
        ]);
        setDocument(documentData);
        setEmployees(employeesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch document details');
        console.error('Error fetching document:', err);
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
          title="Edit Document"
          description="Update document information"
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
        title={`Edit Document`}
        description="Update document information"
      />
      
      <div className="card p-6">
        <DocumentForm
          initialData={document}
          employees={employees}
          isEdit
          documentId={params.id}
        />
      </div>
    </div>
  );

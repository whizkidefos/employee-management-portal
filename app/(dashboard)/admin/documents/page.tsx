'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/app/components/page-header';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/app/lib/api';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  XCircleIcon,
  PencilSquareIcon,
  DocumentIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  type: string;
  expiryDate?: string;
  status: string;
  notes?: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function DocumentsPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const data = await adminApi.getDocuments();
        setDocuments(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch documents');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchDocuments();
    }
  }, [isAdmin, isLoading]);

  const handleStatusChange = async (documentId: string, newStatus: string) => {
    try {
      await adminApi.updateDocumentStatus(documentId, newStatus);
      setDocuments(documents.map(doc => 
        doc.id === documentId ? { ...doc, status: newStatus } : doc
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update document status');
      console.error('Error updating document status:', err);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      doc.title.toLowerCase().includes(term) ||
      doc.employeeName.toLowerCase().includes(term) ||
      doc.type.toLowerCase().includes(term)
    );

    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400';
      case 'expired':
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'certification':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'license':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'training':
        return 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'identification':
        return 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

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
      <div className="flex items-center justify-between gap-4 sm:gap-8">
        <PageHeader
          title="Document Verification"
          description="Manage and verify employee documents"
        />
        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-text/60 dark:text-dark-text/60" 
            />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => router.push('/admin/documents/new')}
            className="btn-primary whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Document
          </button>
        </div>
      </div>

      {error && (
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
      )}

      <div className="card">
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Types</option>
              <option value="certification">Certification</option>
              <option value="license">License</option>
              <option value="training">Training Certificate</option>
              <option value="identification">Identification</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-4 px-6 font-medium">Document</th>
                <th className="text-left py-4 px-6 font-medium">Employee</th>
                <th className="text-left py-4 px-6 font-medium">Expiry</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    Loading documents...
                  </td>
                </tr>
              ) : filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                      ? 'No documents found matching your filters'
                      : 'No documents found'}
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="font-medium">{doc.title}</div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeStyle(doc.type)}`}>
                          {doc.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>{doc.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {doc.expiryDate ? (
                        <div className="flex items-center gap-2">
                          <CalendarDaysIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                          <span>{new Date(doc.expiryDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-light-text/60 dark:text-dark-text/60">
                          No expiry
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={doc.status}
                        onChange={(e) => handleStatusChange(doc.id, e.target.value)}
                        className={`rounded-full px-2 py-1 text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500 ${getStatusStyle(doc.status)}`}
                      >
                        <option value="pending">Pending Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="expired">Expired</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="icon-button"
                          title="View Document"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = doc.fileUrl;
                            link.download = doc.title;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="icon-button"
                          title="Download Document"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/documents/${doc.id}`)}
                          className="btn-secondary inline-flex items-center gap-2"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

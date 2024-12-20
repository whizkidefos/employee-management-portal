'use client';

import { useState, useEffect } from 'react';
import {
  DocumentIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { documentsApi } from '@/app/lib/api';
import type { Document } from '@/app/lib/api';
import { FileUpload } from '@/app/components/forms/file-upload';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingType, setUploadingType] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [docs, types, required] = await Promise.all([
        documentsApi.getDocuments(),
        documentsApi.getDocumentTypes(),
        documentsApi.getRequiredDocuments(),
      ]);
      setDocuments(docs);
      setDocumentTypes(types);
      setRequiredDocuments(required);
    } catch (error) {
      toast.error('Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (type: string, file: File | undefined) => {
    if (!file) return;

    try {
      setUploadingType(type);
      await documentsApi.uploadDocument(file, type);
      toast.success('Document uploaded successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setUploadingType(null);
    }
  };

  const handleDownload = async (document: Document) => {
    try {
      const blob = await documentsApi.downloadDocument(document.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.type + '.' + blob.type.split('/')[1];
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download document');
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      await documentsApi.deleteDocument(documentId);
      toast.success('Document deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  const getDocumentStatus = (document: Document) => {
    switch (document.status) {
      case 'approved':
        return (
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircleIcon className="h-5 w-5" />
            <span>Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center space-x-1 text-red-600">
            <XCircleIcon className="h-5 w-5" />
            <span>Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 text-yellow-600">
            <ClockIcon className="h-5 w-5" />
            <span>Pending</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
          Upload and manage your required documents
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documentTypes.map((type) => {
          const doc = documents.find((d) => d.type === type);
          const isRequired = requiredDocuments.includes(type);

          return (
            <div key={type} className="card">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <DocumentIcon className="h-6 w-6 text-light-text/60 dark:text-dark-text/60" />
                    <div>
                      <h3 className="font-medium">{type}</h3>
                      {isRequired && (
                        <span className="text-sm text-red-600">Required</span>
                      )}
                    </div>
                  </div>
                  {doc && getDocumentStatus(doc)}
                </div>

                {doc ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-light-text/60 dark:text-dark-text/60">
                        Last updated:{' '}
                        {new Date(doc.expiryDate || '').toLocaleDateString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDownload(doc)}
                        className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>

                    {doc.comments && (
                      <p className="text-sm text-red-600">{doc.comments}</p>
                    )}

                    <div className="flex justify-between">
                      <FileUpload
                        id={`upload-${type}`}
                        label="Upload new version"
                        accept=".pdf,.doc,.docx,image/*"
                        disabled={uploadingType === type}
                        onChange={(file) => handleUpload(type, file)}
                      />
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        className="btn-secondary text-red-600 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <FileUpload
                    id={`upload-${type}`}
                    label="Upload document"
                    accept=".pdf,.doc,.docx,image/*"
                    disabled={uploadingType === type}
                    onChange={(file) => handleUpload(type, file)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {documentTypes.length === 0 && (
        <div className="text-center py-12">
          <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-light-text/60 dark:text-dark-text/60" />
          <h3 className="mt-2 text-lg font-medium">No documents required</h3>
          <p className="mt-1 text-light-text/60 dark:text-dark-text/60">
            You don't have any documents to upload at this time
          </p>
        </div>
      )}
    </div>
  );
}

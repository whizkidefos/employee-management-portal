'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon, CheckCircleIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface DocumentFormData {
  employeeId: string;
  title: string;
  type: string;
  expiryDate?: string;
  status: string;
  notes?: string;
  file?: File;
}

interface DocumentFormProps {
  initialData?: Partial<DocumentFormData>;
  isEdit?: boolean;
  documentId?: string;
  employees: Array<{ id: string; firstName: string; lastName: string }>;
}

export function DocumentForm({ initialData, isEdit, documentId, employees }: DocumentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<DocumentFormData>({
    employeeId: initialData?.employeeId || '',
    title: initialData?.title || '',
    type: initialData?.type || 'certification',
    expiryDate: initialData?.expiryDate || '',
    status: initialData?.status || 'pending',
    notes: initialData?.notes || '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      if (isEdit && documentId) {
        await adminApi.updateDocument(documentId, formDataToSend);
        setSuccess('Document updated successfully');
      } else {
        await adminApi.createDocument(formDataToSend);
        setSuccess('Document uploaded successfully');
      }
      
      setTimeout(() => {
        router.push('/admin/documents');
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium mb-2">
            Employee
          </label>
          <select
            id="employeeId"
            name="employeeId"
            required
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="input"
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Document Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input"
            placeholder="e.g., Nursing License"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Document Type
          </label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
          >
            <option value="certification">Certification</option>
            <option value="license">License</option>
            <option value="training">Training Certificate</option>
            <option value="identification">Identification</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="input"
          >
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-2">
            Document File
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-light-border dark:border-dark-border">
            <div className="space-y-1 text-center">
              <DocumentIcon className="mx-auto h-12 w-12 text-light-text/60 dark:text-dark-text/60" />
              <div className="flex text-sm">
                <label
                  htmlFor="file"
                  className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
              <p className="text-xs text-light-text/60 dark:text-dark-text/60">
                PDF, DOC, DOCX, JPG, JPEG, or PNG up to 10MB
              </p>
              {selectedFile && (
                <p className="text-sm text-primary-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="input"
            placeholder="Any additional notes about the document..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span className="ml-2">
                {isEdit ? 'Updating...' : 'Uploading...'}
              </span>
            </>
          ) : (
            isEdit ? 'Update Document' : 'Upload Document'
          )}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface TrainingFormData {
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  type: string;
  status: string;
  prerequisites?: string;
  materials?: string;
}

interface TrainingFormProps {
  initialData?: Partial<TrainingFormData>;
  isEdit?: boolean;
  trainingId?: string;
}

export function TrainingForm({ initialData, isEdit, trainingId }: TrainingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<TrainingFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    instructor: initialData?.instructor || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    location: initialData?.location || '',
    capacity: initialData?.capacity || 10,
    type: initialData?.type || 'technical',
    status: initialData?.status || 'scheduled',
    prerequisites: initialData?.prerequisites || '',
    materials: initialData?.materials || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEdit && trainingId) {
        await adminApi.updateTraining(trainingId, formData);
        setSuccess('Training session updated successfully');
      } else {
        await adminApi.createTraining(formData);
        setSuccess('Training session created successfully');
      }
      
      setTimeout(() => {
        router.push('/admin/training');
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
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Training Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input"
            placeholder="e.g., Advanced Patient Care Techniques"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input"
            placeholder="Provide a detailed description of the training session..."
          />
        </div>

        <div>
          <label htmlFor="instructor" className="block text-sm font-medium mb-2">
            Instructor
          </label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            required
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            className="input"
            placeholder="Name of the instructor"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="input"
            placeholder="Training venue or online platform"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            required
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-2">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            required
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Training Type
          </label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
          >
            <option value="technical">Technical</option>
            <option value="soft-skills">Soft Skills</option>
            <option value="compliance">Compliance</option>
            <option value="safety">Safety</option>
            <option value="professional">Professional Development</option>
          </select>
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium mb-2">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            required
            min="1"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
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
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="prerequisites" className="block text-sm font-medium mb-2">
            Prerequisites
          </label>
          <textarea
            id="prerequisites"
            name="prerequisites"
            rows={2}
            value={formData.prerequisites}
            onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
            className="input"
            placeholder="List any prerequisites for this training..."
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="materials" className="block text-sm font-medium mb-2">
            Training Materials
          </label>
          <textarea
            id="materials"
            name="materials"
            rows={2}
            value={formData.materials}
            onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
            className="input"
            placeholder="List required materials or provide links to resources..."
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
                {isEdit ? 'Updating...' : 'Creating...'}
              </span>
            </>
          ) : (
            isEdit ? 'Update Training' : 'Create Training'
          )}
        </button>
      </div>
    </form>
  );
}

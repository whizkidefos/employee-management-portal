'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ShiftFormData {
  employeeId: string;
  startTime: string;
  endTime: string;
  date: string;
  type: string;
  notes?: string;
}

interface ShiftFormProps {
  initialData?: Partial<ShiftFormData>;
  isEdit?: boolean;
  shiftId?: string;
  employees: Array<{ id: string; firstName: string; lastName: string }>;
}

export function ShiftForm({ initialData, isEdit, shiftId, employees }: ShiftFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<ShiftFormData>({
    employeeId: initialData?.employeeId || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    type: initialData?.type || 'regular',
    notes: initialData?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEdit && shiftId) {
        await adminApi.updateShift(shiftId, formData);
        setSuccess('Shift updated successfully');
      } else {
        await adminApi.createShift(formData);
        setSuccess('Shift created successfully');
      }
      
      setTimeout(() => {
        router.push('/admin/shifts');
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
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm font-medium mb-2">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            required
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium mb-2">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            required
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Shift Type
          </label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
          >
            <option value="regular">Regular</option>
            <option value="overtime">Overtime</option>
            <option value="holiday">Holiday</option>
            <option value="emergency">Emergency</option>
          </select>
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
            placeholder="Any additional notes about the shift..."
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
            isEdit ? 'Update Shift' : 'Create Shift'
          )}
        </button>
      </div>
    </form>
  );
}

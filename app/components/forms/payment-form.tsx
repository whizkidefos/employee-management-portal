'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/app/lib/api';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface PaymentFormData {
  employeeId: string;
  amount: number;
  type: string;
  date: string;
  description?: string;
  status: string;
  paymentMethod: string;
  reference?: string;
}

interface PaymentFormProps {
  initialData?: Partial<PaymentFormData>;
  isEdit?: boolean;
  paymentId?: string;
  employees: Array<{ id: string; firstName: string; lastName: string }>;
}

export function PaymentForm({ initialData, isEdit, paymentId, employees }: PaymentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<PaymentFormData>({
    employeeId: initialData?.employeeId || '',
    amount: initialData?.amount || 0,
    type: initialData?.type || 'salary',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    status: initialData?.status || 'pending',
    paymentMethod: initialData?.paymentMethod || 'bank_transfer',
    reference: initialData?.reference || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEdit && paymentId) {
        await adminApi.updatePayment(paymentId, formData);
        setSuccess('Payment updated successfully');
      } else {
        await adminApi.createPayment(formData);
        setSuccess('Payment created successfully');
      }
      
      setTimeout(() => {
        router.push('/admin/payments');
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
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-light-text/60 dark:text-dark-text/60">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="input pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Payment Type
          </label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
          >
            <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="reimbursement">Reimbursement</option>
            <option value="commission">Commission</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Payment Date
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
          <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            required
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="input"
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="check">Check</option>
            <option value="cash">Cash</option>
            <option value="other">Other</option>
          </select>
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label htmlFor="reference" className="block text-sm font-medium mb-2">
            Reference Number
          </label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
            className="input"
            placeholder="Optional reference number"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input"
            placeholder="Add any additional notes or description..."
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
            isEdit ? 'Update Payment' : 'Create Payment'
          )}
        </button>
      </div>
    </form>
  );
}

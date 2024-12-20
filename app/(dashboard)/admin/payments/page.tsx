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
  BanknotesIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface Payment {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  type: string;
  date: string;
  description?: string;
  status: string;
  paymentMethod: string;
  reference?: string;
}

export default function PaymentsPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await adminApi.getPayments();
        setPayments(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch payments');
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchPayments();
    }
  }, [isAdmin, isLoading]);

  const handleStatusChange = async (paymentId: string, newStatus: string) => {
    try {
      await adminApi.updatePaymentStatus(paymentId, newStatus);
      setPayments(payments.map(payment => 
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update payment status');
      console.error('Error updating payment status:', err);
    }
  };

  const getDateFilterRange = () => {
    const today = new Date();
    switch (dateFilter) {
      case 'today':
        return {
          start: new Date(today.setHours(0, 0, 0, 0)),
          end: new Date(today.setHours(23, 59, 59, 999))
        };
      case 'this_week':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        return { start: startOfWeek, end: endOfWeek };
      case 'this_month':
        return {
          start: new Date(today.getFullYear(), today.getMonth(), 1),
          end: new Date(today.getFullYear(), today.getMonth() + 1, 0)
        };
      default:
        return null;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      payment.employeeName.toLowerCase().includes(term) ||
      payment.type.toLowerCase().includes(term) ||
      payment.reference?.toLowerCase().includes(term) ||
      payment.description?.toLowerCase().includes(term)
    );

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;

    const dateRange = getDateFilterRange();
    const matchesDate = !dateRange || (
      new Date(payment.date) >= dateRange.start &&
      new Date(payment.date) <= dateRange.end
    );

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'processing':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'failed':
        return 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400';
      case 'cancelled':
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'salary':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'bonus':
        return 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'reimbursement':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'commission':
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
          title="Payment Management"
          description="Manage employee payments and transactions"
        />
        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-text/60 dark:text-dark-text/60" 
            />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => router.push('/admin/payments/new')}
            className="btn-primary whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Payment
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
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Types</option>
              <option value="salary">Salary</option>
              <option value="bonus">Bonus</option>
              <option value="reimbursement">Reimbursement</option>
              <option value="commission">Commission</option>
              <option value="other">Other</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-4 px-6 font-medium">Employee</th>
                <th className="text-left py-4 px-6 font-medium">Amount</th>
                <th className="text-left py-4 px-6 font-medium">Type</th>
                <th className="text-left py-4 px-6 font-medium">Date</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    Loading payments...
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || dateFilter !== 'all'
                      ? 'No payments found matching your filters'
                      : 'No payments found'}
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>{payment.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <BanknotesIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>${payment.amount.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeStyle(payment.type)}`}>
                        {payment.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={payment.status}
                        onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                        className={`rounded-full px-2 py-1 text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500 ${getStatusStyle(payment.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => router.push(`/admin/payments/${payment.id}`)}
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

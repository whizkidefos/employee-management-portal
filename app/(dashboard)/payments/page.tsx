'use client';

import { useState, useEffect } from 'react';
import {
  BanknotesIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { paymentsApi } from '@/app/lib/api';
import type { Payment } from '@/app/lib/api';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    loadPayments();
  }, [selectedMonth]);

  const loadPayments = async () => {
    try {
      setIsLoading(true);
      const data = await paymentsApi.getPayments(selectedMonth);
      setPayments(data);
    } catch (error) {
      toast.error('Failed to load payments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPayslip = async (paymentId: string) => {
    try {
      const blob = await paymentsApi.downloadPayslip(paymentId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip-${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Payslip downloaded successfully');
    } catch (error) {
      toast.error('Failed to download payslip');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Payments</h1>
          <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
            View your payment history and download payslips
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <CalendarIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-primary-50 dark:bg-primary-900/20">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <BanknotesIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="font-medium">Total Earnings</h3>
            </div>
            <p className="mt-4 text-2xl font-semibold">
              {formatCurrency(
                payments.reduce((sum, payment) => sum + payment.amount, 0)
              )}
            </p>
            <p className="mt-1 text-sm text-light-text/60 dark:text-dark-text/60">
              for {new Date(selectedMonth).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
            <thead>
              <tr className="bg-light-card dark:bg-dark-card">
                <th className="px-6 py-3 text-left text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">{payment.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {payment.status === 'paid' && (
                      <button
                        onClick={() => handleDownloadPayslip(payment.id)}
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500"
                      >
                        <DocumentArrowDownIcon className="h-5 w-5 mr-1" />
                        Payslip
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-12">
            <BanknotesIcon className="mx-auto h-12 w-12 text-light-text/60 dark:text-dark-text/60" />
            <h3 className="mt-2 text-lg font-medium">No payments found</h3>
            <p className="mt-1 text-light-text/60 dark:text-dark-text/60">
              No payments were recorded for this period
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

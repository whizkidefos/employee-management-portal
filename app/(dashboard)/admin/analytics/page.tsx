'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/app/components/page-header';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/app/lib/api';
import { StatsCard } from '@/app/components/analytics/stats-card';
import { LineChart } from '@/app/components/charts/line-chart';
import { BarChart } from '@/app/components/charts/bar-chart';
import { DoughnutChart } from '@/app/components/charts/doughnut-chart';
import { 
  UsersIcon, 
  BanknotesIcon,
  DocumentTextIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await adminApi.getAnalytics(timeRange);
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchAnalytics();
    }
  }, [isAdmin, isLoading, timeRange]);

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
          title="Analytics"
          description="View employee and business analytics"
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
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Analytics"
          description="View employee and business analytics"
        />
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={stats.employeeCount}
          icon={<UsersIcon className="h-6 w-6 text-primary-600" />}
          change={stats.employeeGrowth}
          changeLabel="vs previous period"
        />
        <StatsCard
          title="Total Payments"
          value={`$${stats.totalPayments.toLocaleString()}`}
          icon={<BanknotesIcon className="h-6 w-6 text-primary-600" />}
          change={stats.paymentGrowth}
          changeLabel="vs previous period"
        />
        <StatsCard
          title="Active Documents"
          value={stats.activeDocuments}
          icon={<DocumentTextIcon className="h-6 w-6 text-primary-600" />}
          change={stats.documentGrowth}
          changeLabel="vs previous period"
        />
        <StatsCard
          title="Training Hours"
          value={stats.trainingHours}
          icon={<ClockIcon className="h-6 w-6 text-primary-600" />}
          change={stats.trainingGrowth}
          changeLabel="vs previous period"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <LineChart
            title="Employee Growth"
            data={{
              labels: stats.employeeGrowthData.labels,
              datasets: [
                {
                  label: 'Total Employees',
                  data: stats.employeeGrowthData.values,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                },
              ],
            }}
          />
        </div>

        <div className="card p-6">
          <BarChart
            title="Monthly Payments"
            data={{
              labels: stats.paymentData.labels,
              datasets: [
                {
                  label: 'Total Payments',
                  data: stats.paymentData.values,
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                },
              ],
            }}
          />
        </div>

        <div className="card p-6">
          <DoughnutChart
            title="Document Status Distribution"
            data={{
              labels: stats.documentStatusData.labels,
              datasets: [
                {
                  data: stats.documentStatusData.values,
                  backgroundColor: [
                    'rgba(34, 197, 94, 0.5)',  // green for approved
                    'rgba(234, 179, 8, 0.5)',  // yellow for pending
                    'rgba(239, 68, 68, 0.5)',  // red for rejected
                    'rgba(107, 114, 128, 0.5)', // gray for expired
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="card p-6">
          <BarChart
            title="Training Completion Rate"
            data={{
              labels: stats.trainingData.labels,
              datasets: [
                {
                  label: 'Completed',
                  data: stats.trainingData.completed,
                  backgroundColor: 'rgba(34, 197, 94, 0.5)',
                },
                {
                  label: 'In Progress',
                  data: stats.trainingData.inProgress,
                  backgroundColor: 'rgba(234, 179, 8, 0.5)',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

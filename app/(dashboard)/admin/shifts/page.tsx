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
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  startTime: string;
  endTime: string;
  date: string;
  type: string;
  notes?: string;
}

export default function ShiftsPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    async function fetchShifts() {
      try {
        const data = await adminApi.getShifts({ date: filterDate });
        setShifts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch shifts');
        console.error('Error fetching shifts:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchShifts();
    }
  }, [isAdmin, isLoading, filterDate]);

  const filteredShifts = shifts.filter(shift => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      shift.employeeName.toLowerCase().includes(searchTerm) ||
      shift.type.toLowerCase().includes(searchTerm)
    );
  });

  const getShiftTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'regular':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'overtime':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'holiday':
        return 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'emergency':
        return 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400';
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
          title="Shift Management"
          description="Manage employee shifts and schedules"
        />
        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-text/60 dark:text-dark-text/60" 
            />
            <input
              type="text"
              placeholder="Search shifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => router.push('/admin/shifts/new')}
            className="btn-primary whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Shift
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
          <div className="flex items-center gap-4">
            <CalendarDaysIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="input"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-4 px-6 font-medium">Employee</th>
                <th className="text-left py-4 px-6 font-medium">Time</th>
                <th className="text-left py-4 px-6 font-medium">Type</th>
                <th className="text-left py-4 px-6 font-medium">Notes</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    Loading shifts...
                  </td>
                </tr>
              ) : filteredShifts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    {searchQuery ? 'No shifts found matching your search' : 'No shifts found for this date'}
                  </td>
                </tr>
              ) : (
                filteredShifts.map((shift) => (
                  <tr
                    key={shift.id}
                    className="border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <UserCircleIcon className="h-6 w-6 text-light-text/60 dark:text-dark-text/60" />
                        <span>{shift.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>
                          {shift.startTime} - {shift.endTime}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${getShiftTypeStyle(shift.type)}`}>
                        {shift.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-light-text/60 dark:text-dark-text/60 line-clamp-2">
                        {shift.notes || '-'}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => router.push(`/admin/shifts/${shift.id}`)}
                        className="btn-secondary inline-flex items-center gap-2"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit
                      </button>
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

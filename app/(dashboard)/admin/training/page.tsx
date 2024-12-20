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
  UserGroupIcon,
  MapPinIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

interface Training {
  id: string;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  enrolledCount: number;
  type: string;
  status: string;
}

export default function TrainingPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const data = await adminApi.getTrainings();
        setTrainings(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch training sessions');
        console.error('Error fetching training sessions:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchTrainings();
    }
  }, [isAdmin, isLoading]);

  const handleStatusChange = async (trainingId: string, newStatus: string) => {
    try {
      await adminApi.updateTrainingStatus(trainingId, newStatus);
      setTrainings(trainings.map(training => 
        training.id === trainingId ? { ...training, status: newStatus } : training
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update training status');
      console.error('Error updating training status:', err);
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      training.title.toLowerCase().includes(term) ||
      training.instructor.toLowerCase().includes(term) ||
      training.description.toLowerCase().includes(term) ||
      training.location.toLowerCase().includes(term)
    );

    const matchesStatus = statusFilter === 'all' || training.status === statusFilter;
    const matchesType = typeFilter === 'all' || training.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'in-progress':
        return 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'completed':
        return 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-50 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'technical':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'soft-skills':
        return 'bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400';
      case 'compliance':
        return 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'safety':
        return 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400';
      case 'professional':
        return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400';
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
          title="Training Management"
          description="Manage employee training programs and certifications"
        />
        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-text/60 dark:text-dark-text/60" 
            />
            <input
              type="text"
              placeholder="Search training..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => router.push('/admin/training/new')}
            className="btn-primary whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Training
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
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Types</option>
              <option value="technical">Technical</option>
              <option value="soft-skills">Soft Skills</option>
              <option value="compliance">Compliance</option>
              <option value="safety">Safety</option>
              <option value="professional">Professional Development</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-4 px-6 font-medium">Training</th>
                <th className="text-left py-4 px-6 font-medium">Schedule</th>
                <th className="text-left py-4 px-6 font-medium">Location</th>
                <th className="text-left py-4 px-6 font-medium">Enrollment</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    Loading training sessions...
                  </td>
                </tr>
              ) : filteredTrainings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                      ? 'No training sessions found matching your filters'
                      : 'No training sessions found'}
                  </td>
                </tr>
              ) : (
                filteredTrainings.map((training) => (
                  <tr
                    key={training.id}
                    className="border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="font-medium">{training.title}</div>
                        <div className="text-sm text-light-text/60 dark:text-dark-text/60">
                          {training.instructor}
                        </div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeStyle(training.type)}`}>
                          {training.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <div className="text-sm">
                          <div>{new Date(training.startDate).toLocaleDateString()}</div>
                          <div className="text-light-text/60 dark:text-dark-text/60">
                            {new Date(training.startDate).toLocaleTimeString()} - {new Date(training.endDate).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>{training.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                        <span>
                          {training.enrolledCount} / {training.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={training.status}
                        onChange={(e) => handleStatusChange(training.id, e.target.value)}
                        className={`rounded-full px-2 py-1 text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500 ${getStatusStyle(training.status)}`}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => router.push(`/admin/training/${training.id}`)}
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

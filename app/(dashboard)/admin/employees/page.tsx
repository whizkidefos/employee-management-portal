'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/app/components/page-header';
import { useAuth } from '@/app/lib/contexts/auth-context';
import { adminApi } from '@/app/lib/api';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  XCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobRole: string;
  department: string;
  status: string;
  dateJoined: string;
}

export default function EmployeesPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await adminApi.getEmployees();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLoading && isAdmin) {
      fetchEmployees();
    }
  }, [isAdmin, isLoading]);

  const handleStatusChange = async (employeeId: string, newStatus: string) => {
    try {
      await adminApi.updateEmployeeStatus(employeeId, newStatus);
      setEmployees(employees.map(emp => 
        emp.id === employeeId ? { ...emp, status: newStatus } : emp
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update employee status');
      console.error('Error updating employee status:', err);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.jobRole.toLowerCase().includes(searchTerm) ||
      employee.department?.toLowerCase().includes(searchTerm)
    );
  });

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
          title="Employees"
          description="Manage your organization's employees"
        />
        <div className="flex items-center gap-4 flex-col sm:flex-row">
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-text/60 dark:text-dark-text/60" 
            />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={() => router.push('/admin/employees/new')}
            className="btn-primary whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Employee
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-4 px-6 font-medium">Name</th>
                <th className="text-left py-4 px-6 font-medium">Role</th>
                <th className="text-left py-4 px-6 font-medium">Department</th>
                <th className="text-left py-4 px-6 font-medium">Contact</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-light-text/60 dark:text-dark-text/60">
                    {searchQuery ? 'No employees found matching your search' : 'No employees found'}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <td className="py-4 px-6">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="py-4 px-6">{employee.jobRole}</td>
                    <td className="py-4 px-6">{employee.department || '-'}</td>
                    <td className="py-4 px-6">
                      <div>{employee.email}</div>
                      <div className="text-sm text-light-text/60 dark:text-dark-text/60">
                        {employee.phoneNumber}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={employee.status}
                        onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                        className={`rounded-full px-2 py-1 text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500 ${
                          employee.status === 'active'
                            ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                            : employee.status === 'inactive'
                            ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                            : 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => router.push(`/admin/employees/${employee.id}`)}
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

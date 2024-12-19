import { PageHeader } from "../components/page-header";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

const employees = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Nurse",
    department: "Emergency Care",
    email: "john.doe@newhorizon.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Physician",
    department: "Internal Medicine",
    email: "jane.smith@newhorizon.com",
    status: "Active",
  },
  // Add more employees as needed
];

export default function EmployeesPage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <PageHeader
            title="Employees"
            description="Manage your organization's employees"
          />
          <div className="flex items-center gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-text/60 dark:text-dark-text/60" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 rounded-md border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background"
              />
            </div>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Employee
            </button>
          </div>
        </div>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-border dark:border-dark-border">
                  <th className="text-left py-4 px-6 font-medium">Name</th>
                  <th className="text-left py-4 px-6 font-medium">Role</th>
                  <th className="text-left py-4 px-6 font-medium">Department</th>
                  <th className="text-left py-4 px-6 font-medium">Email</th>
                  <th className="text-left py-4 px-6 font-medium">Status</th>
                  <th className="text-right py-4 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <td className="py-4 px-6">{employee.name}</td>
                    <td className="py-4 px-6">{employee.role}</td>
                    <td className="py-4 px-6">{employee.department}</td>
                    <td className="py-4 px-6">{employee.email}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="btn-secondary">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

import { PageHeader } from "../components/page-header";
import { PlusIcon } from "@heroicons/react/24/outline";

const departments = [
  {
    id: 1,
    name: "Emergency Care",
    head: "Dr. Sarah Johnson",
    employees: 45,
    location: "Building A, Floor 1",
  },
  {
    id: 2,
    name: "Internal Medicine",
    head: "Dr. Michael Chen",
    employees: 32,
    location: "Building B, Floor 2",
  },
  // Add more departments as needed
];

export default function DepartmentsPage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <PageHeader
            title="Departments"
            description="Manage your organization's departments"
          />
          <button className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Department
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <div key={department.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{department.name}</h3>
                <button className="btn-secondary text-sm">View Details</button>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-light-text/60 dark:text-dark-text/60">Department Head</dt>
                  <dd>{department.head}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-light-text/60 dark:text-dark-text/60">Employees</dt>
                  <dd>{department.employees}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-light-text/60 dark:text-dark-text/60">Location</dt>
                  <dd>{department.location}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

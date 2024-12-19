import { PageHeader } from "../components/page-header";
import {
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Employees",
    value: "250",
    icon: UserGroupIcon,
    change: "+12%",
    changeType: "positive",
  },
  {
    name: "Departments",
    value: "12",
    icon: BriefcaseIcon,
    change: "+2",
    changeType: "positive",
  },
  {
    name: "Average Attendance",
    value: "95%",
    icon: ClockIcon,
    change: "+3%",
    changeType: "positive",
  },
  {
    name: "Performance",
    value: "88%",
    icon: ChartBarIcon,
    change: "+5%",
    changeType: "positive",
  },
];

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader
          title="Dashboard"
          description="Overview of your organization"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary-50 dark:bg-primary-500/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-light-text/60 dark:text-dark-text/60">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add recent activity items here */}
              <p className="text-light-text/60 dark:text-dark-text/60">No recent activity</p>
            </div>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {/* Add upcoming events here */}
              <p className="text-light-text/60 dark:text-dark-text/60">No upcoming events</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

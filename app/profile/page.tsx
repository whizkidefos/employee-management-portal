import { PageHeader } from "../components/page-header";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader title="Profile" description="Manage your account settings" />
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card text-center md:col-span-1">
            <div className="mx-auto mb-4">
              <UserCircleIcon className="h-24 w-24 text-light-text/20 dark:text-dark-text/20" />
            </div>
            <h2 className="text-xl font-semibold">Dr. John Smith</h2>
            <p className="text-light-text/60 dark:text-dark-text/60">Chief Medical Officer</p>
            <div className="mt-6">
              <button className="btn-secondary w-full">Change Photo</button>
            </div>
          </div>
          <div className="card md:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue="John"
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue="Smith"
                    className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="john.smith@newhorizon.com"
                  className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium mb-2">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  defaultValue="Executive Management"
                  className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

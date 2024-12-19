import { PageHeader } from "../components/page-header";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader
          title="About Us"
          description="Learn more about New Horizon Healthcare Services"
        />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-light-text/80 dark:text-dark-text/80">
              At New Horizon Healthcare Services, we are dedicated to revolutionizing healthcare management through innovative solutions. Our employee management portal streamlines operations, enabling healthcare providers to focus on what matters most – patient care.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Values</h2>
            <ul className="space-y-2 text-light-text/80 dark:text-dark-text/80">
              <li>• Excellence in Healthcare Management</li>
              <li>• Innovation and Technology</li>
              <li>• Employee Empowerment</li>
              <li>• Patient-Centric Approach</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

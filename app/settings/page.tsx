import { PageHeader } from "../components/page-header";

const settings = [
  {
    title: "Account Settings",
    description: "Manage your account preferences and security settings",
    items: [
      { name: "Email Notifications", enabled: true },
      { name: "Two-Factor Authentication", enabled: false },
      { name: "Login History", type: "link" },
    ],
  },
  {
    title: "System Preferences",
    description: "Customize your workspace settings",
    items: [
      { name: "Language", value: "English (US)" },
      { name: "Time Zone", value: "Pacific Time (PT)" },
      { name: "Date Format", value: "MM/DD/YYYY" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader
          title="Settings"
          description="Manage your application settings and preferences"
        />
        <div className="space-y-8">
          {settings.map((section) => (
            <div key={section.title} className="card">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-light-text/60 dark:text-dark-text/60 mb-6">
                {section.description}
              </p>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-3 border-b border-light-border dark:border-dark-border last:border-0"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {"value" in item && (
                        <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                          {item.value}
                        </p>
                      )}
                    </div>
                    {"enabled" in item ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={item.enabled}
                        />
                        <div className="w-11 h-6 bg-light-border dark:bg-dark-border rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    ) : "type" in item && item.type === "link" ? (
                      <button className="text-primary-600 dark:text-primary-400 hover:underline">
                        View
                      </button>
                    ) : (
                      <button className="btn-secondary">Change</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

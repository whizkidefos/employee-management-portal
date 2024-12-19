import { PageHeader } from "../components/page-header";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <PageHeader
          title="Contact Us"
          description="Get in touch with our team"
        />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-500" />
                <span>support@newhorizonhealthcare.com</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-primary-500" />
                <span>123 Healthcare Ave, Medical District, CA 90210</span>
              </div>
            </div>
          </div>
          <form className="card space-y-4">
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background px-4 py-2"
                placeholder="Your message"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

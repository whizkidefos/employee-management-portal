import { PageHeader } from "../components/page-header";

const stats = [
  { label: 'Healthcare providers served', value: '500+' },
  { label: 'Employees managed', value: '50,000+' },
  { label: 'Years of experience', value: '15+' },
  { label: 'Customer satisfaction', value: '98%' },
];

const values = [
  {
    name: 'Excellence in Healthcare',
    description: 'We strive for excellence in everything we do, setting the highest standards in healthcare management.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Innovation & Technology',
    description: 'We leverage cutting-edge technology to provide innovative solutions for healthcare management.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Employee Empowerment',
    description: 'We believe in empowering healthcare professionals with tools that enhance their productivity.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Patient-Centric',
    description: 'Our solutions are designed with the ultimate goal of improving patient care and outcomes.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-light-border/10 dark:stroke-dark-border/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-light-card/20 dark:fill-dark-card/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
        </svg>
        <div className="container py-8 sm:py-12">
          <PageHeader
            title="About Us"
            description="Learn more about New Horizon Healthcare Services and our mission to revolutionize healthcare management."
          />
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-12">
            <div className="relative lg:order-last lg:col-span-5">
              <figure className="p-8">
                <div className="aspect-[6/5] relative rounded-2xl bg-light-card dark:bg-dark-card">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Team working"
                    className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-light-border/10 dark:ring-dark-border/10" />
                </div>
              </figure>
            </div>
            <div className="lg:col-span-7">
              <div className="text-base leading-7">
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">Our Mission</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Revolutionizing Healthcare Management
                </h1>
                <div className="max-w-xl">
                  <p className="mt-6">
                    At New Horizon Healthcare Services, we are dedicated to revolutionizing healthcare management through innovative solutions. Our employee management portal streamlines operations, enabling healthcare providers to focus on what matters most – patient care.
                  </p>
                  <p className="mt-8">
                    We understand the unique challenges faced by healthcare organizations and have developed comprehensive solutions that address the complex needs of modern healthcare workforce management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-y-3 border-l border-light-border/20 dark:border-dark-border/20 pl-6">
                  <dt className="text-sm leading-6 text-light-text/60 dark:text-dark-text/60">{stat.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-24 max-w-7xl">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600/10 dark:bg-primary-400/10">
                    <value.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{value.name}</h3>
                  <p className="mt-2 text-base leading-7 text-light-text/60 dark:text-dark-text/60">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

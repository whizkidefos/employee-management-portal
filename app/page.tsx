import Image from "next/image";
import { Navbar } from './components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-fade-in">
                Employee Management Made Simple
              </h1>
              <p className="mt-6 text-lg leading-8 text-light-text/80 dark:text-dark-text/80 animate-slide-in">
                Streamline your workforce management with our modern, intuitive platform.
                From onboarding to performance tracking, we've got you covered.
              </p>
              <div className="mt-10 flex items-center gap-x-6 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <a href="/register" className="btn-primary">
                  Get started
                </a>
                <a href="/about" className="text-sm font-semibold leading-6 hover:text-primary-500 transition-colors">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

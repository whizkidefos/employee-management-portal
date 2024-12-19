export function Logo({ className = "", ...props }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20 10C31.0457 10 40 18.9543 40 30C40 41.0457 31.0457 50 20 50C8.9543 50 0 41.0457 0 30C0 18.9543 8.9543 10 20 10Z"
        className="fill-primary-600 dark:fill-primary-500"
      />
      <path
        d="M20 15C28.2843 15 35 21.7157 35 30C35 38.2843 28.2843 45 20 45C11.7157 45 5 38.2843 5 30C5 21.7157 11.7157 15 20 15Z"
        className="fill-primary-500 dark:fill-primary-400"
      />
      <path
        d="M20 20C25.5228 20 30 24.4772 30 30C30 35.5228 25.5228 40 20 40C14.4772 40 10 35.5228 10 30C10 24.4772 14.4772 20 20 20Z"
        className="fill-primary-400 dark:fill-primary-300"
      />
      <text
        x="50"
        y="35"
        className="fill-light-text dark:fill-dark-text text-2xl font-bold"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        New Horizon
      </text>
      <text
        x="50"
        y="45"
        className="fill-light-text/80 dark:fill-dark-text/80 text-sm"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Healthcare Services
      </text>
    </svg>
  );
}

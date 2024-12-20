'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authApi } from '@/app/lib/api';

export default function VerifyPhonePage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // In a real app, we'd get the phone number from the auth context/store
      const phoneNumber = sessionStorage.getItem('phoneNumber') || '';
      await authApi.verifyPhone(phoneNumber, code);
      toast.success('Phone number verified successfully!');
      router.push('/profile/complete');
    } catch (error) {
      toast.error('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    toast.success('A new verification code has been sent to your phone.');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-grid-light dark:bg-grid-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Verify your phone number
        </h2>
        <p className="mt-2 text-center text-sm text-light-text/60 dark:text-dark-text/60">
          We've sent a verification code to your phone number
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium">
                Verification code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="text-center text-2xl tracking-widest"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm link"
                disabled={isLoading}
              >
                Didn't receive a code? Send again
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

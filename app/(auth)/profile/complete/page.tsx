'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { profileSchema, type ProfileFormData } from '@/app/lib/validations/profile';
import { usersApi } from '@/app/lib/api';
import { FileUpload } from '@/app/components/forms/file-upload';
import { SignaturePad } from '@/app/components/forms/signature-pad';
import { ReferenceFields } from '@/app/components/forms/reference-fields';
import { TrainingFields } from '@/app/components/forms/training-fields';

export default function CompleteProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      references: [
        { name: '', email: '', phone: '' },
        { name: '', email: '', phone: '' },
      ],
      trainings: Array(14).fill({ passed: false }),
      otherTrainings: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      await usersApi.updateProfile(data);
      toast.success('Profile updated successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-grid-light dark:bg-grid-dark">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Complete your profile</h1>
          <p className="mt-2 text-light-text/60 dark:text-dark-text/60">
            Please provide the following information to complete your registration
          </p>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
              {/* Personal Information */}
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium">
                      Date of Birth
                    </label>
                    <div className="mt-1">
                      <input
                        id="dateOfBirth"
                        type="date"
                        disabled={isLoading}
                        {...register('dateOfBirth')}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium">
                      Gender
                    </label>
                    <div className="mt-1">
                      <select
                        id="gender"
                        disabled={isLoading}
                        {...register('gender')}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium">
                    Postcode
                  </label>
                  <div className="mt-1">
                    <input
                      id="postcode"
                      type="text"
                      disabled={isLoading}
                      {...register('postcode')}
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.postcode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="address"
                      type="text"
                      disabled={isLoading}
                      {...register('address')}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium">
                    Country
                  </label>
                  <div className="mt-1">
                    <input
                      id="country"
                      type="text"
                      disabled={isLoading}
                      {...register('country')}
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Background Checks */}
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold">Background Checks</h2>

                <div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="hasCautions"
                      type="checkbox"
                      disabled={isLoading}
                      {...register('hasCautions')}
                      className="h-4 w-4 rounded border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                    <label htmlFor="hasCautions" className="text-sm">
                      Do you have any unspent conditional cautions or convictions under
                      the Rehabilitation of Offenders Act 1974?
                    </label>
                  </div>
                  {errors.hasCautions && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.hasCautions.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nationalInsuranceNumber"
                    className="block text-sm font-medium"
                  >
                    National Insurance Number (NI)
                  </label>
                  <div className="mt-1">
                    <input
                      id="nationalInsuranceNumber"
                      type="text"
                      disabled={isLoading}
                      {...register('nationalInsuranceNumber')}
                    />
                    {errors.nationalInsuranceNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.nationalInsuranceNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="hasEnhancedDBS"
                      type="checkbox"
                      disabled={isLoading}
                      {...register('hasEnhancedDBS')}
                      className="h-4 w-4 rounded border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                    <label htmlFor="hasEnhancedDBS" className="text-sm">
                      Do You Have Enhanced DBS with the update services?
                    </label>
                  </div>
                  {errors.hasEnhancedDBS && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.hasEnhancedDBS.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right to Work */}
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold">Right to Work</h2>

                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium">
                    Nationality
                  </label>
                  <div className="mt-1">
                    <select
                      id="nationality"
                      disabled={isLoading}
                      {...register('nationality')}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select nationality
                      </option>
                      <option value="UK">UK</option>
                      <option value="EU">EU</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.nationality && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.nationality.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="rightToWork"
                      type="checkbox"
                      disabled={isLoading}
                      {...register('rightToWork')}
                      className="h-4 w-4 rounded border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                    <label htmlFor="rightToWork" className="text-sm">
                      Do you have right to work in the UK?
                    </label>
                  </div>
                  {errors.rightToWork && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.rightToWork.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="brpNumber" className="block text-sm font-medium">
                    BRP Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="brpNumber"
                      type="text"
                      disabled={isLoading}
                      {...register('brpNumber')}
                    />
                    {errors.brpNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.brpNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <FileUpload
                  id="brpDocument"
                  label="BRP Document"
                  accept="image/*,.pdf"
                  disabled={isLoading}
                  error={errors.brpDocument?.message}
                  onChange={(file) => methods.setValue('brpDocument', file)}
                />
              </div>

              {/* References */}
              <div className="card">
                <ReferenceFields disabled={isLoading} />
              </div>

              {/* Work History */}
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold">Work History</h2>

                <div>
                  <label htmlFor="workHistory" className="block text-sm font-medium">
                    Work history
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="workHistory"
                      rows={5}
                      disabled={isLoading}
                      {...register('workHistory')}
                    />
                    {errors.workHistory && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.workHistory.message}
                      </p>
                    )}
                  </div>
                </div>

                <FileUpload
                  id="cv"
                  label="CV"
                  accept=".pdf,.doc,.docx"
                  disabled={isLoading}
                  error={errors.cv?.message}
                  onChange={(file) => methods.setValue('cv', file)}
                />
              </div>

              {/* Trainings */}
              <div className="card">
                <TrainingFields disabled={isLoading} />

                <div className="mt-6">
                  <FileUpload
                    id="combinedCertificate"
                    label="Combined Certificate"
                    accept=".pdf"
                    disabled={isLoading}
                    error={errors.combinedCertificate?.message}
                    onChange={(file) => methods.setValue('combinedCertificate', file)}
                  />
                </div>
              </div>

              {/* Bank Details */}
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold">Bank Details</h2>

                <div>
                  <label
                    htmlFor="bankDetails.sortCode"
                    className="block text-sm font-medium"
                  >
                    Sort code
                  </label>
                  <div className="mt-1">
                    <input
                      id="bankDetails.sortCode"
                      type="text"
                      disabled={isLoading}
                      {...register('bankDetails.sortCode')}
                    />
                    {errors.bankDetails?.sortCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.bankDetails.sortCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bankDetails.accountNumber"
                    className="block text-sm font-medium"
                  >
                    Account number
                  </label>
                  <div className="mt-1">
                    <input
                      id="bankDetails.accountNumber"
                      type="text"
                      disabled={isLoading}
                      {...register('bankDetails.accountNumber')}
                    />
                    {errors.bankDetails?.accountNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.bankDetails.accountNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bankDetails.bankName"
                    className="block text-sm font-medium"
                  >
                    Bank name
                  </label>
                  <div className="mt-1">
                    <input
                      id="bankDetails.bankName"
                      type="text"
                      disabled={isLoading}
                      {...register('bankDetails.bankName')}
                    />
                    {errors.bankDetails?.bankName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.bankDetails.bankName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Signature */}
              <div className="card space-y-6">
                <h2 className="text-xl font-semibold">Signature</h2>

                <SignaturePad
                  id="signature"
                  label="Please sign below"
                  disabled={isLoading}
                  error={errors.signature?.message}
                  onChange={(signature) => methods.setValue('signature', signature)}
                />

                <div className="flex items-center space-x-2">
                  <input
                    id="consent"
                    type="checkbox"
                    disabled={isLoading}
                    {...register('consent')}
                    className="h-4 w-4 rounded border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                  <label htmlFor="consent" className="text-sm">
                    I confirm that all the information provided is accurate and complete
                  </label>
                </div>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save and continue'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

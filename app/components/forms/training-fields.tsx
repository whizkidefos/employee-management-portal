'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { ProfileFormData } from '@/app/lib/validations/profile';
import { defaultTrainings } from '@/app/lib/validations/profile';

interface TrainingFieldsProps {
  disabled?: boolean;
}

export function TrainingFields({ disabled }: TrainingFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    name: 'otherTrainings',
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Required Trainings</h3>
        <div className="mt-4 space-y-4">
          {defaultTrainings.map((training, index) => (
            <div key={training} className="flex items-start space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">{training}</label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`trainings.${index}.passed-yes`}
                      value="true"
                      disabled={disabled}
                      {...register(`trainings.${index}.passed`)}
                      className="h-4 w-4 border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                    <label
                      htmlFor={`trainings.${index}.passed-yes`}
                      className="text-sm"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`trainings.${index}.passed-no`}
                      value="false"
                      disabled={disabled}
                      {...register(`trainings.${index}.passed`)}
                      className="h-4 w-4 border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                    <label
                      htmlFor={`trainings.${index}.passed-no`}
                      className="text-sm"
                    >
                      No
                    </label>
                  </div>
                  <input
                    type="date"
                    disabled={disabled}
                    {...register(`trainings.${index}.datePassed`)}
                    className="w-auto"
                  />
                </div>
                {errors.trainings?.[index] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.trainings[index]?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Other Trainings</h3>
          <button
            type="button"
            onClick={() => append({ name: '', datePassed: '' })}
            className="btn-secondary"
            disabled={disabled}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add training
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-4">
                <div>
                  <label
                    htmlFor={`otherTrainings.${index}.name`}
                    className="block text-sm font-medium"
                  >
                    Training name
                  </label>
                  <div className="mt-1">
                    <input
                      id={`otherTrainings.${index}.name`}
                      type="text"
                      disabled={disabled}
                      {...register(`otherTrainings.${index}.name`)}
                    />
                    {errors.otherTrainings?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.otherTrainings[index]?.name?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`otherTrainings.${index}.datePassed`}
                    className="block text-sm font-medium"
                  >
                    Date passed
                  </label>
                  <div className="mt-1">
                    <input
                      id={`otherTrainings.${index}.datePassed`}
                      type="date"
                      disabled={disabled}
                      {...register(`otherTrainings.${index}.datePassed`)}
                    />
                    {errors.otherTrainings?.[index]?.datePassed && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.otherTrainings[index]?.datePassed?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-4 rounded-full p-1 hover:bg-light-border/10 dark:hover:bg-dark-border/10"
                disabled={disabled}
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

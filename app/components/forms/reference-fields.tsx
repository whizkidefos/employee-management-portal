'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { ProfileFormData } from '@/app/lib/validations/profile';

interface ReferenceFieldsProps {
  disabled?: boolean;
}

export function ReferenceFields({ disabled }: ReferenceFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    name: 'references',
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">References</h3>
        <button
          type="button"
          onClick={() => append({ name: '', email: '', phone: '' })}
          className="btn-secondary"
          disabled={disabled}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add reference
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="card">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-4">
              <div>
                <label
                  htmlFor={`references.${index}.name`}
                  className="block text-sm font-medium"
                >
                  Reference name
                </label>
                <div className="mt-1">
                  <input
                    id={`references.${index}.name`}
                    type="text"
                    disabled={disabled}
                    {...register(`references.${index}.name`)}
                  />
                  {errors.references?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.references[index]?.name?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor={`references.${index}.email`}
                  className="block text-sm font-medium"
                >
                  Reference email
                </label>
                <div className="mt-1">
                  <input
                    id={`references.${index}.email`}
                    type="email"
                    disabled={disabled}
                    {...register(`references.${index}.email`)}
                  />
                  {errors.references?.[index]?.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.references[index]?.email?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor={`references.${index}.phone`}
                  className="block text-sm font-medium"
                >
                  Reference phone
                </label>
                <div className="mt-1">
                  <input
                    id={`references.${index}.phone`}
                    type="tel"
                    disabled={disabled}
                    {...register(`references.${index}.phone`)}
                  />
                  {errors.references?.[index]?.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.references[index]?.phone?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-4 rounded-full p-1 hover:bg-light-border/10 dark:hover:bg-dark-border/10"
              disabled={disabled || fields.length <= 2}
            >
              <TrashIcon className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}

      {errors.references?.root && (
        <p className="mt-1 text-sm text-red-600">{errors.references.root.message}</p>
      )}
    </div>
  );
}

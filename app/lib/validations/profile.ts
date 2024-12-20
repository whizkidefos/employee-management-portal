import * as z from 'zod';

export const profileSchema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female']),
  postcode: z.string().min(1, 'Postcode is required'),
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
  hasCautions: z.boolean(),
  nationalInsuranceNumber: z
    .string()
    .min(1, 'National Insurance Number is required')
    .regex(
      /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D\s]$/i,
      'Invalid National Insurance Number'
    ),
  hasEnhancedDBS: z.boolean(),
  dbsCertificate: z.instanceof(File).optional(),
  nationality: z.enum(['UK', 'EU', 'Other']),
  rightToWork: z.boolean(),
  brpNumber: z.string().optional(),
  brpDocument: z.instanceof(File).optional(),
  references: z.array(
    z.object({
      name: z.string().min(1, 'Reference name is required'),
      email: z.string().email('Invalid email address'),
      phone: z.string().min(1, 'Phone number is required'),
    })
  ).min(2, 'At least two references are required'),
  workHistory: z.string().min(1, 'Work history is required'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  cv: z.instanceof(File),
  trainings: z.array(
    z.object({
      name: z.string(),
      passed: z.boolean(),
      datePassed: z.string().optional(),
    })
  ),
  otherTrainings: z.array(
    z.object({
      name: z.string().min(1, 'Training name is required'),
      datePassed: z.string().min(1, 'Date passed is required'),
    })
  ),
  combinedCertificate: z.instanceof(File),
  bankDetails: z.object({
    sortCode: z.string().regex(/^\d{6}$/, 'Invalid sort code'),
    accountNumber: z.string().regex(/^\d{8}$/, 'Invalid account number'),
    bankName: z.string().min(1, 'Bank name is required'),
  }),
  signature: z.string().min(1, 'Signature is required'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const defaultTrainings = [
  'COSHH',
  'Conflict Resolution',
  'Domestic Violence and Abuse',
  'Epilepsy Awareness',
  'Fire Safety',
  'First Aid',
  'Food Hygiene',
  'Health and Safety',
  'Infection Control',
  'Manual Handling',
  'Medication Administration',
  'Mental Capacity Act',
  'Safeguarding Adults',
  'Safeguarding Children',
];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  jobRole: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobRole: string;
  avatar?: string;
  isVerified: boolean;
  isAdmin: boolean;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  postcode?: string;
  address?: string;
  country?: string;
  hasCautions?: boolean;
  nationalInsuranceNumber?: string;
  hasEnhancedDBS?: boolean;
  nationality?: 'UK' | 'EU' | 'Other';
  rightToWork?: boolean;
  brpNumber?: string;
  references?: Reference[];
  workHistory?: string;
  consent?: boolean;
  trainings?: Training[];
  otherTrainings?: OtherTraining[];
  bankDetails?: BankDetails;
  signature?: string;
  signatureDate?: string;
}

export interface Reference {
  name: string;
  email: string;
  phone: string;
}

export interface Training {
  name: string;
  passed: boolean;
  datePassed?: string;
}

export interface OtherTraining {
  name: string;
  datePassed: string;
}

export interface BankDetails {
  sortCode: string;
  accountNumber: string;
  bankName: string;
}

export interface Document {
  id: string;
  userId: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string;
  expiryDate?: Date;
  comments?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  enrolled: number;
  instructor: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  price: number;
}

export interface Shift {
  id: string;
  userId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: 'available' | 'booked' | 'completed';
  hourlyRate: number;
}

export interface Payment {
  id: string;
  userId: string;
  shiftId?: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  description?: string;
}

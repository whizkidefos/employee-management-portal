export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  phoneNumber: string;
  isAdmin: boolean;
  jobRole?: string;
  dateOfBirth?: string;
  gender?: string;
  postcode?: string;
  address?: string;
  country?: string;
  nationalInsuranceNumber?: string;
  nationality?: string;
  workHistory?: WorkHistory[];
  bankDetails?: BankDetails;
  signature?: string;
  profileImage?: string;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkHistory {
  employer: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string;
}

export interface BankDetails {
  accountNumber: string;
  sortCode: string;
  bankName: string;
}

export interface Document {
  id: string;
  userId: string;
  employeeName?: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  fileUrl: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shift {
  id: string;
  employeeName?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'available' | 'booked' | 'completed';
  hourlyRate: number;
  bookedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  capacity: number;
  enrolled: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  employeeName?: string;
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'paid' | 'failed';
  payslipUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalEmployees: number;
  activeShifts: number;
  pendingDocuments: number;
  ongoingTrainings: number;
  pendingPayments: number;
}

export interface AnalyticsData {
  employeeCount: number;
  totalPayments: number;
  activeDocuments: number;
  trainingHours: number;
  employeeGrowth: number;
  paymentGrowth: number;
  documentGrowth: number;
  trainingGrowth: number;
  employeeGrowthData: {
    labels: string[];
    values: number[];
  };
  paymentData: {
    labels: string[];
    values: number[];
  };
  documentStatusData: {
    labels: string[];
    values: number[];
  };
  trainingData: {
    labels: string[];
    completed: number[];
    inProgress: number[];
  };
}

export interface Training {
  id: string;
  title: string;
  description: string;
  employeeId: string;
  employeeName?: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  type: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
}

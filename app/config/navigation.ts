import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BanknotesIcon,
  UsersIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const mainNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Employees', href: '/employees' },
  { name: 'Departments', href: '/departments' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Settings', href: '/settings' },
];

export const userNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Shifts', href: '/shifts', icon: CalendarIcon },
  { name: 'Training', href: '/training', icon: AcademicCapIcon },
  { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
  { name: 'Payments', href: '/payments', icon: BanknotesIcon },
];

export const adminNavigation = [
  { name: 'Admin Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Employees', href: '/admin/employees', icon: UsersIcon },
  { name: 'Shift Management', href: '/admin/shifts', icon: CalendarIcon },
  { name: 'Training Management', href: '/admin/training', icon: AcademicCapIcon },
  { name: 'Document Verification', href: '/admin/documents', icon: DocumentTextIcon },
  { name: 'Payment Management', href: '/admin/payments', icon: BanknotesIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
];

export type NavigationItem = {
  name: string;
  href: string;
  icon?: any;
};

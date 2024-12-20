import { DashboardStats } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8800/api';

export const adminApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json();
  },

  async getEmployees() {
    const response = await fetch(`${API_BASE_URL}/admin/employees`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    return response.json();
  },

  async updateEmployeeStatus(employeeId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/admin/employees/${employeeId}/status`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update employee status');
    }

    return response.json();
  },

  async getDocumentVerifications() {
    const response = await fetch(`${API_BASE_URL}/admin/documents/verifications`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document verifications');
    }

    return response.json();
  },

  async verifyDocument(documentId: string, status: 'approved' | 'rejected', comments?: string) {
    const response = await fetch(`${API_BASE_URL}/admin/documents/${documentId}/verify`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, comments }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify document');
    }

    return response.json();
  },

  async createShift(shiftData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/shifts`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shiftData),
    });

    if (!response.ok) {
      throw new Error('Failed to create shift');
    }

    return response.json();
  },

  async updateShift(shiftId: string, shiftData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/shifts/${shiftId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shiftData),
    });

    if (!response.ok) {
      throw new Error('Failed to update shift');
    }

    return response.json();
  },

  async deleteShift(shiftId: string) {
    const response = await fetch(`${API_BASE_URL}/admin/shifts/${shiftId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete shift');
    }
  },

  async createTraining(trainingData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/training`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainingData),
    });

    if (!response.ok) {
      throw new Error('Failed to create training');
    }

    return response.json();
  },

  async updateTraining(trainingId: string, trainingData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/training/${trainingId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainingData),
    });

    if (!response.ok) {
      throw new Error('Failed to update training');
    }

    return response.json();
  },

  async deleteTraining(trainingId: string) {
    const response = await fetch(`${API_BASE_URL}/admin/training/${trainingId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete training');
    }
  },

  async processPayroll(month: string) {
    const response = await fetch(`${API_BASE_URL}/admin/payroll/process`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ month }),
    });

    if (!response.ok) {
      throw new Error('Failed to process payroll');
    }

    return response.json();
  },
};

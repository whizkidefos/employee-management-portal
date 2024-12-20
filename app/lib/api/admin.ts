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

  async getEmployee(employeeId: string) {
    const response = await fetch(`${API_BASE_URL}/admin/employees/${employeeId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }

    return response.json();
  },

  async createEmployee(employeeData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/employees`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to create employee');
    }

    return response.json();
  },

  async updateEmployee(employeeId: string, employeeData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/employees/${employeeId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to update employee');
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

  // Document Management
  async getDocuments() {
    const response = await fetch(`${API_BASE_URL}/admin/documents`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    return response.json();
  },

  async getDocument(documentId: string) {
    const response = await fetch(`${API_BASE_URL}/admin/documents/${documentId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }

    return response.json();
  },

  async createDocument(formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/admin/documents`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create document');
    }

    return response.json();
  },

  async updateDocument(documentId: string, formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/admin/documents/${documentId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update document');
    }

    return response.json();
  },

  async updateDocumentStatus(documentId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/admin/documents/${documentId}/status`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update document status');
    }

    return response.json();
  },

  // Payment Management
  async getPayments() {
    const response = await fetch(`${API_BASE_URL}/admin/payments`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }

    return response.json();
  },

  async getPayment(paymentId: string) {
    const response = await fetch(`${API_BASE_URL}/admin/payments/${paymentId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment');
    }

    return response.json();
  },

  async createPayment(paymentData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/payments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment');
    }

    return response.json();
  },

  async updatePayment(paymentId: string, paymentData: any) {
    const response = await fetch(`${API_BASE_URL}/admin/payments/${paymentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to update payment');
    }

    return response.json();
  },

  async updatePaymentStatus(paymentId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/admin/payments/${paymentId}/status`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update payment status');
    }

    return response.json();
  },

  // Analytics
  async getAnalytics(timeRange: string) {
    const response = await fetch(`${API_BASE_URL}/admin/analytics?timeRange=${timeRange}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
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

import { Shift } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const shiftsApi = {
  async createShift(data: Omit<Shift, 'id'>) {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create shift');
    }
    
    return response.json();
  },

  async getAllShifts() {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch shifts');
    }
    
    return response.json();
  },

  async getShiftById(id: string) {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch shift');
    }
    
    return response.json();
  },

  async updateShift(id: string, data: Partial<Shift>) {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update shift');
    }
    
    return response.json();
  },

  async deleteShift(id: string) {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete shift');
    }
  },

  async bookShift(id: string) {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts/${id}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to book shift');
    }
    
    return response.json();
  },

  async cancelShiftBooking(id: string) {
    const response = await fetch(`${API_BASE_URL}/schedule/shifts/${id}/book`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to cancel shift booking');
    }
  },
};

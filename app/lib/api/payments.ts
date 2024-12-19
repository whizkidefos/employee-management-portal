import { Payment } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const paymentsApi = {
  async createPaymentIntent(amount: number, description?: string) {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, description }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }
    
    return response.json();
  },

  async confirmPayment(paymentIntentId: string) {
    const response = await fetch(`${API_BASE_URL}/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentIntentId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to confirm payment');
    }
    
    return response.json();
  },

  async getPayments() {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    
    return response.json();
  },

  async getPaymentById(id: string) {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment');
    }
    
    return response.json();
  },
};

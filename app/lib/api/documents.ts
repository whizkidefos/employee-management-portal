import { Document } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const documentsApi = {
  async uploadDocument(file: File, type: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload document');
    }
    
    return response.json();
  },

  async getDocuments() {
    const response = await fetch(`${API_BASE_URL}/documents`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }
    
    return response.json();
  },

  async getDocumentById(id: string) {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }
    
    return response.json();
  },

  async deleteDocument(id: string) {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete document');
    }
  },

  async updateDocumentStatus(id: string, status: Document['status'], comments?: string) {
    const response = await fetch(`${API_BASE_URL}/documents/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, comments }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update document status');
    }
    
    return response.json();
  },

  async downloadDocument(id: string) {
    const response = await fetch(`${API_BASE_URL}/documents/download/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to download document');
    }
    
    return response.blob();
  },

  async getDocumentTypes() {
    const response = await fetch(`${API_BASE_URL}/documents/types`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch document types');
    }
    
    return response.json();
  },

  async getRequiredDocuments() {
    const response = await fetch(`${API_BASE_URL}/documents/required`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch required documents');
    }
    
    return response.json();
  },
};

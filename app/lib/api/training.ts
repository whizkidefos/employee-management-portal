import { Course } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const trainingApi = {
  async createCourse(data: Omit<Course, 'id'>) {
    const response = await fetch(`${API_BASE_URL}/training/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create course');
    }
    
    return response.json();
  },

  async getAllCourses() {
    const response = await fetch(`${API_BASE_URL}/training/courses`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    
    return response.json();
  },

  async getCourseById(id: string) {
    const response = await fetch(`${API_BASE_URL}/training/courses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }
    
    return response.json();
  },

  async updateCourse(id: string, data: Partial<Course>) {
    const response = await fetch(`${API_BASE_URL}/training/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update course');
    }
    
    return response.json();
  },

  async deleteCourse(id: string) {
    const response = await fetch(`${API_BASE_URL}/training/courses/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
  },

  async enrollInCourse(id: string) {
    const response = await fetch(`${API_BASE_URL}/training/courses/${id}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to enroll in course');
    }
    
    return response.json();
  },

  async unenrollFromCourse(id: string) {
    const response = await fetch(`${API_BASE_URL}/training/courses/${id}/enroll`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to unenroll from course');
    }
  },
};

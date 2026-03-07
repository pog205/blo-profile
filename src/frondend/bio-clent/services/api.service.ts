/**
 * API Service
 * Centralized HTTP client for making API calls
 */

import { API_CONFIG, getAuthHeader } from '../config/api.config';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiService {
  private async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requiresAuth = false, headers = {}, ...restOptions } = options;

    const config: RequestInit = {
      ...restOptions,
      headers: {
        ...API_CONFIG.headers,
        ...(requiresAuth ? getAuthHeader() : {}),
        ...headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText,
        }));
        throw new Error(error.message || error.error || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get<T>(url: string, requiresAuth = false): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
      requiresAuth,
    });
  }

  async post<T>(
    url: string,
    data: unknown,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth,
    });
  }

  async put<T>(
    url: string,
    data: unknown,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth,
    });
  }

  async delete<T>(url: string, requiresAuth = false): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
      requiresAuth,
    });
  }
}

export const apiService = new ApiService();

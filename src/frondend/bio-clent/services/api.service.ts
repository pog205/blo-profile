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

    const baseHeaders: Record<string, string> = { ...API_CONFIG.headers };
    // When sending FormData, let the browser set the correct multipart boundary.
    if (restOptions.body instanceof FormData) {
      delete baseHeaders['Content-Type'];
    }

    const config: RequestInit = {
      ...restOptions,
      headers: {
        ...baseHeaders,
        ...(requiresAuth ? getAuthHeader() : {}),
        ...headers, // Headers truyền từ ngoài vào sẽ đè lên (hoặc thêm mới) ở đây
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

  // Bổ sung tham số headers
  async get<T>(
    url: string, 
    requiresAuth = false, 
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
      requiresAuth,
      headers,
    });
  }

  // Bổ sung tham số headers
  async post<T>(
    url: string,
    data: unknown,
    requiresAuth = false,
    headers?: Record<string, string>
  ): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(url, {
      method: 'POST',
      body,
      requiresAuth,
      headers,
    });
  }

  // Bổ sung tham số headers
  async put<T>(
    url: string,
    data: unknown,
    requiresAuth = false,
    headers?: Record<string, string>
  ): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request<T>(url, {
      method: 'PUT',
      body,
      requiresAuth,
      headers,
    });
  }

  // Bổ sung tham số headers
  async delete<T>(
    url: string, 
    requiresAuth = false, 
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
      requiresAuth,
      headers,
    });
  }
}

export const apiService = new ApiService();

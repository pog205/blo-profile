/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

import { API_ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  username: string;
  email: string;
}

export const authService = {
  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.auth.login,
      data,
      false // không cần auth cho login
    );
    
    // Lưu token vào localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      localStorage.setItem('user', JSON.stringify({
        username: response.username,
        email: response.email,
      }));
    }
    
    return response;
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.auth.register,
      data,
      false
    );
    
    // Auto login sau khi register
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        username: response.username,
        email: response.email,
      }));
    }
    
    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post(
        API_ENDPOINTS.auth.logout,
        {},
        true // cần auth
      );
    } finally {
      // Xóa token dù API có lỗi
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.auth.refreshToken,
      { refreshToken },
      false
    );

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },
};

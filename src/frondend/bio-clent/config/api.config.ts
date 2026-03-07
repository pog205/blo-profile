/**
 * API Configuration
 * Centralized API URLs and endpoints
 */

// Base URL từ environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    refreshToken: `${API_BASE_URL}/api/auth/refresh`,
    logout: `${API_BASE_URL}/api/auth/logout`,
  },

  // Bio Profile endpoints
  bioProfile: {
    getAll: `${API_BASE_URL}/api/bio-profiles`,
    getById: (id: string) => `${API_BASE_URL}/api/bio-profiles/${id}`,
    create: `${API_BASE_URL}/api/bio-profiles`,
    update: (id: string) => `${API_BASE_URL}/api/bio-profiles/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/bio-profiles/${id}`,
  },

  // Social Link endpoints
  socialLink: {
    getByProfile: (profileId: string) => `${API_BASE_URL}/api/social-links/profile/${profileId}`,
    create: `${API_BASE_URL}/api/social-links`,
    update: (id: string) => `${API_BASE_URL}/api/social-links/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/social-links/${id}`,
  },

  // Music endpoints (nếu có)
  music: {
    getAll: `${API_BASE_URL}/api/music`,
    getById: (id: string) => `${API_BASE_URL}/api/music/${id}`,
  },
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Helper function to get auth header
 */
export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

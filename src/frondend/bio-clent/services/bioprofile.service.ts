/**
 * BioProfile API Service
 * Handles all bio profile-related API calls
 */

import { API_ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';

export interface BioProfile {
  // Identity
  id: string;
  slug: string;

  // Profile Settings
  name: string;
  location?: string;
  description?: string;
  avatarUrl?: string;
  backgroundUrl?: string;

  // Theme Settings
  fontFamily?: string;
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  iconsColor?: string;
  profileOpacity?: number;
  profileBlur?: number;

  // Effects
  mouseEffectUrl?: string;
  backgroundEffectId?: string;

  // Metadata
  views?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateBioProfileRequest {
  slug?: string;
  name?: string;
  location?: string;
  description?: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  fontFamily?: string;
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  iconsColor?: string;
  profileOpacity?: number;
  profileBlur?: number;
  mouseEffectUrl?: string;
  backgroundEffectId?: string;
}

export const bioProfileService = {
  /**
   * Get all bio profiles (if user has multiple)
   */
  async getAll(): Promise<BioProfile[]> {
    return apiService.get<BioProfile[]>(
      API_ENDPOINTS.bioProfile.getAll,
      true
    );
  },

  /**
   * Get bio profile by ID
   */
  async getById(id: string): Promise<BioProfile> {
    return apiService.get<BioProfile>(
      API_ENDPOINTS.bioProfile.getById(id),
      false // public có thể xem
    );
  },

  /**
   * Create new bio profile
   */
  async create(data: UpdateBioProfileRequest): Promise<BioProfile> {
    return apiService.post<BioProfile>(
      API_ENDPOINTS.bioProfile.create,
      data,
      true
    );
  },

  /**
   * Update bio profile
   */
  async update(id: string, data: UpdateBioProfileRequest): Promise<BioProfile> {
    return apiService.put<BioProfile>(
      API_ENDPOINTS.bioProfile.update(id),
      data,
      true
    );
  },

  /**
   * Delete bio profile
   */
  async delete(id: string): Promise<void> {
    return apiService.delete<void>(
      API_ENDPOINTS.bioProfile.delete(id),
      true
    );
  },
  async uploadFile(file: File): Promise<string> {
    return apiService.post<string>(
      API_ENDPOINTS.bioProfile.uploadFile,
      file,
      true
    );
  },
  
};

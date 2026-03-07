/**
 * BioProfile API Service
 * Handles all bio profile-related API calls
 */

import { API_ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';

interface BioProfile {
  id: string;
  slug: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  theme?: string;
  isPublic: boolean;
  viewCount: number;
}

interface CreateBioProfileRequest {
  slug: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  theme?: string;
  isPublic?: boolean;
}

interface UpdateBioProfileRequest extends Partial<CreateBioProfileRequest> {}

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
  async create(data: CreateBioProfileRequest): Promise<BioProfile> {
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
};

/**
 * Social Link API Service
 * Handles all social link-related API calls
 */

import { API_ENDPOINTS } from '../config/api.config';
import { apiService } from './api.service';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  displayText?: string;
  iconUrl?: string;
  order: number;
  isVisible: boolean;
}

interface CreateSocialLinkRequest {
  profileId: string;
  platform: string;
  url: string;
  displayText?: string;
  order?: number;
}

interface UpdateSocialLinkRequest extends Partial<Omit<CreateSocialLinkRequest, 'profileId'>> {}

export const socialLinkService = {
  /**
   * Get all social links for a profile
   */
  async getByProfile(profileId: string): Promise<SocialLink[]> {
    return apiService.get<SocialLink[]>(
      API_ENDPOINTS.socialLink.getByProfile(profileId),
      false
    );
  },

  /**
   * Create new social link
   */
  async create(data: CreateSocialLinkRequest): Promise<SocialLink> {
    return apiService.post<SocialLink>(
      API_ENDPOINTS.socialLink.create,
      data,
      true
    );
  },

  /**
   * Update social link
   */
  async update(id: string, data: UpdateSocialLinkRequest): Promise<SocialLink> {
    return apiService.put<SocialLink>(
      API_ENDPOINTS.socialLink.update(id),
      data,
      true
    );
  },

  /**
   * Delete social link
   */
  async delete(id: string): Promise<void> {
    return apiService.delete<void>(
      API_ENDPOINTS.socialLink.delete(id),
      true
    );
  },
};

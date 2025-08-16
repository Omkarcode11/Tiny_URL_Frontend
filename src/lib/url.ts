import api from './api';
import { Url, CreateUrlRequest, CreateUrlResponse, UrlAnalytics } from '@/types';
import { analyticsService } from '@/lib/analytics';

export const urlService = {
  // Create a new short URL
  async createUrl(data: CreateUrlRequest): Promise<CreateUrlResponse> {
    const response = await api.post('/urls', data);
    return response.data;
  },

  // Get all URLs for the current user
  async getUrls(): Promise<Url[]> {
    const response = await api.get('/urls');
    return response.data;
  },

  // Get URLs with analytics for the current user
  async getUrlsWithAnalytics(): Promise<UrlAnalytics[]> {
    const response = await api.get('/analytics/urls');
    return response.data;
  },

  // Get a specific URL by ID
  async getUrl(id: string): Promise<Url> {
    const response = await api.get(`/urls/${id}`);
    return response.data;
  },

  // Update a URL
  async updateUrl(id: string, data: Partial<CreateUrlRequest>): Promise<Url> {
    const response = await api.put(`/urls/${id}`, data);
    return response.data;
  },

  // Delete a URL
  async deleteUrl(id: string): Promise<void> {
    await api.delete(`/urls/${id}`);
  },

  // Get the full short URL
  getShortUrl(shortUrl: string): string {
    // Try to get the base URL from environment variable first
    let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (baseUrl) {
      // Remove /api/v1 to get the domain
      const domain = baseUrl.replace('/api/v1', '');
      return `${domain}/${shortUrl}`;
    }
    
    // Fallback to window.location if available (client-side)
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/${shortUrl}`;
    }
    
    // Final fallback for server-side rendering
    return `http://localhost:3000/${shortUrl}`;
  },

  // Get metrics for the current user
  async getMetrics(): Promise<{ totalUrls: number; totalClicks: number; averageClicks: number }> {
    const response = await api.get('/analytics/user');
    const data = response.data;
    return {
      totalUrls: data.totalUrls,
      totalClicks: data.totalClicks,
      averageClicks: data.averageClicksPerUrl,
    };
  },
};

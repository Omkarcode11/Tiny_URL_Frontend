import api from './api';
import { UserAnalytics, UrlAnalytics, PlatformStats, ClickTrend, RecentActivity } from '@/types';

export const analyticsService = {
  // Get comprehensive analytics for the current user
  async getUserAnalytics(): Promise<UserAnalytics> {
    const response = await api.get('/analytics/user');
    return response.data;
  },

  // Get analytics for a specific URL
  async getUrlAnalytics(urlId: string): Promise<UrlAnalytics> {
    const response = await api.get(`/analytics/url/${urlId}`);
    return response.data;
  },

  // Get all URLs with analytics for the current user
  async getUserUrlsWithAnalytics(): Promise<UrlAnalytics[]> {
    const response = await api.get('/analytics/urls');
    return response.data;
  },

  // Get click trends for the last 7 days
  async getClickTrends(): Promise<ClickTrend[]> {
    const response = await api.get('/analytics/trends');
    return response.data;
  },

  // Get recent activity for the last 30 days
  async getRecentActivity(): Promise<RecentActivity[]> {
    const response = await api.get('/analytics/activity');
    return response.data;
  },

  // Get platform statistics
  async getPlatformStats(): Promise<PlatformStats> {
    const response = await api.get('/analytics/platform');
    return response.data;
  },

  // Get performance color based on click count
  getPerformanceColor(performance: 'high' | 'medium' | 'low'): string {
    switch (performance) {
      case 'high':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  },

  // Get performance label
  getPerformanceLabel(performance: 'high' | 'medium' | 'low'): string {
    switch (performance) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  },

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format date for charts (short format)
  formatDateForChart(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  },

  // Get click count with proper formatting
  formatClickCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  },
};

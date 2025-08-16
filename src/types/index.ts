export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Url {
  id: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  clickCount?: number;
}

export interface CreateUrlRequest {
  originalUrl: string;
  shortUrl?: string;
}

export interface CreateUrlResponse {
  id: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  clickCount: number;
}

export interface UrlMetrics {
  totalUrls: number;
  totalClicks: number;
  averageClicks: number;
}

// Analytics Types
export interface UrlAnalytics {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
  lastClicked?: string;
  performance: 'high' | 'medium' | 'low';
}

export interface UserAnalytics {
  totalUrls: number;
  totalClicks: number;
  averageClicksPerUrl: number;
  topPerformingUrls: UrlAnalytics[];
  recentActivity: {
    date: string;
    clicks: number;
  }[];
  clickTrends: {
    date: string;
    clicks: number;
  }[];
}

export interface PlatformStats {
  totalUsers: number;
  totalUrls: number;
  totalClicks: number;
  averageClicksPerUrl: number;
}

export interface ClickTrend {
  date: string;
  clicks: number;
}

export interface RecentActivity {
  date: string;
  clicks: number;
}

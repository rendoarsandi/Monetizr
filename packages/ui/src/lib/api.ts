// Shared API utilities for all Monetizr applications
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://monetizr-api.rendoarsandi.workers.dev';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'creator' | 'promoter' | 'admin';
  bio?: string;
  balance?: number;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  price_per_view: number;
  requirements?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  creator_name: string;
  created_at: string;
  expires_at?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      this.token = token;
    }
  }

  private removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      this.token = null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data?.token) {
      this.saveToken(response.data.token);
    }

    return response;
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    role?: 'creator' | 'promoter';
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data?.token) {
      this.saveToken(response.data.token);
    }

    return response;
  }

  async verifyToken(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/verify');
  }

  logout() {
    this.removeToken();
  }

  // User methods
  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/user/profile');
  }

  async updateProfile(data: { name: string; bio?: string }): Promise<ApiResponse> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getBankAccount(): Promise<ApiResponse<{ bankAccount: any }>> {
    return this.request<{ bankAccount: any }>('/user/bank-account');
  }

  async updateBankAccount(data: {
    bank_name: string;
    account_holder_name: string;
    account_number: string;
  }): Promise<ApiResponse> {
    return this.request('/user/bank-account', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Campaign methods
  async getCampaigns(): Promise<ApiResponse<{ campaigns: Campaign[] }>> {
    return this.request<{ campaigns: Campaign[] }>('/campaigns');
  }

  async createCampaign(data: {
    title: string;
    description: string;
    budget: number;
    price_per_view: number;
    requirements?: string;
    material_url?: string;
  }): Promise<ApiResponse<{ campaignId: string }>> {
    return this.request<{ campaignId: string }>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCampaign(id: string): Promise<ApiResponse<{ campaign: Campaign }>> {
    return this.request<{ campaign: Campaign }>(`/campaigns/${id}`);
  }

  async updateCampaignStatus(id: string, status: string): Promise<ApiResponse> {
    return this.request(`/campaigns/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const apiClient = new ApiClient();
export default apiClient;

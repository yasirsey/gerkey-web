const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
  };
  expiresIn: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}

class ApiService {
  private getLanguage(): string {
    if (typeof window === 'undefined') return 'tr';
    
    // URL'den locale'i al
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const locale = segments[1];
    
    // Desteklenen dillerden biri mi kontrol et
    if (['tr', 'en', 'de'].includes(locale)) {
      return locale;
    }
    
    return 'tr'; // Default
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': this.getLanguage(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error: ApiError = await response.json();
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          message: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
          statusCode: 0,
          error: 'NetworkError'
        } as ApiError;
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async getProfile(accessToken: string): Promise<{ message: string; user: { id: string; email: string; fullName: string; role: string; isActive: boolean } }> {
    return this.request('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async logout(accessToken: string): Promise<void> {
    return this.request('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export const apiService = new ApiService(); 
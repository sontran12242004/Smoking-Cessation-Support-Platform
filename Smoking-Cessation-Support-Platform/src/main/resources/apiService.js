import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear user data and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Authentication
  static async login(credentials) {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  }

  static async logout() {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }

  // User Profile
  static async getUserProfile(userId) {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  }

  static async updateUserProfile(userId, profileData) {
    const response = await apiClient.put(`/users/${userId}`, profileData);
    return response.data;
  }

  // Health Metrics
  static async getHealthMetrics(userId) {
    const response = await apiClient.get(`/health-metrics/${userId}`);
    return response.data;
  }

  static async getLungCancerRisk(userId) {
    const response = await apiClient.get(`/health-metrics/risk/lung-cancer?userId=${userId}`);
    return response.data;
  }

  static async getHeartDiseaseRisk(userId) {
    const response = await apiClient.get(`/health-metrics/risk/heart-disease?userId=${userId}`);
    return response.data;
  }

  static async getDaysSmokeFree(userId) {
    const response = await apiClient.get(`/health-metrics/days-free?userId=${userId}`);
    return response.data;
  }

  static async getMoneySaved(userId) {
    const response = await apiClient.get(`/health-metrics/money-saved?userId=${userId}`);
    return response.data;
  }

  static async getHealthImproved(userId) {
    const response = await apiClient.get(`/health-metrics/percent/health-improved?userId=${userId}`);
    return response.data;
  }

  static async getHealthImprovementRate(userId) {
    const response = await apiClient.get(`/health-metrics/health-improvement-rate?userId=${userId}`);
    return response.data;
  }

  // Daily Check-in
  static async submitDailyCheckIn(userId, dailyProcessData) {
    const response = await apiClient.post('/daily-process', {
      userId,
      ...dailyProcessData
    });
    return response.data;
  }

  // Forgot Password
  static async forgotPassword(email) {
    const response = await apiClient.post('/forgot-password', { email });
    return response.data;
  }

  // Reset Password
  static async resetPassword(token, newPassword) {
    const response = await apiClient.post('/reset-password', { token, newPassword });
    return response.data;
  }
}

export default ApiService; 
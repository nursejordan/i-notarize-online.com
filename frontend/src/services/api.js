import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Contact form submission
  async submitContactForm(formData) {
    try {
      const response = await apiClient.post('/contact/submit', formData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to submit contact form'
      };
    }
  },

  // Get business information
  async getBusinessInfo() {
    try {
      const response = await apiClient.get('/business/info');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get business info:', error);
      return {
        success: false,
        error: 'Failed to load business information'
      };
    }
  },

  // Get business hours
  async getBusinessHours() {
    try {
      const response = await apiClient.get('/business/hours');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get business hours:', error);
      return {
        success: false,
        error: 'Failed to load business hours'
      };
    }
  },

  // Get business statistics
  async getBusinessStats() {
    try {
      const response = await apiClient.get('/business/stats');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get business stats:', error);
      return {
        success: false,
        error: 'Failed to load business statistics'
      };
    }
  },

  // Get services
  async getServices() {
    try {
      const response = await apiClient.get('/services');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get services:', error);
      return {
        success: false,
        error: 'Failed to load services'
      };
    }
  },

  // Get additional pricing
  async getAdditionalPricing() {
    try {
      const response = await apiClient.get('/pricing/additional');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get additional pricing:', error);
      return {
        success: false,
        error: 'Failed to load additional pricing'
      };
    }
  },

  // Get coverage areas
  async getCoverageAreas() {
    try {
      const response = await apiClient.get('/coverage');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get coverage areas:', error);
      return {
        success: false,
        error: 'Failed to load coverage areas'
      };
    }
  },

  // Get testimonials
  async getTestimonials(limit = 10) {
    try {
      const response = await apiClient.get(`/testimonials?limit=${limit}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get testimonials:', error);
      return {
        success: false,
        error: 'Failed to load testimonials'
      };
    }
  }
};

// Utility functions
export const formatApiError = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const isApiAvailable = async () => {
  try {
    const response = await apiClient.get('/', { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.warn('Backend API is not available, using mock data');
    return false;
  }
};

export default apiService;
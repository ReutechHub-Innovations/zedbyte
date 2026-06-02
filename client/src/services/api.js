import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '')}/api` : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_URL,
});

// Authentication
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Services
export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

// Projects
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

// Upload Media
export const uploadMedia = async (formData) => {
  const response = await api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// default export for legacy/default-style imports
export default api;

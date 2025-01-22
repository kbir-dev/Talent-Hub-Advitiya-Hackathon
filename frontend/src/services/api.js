import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/talent';

const api = {
  // Talent APIs
  registerTalent: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Client APIs
  registerClient: async (clientData) => {
    const response = await axios.post(`${API_BASE_URL}/client-register`, clientData);
    return response.data;
  },

  loginClient: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/client-login`, credentials);
    return response.data;
  },

  // Talent listing API
  getApprovedTalents: async () => {
    const response = await axios.get(`${API_BASE_URL}/approved-talents`);
    return response.data;
  },

  // Hire request API
  createHireRequest: async (hireData, token) => {
    const response = await axios.post(`${API_BASE_URL}/hire`, hireData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default api; 
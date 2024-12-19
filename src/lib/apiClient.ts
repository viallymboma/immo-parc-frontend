import axios from 'axios';

import { BASE_API_URL } from './constants';

// import { BASE_API_URL } from './constants';

const apiClient = axios.create({
  // baseURL: `${BASE_API_URL}`, // Set your API base URL
  baseURL: `${BASE_API_URL}`, // Set your API base URL
  withCredentials: true, // Include cookies with requests
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Trigger sign-out on token expiration
      window.location.href = '/auth/signin'; // Redirect to a sign-out page or trigger a state change
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Set your API base URL
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

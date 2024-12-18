import { BASE_API_URL } from '@/lib/constants';

import apiClient from '../lib/apiClient';

export function useAuth() {

    const login = async (phone: string, password: string) => {
        try {
            const response = await apiClient.post(`${BASE_API_URL}/auth/login`, { phone, password }, { withCredentials: true });
            return response.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await apiClient.get('/auth/logout', { withCredentials: true });
            // mutate(null); // Clear user data
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return {
        login,
        logout,
    };
}

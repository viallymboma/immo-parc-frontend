"use client";
import { removeUserCookies } from '@/lib/cookies';

// import { useRouter } from 'next/navigation';
import apiClient from '../lib/apiClient';

export function useAuth() {

    // const router = useRouter ()

    const login = async (phone: string, password: string) => {
        try {
            // const response = await apiClient.post(`${BASE_API_URL}/auth/login`, { phone, password }, { withCredentials: true });
            // const response = await axios.post(`/auth/login`, { phone, password }, { withCredentials: true });
            const response = await apiClient.post(`/auth/login`, { phone, password }, { withCredentials: true });
            return response.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await apiClient.get('/auth/logout', { withCredentials: true });
            removeUserCookies ()
            window.location.href = '/auth/signin';
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return {
        login,
        logout,
    };
}

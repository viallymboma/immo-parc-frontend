import apiClient from '../lib/apiClient';

export function useAuth() {

    const login = async (phone: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/login', { phone, password });
            return response.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await apiClient.get('/auth/logout');
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

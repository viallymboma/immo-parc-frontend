"use client";
import useSWR from 'swr';

import { BASE_API_URL } from '@/lib/constants';

import apiClient from '../lib/apiClient';
import { UserVerificationResponseType } from './types';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

export type UserResponseType = {
    message: string;
    userInfo: {
      children: string[]; // Array of IDs or objects for children
      funds: number; // User's funds
      accountType: 'internship' | 'regular'; // Enum for account type
      role: 'super_admin' | 'regular_user'; // Enum for user roles
      status: 'active' | 'inactive'; // Enum for status
      _id: string; // MongoDB ObjectId as a string
      sub: string; // Subject, typically same as _id
      email: string; // User email
      package: string; // MongoDB ObjectId as a string or Package object reference
      createdAt: string; // ISO timestamp
      updatedAt: string; // ISO timestamp
      iat: number; // JWT issued-at timestamp (epoch)
      exp: number; // JWT expiration timestamp (epoch)
    };
};

export function useUserInfo() {

    const { data: user, error, isValidating, mutate } = useSWR<UserVerificationResponseType>(`${BASE_API_URL}/auth/me`, fetcher, {
        // refreshInterval: 20, // Disables periodic revalidation
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false, // Disable revalidation on window focus
        revalidateOnReconnect: false, // Disable revalidation on reconnect
    });

    return {
        user, 
        isValidating, 
        loading: !error && !user,
        error,
    };
}

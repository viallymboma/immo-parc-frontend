"use client";

import useSWR from 'swr';

import apiClient from '@/lib/apiClient';
import { BASE_API_URL } from '@/lib/constants';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url, { withCredentials: true });
    return response.data;
};

const useFetchTaskAssigments = () => {
    const { data, error, isValidating } = useSWR(
        `${BASE_API_URL}/task-assignment/user-tasks`,
        fetcher,
        {
            refreshInterval: 0, // Disable periodic revalidation
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        taskAssignment: data?.tasks || [],
        error,
        isValidating,
    };
};

export default useFetchTaskAssigments;

"use client";

import useSWR from 'swr';

import apiClient from '@/lib/apiClient';
import { BASE_API_URL } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';

import { useUserInfo } from './useUserInfo';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url, { withCredentials: true });
    return response.data;
};

const useFetchAllGenerations = () => {
    const { setLoggedInUserFamilyTreeInStore } = useTaskStore(); 
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/users/${ user?.userInfo?._id }/children`, fetcher, {
        onSuccess: (familyTreeData) => {
            // Update Zustand store when data is fetched
            setLoggedInUserFamilyTreeInStore (familyTreeData)
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchLoggedInUserFamilyTreeInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        loggedInUserFamilyTreeData: data || [],
        error,
        isValidating,
        refetchLoggedInUserFamilyTreeInStore,
    };
};

export default useFetchAllGenerations;

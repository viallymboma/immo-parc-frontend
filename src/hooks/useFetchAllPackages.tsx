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

const useFetchAllPackages = () => {
    const { setPackagesInStore } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/packages`, fetcher, {
        onSuccess: (packagesInStore) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchAllPackages onSuccess", packagesInStore)
            // Update Zustand store when data is fetched
            setPackagesInStore(packagesInStore);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchPackagesInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        packagesInStoreData: data || [],
        error,
        isValidating,
        refetchPackagesInStore,
    };
};

export default useFetchAllPackages;

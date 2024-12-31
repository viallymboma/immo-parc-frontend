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

const useFetchAllAccountEarnings = () => {
    const { setTotalEarningsInStore } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/transactions/earning?userId=${ user?.userInfo?._id }`, fetcher, {
        onSuccess: (totalEarningsInStore) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchAllAccountEarnings onSuccess", totalEarningsInStore)
            // Update Zustand store when data is fetched
            setTotalEarningsInStore(totalEarningsInStore?.totalAmount);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchTotalEarningsInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        totalEarningsInStoreData: data || [],
        error,
        isValidating,
        refetchTotalEarningsInStore,
    };
};

export default useFetchAllAccountEarnings;

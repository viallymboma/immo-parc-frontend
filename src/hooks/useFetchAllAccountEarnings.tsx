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
    const { setTotalEarningsInStore, setEarningTransactionsInStore } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/transactions/earning?userId=${ user?.userInfo?._id }`, fetcher, {
        onSuccess: (totalEarnings) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchAllAccountEarnings onSuccess", totalEarnings)
            // Update Zustand store when data is fetched
            setEarningTransactionsInStore (totalEarnings?.transactions)
            setTotalEarningsInStore(totalEarnings?.totalAmount);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchTotalEarningsInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        totalEarningsData: data || [],
        error,
        isValidating,
        refetchTotalEarningsInStore,
    };
};

export default useFetchAllAccountEarnings;

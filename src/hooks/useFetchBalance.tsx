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

const useFetchBalance = () => {
    const { setWalletBalance } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/wallet?userId=${ user?.userInfo?._id }`, fetcher, {
        onSuccess: (walletBalance) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchBalance onSuccess", walletBalance)
            // Update Zustand store when data is fetched
            setWalletBalance(walletBalance?.balance);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchWalletBalance = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        walletBalanceData: data || [],
        error,
        isValidating,
        refetchWalletBalance,
    };
};

export default useFetchBalance;

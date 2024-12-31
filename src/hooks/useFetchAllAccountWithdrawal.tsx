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

const useFetchAllAccountWithdrawal = () => {
    const { setTotalWithdrawalInStore } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/transactions/withdrawal?userId=${ user?.userInfo?._id }`, fetcher, {
        onSuccess: (totalWithdrawalInStore) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchAllAccountWithdrawal onSuccess", totalWithdrawalInStore)
            // Update Zustand store when data is fetched
            setTotalWithdrawalInStore(totalWithdrawalInStore?.totalAmount);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchTotalWithdrawalInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        totalWithdrawalData: data || [],
        error,
        isValidating,
        refetchTotalWithdrawalInStore,
    };
};

export default useFetchAllAccountWithdrawal;
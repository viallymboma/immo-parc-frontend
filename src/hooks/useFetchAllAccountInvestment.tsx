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

const useFetchAllAccountInvestment = () => {
    const { setTotalInvestmentInStore, setInvestmentTransactionsInStore } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/transactions/investing?userId=${ user?.userInfo?._id }`, fetcher, {
        onSuccess: (totalInvestment) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchAllAccountInvestment onSuccess", totalInvestment)
            // Update Zustand store when data is fetched
            setInvestmentTransactionsInStore (totalInvestment?.transactions)
            setTotalInvestmentInStore(totalInvestment?.totalAmount);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchTotalInvestmentInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        totalInvestmentData: data || [],
        error,
        isValidating,
        refetchTotalInvestmentInStore,
    };
};

export default useFetchAllAccountInvestment;

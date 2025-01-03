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

const useFetchAllAccountFunding = () => {
    const { setTotalRechargeInStore, setFundingTransactionsInStore } = useTaskStore();
    const { user } = useUserInfo ()
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/transactions/funding?userId=${ user?.userInfo?._id }`, fetcher, {
        onSuccess: (totalRecharge) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchAllAccountFunding onSuccess", totalRecharge)
            // Update Zustand store when data is fetched
            setFundingTransactionsInStore (totalRecharge?.transactions)
            setTotalRechargeInStore(totalRecharge?.totalAmount);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchTotalRechargeInStore = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    return {
        totalRechargeData: data || [],
        error,
        isValidating,
        refetchTotalRechargeInStore,
    };
};

export default useFetchAllAccountFunding;

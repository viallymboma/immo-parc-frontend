"use client";

import useSWR from 'swr';

import apiClient from '@/lib/apiClient';
import { BASE_API_URL } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url, { withCredentials: true });
    return response.data;
};

const useFetchPackageAmounts = () => {
    const { setPackageAmountsFromBack } = useTaskStore();
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/package-price`, fetcher, {
        onSuccess: (packageAmounts) => {
            // TRANSFORM DATA HERE 
            console.log("here in useFetchPackageAmounts onSuccess", packageAmounts)
            // const transformTask = packageAmounts?.map((task: any) => {
            //     return {
            //         // ...packageAmounts, 
            //         ...task.task, 
            //         taskAssignmentId: task?._id, 
            //         status: task?.status, 
            //     }
            // })
            // console.log(transformTask, "in the rquest")
            // Update Zustand store when data is fetched
            setPackageAmountsFromBack(packageAmounts);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchAllPackageAmounts = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    // const transformTask = data?.tasks?.map((task: any) => {
    //     return {
    //         ...task?.task, 
    //         taskAssignmentId: task?._id,
    //         status: task?.status, 
    //     }
    // })

    return {
        packageAmounts: data || [],
        error,
        isValidating,
        refetchAllPackageAmounts,
    };
};

export default useFetchPackageAmounts;

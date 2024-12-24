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

const useFetchTasks = () => {
    const { user } = useUserInfo (); 
    const { setTasks } = useTaskStore();
    // const { data: tasksDataSet, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/tasks/users-tasks`, fetcher, {
    const { data: tasksDataSet, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/tasks/users-tasks`, fetcher, {
        onSuccess: (tasks) => {
            // Update Zustand store when data is fetched
            console.log("here in useFetchTasks onSuccess", tasks)
            setTasks(tasks || []);
        },
        onError(err, key, config) {
            // Handle error here
            // console.error("Error fetching tasks:", err);
            // console.error("Key associated with the error:", key);
            // console.error("SWR configuration at the time of error:", config);

            // Optionally, you can also handle Zustand updates or show a user-friendly message
            setTasks([]); // Clear tasks in the store as fallback
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false, // Disable revalidation on window focus
        revalidateOnReconnect: false, // Disable revalidation on reconnect
    });
    
    console.log(tasksDataSet, "mrciiiii"); 

    const refetchTasks = async () => {
        await mutate(); // Revalidates the SWR cache
    };
    return {
        tasksDataSet, 
        error, isValidating, 
        refetchTasks
    }
}

export default useFetchTasks
"use client";

import useSWR from 'swr';

import apiClient from '@/lib/apiClient';
import { BASE_API_URL } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';

import { useUserInfo } from './useUserInfo';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

const useFetchTasks = () => {
    const { user } = useUserInfo (); 
    const { setTasks } = useTaskStore();
    const { data: tasksDataSet, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/tasks/users-tasks`, fetcher, {
        onSuccess: (tasks) => {
            // Update Zustand store when data is fetched
            setTasks(tasks || []);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false, // Disable revalidation on window focus
        revalidateOnReconnect: false, // Disable revalidation on reconnect
    });
    
    // console.log(tasksDataSet, "mrciiiii")
    return {
        tasksDataSet, 
        error, isValidating
    }
}

export default useFetchTasks
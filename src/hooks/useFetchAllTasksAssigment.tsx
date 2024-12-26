"use client";

import useSWR from 'swr';

import apiClient from '@/lib/apiClient';
import { BASE_API_URL } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url, { withCredentials: true });
    return response.data;
};

const useFetchAllTasksAssigment = () => {
    const { setSelectedTaskFromBack } = useTaskStore();
    const { data, error, isValidating, mutate } = useSWR(`${BASE_API_URL}/task-assignment/user-all-tasks`, fetcher, {
        onSuccess: (taskAssignments) => {
            // TRANSFORM DATA HERE 
            // console.log("here in useFetchAllTasksAssigment onSuccess", taskAssignments)
            const transformTask = taskAssignments?.tasks?.map((task: any) => {
                return {
                    ...task.task, 
                    taskAssignmentId: task?._id,
                    status: task?.status, 
                }
            })
            // console.log(transformTask, "in the rquest")
            // Update Zustand store when data is fetched
            setSelectedTaskFromBack(transformTask || []);
        },
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const refetchAllTaskAssignments = async () => {
        await mutate(); // Revalidates the SWR cache
    };

    // console.log(data?.tasks, "eeeeeeeeeeeeeeeeeeee")

    const transformTask = data?.tasks?.map((task: any) => {
        return {
            ...task?.task, 
            taskAssignmentId: task?._id,
            status: task?.status, 
        }
    })

    return {
        allTaskAssignment: transformTask || [],
        error,
        isValidating,
        refetchAllTaskAssignments,
    };
};

export default useFetchAllTasksAssigment;

"use client";

import apiClient from '@/lib/apiClient';
import { BASE_API_URL } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';

const useRefetchTasks = async () => {

    const { setTasks, setSelectedTaskFromBack } = useTaskStore();

    try {
        // Fetch tasks
        const tasksResponse = await apiClient.get(`${BASE_API_URL}/tasks/users-tasks`, { withCredentials: true });
        const tasks = tasksResponse.data;

        // Update Zustand store for tasks
        setTasks(tasks || []);

        // Fetch task assignments
        const taskAssignmentsResponse = await apiClient.get(`${BASE_API_URL}/task-assignment/user-tasks`, { withCredentials: true });
        const taskAssignments = taskAssignmentsResponse.data;

        // Transform task assignments data
        const transformedTaskAssignments = taskAssignments?.tasks?.map((task: any) => ({
            ...task?.task,
            taskAssignmentId: task?._id,
            status: task?.status,
        })) || [];

        // Update Zustand store for task assignments
        setSelectedTaskFromBack(transformedTaskAssignments);

        return { tasks, taskAssignments: transformedTaskAssignments };
    } catch (error) {
        console.error("Error in refetchTask:", error);

        // Clear tasks and task assignments on error
        setTasks([]);
        setSelectedTaskFromBack([]);

        throw error; // Re-throw the error if needed for handling elsewhere
    }
};

export default useRefetchTasks;

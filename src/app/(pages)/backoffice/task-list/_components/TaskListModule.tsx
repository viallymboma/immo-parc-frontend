"use client";
import React from 'react';

import {
  TaskDataType,
} from '@/components/common/backbone/other_component/data';
// taskStatus,
import NavigationContent
  from '@/components/common/navigation/NavigationContent';
import TaskDetailCard from '@/components/common/TaskDetailCard';
import useFetchTaskAssigments from '@/hooks/useFetchTaskAssigment';
import { useTaskStore } from '@/store/task-store';

import { SkeletonCardDetails } from '../../_components/SkeletonCardDetails';

// import TaskList from '@/components/common/TaskList';

const TaskListModule = () => {

    const { tasks_, selectedCategory, filteredTasks, filteredTasksFromBackend } = useTaskStore(); 

    const { taskAssignment, isValidating } = useFetchTaskAssigments (); 

    console.log(filteredTasks, "jjjjjjjjjjjhhhhhhhh", filteredTasksFromBackend); 

    const extractCategories = Array.from(new Set(
        filteredTasksFromBackend?.map((prop: TaskDataType) => prop?.status)
    ));

    console.log(extractCategories, "pppppppppppppppp", )

    return (
        <div>

            <div className='flex flex-row gap-3'>
                <div className='flex flex-col text-center '>
                    <span>0</span>
                    <h1 className='text-[12px]'>Tâches restantes d'aujourd'hui</h1>
                </div>
                {/* <Separator /> */}
                <div className='h-10 w-[1px] bg-black'></div>
                <div className='flex flex-col text-center '>
                    <span>0</span>
                    <h1 className='text-[12px]'>Tâches termnées aujourd'hui</h1>
                </div>
            </div>

            <NavigationContent 
                listClass='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
                buttonList={ extractCategories }
            >
                {
                    isValidating ? 
                        (
                            <div className='flex flex-col gap-4'>
                                <SkeletonCardDetails />
                                <SkeletonCardDetails />
                                <SkeletonCardDetails />
                                {/* <SkeletonCardDetails />
                                <SkeletonCardDetails />
                                <SkeletonCardDetails /> */}
                            </div>
                        )
                        :
                        filteredTasks && filteredTasks?.length > 0 ? filteredTasks?.map((task: TaskDataType) => (
                            <TaskDetailCard key={task?._id} task={task} />
                        )) : filteredTasksFromBackend?.map((task: TaskDataType) => (
                            <TaskDetailCard key={task?._id} task={task} />
                        ))
                }

            </NavigationContent>
        </div>
    )
}

export default TaskListModule









// if (isValidating) {
//     return (
//         <SkeletonCardDetails />
//     )
// }

{/* { filteredTasks && filteredTasks?.length > 0 ? filteredTasks?.map((task: TaskDataType) => (
    <TaskDetailCard key={task?._id} task={task} />
)) : filteredTasksFromBackend?.map((task: TaskDataType) => (
    <TaskDetailCard key={task?._id} task={task} />
))} */}
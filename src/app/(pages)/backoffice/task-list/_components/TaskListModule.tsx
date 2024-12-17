"use client";
import React from 'react';

import {
  TaskDataType,
  taskStatus,
} from '@/components/common/backbone/other_component/data';
import NavigationContent
  from '@/components/common/navigation/NavigationContent';
import TaskDetailCard from '@/components/common/TaskDetailCard';
import useFetchTaskAssigments from '@/hooks/useFetchTaskAssigment';
import { useTaskStore } from '@/store/task-store';

// import TaskList from '@/components/common/TaskList';

const TaskListModule = () => {
    const { tasks_, selectedCategory, filteredTasks, toggleCategory } = useTaskStore(); 
    const { taskAssignment } = useFetchTaskAssigments ()
    console.log(tasks_, "pp666pppppppppppppp", taskAssignment)
    const extractCategories = Array.from(new Set(
        tasks_?.map((prop: TaskDataType) => prop?.taskStatus)
    ));
    // const extractCategories = tasks_?.map((prop: TaskDataType) => prop?.taskStatus);
    // const filteredTasks = tasks_?.filter((prop: TaskDataType) => prop?.taskStatus === selectedCategory)
    console.log(extractCategories, "pppppppppppppppp")
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
                buttonList={ taskStatus }
            >
                {filteredTasks?.map((task: TaskDataType) => (
                    <TaskDetailCard key={task?.id} task={task} />
                ))}
            </NavigationContent>
            {/* <TaskList itemsFilterList={extractCategories} itemsList={tasks} /> */}
        </div>
    )
}

export default TaskListModule
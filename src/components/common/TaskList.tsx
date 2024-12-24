import React from 'react';

import useFetchTaskAssigments from '@/hooks/useFetchTaskAssigment';
import useFetchTasks from '@/hooks/useFetchTasks';

import NavigationContent from './navigation/NavigationContent';
import TaskCard from './TaskCard';

type TaskListType = {
    itemsList: any [], 
    itemsFilterList: any [], 
}

const TaskList: React.FC <TaskListType> = ({itemsList, itemsFilterList}) => {

    const { refetchTasks } = useFetchTasks (); 
    const { refetchTaskAssignments } = useFetchTaskAssigments ()

    const handleRefresh = React.useCallback(async () => {
        try {
            await Promise.all([refetchTasks(), refetchTaskAssignments()]);
        } catch (error) {
            console.error("Error refreshing data:", error);
        }
    }, []);

    return (
        <div>
            <NavigationContent 
                listClass='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
                buttonList={ itemsFilterList }
            >
            {itemsList.map((property: any) => {
                return (
                    <div key={ property?.id } className='flex flex-row gap-4 items-center justify-between bg-white shadow-lg rounded-lg p-4 max-w-sm'>
                        <TaskCard task={ property } onRefresh={handleRefresh} />
                    </div>
                )
            })}
            </NavigationContent>
        </div>
    )
}

export default TaskList
import React from 'react';

import NavigationContent from './navigation/NavigationContent';
import TaskCard from './TaskCard';

type TaskListType = {
    itemsList: any [], 
    itemsFilterList: any [], 
}

const TaskList: React.FC <TaskListType> = ({itemsList, itemsFilterList}) => {
    return (
        <div>
            <NavigationContent 
                listClass='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
                buttonList={ itemsFilterList }
            >
            {itemsList.map((property: any) => {
                return (
                    <div key={ property?.id } className='flex flex-row gap-4 items-center justify-between bg-white shadow-lg rounded-lg p-4 max-w-sm'>
                        <TaskCard task={ property } />
                    </div>
                )
            })}
            </NavigationContent>
        </div>
    )
}

export default TaskList
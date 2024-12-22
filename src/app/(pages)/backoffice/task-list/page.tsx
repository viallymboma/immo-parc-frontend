import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/common/backbone/ReturnHeader';

import TaskListModule from './_components/TaskListModule';

const TaskListPage = () => {
  return (
    <div className='mb-[5rem]'>
        <Breadcrumb pageName="Liste des taches" />
        <ReturnHeader
            headerName=' '
            returnBtnLabel='Retour'
            returnLink='/backoffice'
        />
        <TaskListModule />
    </div>
  )
}

export default TaskListPage
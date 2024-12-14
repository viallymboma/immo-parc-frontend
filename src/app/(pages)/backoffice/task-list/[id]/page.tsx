import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/common/backbone/ReturnHeader';

import ViewDetailsModule from './_components/ViewDetailsModule';

const TaskDetailsPage = () => {
  return (
    <div className='mb-[4rem]'>
        <Breadcrumb pageName="Details de la taches" />
        <ReturnHeader
            headerName=' '
            returnBtnLabel='Retour'
            returnLink='/backoffice'
        />
        <ViewDetailsModule />
    </div>
  )
}

export default TaskDetailsPage
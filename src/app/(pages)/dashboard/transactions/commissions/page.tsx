import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import CommissionModule from './_components/CommissionModule';

const CommissionsPage = () => {
  return (
    <div>
      <ReturnHeader 
          headerName='Mes Gains'
          returnBtnLabel='Retour'
          returnLink='/dashboard'
      />
      <CommissionModule />
    </div>
  )
}

export default CommissionsPage
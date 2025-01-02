import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import CommissionModule from './_components/CommissionModule';

const CommissionsPage = () => {
  return (
    <div>
      <ReturnHeader 
          headerName='Details des gains'
          returnBtnLabel='Retour'
          returnLink='/backoffice/wallet'
      />
      <CommissionModule />
    </div>
  )
}

export default CommissionsPage
import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import FinalStageModule from './_components/FinalStage';

const FinalStagePage = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Etape Finale'
            returnBtnLabel='Retour'
            returnLink='/dashboard/transactions/funding-account/add'
        />
        <FinalStageModule />
    </div>
  )
}

export default FinalStagePage
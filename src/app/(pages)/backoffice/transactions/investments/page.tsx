import React from 'react';

import ReturnHeader from '@/components/common/backbone/ReturnHeader';

import InvestmentModule from './_components/InvestmentModule';

const InvestmentPage = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Investissements'
            returnBtnLabel='Retour'
            returnLink='/backoffice/wallet'
        />
        <InvestmentModule />
    </div>
  )
}

export default InvestmentPage
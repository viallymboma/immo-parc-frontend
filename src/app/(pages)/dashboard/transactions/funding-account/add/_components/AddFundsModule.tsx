"use client";
import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import FundingForm from './FundingForm';

// import FundingForm from './FundingForm';

const AddFundsModule = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Recharges'
            returnBtnLabel='Retour'
            returnLink='/dashboard/transactions/funding-account'
        />
        <div>
          <FundingForm />
        </div>
    </div>
  )
}

export default AddFundsModule
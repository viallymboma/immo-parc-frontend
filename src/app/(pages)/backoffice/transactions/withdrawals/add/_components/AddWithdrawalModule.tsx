"use client";
import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import WithdrawForm from './WithdrawForm';

const AddWithdrawalModule = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Retraits'
            returnBtnLabel='Retour'
            returnLink='/backoffice/transactions/withdrawals'
        />
        <div>
          <WithdrawForm />
        </div>
    </div>
  )
}

export default AddWithdrawalModule
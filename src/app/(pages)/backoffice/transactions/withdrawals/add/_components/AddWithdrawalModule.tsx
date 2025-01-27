"use client";
import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import WithdrawForm from './WithdrawForm';

const AddWithdrawalModule = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Retraits'
            returnBtnLabel='Changer type de retrait'
            returnLink='/backoffice/wallet/withdraw/select'
        />
        <div>
          <WithdrawForm />
        </div>
    </div>
  )
}

export default AddWithdrawalModule
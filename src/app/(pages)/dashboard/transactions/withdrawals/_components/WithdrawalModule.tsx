"use client";
import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import RechargesTable from '@/components/Tables/AllTables/RechargesTable';

const WithdrawalModule = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Retraits'
            returnBtnLabel='Retour'
            returnLink='/dashboard/wallet'
        />
        <div>
          <div>
            <h1>Liste des retraits</h1>
          </div>
            <RechargesTable />
        </div>
    </div>
  )
}

export default WithdrawalModule
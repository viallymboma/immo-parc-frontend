"use client";
import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import RechargesTable from '@/components/Tables/AllTables/RechargesTable';

const FundingAccountModule = () => {
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Recharges'
            returnBtnLabel='Retour'
            returnLink='/backoffice/wallet'
        />
        <div>
            <div>
              <h1>RechargesTable</h1>
            </div>
            <div>
              <RechargesTable />
            </div>
        </div>
    </div>
  )
}

export default FundingAccountModule
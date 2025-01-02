"use client";
import React from 'react';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import { SpinnerSvgIcon } from '@/components/svgs/SvgIcons';
import RechargesTable from '@/components/Tables/AllTables/RechargesTable';
import useFetchAllAccountFunding from '@/hooks/useFetchAllAccountFunding';
import { useTaskStore } from '@/store/task-store';

const FundingAccountModule = () => {
  const { totalRechargeData, isValidating: isValidatingRechargeData } = useFetchAllAccountFunding (); 
  const { totalRechargeInStore, allFundingTransactionsInStore } = useTaskStore(); 
  return (
    <div>
        <ReturnHeader 
            headerName='Details des recharges'
            returnBtnLabel='Retour'
            returnLink='/backoffice/wallet'
        />
        <div>
            <div>
              {/* <h1>Details des recharges</h1> */}
              <div>total: { isValidatingRechargeData ? (
                          <SpinnerSvgIcon />
                        ) : formatToCurrency(totalRechargeInStore!, 'XAF') }</div>
            </div>
            <div>
              <RechargesTable allFundingTransactionsData={allFundingTransactionsInStore} isValidatingRechargeData={ isValidatingRechargeData } />
            </div>
        </div>
    </div>
  )
}

export default FundingAccountModule
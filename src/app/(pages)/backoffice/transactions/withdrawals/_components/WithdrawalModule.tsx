"use client";
import React from 'react';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import { SpinnerSvgIcon } from '@/components/svgs/SvgIcons';
import WithdrawalTable from '@/components/Tables/AllTables/WithdrawalTable';
import useFetchAllAccountWithdrawal from '@/hooks/useFetchAllAccountWithdrawal';
import { useTaskStore } from '@/store/task-store';

const WithdrawalModule = () => {
  const { totalWithdrawalData, isValidating: isValidatingWithdrawalData } = useFetchAllAccountWithdrawal (); 
  const { totalWithdrawalInStore, allWithdrawalTransactionsInStore } = useTaskStore(); 
  return (
    <div>
        <ReturnHeader 
            headerName='Mes Retraits'
            returnBtnLabel='Retour'
            returnLink='/backoffice/wallet'
        />
        <div>
          <div>
            <div>total: { isValidatingWithdrawalData ? (<SpinnerSvgIcon />) : formatToCurrency(totalWithdrawalInStore!, 'XAF') }</div>
          </div>
          <div className='py-[2rem]'>
              <WithdrawalTable allWithdrawalTransactionsData={allWithdrawalTransactionsInStore} isValidatingWithdrawalData={ isValidatingWithdrawalData } />
          </div>
        </div>
    </div>
  )
}

export default WithdrawalModule
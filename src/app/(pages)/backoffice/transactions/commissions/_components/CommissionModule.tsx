"use client";
import React from 'react';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import { SpinnerSvgIcon } from '@/components/svgs/SvgIcons';
import EarningsTable from '@/components/Tables/AllTables/EarningsTable';
import useFetchAllAccountEarnings from '@/hooks/useFetchAllAccountEarnings';
import { useTaskStore } from '@/store/task-store';

const CommissionModule = () => {
  const { totalEarningsData, isValidating: isValidatingEarningData } = useFetchAllAccountEarnings (); 
  const { totalEarningsInStore, allEarningTransactionsInStore } = useTaskStore(); 
  return (
    <div className=''>
      <div>
        <div>total: { isValidatingEarningData ? (<SpinnerSvgIcon />) : formatToCurrency(totalEarningsInStore!, 'XAF') }</div>
      </div>
      <div className='py-[2rem]'>
        <EarningsTable allEarningTransactionsData={allEarningTransactionsInStore} isValidatingRechargeData={ isValidatingEarningData } />
      </div>
    </div>
  )
}

export default CommissionModule
"use client";
import React from 'react';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import { SpinnerSvgIcon } from '@/components/svgs/SvgIcons';
import InvestmentTable from '@/components/Tables/AllTables/InvestmentTable';
import useFetchAllAccountInvestment from '@/hooks/useFetchAllAccountInvestment';
import { useTaskStore } from '@/store/task-store';

const InvestmentModule = () => {
    const { totalInvestmentData, isValidating: isValidatingInvestmentData } = useFetchAllAccountInvestment (); 
    const { totalInvestmentInStore, allInvestmentTransactionsInStore } = useTaskStore(); 
    return (
        <div className=''>
            <div>
                <div>total: { isValidatingInvestmentData ? (<SpinnerSvgIcon />) : formatToCurrency(totalInvestmentInStore!, 'XAF') }</div>
            </div>
            <div className='py-[2rem]'>
                <InvestmentTable allInvestmentTransactionsData={allInvestmentTransactionsInStore} isValidatingRechargeData={ isValidatingInvestmentData } />
            </div>
        </div>
    )
}

export default InvestmentModule
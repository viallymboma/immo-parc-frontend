"use client"
import React from 'react';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import useFetchBalance from '@/hooks/useFetchBalance';
import { useTaskStore } from '@/store/task-store';

const layout = ({ children }: { children: any }) => {
  const { walletBalanceData, isValidating } = useFetchBalance (); 
  const { totalEarningsToday, totalEarnings, walletBalance, completedTasks, todayCompletedTasks,  } = useTaskStore(); 
  return (
    <div className="mx-auto max-w-7xl">
      <div className='flex flex-row justify-center items-center text-center mb-4'>Montant disponible: { isValidating ? "Chargement en cours..." : formatToCurrency(walletBalance!, 'XAF') }</div>
      { children }
    </div>
  )
}

export default layout
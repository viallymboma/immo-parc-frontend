"use client"
import React from 'react';

import { useTaskStore } from '@/store/task-store';

const layout = ({ children }: { children: any }) => {
  const { totalEarningsToday, totalEarnings, completedTasks, todayCompletedTasks,  } = useTaskStore(); 
  return (
    <div className="mx-auto max-w-7xl">
      <div className='flex flex-row justify-center items-center text-center mb-4'>Montant disponible: { totalEarnings } FCFA</div>
      { children }
    </div>
  )
}

export default layout
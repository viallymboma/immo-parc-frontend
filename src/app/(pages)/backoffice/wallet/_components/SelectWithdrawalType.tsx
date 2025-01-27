import React from 'react';

import Link from 'next/link';

const SelectWithdrawalType = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Sélectionnez le type de retrait</h1>
      <div className="space-y-4">
        <Link
          href="/backoffice/transactions/withdrawals/add?type=regular"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold">Regular</h2>
          <p className="text-gray-600">Frais de 10%, livré en une semaine environ</p>
        </Link>
        <Link
          href="/backoffice/transactions/withdrawals/add?type=express"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold">Express</h2>
          <p className="text-gray-600">Frais de 25%, livré sous 48h</p>
        </Link>
      </div>
    </div>
  )
}

export default SelectWithdrawalType
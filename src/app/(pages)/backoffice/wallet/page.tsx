import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import WalletModule from './_components/WalletModule';

const WalletPage = () => {
  return (
    <div className='mb-[5rem]'>
      <ReturnHeader 
          headerName='Mon Portefeuille'
          returnBtnLabel='Retour'
          returnLink='/backoffice'
      />
      <WalletModule />
    </div>
  )
}

export default WalletPage
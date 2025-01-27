import React from 'react';

import ReturnHeader from '@/components/common/backbone/ReturnHeader';

import SelectWithdrawalType from '../../_components/SelectWithdrawalType';

const SelectWithdrawalTypePage = () => {
  return (
    <div className='mb-[5rem]'>
    <ReturnHeader 
        headerName='Mon type de retrait'
        returnBtnLabel='Retour'
        returnLink='/backoffice/wallet'
    />
    <SelectWithdrawalType />
  </div>
  )
}

export default SelectWithdrawalTypePage
"use client";
import React from 'react';

import { useRouter } from 'next/navigation';

import {
  allAccounts,
  AllAccountsType,
  suggestedAmounts,
  SuggestedAmounts,
} from '@/components/data/Productsdata';
import { TotalActifSvgIcon } from '@/components/svgs/SvgIcons';
import { useUserInfo } from '@/hooks/useUserInfo';

const FundingForm = () => {

  const { user } = useUserInfo ()

  console.log(parseInt(`237${user?.userInfo?.phone}`), "userslllllllll")

  const [ selectedAmount, setSelectedAmount ] = React.useState<number>(0); 
  const [ selectedAmountError, setSelectedAmountError ] = React.useState<string>(""); 

  const [ selectedAccount, setSelectedAccount ] = React.useState<number | string>(0); 
  const [ selectedAccountError, setSelectedAccountError ] = React.useState<string>(""); 

  const [ myAccountMobileNumber, ] = React.useState <number> (2376995500474)

  const router = useRouter ()

  // console.log(selectedAccount, selectedAmount , "uuuuuuuuuuuuuuu")

  const handleInputAmount = (e: any) => {
    setSelectedAmount (e.target.value)
    setSelectedAmountError ("")
  }

  const handleSelectAmount = (amount: any) => {
    setSelectedAmount (amount)
    setSelectedAmountError ("")
  }

  const handleSelectAccount = (account: any) => {
    setSelectedAccount (account)
    setSelectedAccountError ("")
  }

  const submitSelection = (e: any) => {
    e.preventDefault(); 
    if (selectedAmount! < 1000 ) {
      setSelectedAmountError ("Le montant ne peut être inférieur à 1000 FCFA")
      return null
    }
    if (selectedAccount as number < 1 ) {
      setSelectedAccountError ("Sélectionnez l'un des comptes disponibles")
      return null
    }

    // router.push(`/backoffice/transactions/funding-account/add/final-stage?amount=${ selectedAmount }&number=${ parseInt(`237${user?.userInfo?.phone}`) }&operator=${ selectedAccount }`); 
    router.push(`/backoffice/transactions/funding-account/add/final-stage?amount=${ selectedAmount }&number=${ myAccountMobileNumber }&operator=${ selectedAccount }`); 
  }

  return (
    <div className='mb-[5rem]'>
      <div className={` "mb-4" } `}>
        <label
            htmlFor="email"
            className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Montant <span className="text-red">*</span>
        </label>

        <div className="relative">
            <input
                value={ selectedAmount }
                onChange={ (e) => handleInputAmount (e)}
                type="number"
                placeholder="écrivez ou cliquez sur les boutons ci-dessous pour sélectionner un montant"
                name="amount"
                className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
              <TotalActifSvgIcon color="#fff" />
            </span>
        </div>

        <p className='text-red-400'>
            {
                selectedAmountError && 
                selectedAmountError !== "" && 
                selectedAmountError !== undefined && 
                selectedAmountError
            }
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 p-4">
        {/* amount list selection */}
        {suggestedAmounts?.map((amount: SuggestedAmounts, index: number) => {
          return (
          <div
            onClick={() => {
              handleSelectAmount (amount?.amount)
            }}
            className={`px-4 py-2 shadow-lg bg-white text-black font-semibold rounded-md ${ selectedAmount === amount?.amount ? "border-1 border-blue-500" : "border-0" } hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out cursor-pointer`}
            key={`${amount.id}-${index}`}
          >
            {amount.amount.toLocaleString()} FCFA
          </div>
        )})}
        {/* amount list selection */}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 p-4">
        {/* account type list selection */}
        {allAccounts?.map((account: AllAccountsType, index: number) => {
          return (
          <div
            onClick={() => {
              handleSelectAccount (account?.id)
            }}
            className={`px-4 py-2 shadow-lg bg-white text-black font-semibold rounded-md ${ selectedAccount === account?.id ? "border-1 border-blue-500" : "border-0" } hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out cursor-pointer`}
            key={`${account.id}-${index}`}
          >
            {/* {amount.amount.toLocaleString()} FCFA */}
            { account?.name } - { account?.service }
          </div>
        )})}
        {/* amount list selection */}
      </div>

      <p className='text-red-400'>
        {
          selectedAccountError && 
          selectedAccountError !== "" && 
          selectedAccountError !== undefined && 
          selectedAccountError
        }
      </p>

      <div className="mb-4.5">
        <button
          onClick={ (e) => {
            submitSelection (e); 
          } }
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
            Recharge
        </button>
      </div>
    </div>
  )
}

export default FundingForm
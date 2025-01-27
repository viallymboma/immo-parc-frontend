"use client";
import React from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import toast from 'react-hot-toast';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import {
  allAccounts,
  AllAccountsType,
  suggestedAmounts,
  SuggestedAmounts,
} from '@/components/data/Productsdata';
import { TotalActifSvgIcon } from '@/components/svgs/SvgIcons';
import { useUserInfo } from '@/hooks/useUserInfo';

const WithdrawForm = () => {

  const {user} = useUserInfo ()

  const [ selectedAmount, setSelectedAmount ] = React.useState<number>(0); 
  const [ selectedAmountError, setSelectedAmountError ] = React.useState<string>(""); 

  const [fee, setFee] = React.useState<number>(0);
  const [finalAmount, setFinalAmount] = React.useState<number>(0);

  const [ selectedAccount, setSelectedAccount ] = React.useState<number | string>(0); 
  const [ selectedAccountError, setSelectedAccountError ] = React.useState<string>(""); 

  const [ myAccountMobileNumber, ] = React.useState <number> (2376995500474)

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const withdrawalType = searchParams.get('type'); // Get the withdraw

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

    // Calculate the fee and final amount based on the withdrawal type
    const feePercentage = withdrawalType === 'regular' ? 10 : 25; 
    const withdrawalDuration = withdrawalType === 'regular' ? 168 : 48; 
    const fee = (selectedAmount * feePercentage) / 100;
    const finalAmount = selectedAmount - fee; 

    setFee(fee);
    setFinalAmount(finalAmount);
    setIsModalOpen(true); // Open the modal

    // // Redirect to a confirmation page or call an API endpoint
    // router.push(`/withdraw/confirm?type=${withdrawalType}&amount=${finalAmount}&fee=${fee}&finalAmount=${finalAmount}&withdrawalDuration=${withdrawalDuration}`);
    if (selectedAmount! < 1000 ) {
      setSelectedAmountError ("Le montant ne peut être inférieur à 1000 FCFA")
      return null
    }
    // if (selectedAccount as number < 1 ) {
    //   setSelectedAccountError ("Sélectionnez l'un des comptes disponibles")
    //   return null
    // }
    setIsModalOpen(true); // Open the modal
    // // Redirect to a confirmation page or call an API endpoint
    // router.push(`/withdraw/confirm?type=${withdrawalType}&amount=${finalAmount}&fee=${fee}&finalAmount=${finalAmount}&withdrawalDuration=${withdrawalDuration}`);

    // router.push(`/backoffice/transactions/funding-account/add/final-stage?amount=${ selectedAmount }&number=${ myAccountMobileNumber }&operator=${ selectedAccount }`); 
  }

  const handleConfirm = async () => {
    // Call your API endpoint to finalize the withdrawal
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId: user?.userInfo?._id, // Replace with actual user ID
          walletId: user?.userInfo?.userWallet?._id, // Replace with actual wallet ID
          amount: selectedAmount,
          withdrawalType: withdrawalType,
        }),
      }); 

      const result = await response.json(); 

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create funding transaction');
      }

      toast.success("Demande de retrait envoyée avec succès")
      router.push('/backoffice/wallet'); // Redirect to dashboard or another page

    } catch (error) {
      console.error(error);
      toast.error(`${error}`)
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <>
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
      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Withdrawal</h2>
            <p className="text-[15px] mb-2">
              Withdrawal Type: <span className="font-semibold">{withdrawalType}</span>
            </p>
            <p className="text-[15px] mb-2">
              Amount: <span className="font-semibold">{formatToCurrency(selectedAmount, 'XAF')}</span>
            </p>
            <p className="text-[15px] mb-2">
              Fee: <span className="font-semibold">{formatToCurrency(fee, 'XAF')}</span>
            </p>
            <p className="text-[15px] mb-4">
              Final Amount: <span className="font-semibold">{formatToCurrency(finalAmount, 'XAF')}</span>
            </p>
            <div className="flex flex-row space-x-4">
              <button
                onClick={handleConfirm}
                // className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                className="flex text-[14px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
              >
                Confirmer
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                // className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                className="flex text-[14px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-red-400 p-2 font-medium text-white transition hover:bg-opacity-90"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WithdrawForm
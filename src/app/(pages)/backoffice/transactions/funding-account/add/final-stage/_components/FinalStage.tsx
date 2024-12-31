"use client";
import React from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import toast from 'react-hot-toast';

import {
  allAccounts,
  AllAccountsType,
} from '@/components/data/Productsdata';
import { SettingHorizontalSvgIcon } from '@/components/svgs/SvgIcons';
import { useUserInfo } from '@/hooks/useUserInfo';

const FinalStageModule = () => {
  const searchParams = useSearchParams (); 
  const { user } = useUserInfo ()
  const router = useRouter () 
  const [amount, setAmount] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false); 
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [operator, setOperator] = React.useState<AllAccountsType>({});
  const [transactionId, setTransactionId] = React.useState<string>(""); 
  const [ selectedTransactionIDError, setSelectedTransactionIDError ] = React.useState<string>(""); 
  const [ isHydrated, setIsHydrated ] = React.useState<boolean> (false)

  React.useEffect(() => {
    setIsHydrated (true)
    const writtenSearchParam = new URLSearchParams(searchParams);
    if (writtenSearchParam) {
      const searchEleAmount = writtenSearchParam.get("amount");
      const searchEleMobileNumber = writtenSearchParam.get("number");
      const searchOperator = writtenSearchParam.get("operator");
      const findOperator = allAccounts.find((account: AllAccountsType) => {
        return account?.id === parseInt(searchOperator!)
      } ); 
      setAmount(searchEleAmount!);
      setMobileNumber(searchEleMobileNumber!); 
      setOperator(findOperator as AllAccountsType); 
      
    }
  }, []);

  // Function to copy the URL to clipboard
  const copyToClipboard = async (element: string) => {
    try {
        await navigator.clipboard.writeText(element);
        alert("URL copied to clipboard!");
    } catch (error) {
        console.error("Failed to copy URL:", error);
        alert("Failed to copy URL");
    }
  };

  const handleInputTransactionID = (transaId: any) => {
    setTransactionId (transaId.target.value)
    setSelectedTransactionIDError("")
  }

  const submitSelection = async (e: any) => {
    e.preventDefault(); 
    setIsLoading (true)
    console.log(selectedTransactionIDError, "nice nice nice", transactionId)
    // if (selectedTransactionIDError !== undefined || selectedTransactionIDError !== "" ) {
    //   setSelectedTransactionIDError ("Vous devez ajouter un identifiant de transaction depuis votre SMS"); 
    //   setIsLoading (false); 
    //   return null
    // }
    if (transactionId === undefined || transactionId === "" ) {
      setSelectedTransactionIDError ("Vous devez ajouter un identifiant de transaction depuis votre SMS"); 
      setIsLoading (false); 
      return null
    }

    try {
      const response = await fetch('/api/transactions/funding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              userId: user?.userInfo?._id, // Replace with actual user ID
              walletId: user?.userInfo?.userWallet?._id, // Replace with actual wallet ID
              transactionId: transactionId, // Mobile Money transaction ID
              amount: parseFloat(amount),
          }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Échec de la création de la transaction de financement")
        throw new Error(result.error || 'Failed to create funding transaction');
      }

      // alert('Funding transaction successful!');
      toast.success("Transaction de financement réussie !"); 
      router.push(`/backoffice/transactions/funding-account`); 
    } catch (error: any) {
      toast.success(`Error: ${error.message}`); 
      // alert(`Error: ${error.message}`);
    } finally {
      setIsLoading (false); 
    }
    
  }

  if (!isHydrated) {
    return null
  }

  console.log(`${operator?.secondaryColor}`)

  return (
    <div className='flex flex-col gap-4'>
        <div className={`bg-[${ operator?.secondaryColor}] flex flex-row items-center justify-around w-full`}>
          <div>
            { operator?.image }
          </div>
          <div>
            { operator?.operator || operator?.name  } - { operator?.service }
          </div>
        </div>
        <div className={`bg-${ operator?.primaryColor} flex flex-col gap-3 `}>
          <div className='flex flex-col'>
            <h1>Montant de recharge</h1>
            <div className='flex flex-row items-center gap-3 bg-blue-200 rounded-3xl px-3 py-2'>
              <div className='w-[70%] rounded-3xl flex justify-center'>{ amount }</div>
              <button onClick={() => copyToClipboard (amount)} className="w-[30%] px-4 py-2 bg-green-600 text-white rounded-3xl">
                  Copie
              </button>
            </div>
          </div>
          <div className='flex flex-col'>
            <h1>Envover au numéro { operator?.abreviation }</h1>
            <div className='flex flex-row items-center gap-3 bg-blue-200 rounded-3xl px-3 py-2'>
              <div className='w-[70%] rounded-3xl flex justify-center'>{ mobileNumber }</div>
              <button onClick={() => copyToClipboard (mobileNumber)} className="w-[30%] px-4 py-2 bg-green-600 text-white rounded-3xl">
                  Copie
              </button>
            </div>
          </div>
          <div className={` "mb-4" } `}>
            <label
                htmlFor="email"
                className="mb-2.5 block font-medium text-dark dark:text-white"
            >
              Veuillez entrer votre identifiant de transition <span className="text-red">*</span>
            </label>

            <div className="relative">
              <input
                  value={ transactionId }
                  onChange={ (e) => handleInputTransactionID (e)}
                  type="text"
                  placeholder="écrivez ou cliquez sur les boutons ci-dessous pour sélectionner un montant"
                  name="transactionID"
                  className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
                <SettingHorizontalSvgIcon color="#fff" />
              </span>
            </div>

            <p className='text-red-400'>
              {
                  selectedTransactionIDError && 
                  selectedTransactionIDError !== "" && 
                  selectedTransactionIDError !== undefined && 
                  selectedTransactionIDError
              }
            </p>
          </div>
        </div>
        <div className="mb-4.5">
        <button
          onClick={ (e) => {
            submitSelection (e); 
          } }
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
            { isLoading ? "En cours..." : "Valider" }
        </button>
      </div>
      <div>
        {

        }
        Envoyer de l'argent à MoMo
        <br/>

        - Composez *126#
        <br/>

        1:Transfert d argent
        <br/>

        2:Vers numeros MTN
        <br/>

        3:Entrez le numero
        <br/>

        4:Entrez le montant
        <br/>

        5:Entrez votre code PIN
        <br/>

        Vous pouvez télécharger l'application momo pour transférer de l'argent, ce qui est plus pratique et plus rapide.
        <br/>
      </div>
    </div>
  )
}

export default FinalStageModule


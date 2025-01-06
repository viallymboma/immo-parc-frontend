"use client";
import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
// import LoadingSpinner from '@/components/Loaders/LoadingSpinner'; 
import useFetchAllPackages from '@/hooks/useFetchAllPackages';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useTaskStore } from '@/store/task-store';

import IconImage from '../../../../../../public/imgs/total des gains.png';
import { SkeletonSmallTask } from '../../_components/SkeletonSmallTask';

const PackageUpgradeModule = () => {
    const { user } = useUserInfo (); 
    const router = useRouter();
    const { packagesInStore } = useTaskStore(); 
    const { packagesInStoreData, isValidating } = useFetchAllPackages(); 
    const [selectedPackage, setSelectedPackage] = React.useState<string>('');
    const [selectedPackageError, setSelectedPackageError] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSelectPackage = (pck: any) => {
        setSelectedPackage(pck); 
        setSelectedPackageError(''); 
    };

    const submitSelection = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!selectedPackage) {
            setSelectedPackageError('Please select a package for upgrade');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/upgrade-package', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.userInfo?._id, // Replace with actual user ID
                    packageId: selectedPackage, // Selected package ID
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || 'Failed to upgrade package');
                throw new Error(result.error || 'Failed to upgrade package');
            }

            toast.success('Package upgraded successfully!');
            router.push(`/backoffice/my-account`);
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Abonnez-vous à un nouveau Package</h3>
            <form onSubmit={submitSelection} className='mb-[5rem]'>
                <div className="grid grid-cols-1 gap-3">
                    { isValidating ? (
                        // <LoadingSpinner />
                        <div className='flex flex-col gap-4'>
                            <SkeletonSmallTask />
                            <SkeletonSmallTask />
                            <SkeletonSmallTask />
                            <SkeletonSmallTask />
                            <SkeletonSmallTask />
                            <SkeletonSmallTask />
                        </div>
                    ) : [...packagesInStore].sort((a, b) => a.level - b.level).filter((rem: any) => rem?.level !== 0 )?.map((pkg: any) => (
                        <div 
                            key={pkg._id}
                            onClick={() => handleSelectPackage(pkg._id)}
                            className={`flex px-4 py-6 ${ selectedPackage === pkg?._id ? "bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700" : "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700" } flex-row shadow-5 rounded-3xl`}>
                            <div className='flex justify-center rounded-3xl overflow-hidden w-[50px]'>
                                <Image src={ IconImage } className='w-full' alt='image' />
                            </div>
                            <div>
                                <h1 className='text-white dark:text-black'>{ user?.userInfo?.phone }</h1>
                                <p>{ pkg.name }</p>
                                <p>{ formatToCurrency(pkg?.inverstment, 'XAF') }</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedPackageError && <p className="text-red-500 mt-2">{selectedPackageError}</p>}

                <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Upgrading...' : 'Activer Package'}
                </button>
            </form>
        </div>
    );
};

export default PackageUpgradeModule;












// import React from 'react';

// import Link from 'next/link';

// import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
// import { AddSvgIcon } from '@/components/svgs/SvgIcons';
// import useFetchAllPackages from '@/hooks/useFetchAllPackages';
// import { useTaskStore } from '@/store/task-store';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// // import {
// //     AddSvgIcon,
// //     CloseSvgIcon,
// //     EditAccountSvgIcon,
// //   } from '@/components/svgs/SvgIcons';

// const PackageUpgradeModule = () => {
//     const {packagesInStoreData, isValidating} = useFetchAllPackages (); 
//     const { packagesInStore } = useTaskStore(); 
//     const router = useRouter (); 
//     const [isLoading, setIsLoading] = React.useState<boolean>(false); 
//     console.log(packagesInStore, "packagesInStorepackagesInStore"); 

//     const [ selectedPackage, setSelectedPackage ] = React.useState<number | string>(""); 
//     const [ selectedPackageError, setSelectedPackageError ] = React.useState<string>(""); 

//     const handleSelectPackage = (pck: any) => {
//         setSelectedPackage (pck)
//         setSelectedPackageError ("")
//     }

//     const submitSelection = async (e: any) => {
//         e.preventDefault(); 
//         setIsLoading (true)
//         console.log(selectedPackageError, "nice nice nice", selectedPackage)

//         if (selectedPackage === undefined || selectedPackage === "" ) {
//             setSelectedPackageError ("Vous devez ajouter un identifiant de transaction depuis votre SMS"); 
//             setIsLoading (false); 
//             return null
//         }

//         try {
//             const response = await fetch('/api/transactions/funding', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     userId: user?.userInfo?._id, // Replace with actual user ID
//                     walletId: user?.userInfo?.userWallet?._id, // Replace with actual wallet ID
//                     // transactionId: transactionId, // Mobile Money transaction ID
//                     amount: parseFloat(amount),
//                 }),
//             });

//             const result = await response.json();

//             if (!response.ok) {
//                 toast.error("Échec de la création de la transaction de financement")
//                 throw new Error(result.error || 'Failed to create funding transaction');
//             }

//             // alert('Funding transaction successful!');
//             toast.success("Transaction de financement réussie !"); 
//             router.push(`/backoffice/transactions/funding-account`); 
//         } catch (error: any) {
//             toast.success(`Error: ${error.message}`); 
//             // alert(`Error: ${error.message}`);
//         } finally {
//             setIsLoading (false); 
//         }
        
//     }

//     return (
//         <form action="">
//             <div className='flex flex-col gap-3 '>
//                 {packagesInStore.filter((rem: any) => rem?.level !== 0 )?.map((pck: any, index: number) => {
//                     return (
//                     <div
//                         onClick={() => {
//                             handleSelectPackage (pck?._id)
//                         }}
//                         className={`px-4 py-2 shadow-lg bg-white text-black font-semibold rounded-md ${ selectedPackage === pck?._id ? "border-1 border-blue-500" : "border-0" } hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out cursor-pointer`}
//                         key={`${pck._id}-${index}`}
//                     >
//                         { pck?.name } - { formatToCurrency(pck?.inverstment, 'XAF') }
//                     </div>
//                 )})}
//             </div>

//             <div className="mb-4.5">
//                 <Link
//                     href={"/dashboard/financial-accounts/add"}
//                     type="submit"
//                     className="flex flex-row justify-center gap-3 w-full cursor-pointer items-center rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
//                 >
//                     <AddSvgIcon color='#fff' />
//                     <span>
//                         Activer Package
//                     </span>
//                 </Link>
//             </div>

//         </form>
//     )
// }

// export default PackageUpgradeModule
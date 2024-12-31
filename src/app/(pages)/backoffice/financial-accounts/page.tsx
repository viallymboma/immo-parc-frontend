"use client";

import React from 'react';

// import Link from 'next/link';
import { AccountType } from '@/components/data/Productsdata';
//   my_accounts,
import ReturnHeader from '@/components/Sidebar/ReturnHeader';

// import { AddSvgIcon } from '@/components/svgs/SvgIcons';
//   CloseSvgIcon,
//   EditAccountSvgIcon,
import PackageUpgradeModule from './_component/PackageUpgradeModule';

const MyFinancialAccountPage = () => {
    const deleteAccount = (id: string | number, element: AccountType) => {
        let confirmAction = confirm (`Êtes-vous sûr de vouloir supprimer ce compte ${ element?.service } / ${ element?.phone_number }?`)
        if (confirmAction) {
            // delete action
            alert ("Supprimé avec succès")
        } else {
            alert ("Vous avez annulé la suppression")
            return null
        }
    }
    return (
        <div className='flex flex-col gap-3'>
            <ReturnHeader 
                headerName='Mes Comptes Financiers'
                returnBtnLabel='Retour'
                returnLink='/backoffice/my-account'
            />
            <PackageUpgradeModule />
            {/* <div className='flex flex-col gap-3 '>
                {
                    my_accounts?.map((element: AccountType, index: number) => {
                        return (
                            <div key={`${element.id}-${index}`} className='flex px-4 py-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 flex-col shadow-5 rounded-3xl'>
                                <div 
                                    onClick={ () => {
                                        deleteAccount (element?.id!, element)
                                    } }
                                    className='flex justify-end rounded-3xl overflow-hidden w-full'
                                >
                                    <CloseSvgIcon color='#ffff' />
                                </div>
                                <div>
                                    <p className='text-[12px]'>{ element?.operator }</p>
                                    <p className='text-[12px]'>{ element?.service } - { element?.abreviation }</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <h1 className='text-white dark:text-black'>{ element?.phone_number }</h1>
                                    <Link href={`/dashboard/financial-accounts/edit/${ element?.phone_number }`}>
                                        <EditAccountSvgIcon color='#ffff' />
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div> */}
            
        </div>
    )
}

export default MyFinancialAccountPage
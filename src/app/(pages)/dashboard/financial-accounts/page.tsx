"use client";

import React from 'react';

import Link from 'next/link';

import {
  AccountType,
  my_accounts,
} from '@/components/data/Productsdata';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';
import {
  AddSvgIcon,
  CloseSvgIcon,
  EditAccountSvgIcon,
} from '@/components/svgs/SvgIcons';

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
                returnLink='/dashboard/my-account'
            />
            <div className='flex flex-col gap-3 '>
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
            </div>
            <div className="mb-4.5">
                <Link
                    href={"/dashboard/financial-accounts/add"}
                    type="submit"
                    className="flex flex-row justify-center gap-3 w-full cursor-pointer items-center rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                >
                    <AddSvgIcon color='#fff' />
                    <span>
                        Ajouter un compte
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default MyFinancialAccountPage
"use client";
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import {
  BottomElemenetType,
  bottomNavElementInAccount,
} from '@/components/common/backbone/other_component/data';
import LoadingSpinner from '@/components/Loaders/LoadingSpinner';
// import {
//   BottomElemenetType,
//   bottomNavElementInAccount,
// } from '@/components/data/Productsdata';
import { ChevronRightSvgIcon } from '@/components/svgs/SvgIcons';
import useFetchBalance from '@/hooks/useFetchBalance';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useTaskStore } from '@/store/task-store';

import IconImage from '../../../../../../public/imgs/total des gains.png';

const MyAcountModule = () => {

    const { user } = useUserInfo (); 

    const { walletBalanceData, isValidating } = useFetchBalance (); 

    const { walletBalance } = useTaskStore(); 

    return (
        <div className='flex flex-col gap-3'>
            
            <div className='flex px-4 py-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 flex-row shadow-5 rounded-3xl'>
                <div className='flex justify-center rounded-3xl overflow-hidden w-[50px]'>
                    <Image src={ IconImage } className='w-full' alt='image' />
                </div>
                <div>
                    <h1 className='text-white dark:text-black'>{ user?.userInfo?.phone }</h1>
                    <p>{ user?.userInfo?.package?.name }</p>
                    <div className='text-[20px] font-bold'>  { isValidating ? <LoadingSpinner /> : formatToCurrency(walletBalance!, 'XAF') } </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 '>
                {
                    bottomNavElementInAccount?.map((element: BottomElemenetType, index: number) => {
                        return (
                            <Link key={`${ element?.id } - ${ index }`} href={`${ element?.route }`} className='flex flex-row justify-between py-3 rounded-md border-b-1 border-b-slate-200'>
                                <h1>{ element?.tooltip }</h1>
                                <ChevronRightSvgIcon />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyAcountModule
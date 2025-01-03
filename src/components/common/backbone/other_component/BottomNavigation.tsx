"use client";
import React from 'react';

import Link from 'next/link';

import {
  BottomElemenetType,
  bottomNavElement,
} from './data';

const BottomNavigation = () => {
    return (
        <div className='bg-[#1F2A37]  w-[100%] py-2 justify-around flex flex-row'>
            {
                bottomNavElement?.map((boElement: BottomElemenetType, index: number) => {
                    return (
                        <Link key={`${boElement.id}-${index}`} href={ `${ boElement?.route }` } className='flex flex-col justify-center items-center hover:rounded-[12px] px-3 py-1 hover:bg-slate-600'>
                            <span>
                                { boElement?.icon }
                            </span>
                            <span className='text-[13px] text-white'>
                                { boElement?.tooltip }
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default BottomNavigation
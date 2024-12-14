"use client";

import React from 'react';

import { useRouter } from 'next/navigation';

import { BackArrowSvgIcon } from '../svgs/SvgIcons';

type ReturnType = {
    headerName?: string; 
    returnLink?: string; 
    returnBtnLabel?: string; 
    headerNameStye?: string;
}

const ReturnHeader: React.FC <ReturnType> = ({ headerName, returnLink, returnBtnLabel, headerNameStye }) => {
    const router = useRouter ()
    return (
        <div className='flex flex-row justify-between items-center mb-3'>
            <button
                className='rounded-full py-1 px-3   flex justify-between items-center'
                onClick={() => {
                    if (returnLink) {
                        router.push (returnLink)
                    } else {
                        router.back ()
                    }
                }}
            >
                <BackArrowSvgIcon />
                <span>
                    { returnBtnLabel ? returnBtnLabel : "Retour" }
                </span>
            </button>
            <h1 className={ headerNameStye ? headerNameStye : ''}>{ headerName ? headerName : "Page Header" }</h1>
        </div>
    )
}

export default ReturnHeader
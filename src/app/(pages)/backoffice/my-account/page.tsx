"use client";

import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import MyAcountModule from './_components/MyAcountModule';

const MyAccountPage = () => {
    return (
        <div>
            <ReturnHeader 
                headerName='Mon Compte'
                returnBtnLabel='Retour'
                returnLink='/backoffice'
            />
            <MyAcountModule />
        </div>
    )
}

export default MyAccountPage
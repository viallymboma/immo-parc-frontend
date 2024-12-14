"use client";
import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import SettingBoxes from '@/components/SettingBoxes';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';

const SettingsModule = () => {

    return (
        <div className="mx-auto w-full max-w-[1080px]">
            <Breadcrumb pageName="Mes Reglages" />
            <ReturnHeader 
                headerName=''
                returnBtnLabel='Retour'
                returnLink='/backoffice'
                headerNameStye="text-[20px] dark:text-white font-bold text-black"
            />
            <SettingBoxes />
        </div>
    );
}

export default SettingsModule
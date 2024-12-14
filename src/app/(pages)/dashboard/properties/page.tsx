import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import PropertiesModule from './_components/PropertiesModule';

const ProductsPage = () => {
    return (

        <div className="mx-auto max-w-7xl mb-[5rem]">
            <Breadcrumb pageName="Les proprietes" />
            <ReturnHeader
                headerName=' '
                returnBtnLabel='Retour'
                returnLink='/dashboard'
            />
            <div>
                <PropertiesModule />
            </div>
        </div>
    )
}

export default ProductsPage
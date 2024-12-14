import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import PropertyDetails from './_components/PropertyDetails';

const PropertyDetailsPage = () => {
    return (
        <div className="mx-auto max-w-7xl mb-[5rem]">
            <Breadcrumb pageName="Details de la propriete" />
            <ReturnHeader
                headerName='Details'
                returnBtnLabel='Retour'
                returnLink='/dashboard/properties'
            />
            <div>
                <PropertyDetails />
            </div>
        </div>
    )
}

export default PropertyDetailsPage
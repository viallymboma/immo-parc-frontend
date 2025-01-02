import React from 'react';

import { PackageType } from '@/components/common/backbone/other_component/data';
import useFetchAllPackages from '@/hooks/useFetchAllPackages';
import { useTaskStore } from '@/store/task-store';

import { SkeletonSmallTask } from '../../_components/SkeletonSmallTask';
import PackageCardModule from './PackageCardModule';

const PackagesListModule = () => {

    const { packagesInStoreData, isValidating } = useFetchAllPackages(); 

    const { packagesInStore } = useTaskStore(); 

    return (
        <div className="min-h-screen px-4">
            <h1 className="text-center text-3xl font-bold text-yellow-400 mb-8">MLM Packages</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            ) : packagesInStore.map((pkg: PackageType) => (
                <div
                    key={pkg._id}
                    className="bg-yellow-400 text-black rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <PackageCardModule packageItem={ pkg } />
                </div>
            ))}
            </div>
        </div>
    )
}

export default PackagesListModule
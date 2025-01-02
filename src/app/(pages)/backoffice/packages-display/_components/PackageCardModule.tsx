"use client";
import React, { useState } from 'react';

import toast from 'react-hot-toast';

import { PackageType } from '@/components/common/backbone/other_component/data';
import { useUserInfo } from '@/hooks/useUserInfo';

type PackageCardModuleType = {
  packageItem: PackageType;
};

const PackageCardModule: React.FC<PackageCardModuleType> = ({ packageItem }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const { user } = useUserInfo();

  const handleUpgrade = async (packageId: string) => {
    setIsLoading(true);
    setIsModalOpen(false); // Close modal after confirmation
    try {
      const response = await fetch("/api/upgrade-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.userInfo?._id, // Replace with actual user ID
          packageId, // Selected package ID
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to upgrade package");
        throw new Error(result.error || "Failed to upgrade package");
      }

      toast.success("Package upgraded successfully!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold">{packageItem.name}</h2>
        <p className="text-sm">Level: {packageItem.level}</p>
        <p className="text-sm">
          Investissement:{" "}
          <span className="font-bold">
            {packageItem.inverstment.toLocaleString()} FCFA
          </span>
        </p>
        <p className="text-sm">Tasks per day: {packageItem?.numberOfTaskPerDay}</p>
        <p className="text-sm">
          Gains par tâche:{" "}
          <span className="font-bold">
            {packageItem?.priceEarnedPerTaskDone.toLocaleString()} FCFA
          </span>
        </p>
        <p className="text-sm">
          Gains quotidiens:{" "}
          <span className="font-bold">
            {packageItem?.priceEarnedForAllTaskDonePerDay.toLocaleString()} FCFA
          </span>
        </p>
        <p className="text-sm">
          Gains mensuels:{" "}
          <span className="font-bold">
            {packageItem?.priceEarnedForAllTaskDonePerMonth.toLocaleString()} FCFA
          </span>
        </p>
        <p className="text-sm">
          Gains annuels:{" "}
          <span className="font-bold">
            {packageItem?.priceEarnedForAllTaskDonePerYear.toLocaleString()} FCFA
          </span>
        </p>
        <button
          onClick={() => setIsModalOpen(true)} // Open confirmation modal
          className="w-full bg-black text-yellow-400 font-bold py-2 rounded hover:bg-yellow-300 hover:text-black transition-colors duration-300"
          disabled={isLoading}
        >
          Activez ce package
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirmer l'activation</h3>
            <p className="text-sm mb-6">
              Êtes-vous sûr de vouloir activer le package{" "}
              <span className="font-bold">{packageItem.name}</span> ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={() => handleUpgrade(packageItem._id)} // Confirm and upgrade
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
                disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageCardModule;














// "use client";
// import React from 'react';

// import toast from 'react-hot-toast';

// import { PackageType } from '@/components/common/backbone/other_component/data';
// import { useUserInfo } from '@/hooks/useUserInfo';

// type PackageCardModuleType = {
//     packageItem: PackageType;
// }

// const PackageCardModule: React.FC <PackageCardModuleType> = ({ packageItem }) => {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false); 
//   const { user } = useUserInfo (); 
//   const handleUpgrade = async (packageId: string) => {
//         setIsLoading(true);

//         try {
//             const response = await fetch('/api/upgrade-package', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     userId: user?.userInfo?._id, // Replace with actual user ID
//                     packageId, // Selected package ID
//                 }),
//             });

//             const result = await response.json();

//             if (!response.ok) {
//                 toast.error(result.error || 'Failed to upgrade package');
//                 throw new Error(result.error || 'Failed to upgrade package');
//             }

//             toast.success('Package upgraded successfully!');
//         } catch (error: any) {
//             toast.error(`Error: ${error.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//   return (
//     <>
//       <div className="p-6 space-y-4">
//         <h2 className="text-xl font-bold">{packageItem.name}</h2>
//         <p className="text-sm">Level: {packageItem.level}</p>
//         <p className="text-sm">
//           Investissement:{" "}
//           <span className="font-bold">
//             {packageItem.inverstment.toLocaleString()} FCFA
//           </span>
//         </p>
//         <p className="text-sm">Tasks per day: {packageItem?.numberOfTaskPerDay}</p>
//         <p className="text-sm">
//           Gains par tâche:{" "}
//           <span className="font-bold">
//             {packageItem?.priceEarnedPerTaskDone.toLocaleString()} FCFA
//           </span>
//         </p>
//         <p className="text-sm">
//           Gains quotidiens:{" "}
//           <span className="font-bold">
//             {packageItem?.priceEarnedForAllTaskDonePerDay.toLocaleString()} FCFA
//           </span>
//         </p>
//         <p className="text-sm">
//           Gains mensuels:{" "}
//           <span className="font-bold">
//             {packageItem?.priceEarnedForAllTaskDonePerMonth.toLocaleString()} FCFA
//           </span>
//         </p>
//         <p className="text-sm">
//           Gains annuels:{" "}
//           <span className="font-bold">
//             {packageItem?.priceEarnedForAllTaskDonePerYear.toLocaleString()} FCFA
//           </span>
//         </p>
//         <button onClick={ () => handleUpgrade (packageItem?._id) } className="w-full bg-black text-yellow-400 font-bold py-2 rounded hover:bg-yellow-300 hover:text-black transition-colors duration-300">
//           Activez ce package
//         </button>
//       </div>
//     </>
//   )
// }

// export default PackageCardModule
"use client"
import React, { useState } from 'react';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import {
  UserProspectType,
} from '@/components/common/backbone/other_component/data';

// Function to add `position` property to each node
const transformFamilyTree = (
  node: UserProspectType,
  isLeft: boolean = true,
  generation: number = 1,
  maxGeneration: number = 3
): UserProspectType => {
  if (generation > maxGeneration) {
    return { ...node, children: [] }; // Stop adding children beyond maxGeneration
  }
  const result = {
    ...node, 
    position: isLeft ? 'left' : 'right',
    children: node.children
      ? node.children.map((child, index) => ({
          ...transformFamilyTree(child, index % 2 === 0,
            generation + 1,
            maxGeneration),
          position: index % 2 === 0 ? 'left' : 'right', // Alternate positions
        }))
      : [],
  }

  return result;
};

function addIncrementingIds(obj: any) {
  let idCounter = 1; // Initialize ID counter

  // Recursive function to traverse and add IDs
  function traverseAndAddIds(node: any) {
    if (Array.isArray(node.children)) {
      // Check if all elements in the array are objects
      const allObjects = node.children.every(
        (child: any) => typeof child === 'object' && !Array.isArray(child) && child !== null
      );

      if (allObjects) {
        node.children.forEach((child: any) => {
          child.id = idCounter++; // Add ID to each child
          traverseAndAddIds(child); // Recursively process children
        });
      }
    }
  }

  traverseAndAddIds(obj); // Start processing from the root object
  return obj; // Return the modified object
}

const TreeViewComponent = ({ loggedInUserFamilyTreeInStore }: { loggedInUserFamilyTreeInStore: UserProspectType}) => {
  const [users, setUsers] = useState<UserProspectType[]>([{ ...addIncrementingIds(loggedInUserFamilyTreeInStore), id: 0 }]);
  const [selectedUser, setSelectedUser] = useState<UserProspectType | null>(null);
  const [showAddNodePopup, setShowAddNodePopup] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodePosition, setNewNodePosition] = useState<'left' | 'right'>('left');

  // Track expanded state for each node by ID
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({}); 
  // const [expandedNodes, setExpandedNodes] = useState<any>({}); 

  const handleNodeClick = (user: UserProspectType) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setShowAddNodePopup(false);
  };

  const toggleExpand = (userId: number) => {
    setExpandedNodes((prevExpanded) => ({
      ...prevExpanded,
      [userId]: !prevExpanded[userId],
    }));
  };

  // Recursive component for rendering each user node
  const UserNode = ({ user }: { user: UserProspectType }) => {
    console.log(user, "checking the user")
    return (
    <div className="ml-4  p-2 rounded mb-2 w-64">
      {/* border-b border-b-gray-300 */}
      <div className="flex gap-3 justify-start items-center">
        {user.children && user.children.length > 0 && (
          <button
            onClick={() => toggleExpand(user.id as number)}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedNodes[user.id as number] ? 
              <span className='text-[30px] text-black dark:text-white'>
                -
              </span>
              :
              <span className='text-[20px] text-black dark:text-white'>
                +
              </span>

            }
          </button>
        )}
        <p onClick={() => handleNodeClick(user)} className="cursor-pointer font-bold text-blue-600 dark:text-white">
          {user.firstName}
        </p>
      </div>
      {/* Display children if expanded */}
      {expandedNodes[user.id!] && user.children && (
        <div key={ user.id } className="ml-6">
          {user.children.map((child) => (
            <UserNode key={child.id} user={child} />
          ))}
        </div>
      )}
    </div>
  )};

  return (
    <div className="p-4">
      {/* Display root user nodes */}
      {users.map((user) => (
        <UserNode key={user.id} user={user} />
      ))}

      {/* Popup for displaying user details */}
      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
            <h3 className="text-xl font-bold mb-2">{selectedUser.firstName} {selectedUser.lastName}</h3>
            <p>ID: {selectedUser.id}</p>
            <p>Montant de Souscription: {formatToCurrency(selectedUser.package?.inverstment!, 'XAF') || 'N/A'}</p>
            <p>Position: {selectedUser.position || 'N/A'}</p>
            <p>Package: {selectedUser.package?.name || 'N/A'}</p>
            <p>Parent ID: {selectedUser.parent?.firstName || 'N/A'}</p>
            <div className='flex-col flex'>
              <button
                onClick={closePopup}
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Node Popup with Form */}
      {showAddNodePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
            <h3 className="text-xl font-bold mb-2">Ajouter un prospect</h3>
            <input
              type="text"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              placeholder="Enter name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="flex justify-around mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="left"
                  checked={newNodePosition === 'left'}
                  onChange={() => setNewNodePosition('left')}
                />
                <span className="ml-2">Gauche</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="right"
                  checked={newNodePosition === 'right'}
                  onChange={() => setNewNodePosition('right')}
                />
                <span className="ml-2">Droite</span>
              </label>
            </div>
            <button
              onClick={closePopup}
              className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded w-full"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeViewComponent; 







































// "use client"
// import React, { useState } from 'react';

// import {
//   UserProspectType,
// } from '@/components/common/backbone/other_component/data';

// export type UserType = {
//   id: number;
//   name: string;
//   subscriptionAmount?: number;
//   position?: 'left' | 'right';
//   packageName?: string;
//   parentId?: number;
//   children?: UserType[];
// };

// const initialUsers: UserType[] = [
//   {
//     id: 1,
//     name: 'Alice',
//     subscriptionAmount: 100,
//     position: 'left',
//     packageName: 'Gold',
//     children: [
//       {
//         id: 2,
//         name: 'Bob',
//         subscriptionAmount: 50,
//         position: 'right',
//         packageName: 'Silver',
//         children: [
//           { id: 3, name: 'Charlie', children: [] },
//           { id: 4, name: 'David', children: [] },
//         ],
//       },
//       {
//         id: 5,
//         name: 'Eve',
//         subscriptionAmount: 75,
//         position: 'left',
//         packageName: 'Bronze',
//         children: [],
//       },
//     ],
//   },
// ];

// const TreeViewComponent = ({ loggedInUserFamilyTreeInStore }: { loggedInUserFamilyTreeInStore: UserProspectType}) => {
//   console.log(loggedInUserFamilyTreeInStore, "good great")
//   const [users, setUsers] = useState<UserType[]>(initialUsers);
//   const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
//   const [showAddNodePopup, setShowAddNodePopup] = useState(false);
//   const [newNodeName, setNewNodeName] = useState('');
//   const [newNodePosition, setNewNodePosition] = useState<'left' | 'right'>('left');

//   // Track expanded state for each node by ID
//   const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({});

//   const handleNodeClick = (user: UserType) => {
//     setSelectedUser(user);
//   };

//   // const handleAddNodeClick = () => {
//   //   setShowAddNodePopup(true);
//   // };

//   const closePopup = () => {
//     setSelectedUser(null);
//     setShowAddNodePopup(false);
//   };

//   const handleAddNodeSubmit = () => {
//     if (selectedUser && newNodeName) {
//       const updatedUsers = [...users];

//       const addChildNode = (node: UserType) => {
//         if (node.id === selectedUser.id) {
//           const newNode = { 
//             id: Date.now(), 
//             name: newNodeName, 
//             position: newNodePosition, 
//             children: [] 
//           };
//           node.children = [...(node.children || []), newNode];
//         } else if (node.children) {
//           node.children.forEach(addChildNode);
//         }
//       };

//       updatedUsers.forEach(addChildNode);
//       setUsers(updatedUsers);
//       setShowAddNodePopup(false);
//       setNewNodeName('');
//     }
//   };

//   // Toggle expanded state for a node
//   const toggleExpand = (userId: number) => {
//     setExpandedNodes((prevExpanded) => ({
//       ...prevExpanded,
//       [userId]: !prevExpanded[userId],
//     }));
//   };

//   // Recursive component for rendering each user node
//   const UserNode = ({ user }: { user: UserType }) => (
//     <div className="ml-4  p-2 rounded mb-2 w-64">
//       {/* border-b border-b-gray-300 */}
//       <div className="flex gap-3 justify-start items-center">
//         {user.children && user.children.length > 0 && (
//           <button
//             onClick={() => toggleExpand(user.id)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             {expandedNodes[user.id] ? 
//               <span className='text-[30px] text-black dark:text-white'>
//                 -
//               </span>
//               :
//               <span className='text-[20px] text-black dark:text-white'>
//                 +
//               </span>
//             // '-' : '+'
//             }
//           </button>
//         )}
//         <p onClick={() => handleNodeClick(user)} className="cursor-pointer font-bold text-blue-600 dark:text-white">
//           {user.name}
//         </p>
//       </div>
//       {/* Display children if expanded */}
//       {expandedNodes[user.id] && user.children && (
//         <div className="ml-6">
//           {user.children.map((child) => (
//             <UserNode key={child.id} user={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-4">
//       {/* Display root user nodes */}
//       {users.map((user) => (
//         <UserNode key={user.id} user={user} />
//       ))}

//       {/* Popup for displaying user details */}
//       {selectedUser && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
//             <h3 className="text-xl font-bold mb-2">{selectedUser.name}</h3>
//             <p>ID: {selectedUser.id}</p>
//             <p>Montant de Souscription: ${selectedUser.subscriptionAmount || 'N/A'}</p>
//             <p>Position: {selectedUser.position || 'N/A'}</p>
//             <p>Package: {selectedUser.packageName || 'N/A'}</p>
//             <p>Parent ID: {selectedUser.parentId || 'N/A'}</p>
//             <div className='flex-col flex'>
//               {/* <button
//                 onClick={handleAddNodeClick}
//                 className="mt-4 bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded"
//               >
//                 Ajouter un prospect
//               </button> */}
//               <button
//                 onClick={closePopup}
//                 className="mt-2 bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
//               >
//                 Fermer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Node Popup with Form */}
//       {showAddNodePopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
//             <h3 className="text-xl font-bold mb-2">Ajouter un prospect</h3>
//             <input
//               type="text"
//               value={newNodeName}
//               onChange={(e) => setNewNodeName(e.target.value)}
//               placeholder="Enter name"
//               className="mb-4 p-2 border border-gray-300 rounded w-full"
//             />
//             <div className="flex justify-around mb-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="left"
//                   checked={newNodePosition === 'left'}
//                   onChange={() => setNewNodePosition('left')}
//                 />
//                 <span className="ml-2">Gauche</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="right"
//                   checked={newNodePosition === 'right'}
//                   onChange={() => setNewNodePosition('right')}
//                 />
//                 <span className="ml-2">Droite</span>
//               </label>
//             </div>
//             <button
//               onClick={handleAddNodeSubmit}
//               className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded w-full mb-2"
//             >
//               Ajouter
//             </button>
//             <button
//               onClick={closePopup}
//               className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded w-full"
//             >
//               Annuler
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreeViewComponent; 














// import React, { useState } from 'react';

// export type UserType = {
//   id: number;
//   name: string;
//   subscriptionAmount?: number;
//   position?: 'left' | 'right';
//   packageName?: string;
//   parentId?: number;
//   children?: UserType[];
// };

// const initialUsers: UserType[] = [
//   {
//     id: 1,
//     name: 'Alice',
//     subscriptionAmount: 100,
//     position: 'left',
//     packageName: 'Gold',
//     children: [
//       {
//         id: 2,
//         name: 'Bob',
//         subscriptionAmount: 50,
//         position: 'right',
//         packageName: 'Silver',
//         children: [
//           { id: 3, name: 'Charlie', children: [] },
//           { id: 4, name: 'David', children: [] },
//         ],
//       },
//       {
//         id: 5,
//         name: 'Eve',
//         subscriptionAmount: 75,
//         position: 'left',
//         packageName: 'Bronze',
//         children: [],
//       },
//     ],
//   },
// ];

// const TreeViewComponent = () => {
//   const [users, setUsers] = useState<UserType[]>(initialUsers);
//   const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
//   const [showAddNodePopup, setShowAddNodePopup] = useState(false);
//   const [newNodeName, setNewNodeName] = useState('');
//   const [newNodePosition, setNewNodePosition] = useState<'left' | 'right'>('left');

//   // Function to handle node click
//   const handleNodeClick = (user: UserType) => {
//     setSelectedUser(user);
//   };

//   const handleAddNodeClick = () => {
//     setShowAddNodePopup(true);
//   };

//   const closePopup = () => {
//     setSelectedUser(null);
//     setShowAddNodePopup(false);
//   };

//   const handleAddNodeSubmit = () => {
//     if (selectedUser && newNodeName) {
//       const updatedUsers = [...users];

//       const addChildNode = (node: UserType) => {
//         if (node.id === selectedUser.id) {
//           const newNode = { 
//             id: Date.now(), 
//             name: newNodeName, 
//             position: newNodePosition, 
//             children: [] 
//           };
//           node.children = [...(node.children || []), newNode];
//         } else if (node.children) {
//           node.children.forEach(addChildNode);
//         }
//       };

//       updatedUsers.forEach(addChildNode);
//       setUsers(updatedUsers);
//       setShowAddNodePopup(false);
//       setNewNodeName('');
//     }
//   };

//   // Recursive UserNode component for rendering each node as a card
//   const UserNode = ({ user }: { user: UserType }) => (
//     <div className="ml-4 border border-gray-300 p-2 rounded mb-2 w-64">
//       <p onClick={() => handleNodeClick(user)} className="cursor-pointer font-bold text-blue-600">
//         {user.name}
//       </p>
//       {user.children && user.children.length > 0 && (
//         <div className="ml-6">
//           {user.children.map((child) => (
//             <UserNode key={child.id} user={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-4">
//       {/* Display the root user nodes */}
//       {users.map((user) => (
//         <UserNode key={user.id} user={user} />
//       ))}

//       {/* Popup for displaying user details */}
//       {selectedUser && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
//             <h3 className="text-xl font-bold mb-2">{selectedUser.name}</h3>
//             <p>ID: {selectedUser.id}</p>
//             <p>Subscription Amount: ${selectedUser.subscriptionAmount || 'N/A'}</p>
//             <p>Position: {selectedUser.position || 'N/A'}</p>
//             <p>Package: {selectedUser.packageName || 'N/A'}</p>
//             <p>Parent ID: {selectedUser.parentId || 'N/A'}</p>
//             <button
//               onClick={handleAddNodeClick}
//               className="mt-4 bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded"
//             >
//               Add Child Node
//             </button>
//             <button
//               onClick={closePopup}
//               className="mt-2 bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add Node Popup with Form */}
//       {showAddNodePopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
//             <h3 className="text-xl font-bold mb-2">Add New Node</h3>
//             <input
//               type="text"
//               value={newNodeName}
//               onChange={(e) => setNewNodeName(e.target.value)}
//               placeholder="Enter name"
//               className="mb-4 p-2 border border-gray-300 rounded w-full"
//             />
//             <div className="flex justify-around mb-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="left"
//                   checked={newNodePosition === 'left'}
//                   onChange={() => setNewNodePosition('left')}
//                 />
//                 <span className="ml-2">Left</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="right"
//                   checked={newNodePosition === 'right'}
//                   onChange={() => setNewNodePosition('right')}
//                 />
//                 <span className="ml-2">Right</span>
//               </label>
//             </div>
//             <button
//               onClick={handleAddNodeSubmit}
//               className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 rounded w-full mb-2"
//             >
//               Add
//             </button>
//             <button
//               onClick={closePopup}
//               className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded w-full"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreeViewComponent;


















// "use client";

// import React from 'react';

// import { UserType } from './TreeViewComponent';
// import UserNodeFolder from './UserNodeFolder';

// // import { User } from '../types/User';

// const initialUsers: UserType[] = [
//     {
//       id: 1,
//       name: 'Alice',
//       subscriptionAmount: 200,
//       position: 'left',
//       packageName: 'Gold',
//       parentName: '',
//       parentId: 0,
//       children: [
//         {
//           id: 2,
//           name: 'Bob',
//           subscriptionAmount: 150,
//           position: 'left',
//           packageName: 'Silver',
//           parentName: 'Alice',
//           parentId: 1,
//           children: [
//             { id: 3, name: 'Charlie', subscriptionAmount: 100, position: 'left', packageName: 'Bronze', parentName: 'Bob', parentId: 2, children: [] },
//             { id: 4, name: 'David', subscriptionAmount: 120, position: 'right', packageName: 'Silver', parentName: 'Bob', parentId: 2, children: [
//               {
//                 id: 2,
//                 name: 'Bob',
//                 subscriptionAmount: 150,
//                 position: 'left',
//                 packageName: 'Silver',
//                 parentName: 'Alice',
//                 parentId: 1,
//                 children: [
//                   { id: 3, name: 'Charlie', subscriptionAmount: 100, position: 'left', packageName: 'Bronze', parentName: 'Bob', parentId: 2, children: [] },
//                   { id: 4, name: 'David', subscriptionAmount: 120, position: 'right', packageName: 'Silver', parentName: 'Bob', parentId: 2, children: [] },
//                 ],
//               },
//               {
//                 id: 5,
//                 name: 'Eve',
//                 subscriptionAmount: 180,
//                 position: 'right',
//                 packageName: 'Gold',
//                 parentName: 'Alice',
//                 parentId: 1,
//                 children: [],
//               },
//             ] },
//           ],
//         },
//         {
//           id: 5,
//           name: 'Eve',
//           subscriptionAmount: 180,
//           position: 'right',
//           packageName: 'Gold',
//           parentName: 'Alice',
//           parentId: 1,
//           children: [
//             {
//               id: 2,
//               name: 'Bob',
//               subscriptionAmount: 150,
//               position: 'left',
//               packageName: 'Silver',
//               parentName: 'Alice',
//               parentId: 1,
//               children: [
//                 { id: 3, name: 'Charlie', subscriptionAmount: 100, position: 'left', packageName: 'Bronze', parentName: 'Bob', parentId: 2, children: [] },
//                 { id: 4, name: 'David', subscriptionAmount: 120, position: 'right', packageName: 'Silver', parentName: 'Bob', parentId: 2, children: [] },
//               ],
//             },
//             {
//               id: 5,
//               name: 'Eve',
//               subscriptionAmount: 180,
//               position: 'right',
//               packageName: 'Gold',
//               parentName: 'Alice',
//               parentId: 1,
//               children: [],
//             },
//           ]
//         },
//       ],
//     },
//   ];

// interface UserNodeProps {
//     user: UserType;
// }

// const FolderViewComponent = () => {
//     return (
//         <div className='flex flex-col items-center'>
//             <h1 className="text-2xl font-bold mb-8">User Folder</h1>
//             {initialUsers.map((user) => (
//                 <UserNodeFolder key={user.id} user={user} />
//             ))}
//         </div>
//     )
// };

// export default FolderViewComponent;

import React, {
  useMemo,
  useState,
} from 'react';

import Tree from 'react-d3-tree';

import { formatToCurrency } from '@/app/lib/formatNumberToCurrency';
import {
  UserProspectType,
} from '@/components/common/backbone/other_component/data';

export type UserType = {
  id: number;
  name: string;
  subscriptionAmount: number;
  position: 'left' | 'right';
  packageName: string;
  parentName?: string;
  parentId?: number;
  children?: UserType[];
};

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
    // position: 'left', // Default position (can be customized)
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



const TreeViewComponent = ({ loggedInUserFamilyTreeInStore }: { loggedInUserFamilyTreeInStore: UserProspectType}) => {
  console.log(loggedInUserFamilyTreeInStore, "good great in TreeViewComponent")
  const [users, setUsers] = useState<UserProspectType[]>([ loggedInUserFamilyTreeInStore ].map(item => transformFamilyTree (item)));
  const [selectedUser, setSelectedUser] = useState<UserProspectType | null>(null);
  const [showAddNodePopup, setShowAddNodePopup] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodePosition, setNewNodePosition] = useState<'left' | 'right'>('left');
  const [newNodePackage, setNewNodePackage] = useState('');

  const containerRef = React.useRef<HTMLDivElement>(null);
  const translate = { x: 200, y: 50 };

  const memoizedUsers: any = useMemo(() => users, [users]);

  const renderCustomNodeElement = useMemo(() => {
    return ({ nodeDatum }: any) => {
      const nameLength = `${nodeDatum?.firstName || ''} ${nodeDatum?.lastName || ''}`.length;
      const phoneLength = `${nodeDatum?.phone || ''}`.length;

      const dynamicWidth = Math.max(nameLength * 8, phoneLength * 8, 120); // Minimum width of 120
      const dynamicHeight = 60 + (phoneLength > 0 ? 20 : 0); // Add height if phone exists
      return (
      <foreignObject width={ dynamicWidth } height={ dynamicHeight } x={-dynamicWidth / 2}
      y={-dynamicHeight / 2}>
        <div
          onClick={() => handleNodeClick(nodeDatum as any)}
          className={`w-fit h-fit truncate flex items-center justify-center cursor-pointer rounded-lg font-bold text-white ${
            nodeDatum.children ? 'bg-teal-500' : 'bg-green-400'
          }`}
          style={{
            width: `${dynamicWidth}px`,
            height: `${dynamicHeight}px`,
            paddingLeft: '4px',
            paddingRight: '4px',
            textAlign: 'center',
          }}
        >
          {nodeDatum?.firstName} { nodeDatum?.lastName }
          <br />
          {nodeDatum?.phone}
        </div>
      </foreignObject>
    )};
  }, []);

  const handleNodeClick = (user: UserProspectType) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '500px', overflowY: 'auto' }}
      className="bg-white relative"
    >
      <Tree
        data={memoizedUsers}
        translate={translate}
        orientation="vertical"
        pathFunc="step"
        nodeSize={{ x: 150, y: 100 }}
        renderCustomNodeElement={renderCustomNodeElement}
      />

      {/* Popup for displaying user details */}
      {selectedUser && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-64 text-center">
            <h3 className="text-xl font-bold mb-4">{selectedUser?.firstName} { selectedUser?.lastName }</h3>
            <p>ID: {selectedUser._id}</p>
            <p>Montant de l'abonnement: {formatToCurrency(selectedUser.package?.inverstment!, 'XAF')} </p>
            <p>Position: {selectedUser.position}</p>
            <p>Package: {selectedUser.package?.name}</p>
            {selectedUser.parent && <p>Parent: {selectedUser.parent?.firstName} {selectedUser.parent?.lastName} (ID: {selectedUser.parent?._id})</p>}
            <p>Solde: { formatToCurrency(selectedUser?.userWallet?.balance!, 'XAF') }</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Node Popup with Form */}
      {showAddNodePopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-64 text-center">
            <h3 className="text-xl font-bold mb-4">Add New Node</h3>
            <input
              type="text"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              placeholder="Enter name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              value={newNodePackage}
              onChange={(e) => setNewNodePackage(e.target.value)}
              placeholder="Enter package name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="flex justify-around mb-4">
              <label>
                <input
                  type="radio"
                  value="left"
                  checked={newNodePosition === 'left'}
                  onChange={() => setNewNodePosition('left')}
                />
                Left
              </label>
              <label>
                <input
                  type="radio"
                  value="right"
                  checked={newNodePosition === 'right'}
                  onChange={() => setNewNodePosition('right')}
                />
                Right
              </label>
            </div>
            <button
              onClick={() => setShowAddNodePopup(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeViewComponent;

































// const initialUsers: UserType[] = [
//   {
//     id: 1,
//     name: 'Alice',
//     subscriptionAmount: 200,
//     position: 'left',
//     packageName: 'Gold',
//     parentName: '',
//     parentId: 0,
//     children: [
//       {
//         id: 2,
//         name: 'Bob',
//         subscriptionAmount: 150,
//         position: 'left',
//         packageName: 'Silver',
//         parentName: 'Alice',
//         parentId: 1,
//         children: [
//           { id: 3, name: 'Charlie', subscriptionAmount: 100, position: 'left', packageName: 'Bronze', parentName: 'Bob', parentId: 2, children: [] },
//           { id: 4, name: 'David', subscriptionAmount: 120, position: 'right', packageName: 'Silver', parentName: 'Bob', parentId: 2, children: [
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
//           ] },
//         ],
//       },
//       {
//         id: 5,
//         name: 'Eve',
//         subscriptionAmount: 180,
//         position: 'right',
//         packageName: 'Gold',
//         parentName: 'Alice',
//         parentId: 1,
//         children: [
//           {
//             id: 2,
//             name: 'Bob',
//             subscriptionAmount: 150,
//             position: 'left',
//             packageName: 'Silver',
//             parentName: 'Alice',
//             parentId: 1,
//             children: [
//               { id: 3, name: 'Charlie', subscriptionAmount: 100, position: 'left', packageName: 'Bronze', parentName: 'Bob', parentId: 2, children: [] },
//               { id: 4, name: 'David', subscriptionAmount: 120, position: 'right', packageName: 'Silver', parentName: 'Bob', parentId: 2, children: [] },
//             ],
//           },
//           {
//             id: 5,
//             name: 'Eve',
//             subscriptionAmount: 180,
//             position: 'right',
//             packageName: 'Gold',
//             parentName: 'Alice',
//             parentId: 1,
//             children: [],
//           },
//         ]
//       },
//     ],
//   },
// ];










// import React, {
//   useMemo,
//   useState,
// } from 'react';

// import Tree, { CustomNodeElementProps } from 'react-d3-tree';

// export type UserType = {
//   id: number;
//   name: string;
//   children?: UserType[];
// };

// const initialUsers: UserType[] = [
//   {
//     id: 1,
//     name: 'Alice',
//     children: [
//       {
//         id: 2,
//         name: 'Bob',
//         children: [
//           { id: 3, name: 'Charlie', children: [] },
//           { id: 4, name: 'David', children: [] },
//         ],
//       },
//       {
//         id: 5,
//         name: 'Eve',
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

//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const translate = { x: 200, y: 50 };

//   const memoizedUsers = useMemo(() => users, [users]);

//   const renderCustomNodeElement = useMemo(() => {
//     return ({ nodeDatum }: CustomNodeElementProps) => (
//       <g>
//         <rect
//           width="100"
//           height="50"
//           x="-50"
//           y="-25"
//           fill={nodeDatum.children ? 'teal' : 'lightgreen'}
//           onClick={() => handleNodeClick(nodeDatum as any)}
//           className="cursor-pointer"
//           rx="10"
//         />
//         <text fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" dy=".33em">
//           {nodeDatum.name}
//         </text>
//       </g>
//     );
//   }, []);

//   const handleNodeClick = (user: UserType) => {
//     setSelectedUser(user);
//   };

//   const closePopup = () => {
//     setSelectedUser(null);
//   };

//   const handleAddNodeClick = () => {
//     setShowAddNodePopup(true);
//   };

//   const handleAddNodeSubmit = () => {
//     if (selectedUser && newNodeName) {
//       const updatedUsers = [...users];
//       const addChildNode = (node: UserType) => {
//         if (node.id === selectedUser.id) {
//           const newNode = { id: Date.now(), name: newNodeName, children: [] };
//           if (newNodePosition === 'left') {
//             node.children = [newNode, ...(node.children || [])];
//           } else {
//             node.children = [...(node.children || []), newNode];
//           }
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

//   return (
//     <div
//       ref={containerRef}
//       style={{ width: '100%', height: '500px', overflowY: 'auto' }}
//       className="bg-slate-500 relative"
//     >
//       <Tree
//         data={memoizedUsers}
//         translate={translate}
//         orientation="vertical"
//         pathFunc="step"
//         nodeSize={{ x: 150, y: 100 }}
//         renderCustomNodeElement={renderCustomNodeElement}
//       />

//       {/* Popup for displaying user details */}
//       {selectedUser && (
//         <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-64 text-center">
//             <h3 className="text-xl font-bold mb-4">{selectedUser.name}</h3>
//             <p>ID: {selectedUser.id}</p>
//             <button
//               onClick={handleAddNodeClick}
//               className="mt-4 bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
//             >
//               Add Node
//             </button>
//             <button
//               onClick={closePopup}
//               className="mt-4 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add Node Popup with Form */}
//       {showAddNodePopup && (
//         <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-lg w-64 text-center">
//             <h3 className="text-xl font-bold mb-4">Add New Node</h3>
//             <input
//               type="text"
//               value={newNodeName}
//               onChange={(e) => setNewNodeName(e.target.value)}
//               placeholder="Enter name"
//               className="mb-4 p-2 border border-gray-300 rounded w-full"
//             />
//             <div className="flex justify-around mb-4">
//               <label>
//                 <input
//                   type="radio"
//                   value="left"
//                   checked={newNodePosition === 'left'}
//                   onChange={() => setNewNodePosition('left')}
//                 />
//                 Left
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="right"
//                   checked={newNodePosition === 'right'}
//                   onChange={() => setNewNodePosition('right')}
//                 />
//                 Right
//               </label>
//             </div>
//             <button
//               onClick={handleAddNodeSubmit}
//               className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded w-full mb-2"
//             >
//               Add
//             </button>
//             <button
//               onClick={() => setShowAddNodePopup(false)}
//               className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded w-full"
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



















// import React, {
//   useMemo,
//   useState,
// } from 'react';

// import Tree from 'react-d3-tree';

// export type UserType = {
//     id: number;
//     name: string;
//     children?: UserType[];
// };

// const users: UserType[] = [
//     {
//         id: 1,
//         name: 'Alice',
//         children: [
//             {
//                 id: 2,
//                 name: 'Bob',
//                 children: [
//                     { id: 3, name: 'Charlie', children: [] },
//                     { id: 4, name: 'David', children: [] },
//                 ],
//             },
//             {
//                 id: 5,
//                 name: 'Eve',
//                 children: [],
//             },
//         ],
//     },
// ];

// const TreeViewComponent = () => {
//     const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
//     const containerRef = React.useRef<HTMLDivElement>(null);

//     // Center the tree on initial render
//     const translate = { x: 200, y: 50 };

//     // Memoize the tree data to prevent unnecessary re-renders
//     const memoizedUsers = useMemo(() => users, []);

//     // Function to render each node element with custom styling and click handler
//     const renderCustomNodeElement = useMemo(() => {
//         return ({ nodeDatum }: { nodeDatum: any }) => (
//             <g>
//                 <circle
//                     r="20"
//                     fill={nodeDatum.children ? 'teal' : 'lightgreen'}
//                     onClick={() => handleNodeClick(nodeDatum)}
//                     className="cursor-pointer"
//                 />
//                 <text
//                     fill="black"
//                     x="25"
//                     dy=".33em"
//                     fontSize="12"
//                     onClick={() => handleNodeClick(nodeDatum)}
//                     className="cursor-pointer"
//                 >
//                     {nodeDatum.name}
//                 </text>
//             </g>
//         );
//     }, []); // No dependencies, it won't change

//     // Handle node click to display the popup with user details
//     const handleNodeClick = (user: UserType) => {
//         setSelectedUser(user);
//     };

//     // Close the popup
//     const closePopup = () => {
//         setSelectedUser(null);
//     };

//     return (
//         <div
//             ref={containerRef}
//             style={{ width: '100%', height: '500px', overflowY: 'auto' }}
//             className="bg-slate-500 relative"
//             // onScroll={handleScroll}
//         >
//             <Tree
//                 data={memoizedUsers}
//                 translate={translate}
//                 orientation="vertical"
//                 pathFunc="step"
//                 nodeSize={{ x: 150, y: 100 }}
//                 renderCustomNodeElement={renderCustomNodeElement}
//             />

//             {/* Popup for displaying user details */}
//             {selectedUser && (
//                 <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-md shadow-lg w-64 text-center">
//                         <h3 className="text-xl font-bold mb-4">{selectedUser.name}</h3>
//                         <p>ID: {selectedUser.id}</p>
//                         <button
//                             onClick={closePopup}
//                             className="mt-4 bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TreeViewComponent;
























// import React from 'react';

// import Tree from 'react-d3-tree';

// export type UserType = {
//     id: number;
//     name: string;
//     children?: UserType [];
// }

// const users: UserType [] = [
//     {
//         id: 1,
//         name: 'Alice',
//         children: [
//             {
//                 id: 2,
//                 name: 'Bob',
//                 children: [
//                     { id: 3, name: 'Charlie', children: [] },
//                     { id: 4, name: 'David', children: [
//                         {
//                             id: 2,
//                             name: 'Bob',
//                             children: [
//                                 { id: 3, name: 'Charlie', children: [] },
//                                 { id: 4, name: 'David', children: [] }
//                             ]
//                         },
//                         {
//                             id: 5,
//                             name: 'Eve',
//                             children: []
//                         }
//                     ] }
//                 ]
//             },
//             {
//                 id: 5,
//                 name: 'Eve',
//                 children: [
//                     {
//                         id: 2,
//                         name: 'Bob',
//                         children: [
//                             { id: 3, name: 'Charlie', children: [] },
//                             { id: 4, name: 'David', children: [
//                                 {
//                                     id: 2,
//                                     name: 'Bob',
//                                     children: [
//                                         { id: 3, name: 'Charlie', children: [] },
//                                         { id: 4, name: 'David', children: [] }
//                                     ]
//                                 },
//                                 {
//                                     id: 5,
//                                     name: 'Eve',
//                                     children: []
//                                 }
//                             ] }
//                         ]
//                     },
//                     {
//                         id: 5,
//                         name: 'Eve',
//                         children: []
//                     }
//                 ]
//             }
//         ]
//     }
// ];


// const TreeViewComponent = () => {
//     const containerRef = React.useRef<HTMLDivElement>(null);

//   // Center the tree on initial render
//   const translate = { x: 200, y: 50 };

//   return (
//     <div ref={containerRef} style={{ width: '100%', height: '500px' }} className='bg-slate-500'>
//       <Tree
//         data={users}
//         translate={translate}
//         orientation="vertical"
//         pathFunc="step" // "step" makes connectors curved. Options: diagonal, elbow, straight
//         nodeSize={{ x: 150, y: 100 }}
//         styles={{
//           links: {
//             stroke: 'green',
//             strokeWidth: 2,
//           },
//           nodes: {
//             node: {
//               circle: {
//                 fill: 'teal',
//               },
//             },
//             leafNode: {
//               circle: {
//                 fill: 'lightgreen',
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );

//     // return (
//     //     // <div>
//     //     //     <h1>User Tree</h1>
//     //     //     {users.map((user) => (
//     //     //         <UserNode key={user.id} user={user} />
//     //     //     ))}
//     //     // </div>
//     //     <div className="flex flex-col items-center overflow-hidden">
//     //         <h1 className="text-2xl font-bold mb-8">User Tree</h1>
//     //         <div className='overflow-auto w-[100%]'>
//     //             {users.map((user) => (
//     //                 <UserNode key={user.id} user={user} />
//     //             ))}
//     //         </div>
//     //     </div>
//     // )
// }

// export default TreeViewComponent
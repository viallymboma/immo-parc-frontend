import React from 'react';

import { UserType } from './TreeViewComponent';

interface UserNodeProps {
    user: UserType;
}

const UserNode: React.FC<UserNodeProps> = ({ user }) => (
    <div className="relative flex flex-col items-center my-4">
        {/* Node Box */}

        <div className="bg-teal-100 border-2 border-green-500 rounded-md px-4 py-2 font-semibold z-10 cursor-pointer">
            {user.name}
        </div>

        {/* Children with SVG Connector */}
        {
            user.children && user.children.length > 0 && (
                <div className="flex flex-col items-center">
                    {/* SVG Container for connectors */}
                    <svg
                        width="100%"
                        height="40"
                        className="absolute top-8"
                    >
                        {user.children.map((_, index) => {
                            const x1 = 50; // Center point of the parent node
                            const y1 = 0; // Bottom of the parent node
                            const x2 = 50 - (user?.children?.length! - 1) * 25 + index * 50;
                            const y2 = 40;

                            return (
                            <line
                                key={index}
                                x1={`${x1}%`}
                                y1={y1}
                                x2={`${x2}%`}
                                y2={y2}
                                stroke="green"
                                strokeWidth="2"
                            />
                            );
                        })}
                    </svg>

                    {/* Child Nodes */}
                    <div className="flex space-x-4">
                        {user.children.map((child) => (
                            <UserNode key={child.id} user={child} />
                        ))}
                    </div>
                </div>
            )
        }
    </div>
);

export default UserNode;




















// import React from 'react';

// import { UserType } from './TreeViewComponent';

// interface UserNodeProps {
//   user: UserType;
// }

// const UserNode: React.FC<UserNodeProps> = ({ user }) => (
//   <div className="relative flex flex-col items-center my-4">
//     {/* Node Box */}
//     <div className="bg-teal-100 border-2 border-green-500 rounded-md px-4 py-2 font-semibold z-10 cursor-pointer">
//       {user.name}
//     </div>

//     {/* Children with SVG Curved Connector */}
//     {user.children && user.children.length > 0 && (
//       <div className="flex flex-col items-center relative">
//         {/* SVG Container for curved connectors */}
//         <svg
//           width="100%"
//           height="50" // Adjusted height for visibility
//           className="absolute top-8"
//         >
//           {user.children.map((_, index) => {
//             const parentX = 50; // Center of the parent node (in percentage)
//             const parentY = 0; // Bottom of the parent node
//             const childX = 50 - (user?.children?.length! - 1) * 25 + index * 50; // Adjust horizontal spacing based on number of children
//             const childY = 50; // Vertical distance to the child node level

//             // Control points for a smooth curve
//             const controlX1 = parentX;
//             const controlY1 = parentY + 20;
//             const controlX2 = childX;
//             const controlY2 = childY - 20;

//             // SVG path for a cubic Bezier curve
//             const pathData = `M ${parentX}% ${parentY} C ${controlX1}% ${controlY1}, ${controlX2}% ${controlY2}, ${childX}% ${childY}`;

//             return (
//               <path
//                 key={index}
//                 d={pathData}
//                 fill="none"
//                 stroke="green"
//                 strokeWidth="2"
//               />
//             );
//           })}
//         </svg>

//         {/* Child Nodes */}
//         <div className="flex space-x-4 mt-8">
//           {user.children.map((child) => (
//             <UserNode key={child.id} user={child} />
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default UserNode;



















// import React from 'react';

// import { UserType } from './TreeViewComponent';

// interface UserNodeProps {
//   user: UserType;
// }

// const UserNode: React.FC<UserNodeProps> = ({ user }) => (
//   <div className="relative flex flex-col items-center my-4">
//     {/* Node Box */}
//     <div className="bg-teal-100 border-2 border-green-500 rounded-md px-4 py-2 font-semibold z-10 cursor-pointer">
//       {user.name}
//     </div>

//     {/* Children with SVG Curved Connector */}
//     {user.children && user.children.length > 0 && (
//       <div className="flex flex-col items-center">
//         {/* SVG Container for curved connectors */}
//         <svg
//             width="100%"
//             height="40"
//             className="absolute top-8"
//         >
//           {user.children.map((_, index) => {
//             const startX = 50; // Center of the parent node
//             const startY = 0; // Bottom of the parent node
//             const endX = 50 - (user?.children?.length! - 1) * 25 + index * 50; // Position each child node horizontally
//             const endY = 40; // Distance down to the child level

//             // Control points for the curve: halfway down and offset horizontally
//             const controlX1 = startX;
//             const controlY1 = startY + 20;
//             const controlX2 = endX;
//             const controlY2 = endY - 20;

//             // Define the path with the "C" curve for smooth connections
//             const pathData = `M ${startX}% ${startY} C ${controlX1}% ${controlY1}, ${controlX2}% ${controlY2}, ${endX}% ${endY}`;

//             return (
//               <path
//                 key={index}
//                 d={pathData}
//                 fill="none"
//                 stroke="green"
//                 strokeWidth="2"
//               />
//             );
//           })}
//         </svg>

//         {/* Child Nodes */}
//         <div className="flex space-x-4">
//           {user.children.map((child) => (
//             <UserNode key={child.id} user={child} />
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default UserNode;












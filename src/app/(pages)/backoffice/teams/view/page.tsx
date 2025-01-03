import React from 'react';

import jwt from 'jsonwebtoken';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { JWT_SECRET } from '@/app/api/constants';

// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
// import ReturnHeader from '@/components/Sidebar/ReturnHeader';
// import UserTable from '@/components/Tables/AllTables/UserTable';
// import { BASE_API_URL } from '@/lib/constants';
import TeamsViewModule from './_components/TeamsViewModule';

// Metadata for the page
export const metadata: Metadata = {
  title: "Team view Page | Immo-parc - Next.js Dashboard Tool",
  description: "This is Team view page for Immo-parc. Nero-Tech Tailwind CSS Admin Dashboard Tool",
};




// Server component
const TeamPageView = async () => {
  // Read the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('jwt')?.value;
  if (!token) {
    throw new Error('User not authenticated.');
  }

  // Decode the JWT to get the user ID
  const decoded: any = jwt.verify(token, JWT_SECRET!); // Ensure JWT_SECRET is in .env.local
  const userId = decoded._id; 

  // // Fetching data server-side
  // const res = await fetch(`${BASE_API_URL}/users/${ userId }/children`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   cache: 'no-store', // Ensure fresh data on every request
  // });

  // if (!res.ok) {
  //   // Handle errors
  //   console.error(`Failed to fetch data: ${res.statusText}`);
  //   return (
  //     <div className="mx-auto max-w-7xl">
  //       <Breadcrumb pageName="Visuel de mon equipe" />
  //       <ReturnHeader
  //         headerName="Mon equipe"
  //         returnBtnLabel="Retour"
  //         returnLink="/backoffice"
  //       />
  //       <div>
  //         <p>Error fetching team data. Please try again later.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // const userData = await res.json();

  // console.log(userData, "goodppppppppp")

  return <TeamsViewModule userId={userId} />;

  // return (
  //   <div className="mx-auto max-w-7xl">
  //     <Breadcrumb pageName="Visuel de mon equipe" />
  //     <ReturnHeader
  //       headerName="Mon equipe"
  //       returnBtnLabel="Retour"
  //       returnLink="/backoffice"
  //     />
  //     <div>

  //       <UserTable  />
  //     </div>
  //   </div>
  // );
};

export default TeamPageView;

















// import React from 'react';

// import { Metadata } from 'next';

// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
// import ReturnHeader from '@/components/Sidebar/ReturnHeader';
// import UserTable from '@/components/Tables/AllTables/UserTable';

// export const metadata: Metadata = {
//   title: "Team view Page | Immo-parc - Next.js Dashboard Tool",
//   description: "This is Team view page for Immo-parc. Nero-Tech Tailwind CSS Admin Dashboard Tool",
// };

// const TeamPageView = () => {
//   return (
//     <div className="mx-auto max-w-7xl">
//       <Breadcrumb pageName="Visuel de mon equipe" />
//       <ReturnHeader
//         headerName='Mon equipe'
//         returnBtnLabel='Retour'
//         returnLink='/backoffice'
//       />
//       <div>
//         <UserTable />
//       </div>
//     </div>
//   )
// }

// export default TeamPageView
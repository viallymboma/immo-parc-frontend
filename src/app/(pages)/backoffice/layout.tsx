// "use client";
// import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';

import React from 'react';

import axios from 'axios';
import { cookies } from 'next/headers';

import MainLayout from '@/components/common/backbone/MainLayout';
import { BASE_API_URL } from '@/lib/constants';

// import { useUserInfo } from '@/hooks/useUserInfo';

// import apiClient from '@/lib/apiClient';

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const cookieStore = cookies();
  const token = cookieStore.get('jwt')?.value; // Adjust based on your cookie name

  // const { user } = useUserInfo ()

  try {
    if (!token) throw new Error('No token found');
    // Optionally, verify token validity with a backend API call
    const request = await axios.get(`${BASE_API_URL}/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in the Authorization header
      },
    });
    // console.log("yyyyyyyyyyyy", token)
  } catch (error) {
    // Redirect to signout page if token is invalid
    // return (
    //   <html>
    //     <head>
    //       <meta http-equiv="refresh" content="0; url=/auth/signin" />
    //     </head>
    //   </html>
    // );
    return (
      <MainLayout>
        { children }
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      { children }
    </MainLayout>
  );
}

// export default appWithTranslation(RootLayout);
export default RootLayout;































// "use client";
// // import 'jsvectormap/dist/jsvectormap.css';
// import 'flatpickr/dist/flatpickr.min.css';
// import '@/css/satoshi.css';
// import '@/css/style.css';

// import React from 'react';

// // import apiClient from '@/lib/apiClient';
// import { useRouter } from 'next/navigation';

// // import { cookies } from 'next/headers';
// import MainLayout from '@/components/common/backbone/MainLayout';
// import { useAuth } from '@/hooks/useAuth';

// const RootLayout = ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {

//   // const cookieStore = cookies();
//   // const token = cookieStore.get('jwt'); // Adjust based on your cookie name

//   // console.log(token, "kkkkk")

//   // // return

//   // try {
//   //   if (!token) throw new Error('No token found');
//   //   // Optionally, verify token validity with a backend API call
//   //   const request = await apiClient.get('/auth/verify-token');
//   //   console.log(request, "yyyyyyyyyyyy", token)
//   // } catch (error) {
//   //   // Redirect to signout page if token is invalid
//   //   return (
//   //     <html>
//   //       <head>
//   //         <meta http-equiv="refresh" content="0; url=/auth/signin" />
//   //       </head>
//   //     </html>
//   //   );
//   // }

//   const { user, loading, error } = useAuth();
//   const router = useRouter();

//   React.useEffect(() => {
//     if (!loading && !user) {
//       router.push('/auth/signin'); // Redirect to login if not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state
//   }

//   return (
//     <MainLayout>
//       { children }
//     </MainLayout>
//   );
// }

// // export default appWithTranslation(RootLayout);
// export default RootLayout;
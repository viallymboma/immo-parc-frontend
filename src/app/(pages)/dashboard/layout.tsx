"use client";
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';

import React from 'react';

import DefaultLayout from '@/components/Layouts/DefaultLaout';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <DefaultLayout>
      { children }
    </DefaultLayout>
  );
}

// export default appWithTranslation(RootLayout);
export default RootLayout;
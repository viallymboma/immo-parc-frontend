"use client";
// import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';

import React from 'react';

import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher';

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {

    return (
        <div className='mx-auto p-2 max-w-7xl'>
            <DarkModeSwitcher />
            { children }
        </div>
    );
}

// export default appWithTranslation(RootLayout);
export default RootLayout;
"use client";
import React from 'react';

import { useUserInfo } from '@/hooks/useUserInfo';

import BottomNavigation from './other_component/BottomNavigation';
import HeaderNavigation from './other_component/HeaderNavigation';
import SidebarNavigation from './other_component/SidebarNavigation';

const MainLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const { user } = useUserInfo ()
    console.log(user, "user info")
    return (
        <>
            {/* <!-- ===== Page Wrapper Star ===== --> */}
            <div className="flex h-[100dvh] relative overflow-hidden">
                {/* <!-- ===== Sidebar Star ===== --> */}
                <SidebarNavigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}
        
                {/* <!-- ===== Content Area Star ===== --> */}
                <div className="relative flex flex-1 flex-col h-[100dvh] overflow-y-auto overflow-x-hidden ">
                    {/* <!-- ===== Header Star ===== --> */}
                    <HeaderNavigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Star ===== --> */}
                    <main className='relative'>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
                {/* <!-- ===== Main Content End ===== --> */}
                {/* <!-- ===== Sidebar Star ===== --> */}
                <div className='z-[1000] absolute bottom-0 w-full '>
                    <BottomNavigation />
                </div>
                {/* <!-- ===== Sidebar End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </>
    );
}

export default MainLayout
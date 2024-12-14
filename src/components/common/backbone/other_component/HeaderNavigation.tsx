import React from 'react';

import Link from 'next/link';

import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher';
import DropdownNotification from '@/components/Header/DropdownNotification';
import DropdownUser from '@/components/Header/DropdownUser';
import SearchForm from '@/components/Header/SearchForm';
import {
  GoldenLogo,
  NewHamburgerSvgIcon,
} from '@/components/svgs/SvgIcons';

const HeaderNavigation = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) => {
    return (
        <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
            <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm bg-transparent p-1.5 shadow-sm dark:border-dark-3  lg:hidden"
                    >
                        <NewHamburgerSvgIcon />
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}

                    <Link className="block flex-shrink-0 lg:hidden" href="/backoffice">
                    <GoldenLogo width="32" height="32" />
                    </Link>
                </div>

                <div className="hidden xl:block">
                    <div>
                        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
                            Tableau de bord
                        </h1>
                        {/* <p className="font-medium">Next.js Admin Dashboard Solution</p> */}
                        <p className="font-medium">Espace Administrateur</p>
                    </div>
                </div>

                <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                    {/* <!-- Search Form --> */}
                    <SearchForm />
                    {/* <!-- Search Form --> */}

                    {/* <!-- Dark Mode Toggle --> */}
                    <DarkModeSwitcher />
                    {/* <!-- Dark Mode Toggle --> */}

                    {/* <!-- Notification Menu Area --> */}
                    <DropdownNotification />
                    {/* <!-- Notification Menu Area --> */}
                    </ul>

                    {/* <!-- User Area --> */}
                    <DropdownUser />
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    )
}

export default HeaderNavigation
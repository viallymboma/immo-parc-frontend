import React from 'react';

import Link from 'next/link';

import ClickOutside from '@/components/ClickOutside';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import {
  GoldenLongVersion,
  NewHamburgerSvgIcon,
} from '@/components/svgs/SvgIcons';
import useLocalStorage from '@/hooks/useLocalStorage';

import { menuGroups } from './data';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const SidebarNavigation = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const [pageName, setPageName] = useLocalStorage("selectedMenu", "backoffice");
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
            sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10">
          <Link href="/backoffice">
              <GoldenLongVersion width="176" height="32" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            {/* <HamburgerMenuSvgIcon /> */}
            <NewHamburgerSvgIcon />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          {/* <LanguageSwitcher /> */}
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                    {group.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-2">
                    { group.menuItems && group.menuItems?.length && group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                    />
                    ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  )
}

export default SidebarNavigation
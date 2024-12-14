"use client";

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ClickOutside from '@/components/ClickOutside';
import SidebarItem from '@/components/Sidebar/SidebarItem';
import useLocalStorage from '@/hooks/useLocalStorage';

import {
  CalendarSvgIcon,
  DashboardSvgIcon,
  FormsSvgIcon,
  GoldenLongVersion,
  NewHamburgerSvgIcon,
  ProfileSvgIcon,
  TablesSvgIcon,
} from '../svgs/SvgIcons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU PRINCIPAL",
    menuItems: [
      {
        icon: (
          <DashboardSvgIcon />
        ),
        label: "Tableau de Bord",
        route: "/dashboard",
        // children: [
        //   { label: "eCommerce", route: "/" },
        // ],
      },
      {
        icon: (
          <CalendarSvgIcon />
        ),
        label: "Commissions",
        route: "/dashboard/commissions",
      },
      {
        icon: (
          <FormsSvgIcon />
        ),
        label: "Team",
        route: "#",
        children: [
          { label: "Mon équipe", route: "/dashboard/teams/view" },
          { label: "Tree View", route: "/dashboard/teams/tree-view" },
          { label: "Folder View", route: "dashboard/teams/folder-view" },
        ],
      },
      {
        icon: (
          <TablesSvgIcon />
        ),
        label: "Transactions",
        route: "#",
        children: [
          // { label: "Tables", route: "/tables" },
          { label: "Commissions", route: "dashboard/transactions/commissions" },
          { label: "Withdrawals", route: "/dashboard/transactions/withdrawals" },
          { label: "Investissements", route: "/dashboard/transactions/investments" },
        ],
      },

      // {
      //   icon: (
      //     <PagesSvgIcon />
      //   ),
      //   label: "Pages",
      //   route: "#",
      //   children: [
      //     { label: "Settings", route: "/pages/settings" },
      //   ],
      // },
    ],
  },
  {
    name: "REGLAGES",
    menuItems: [
      {
        icon: (
          <ProfileSvgIcon />
        ),
        label: "Profile",
        route: "/dashboard/profile",
      }, 
      {
        icon: (
          <CalendarSvgIcon />
        ),
        label: "Utilisateurs",
        route: "/dashboard/utilisateurs",
      },
      // {
      //   icon: (
      //     <ChartsSvgIcon />
      //   ),
      //   label: "Charts",
      //   route: "#",
      //   children: [
      //     { label: "Basic Chart", route: "/charts/basic-chart" },
      //   ],
      // },
      // {
      //   icon: (
      //     <UIELementsSvgIcon />
      //   ),
      //   label: "UI Elements",
      //   route: "#",
      //   children: [
      //     { label: "Alerts", route: "/ui-elements/alerts" },
      //     { label: "Buttons", route: "/ui-elements/buttons" },
      //   ],
      // },
      // {
      //   icon: (
      //     <LogoutSvgIcon />
      //   ),
      //   label: "Authentication",
      //   route: "#",
      //   children: [
      //     { label: "Sign In", route: "/auth/signin" },
      //   ],
      // },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

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
          <Link href="/dashboard">
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
  );
};

export default Sidebar;


// R5sRCD5Fj.zqm
// https://sunruncm.cc/pages/login/index?invite=urgihmuc
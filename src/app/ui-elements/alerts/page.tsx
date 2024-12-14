import { Metadata } from 'next';

import AlertError from '@/components/Alerts/AlertError';
import AlertSuccess from '@/components/Alerts/AlertSuccess';
import AlertWarning from '@/components/Alerts/AlertWarning';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

export const metadata: Metadata = {
  title: "Immo-parc Alerts Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Alerts page for NextAdmin Dashboard Kit",
  // other metadata
};

const Alerts = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Alerts" />

      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <AlertWarning />
          <AlertSuccess />
          <AlertError />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Alerts;

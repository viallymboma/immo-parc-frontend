import { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
  title: "Immo-parc Commission Page | Nero-Tech - Next.js Dashboard Tool",
  description:
    "This is Commission Calender page for Immo-parc Nero-Tech  Tailwind CSS Admin Dashboard Tool",
  // other metadata
};

const CommissionPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Commissions" />
        hello
      {/* <Breadcrumb pageName="Calendar" />

      <CalendarBox /> */}
    </div>
    // <DefaultLayout>
    // </DefaultLayout>
  );
};

export default CommissionPage;

import { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProfileBox from '@/components/ProfileBox';

export const metadata: Metadata = {
  title: "Immo-parc Profile Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const Profile = () => {
  return (
    // <DefaultLayout>
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <ProfileBox />
    </div>
    // </DefaultLayout>
  );
};

export default Profile;

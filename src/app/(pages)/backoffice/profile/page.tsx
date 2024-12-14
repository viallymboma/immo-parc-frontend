import { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/common/backbone/ReturnHeader';

import ProfileModule from './_components/ProfileModule';

export const metadata: Metadata = {
  title: "Immo-parc Profile Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const Profile = () => {
  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />
      <ReturnHeader 
        headerName="Profile"
        returnBtnLabel='Retour'
        returnLink='/backoffice'
      />
      <ProfileModule />
    </div>
  );
};

export default Profile;

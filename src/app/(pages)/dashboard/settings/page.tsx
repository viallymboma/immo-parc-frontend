import { Metadata } from 'next';

import SettingsModule from './_components/SettingsModule';

export const metadata: Metadata = {
  title: "Immo-parc Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const Settings = () => {
  return (
    <div>
      <SettingsModule />
    </div>
  );
};

export default Settings;

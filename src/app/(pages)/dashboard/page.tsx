import React from 'react';

import { Metadata } from 'next';

import ECommerce from '@/components/Dashboard/E-commerce';

// import ECommerce from '@/components/Dashboard/E-commerce';

export const metadata: Metadata = {
  title:
    "Plateforme de business et d'investissement",
  description: "Cette Plateforme donne une opportunite de mettre sur pied un plan d'investissement a long term securise et fiable",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        <ECommerce />
      {/* </DefaultLayout> */}
    </>
  );
}

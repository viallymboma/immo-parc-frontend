import React from 'react';

import { Metadata } from 'next';

import FormElements from '@/components/FormElements';
import DefaultLayout from '@/components/Layouts/DefaultLaout';

export const metadata: Metadata = {
  title: "Immo-parc Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;

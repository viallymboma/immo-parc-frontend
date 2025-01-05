import React from 'react';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { JWT_SECRET } from '@/app/api/constants';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import IntermediateComponent from './_components/IntermediateComponent';

const TreeViewPage = () => {
  // Read the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('jwt')?.value;
  if (!token) {
    throw new Error('User not authenticated.');
  }

  // Decode the JWT to get the user ID
  const decoded: any = jwt.verify(token, JWT_SECRET!); // Ensure JWT_SECRET is in .env.local
  const userId = decoded._id; 
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Arbre Genealogique" />
      <ReturnHeader
        headerName='Arbre Genealogique'
        returnBtnLabel='Retour'
        returnLink='/backoffice'
      />
      <div>
        <IntermediateComponent userId={ userId } />
      </div>
    </div>
  )
}

export default TreeViewPage
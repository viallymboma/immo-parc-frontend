import React from 'react';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import IntermediateComponent from './_components/IntermediateComponent';

const TreeViewPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Arbre Genealogique" />
      <ReturnHeader
        headerName='Arbre Genealogique'
        returnBtnLabel='Retour'
        returnLink='/dashboard'
      />
      <div>
        <IntermediateComponent />
      </div>
    </div>
  )
}

export default TreeViewPage
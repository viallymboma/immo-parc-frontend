import React from 'react';

import ReturnHeader from '@/components/Sidebar/ReturnHeader';

import InviteFriendsModule from './_components/InviteFriendsModule';

const InviteFrienPage = () => {

    return (
        <div>
            <ReturnHeader 
                headerName="Mon Lien d'Invitation"
                returnBtnLabel='Retour'
                returnLink='/backoffice'
            />
            <InviteFriendsModule />
        </div>
    );
};

export default InviteFrienPage;











// import React from 'react';

// import Image from 'next/image';

// import QRCodeComponent from '@/components/qr-code/QRCodeComponent';

// import InviteFriend from '../../../../../public/imgs/in-icon.png';

// const InviteFrienPage = () => {
//     // const url = 
//     return (
//         <div className='bg-slate-500 flex flex-col items-center'>
//             <div className='w-[400px] flex justify-center'>
//                 <Image src={ InviteFriend } className='w-[80%]' alt='InviteFriend' />
//             </div>
//             <div>
//                 <QRCodeComponent 
//                     text="https://example.com" 
//                     size={200}          // Customize size if desired
//                     bgColor="#f0f0f0"   // Customize background color
//                     fgColor="#333333"   // Customize foreground color
//                 />
//             </div>
//         </div>
//     )
// }

// export default InviteFrienPage
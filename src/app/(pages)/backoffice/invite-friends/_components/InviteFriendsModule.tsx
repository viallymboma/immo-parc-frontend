"use client";
import React from 'react';

import Image from 'next/image';
import toast from 'react-hot-toast';

import QRCodeComponent from '@/components/qr-code/QRCodeComponent';
import { useUserInfo } from '@/hooks/useUserInfo';

import InviteFriend from '../../../../../../public/imgs/in-icon.png';

const InviteFriendsModule = () => {
    const { user } = useUserInfo ()
    // const url = `http://localhost:3000/auth/signup?supervisor=${ user?.userInfo?.phone }`;
    const qrRef = React.useRef<HTMLDivElement>(null);

    // Extract the current domain dynamically
    const currentDomain = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${ currentDomain }/auth/signup?supervisor=${ user?.userInfo?.phone }`;
    console.log(url, "alirght")

    // Function to save the QR code as an image
    const saveQRCode = () => {
        if (qrRef.current) {
            const canvas = qrRef.current.querySelector('canvas');
            if (canvas) {
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "qrcode.png";
                link.click();
            }
        }
        // if (user?.userInfo?.package?.level === 0) {
        //     toast.error(`Vous êtes toujours en compte stagiaire. vous ne pouvez pas envoyer d'invitation, si vous ne passez pas à un forfait supérieur`); 
        //     return null;
        // } else if (qrRef.current) {
        //     const canvas = qrRef.current.querySelector('canvas');
        //     if (canvas) {
        //         const dataUrl = canvas.toDataURL("image/png");
        //         const link = document.createElement("a");
        //         link.href = dataUrl;
        //         link.download = "qrcode.png";
        //         link.click();
        //     }
        // }
    };

    // // Function to copy the URL to clipboard
    const copyToClipboard = React.useCallback(async () => {
        try {
            // if (user?.userInfo?.package?.level === 0) {
            //     toast.error(`Vous êtes toujours en compte stagiaire. vous ne pouvez pas envoyer d'invitation, si vous ne passez pas à un forfait supérieur`); 
            //     return null;
            // }
            await navigator.clipboard.writeText(url);
            toast.success(`URL copiée : ${ url }`); 
        } catch (error) {
            console.error("Failed to copy URL:", error);
            toast.error("Échec de la copie de l'URL"); 
        }
    }, [])
    return (
        <div className='flex flex-col items-center min-h-screen p-4'>
            <div className='w-[400px] flex justify-center'>
                <Image src={InviteFriend} className='w-[80%]' alt='InviteFriend' />
            </div>
            <div ref={qrRef} className='my-4'>
                <QRCodeComponent 
                    text={url}
                    size={150}          
                    bgColor="#f0f0f0"   
                    fgColor="#333333"   
                />
            </div>
            <div className="flex gap-4 mt-4">
                <button onClick={saveQRCode} className="px-4 py-2 bg-blue-600 text-white rounded truncate">
                    Enregistrer le code QR
                </button>
                <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white rounded truncate">
                    Copier URL
                </button>
            </div>
        </div>
    );
}

export default InviteFriendsModule
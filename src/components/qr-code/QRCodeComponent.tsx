"use client";
import { FC } from 'react';

// components/QRCodeComponent.tsx
import { QRCodeCanvas } from 'qrcode.react';

// import { QRCode } from 'qrcode.react';

interface QRCodeComponentProps {
  text: string;         // Text or URL to encode in the QR code
  size?: number;        // Optional: Size of the QR code (default: 128)
  bgColor?: string;     // Optional: Background color of the QR code (default: white)
  fgColor?: string;     // Optional: Foreground color of the QR code (default: black)
}

const QRCodeComponent: FC<QRCodeComponentProps> = ({ text, size = 128, bgColor = "#ffffff", fgColor = "#000000" }) => {
    return (
        <QRCodeCanvas
            value={text}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
        />
    );
};

export default QRCodeComponent;

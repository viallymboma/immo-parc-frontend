import { NextResponse } from 'next/server';

import packagePriceService from '../services/pricePackageService';

export async function POST(req: Request) {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
        return NextResponse.json({ error: 'Amount and currency are required' }, { status: 400 });
    }

    try {
        const packagePrice = await packagePriceService.createPackagePrice(amount, currency);
        return NextResponse.json(packagePrice);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    const { id, amount, currency } = await req.json();

    if (!id || !amount || !currency) {
        return NextResponse.json({ error: 'ID, amount, and currency are required' }, { status: 400 });
    }

    try {
        const updatedPackagePrice = await packagePriceService.updatePackagePrice(id, amount, currency);
        return NextResponse.json(updatedPackagePrice);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET() {
    try {
        const packagePrices = await packagePriceService.getAllPackagePrices();
        return NextResponse.json(packagePrices);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

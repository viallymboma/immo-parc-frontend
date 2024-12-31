import { NextResponse } from 'next/server';

import { getWalletByUserId } from '../services/walletService';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const wallet = await getWalletByUserId(userId);
        return NextResponse.json(wallet);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

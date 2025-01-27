import { NextResponse } from 'next/server';

import { createWithdrawal } from '../services/withdrawalService';

// import { createWithdrawal } from '@/services/withdrawalService';

export async function POST(request: Request) {
    try {
        const { userId, walletId, amount, withdrawalType, withdrawalPercentage, withdrawalDuration } = await request.json();

        const feePercentage = withdrawalType === 'regular' ? 10 : 25;
        const confirmDuration = withdrawalType === 'regular' ? 168 : 48; 
        const fee = (amount * feePercentage) / 100;
        const finalAmount = amount - fee;

        // return

        const { transaction, withdrawal } = await createWithdrawal(
            userId,
            walletId,
            finalAmount,
            withdrawalType,
            feePercentage,
            confirmDuration
        );

        return NextResponse.json({ transaction, withdrawal }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
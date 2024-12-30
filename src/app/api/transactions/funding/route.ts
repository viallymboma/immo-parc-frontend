import { NextResponse } from 'next/server';

import transactionService from '../../services/transactionService';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Extract userId from query params

    if (!userId) {
        return NextResponse.json({ error: "L'ID utilisateur est requis" }, { status: 400 });
    }

    try {
        const transactions = await transactionService.getFundingTransactions(userId);
        return NextResponse.json(transactions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, walletId, transactionId, amount } = body;

        // Validate input
        if (!userId || !walletId || !transactionId || !amount) {
            return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 });
        }

        // Create funding transaction
        const transaction = await transactionService.createFundingTransaction({
            userId,
            walletId,
            transactionId,
            amount,
        });

        return NextResponse.json(transaction, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';

import transactionService from '../../services/transactionService';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Extract userId from query params

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const transactions = await transactionService.getEarningTransactions(userId); 
        // Calculate cumulative amount
        const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Return response with transactions and total amount
        return NextResponse.json({
            transactions,
            totalAmount,
        });
        // return NextResponse.json(transactions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

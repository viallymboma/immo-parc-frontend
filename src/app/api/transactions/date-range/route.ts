import { NextResponse } from 'next/server';

import transactionService from '../../services/transactionService';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Extract userId from query params
    const startDate = searchParams.get('startDate'); // Extract startDate from query params
    const endDate = searchParams.get('endDate'); // Extract endDate from query params

    if (!userId || !startDate || !endDate) {
        return NextResponse.json({ error: 'User ID, startDate, and endDate are required' }, { status: 400 });
    }

    try {
        const transactions = await transactionService.getTransactionsByDateRange(userId, startDate, endDate);
        return NextResponse.json(transactions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

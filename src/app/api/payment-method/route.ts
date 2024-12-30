import { NextResponse } from 'next/server';

import paymentService from '../services/payementMethodService';

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const payment = await paymentService.createPayment(data);
        return NextResponse.json(payment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const { id, ...data } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const updatedPayment = await paymentService.updatePayment(id, data);
        return NextResponse.json(updatedPayment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET() {
    try {
        const payments = await paymentService.getAllPayments();
        return NextResponse.json(payments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

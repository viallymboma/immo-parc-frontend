import { NextResponse } from 'next/server';

import { usersService } from '../services/usersService';

export async function POST(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId, packageId } = await req.json();

    try {
        const updatedUser = await usersService.upgradePackage(userId, packageId);
        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

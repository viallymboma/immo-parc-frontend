import { NextResponse } from 'next/server';

import { usersService } from '../../services/usersService';

// POST: Create a super admin
export async function POST(req: Request) {
    const body = await req.json();
    const { phone, password, email } = body;

    try {
        const superAdmin = await usersService.createSuperAdmin(phone, password, email);
        return NextResponse.json(superAdmin, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
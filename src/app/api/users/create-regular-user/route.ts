import { NextResponse } from 'next/server';

import { usersService } from '../../services/usersService';

// POST: Create a regular user
export async function POST(req: Request) {
    const body = await req.json();
    const { phone, password, packageId, parentId, email, firstName, lastName } = body;
    try {
        const user = await usersService.createUser(phone, password, packageId, parentId, email, firstName, lastName);
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';

import { usersService } from '../../services/usersService';

// POST: Create a regular user
export async function POST(req: Request, res: any) {
    const body = await req.json();
    const { phone, password, packageId, parentId, email, firstName, lastName } = body;
    // Check if phone number is provided
    if (!phone) {
        return NextResponse.json({ message: "Phone number is required." }, { status: 400 }); // ;res.status(400).json({ error: 'Phone number is required.' });
    }
    try {
        const user = await usersService.createUser(phone, password, packageId, parentId, email, firstName, lastName);

        // Handle Ce numero existe deja dans le system error
        if ('error' in user) {
            return NextResponse.json({ message: user.error }, { status: 400 });
        }
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
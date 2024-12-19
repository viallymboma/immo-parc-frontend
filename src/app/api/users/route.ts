// app/api/users/route.ts
import { NextResponse } from 'next/server';

import { usersService } from '../services/usersService';

// import { usersService } from '../../../services/usersService';

// GET: Fetch all users
export async function GET() {
  try {
    const users = await usersService.findAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

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

// // POST: Create a super admin
// export async function POST(req: Request) {
//     const body = await req.json();
//     const { phone, password, email } = body;

//     try {
//         const superAdmin = await usersService.createSuperAdmin(phone, password, email);
//         return NextResponse.json(superAdmin, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//     }
// }

// PUT: Update user status
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const { status } = body;

    try {
        const updatedStatus = await usersService.updateStatus(params.id, status);
        return NextResponse.json(updatedStatus);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Delete user by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const result = await usersService.deleteUser(params.id);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

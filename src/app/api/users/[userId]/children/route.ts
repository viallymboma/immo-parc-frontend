import { NextResponse } from 'next/server';

import { getChildrenUpToThirdGeneration } from '@/app/api/services/authService';

// import { getChildrenUpToThirdGeneration } from '@/services/userService';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const userWithChildren = await getChildrenUpToThirdGeneration(userId);

        console.log(userWithChildren, "result desired")
        return NextResponse.json(userWithChildren, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching children:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

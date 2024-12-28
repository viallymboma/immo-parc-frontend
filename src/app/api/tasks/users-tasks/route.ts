import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { verifyJWT } from '@/app/lib/jwt';

import {
  getAllTasks,
  getTasksForUser,
} from '../../services/tasksService';

export const config = {
    runtime: 'edge', // Specify Edge Runtime
};

export async function GET(req: NextRequest) {

    try {

        const token = req.cookies.get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token missing' }, { status: 403 });
        }

        const userInfo: any = await verifyJWT(token);
        console.log(userInfo, "iiiiiiiiiiiiiiiiiiiiiii")

        if (userInfo.role === 'super_admin') {
            const tasks = await getAllTasks ()
            return NextResponse.json(tasks);
        }

        const tasks = await getTasksForUser(userInfo._id);

        return NextResponse.json(tasks);

    } catch (error: any) {

        console.log(error, "the error....")

        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}

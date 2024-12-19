import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { verifyJWT } from '@/app/lib/jwt';

import {
  getAllTasks,
  getTasksForUser,
} from '../../services/tasksService';

// import {
//   getAllTasks,
//   getTasksForUser,
// } from '../services/tasksService';

// import { TasksService } from '../services/tasksService';
// import { tasksService } from '@/services/tasksService'; // Import service
// import { verifyJWT } from '@/utils/jwt'; // Utility to verify JWT

export async function GET(req: NextRequest) {

    try {

        const token = req.cookies.get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token missing' }, { status: 403 });
        }

        const userInfo: any = await verifyJWT(token);

        if (userInfo.role === 'super_admin') {
            const tasks = await getAllTasks ()
            return NextResponse.json(tasks);
        }

        const tasks = await getTasksForUser(userInfo._id);

        return NextResponse.json(tasks);

    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}

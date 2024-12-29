import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { verifyJWT } from '@/app/lib/jwt';

import {
  getAllTasks,
  getTasksForUser,
} from '../../services/tasksService';

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















// import {
//     NextRequest,
//     NextResponse,
//   } from 'next/server';
  
//   import { verifyJWT } from '@/app/lib/jwt';
  
//   import {
//     getAllTasks,
//     getTasksForUser,
//   } from '../../services/tasksService';
  
//   // export const runtime = "edge"
  
//   export async function GET(req: NextRequest) {
  
//       try {
  
//           const token = req.cookies.get('jwt')?.value;
  
//           if (!token) {
//               return NextResponse.json({ error: 'Authentication token missing' }, { status: 403 });
//           }
  
//           const userInfo: any = await verifyJWT(token);
//           console.log(userInfo, "iiiiiiiiiiiiiiiiiiiiiii")
  
//           const url = new URL(req.url);
//           // Get page and limit from query params
//           const page = parseInt(url.searchParams.get('page') || '1', 10);
//           const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  
//           if (userInfo.role === 'super_admin') {
//               const tasks = await getAllTasks ()
//               return NextResponse.json(tasks);
//           }
  
//           const tasks = await getTasksForUser(userInfo._id);
  
//           // return NextResponse.json(tasks);
//           return NextResponse.json({ tasks, page, limit });
  
//       } catch (error: any) {
  
//           console.log(error, "the error....")
  
//           return NextResponse.json({ error: error.message }, { status: 500 });
  
//       }
//   }

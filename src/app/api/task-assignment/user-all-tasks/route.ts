import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { JwtService } from '@nestjs/jwt';

import { TaskAssignmentService } from '../../services/task-assignment.service';

const jwtService = new JwtService({ secret: 'your_jwt_secret' }); // Replace with your actual JWT secret
const taskAssignmentService = new TaskAssignmentService();


export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
        }

        // Verify JWT token
        const userInfo = await jwtService.verifyAsync(token);

        // Fetch tasks for the user
        const userId = userInfo._id; // Assuming `_id` contains the user ID
        const tasks = await taskAssignmentService.getAllTasksForUser(userId);

        // Filter tasks with `status: completed`
        const completedTasks = tasks.filter((task) => task.status === 'completed');

        console.log(completedTasks, "ttttttttttttyyyyyyyyy")

        // Get today's date range
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Sum `priceEarnedPerTaskDone` for the associated `packageId`
        const totalEarnings = completedTasks.reduce((sum, task: any) => {
            console.log(task, task?.task?.packageId?.priceEarnedPerTaskDone, "in a reduce")
            return sum + (task?.task?.packageId?.priceEarnedPerTaskDone || 0);
        }, 0);

        console.log(totalEarnings, "tttttttttttotalEarningsttyyyyyyyyy")

        const todayCompletedTasks = tasks.filter((task) => {
            const taskDate = new Date(task?.endTime!); // Assuming `updatedAt` is used for completion
            return (
                task.status === 'completed' &&
                taskDate >= startOfDay &&
                taskDate <= endOfDay
            );
        });

        // Sum `priceEarnedPerTaskDone` for the associated `packageId`
        const totalEarningsToday = todayCompletedTasks.reduce((sum, task: any) => {
            return sum + (task?.task?.packageId?.priceEarnedPerTaskDone || 0);
        }, 0);

        console.log(totalEarningsToday, "tttttttttttotalEarningsTodayttyyyyyyyyy")

        // Return tasks and total earnings
        return NextResponse.json({
            tasks,
            completedTasks, 
            totalEarnings, 
            todayCompletedTasks, 
            totalEarningsToday, 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch tasks' }, { status: 400 });
    }
}


// export async function GET(req: NextRequest) {
//     try {
//         const token = req.cookies.get('jwt')?.value;

//         if (!token) {
//             return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
//         }

//         // Verify JWT token
//         const userInfo = await jwtService.verifyAsync(token);

//         // Fetch tasks for the user
//         const userId = userInfo._id; // Assuming `_id` contains the user ID
//         const tasks = await taskAssignmentService.getAllTasksForUser(userId);

//         return NextResponse.json({ tasks });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message || 'Failed to fetch tasks' }, { status: 400 });
//     }
// }

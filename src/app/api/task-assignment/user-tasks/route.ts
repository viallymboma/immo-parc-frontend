import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { JwtService } from '@nestjs/jwt';

import { TaskAssignmentService } from '../../services/task-assignment.service';

// export const runtime = "edge"

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
        const tasks = await taskAssignmentService.getTasksForUser(userId);

        return NextResponse.json({ tasks });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch tasks' }, { status: 400 });
    }
}

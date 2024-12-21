import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { TaskAssignmentService } from '../../services/task-assignment.service';

// import { TaskAssignmentService } from '@/services/task-assignment.service'; // Adjust import based on your structure

const taskAssignmentService = new TaskAssignmentService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, taskId } = body;

    if (!userId || !taskId) {
      return NextResponse.json(
        { error: 'Invalid input: userId and taskId are required' },
        { status: 400 }
      );
    }

    const assignment = await taskAssignmentService.assignTaskToUser(
      userId,
      taskId
    );

    return NextResponse.json({
      message: 'Task assigned successfully',
      assignment,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to assign task' },
      { status: 400 }
    );
  }
}

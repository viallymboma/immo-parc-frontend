import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { TaskAssignmentService } from '../../services/task-assignment.service';

const taskAssignmentService = new TaskAssignmentService();

export async function POST(request: NextRequest) {
    try {
        const { taskAssignmentId } = await request.json();

        if (!taskAssignmentId) {
            return NextResponse.json({ error: 'Task assignment ID is required' }, { status: 400 });
        }

        const updatedTaskAssignment = await taskAssignmentService.updateTaskAssignmentStatusToInProgress(taskAssignmentId);

        return NextResponse.json({ message: 'Task status updated successfully', data: updatedTaskAssignment });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

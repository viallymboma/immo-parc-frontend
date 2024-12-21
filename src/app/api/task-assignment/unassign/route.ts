import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { TaskAssignmentService } from '../../services/task-assignment.service';

const taskAssignmentService = new TaskAssignmentService();

export async function DELETE(req: NextRequest) {
    try {
        const { userId, taskId } = await req.json();

        if (!userId || !taskId) {
            return NextResponse.json({ error: 'Invalid input: userId and taskId are required' }, { status: 400 });
        }

        const deletedAssignment = await taskAssignmentService.deleteTaskAssignment(userId, taskId);

        if (!deletedAssignment) {
            return NextResponse.json({ error: 'Task assignment not found or already deleted' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Task assignment deleted successfully',
            deletedAssignment,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete task assignment' },
            { status: 400 }
        );
    }
}

import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { assignTask } from '../../services/tasksService';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const taskId = params.id;
    const assignedTask = await assignTask(taskId, body.userId);
    return NextResponse.json(assignedTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

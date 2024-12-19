import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { completeTask } from '../../services/tasksService';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const taskId = params.id;
    const completedTask = await completeTask(taskId, body.userId);
    return NextResponse.json(completedTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

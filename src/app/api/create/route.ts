import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { createTask } from '../services/tasksService';

// import { tasksService } from '@/services/tasksService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const createdTask = await createTask(body);
    return NextResponse.json(createdTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

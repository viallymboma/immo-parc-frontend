import schedule from 'node-schedule';

import { connectToDatabase } from '@/app/lib/mongodb';

import { TaskAssignment } from '../models';

class TaskSchedulerService {
    static scheduleTaskStatusUpdate(taskAssignmentId: string) {

        // Schedule a job to update the status after 10 hours
        const tenHoursLater = new Date(Date.now() + 10 * 60 * 60 * 1000);

        schedule.scheduleJob(taskAssignmentId, tenHoursLater, async () => {
            await connectToDatabase (); 
            const taskAssignment = await TaskAssignment.findById(taskAssignmentId);
            if (taskAssignment && taskAssignment.status === 'active') {
                taskAssignment.status = 'expired';
                await taskAssignment.save();
                console.log(`TaskAssignment ${taskAssignmentId} status updated to 'expired'.`);
            }
        });
    }
}

export default TaskSchedulerService;

import schedule from 'node-schedule';

import { connectToDatabase } from '@/app/lib/mongodb';

import { TaskAssignment } from '../models';

class TaskSchedulerService {
    static scheduleTaskStatusUpdate(taskAssignmentId: string) {
        try {
            // Schedule a job to update the status after 10 hours
            const tenHoursLater = new Date(Date.now() + 10 * 60 * 60 * 1000);

            schedule.scheduleJob(taskAssignmentId, tenHoursLater, async () => {
                try {
                    console.log(`Scheduled job started for TaskAssignment ID: ${taskAssignmentId}`);
                    await connectToDatabase();

                    const taskAssignment = await TaskAssignment.findById(taskAssignmentId);
                    if (!taskAssignment) {
                        console.error(`TaskAssignment with ID ${taskAssignmentId} not found.`);
                        return;
                    }

                    if (taskAssignment.status === 'active') {
                        taskAssignment.status = 'expired';
                        await taskAssignment.save();
                        console.log(`TaskAssignment ${taskAssignmentId} status updated to 'expired'.`);
                    } else {
                        console.log(`TaskAssignment ${taskAssignmentId} status is not 'active'; no update performed.`);
                    }
                } catch (error: any) {
                    console.error(`Error in scheduled task for TaskAssignment ID ${taskAssignmentId}:`, error.message);
                }
            });

            console.log(`Scheduled task created for TaskAssignment ID: ${taskAssignmentId}, to run at ${tenHoursLater}`);
        } catch (error: any) {
            console.error(`Error scheduling task for TaskAssignment ID ${taskAssignmentId}:`, error.message);
            throw new Error(`Error scheduling task: ${error.message}`);
        }
    }
}

export default TaskSchedulerService;





























// import schedule from 'node-schedule';

// import { connectToDatabase } from '@/app/lib/mongodb';

// import { TaskAssignment } from '../models';

// class TaskSchedulerService {
//     static scheduleTaskStatusUpdate(taskAssignmentId: string) {

//         // Schedule a job to update the status after 10 hours
//         const tenHoursLater = new Date(Date.now() + 10 * 60 * 60 * 1000);

//         schedule.scheduleJob(taskAssignmentId, tenHoursLater, async () => {
//             await connectToDatabase (); 
//             const taskAssignment = await TaskAssignment.findById(taskAssignmentId);
//             if (taskAssignment && taskAssignment.status === 'active') {
//                 taskAssignment.status = 'expired';
//                 await taskAssignment.save();
//                 console.log(`TaskAssignment ${taskAssignmentId} status updated to 'expired'.`);
//             }
//         });
//     }
// }

// export default TaskSchedulerService;

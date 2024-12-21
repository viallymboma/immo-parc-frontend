// import { TaskAssignment, TaskAssignmentDocument } from '@/models/task-assignment.schema';
// import { Task } from '@/models/task.entity';
// import { UsersDocument } from '@/models/user.entity';
import mongoose, { Model } from 'mongoose';

import { ITask } from '../models/Task';
import { ITaskAssignment } from '../models/TaskAssignment';
import { IUser } from '../models/User';

export class TaskAssignmentService {
  private taskAssignmentModel: Model<ITaskAssignment>;
  private userModel: Model<IUser>;
  private taskModel: Model<ITask>;

  constructor() {
    this.taskAssignmentModel =
      mongoose.models.TaskAssignment || mongoose.model<ITaskAssignment>('TaskAssignment');
    this.userModel = mongoose.models.User || mongoose.model<IUser>('User');
    this.taskModel = mongoose.models.Task || mongoose.model<ITask>('Task');
  }

  async getTasksForUser(userId: string): Promise<ITaskAssignment[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const taskAssignments = await this.taskAssignmentModel
      .find({
        user: userId,
        createdAt: { $gte: startOfDay, $lte: endOfDay }, // Filter by today's date
      })
      .populate('task')
      .populate({
        path: 'packageId',
      });

    return taskAssignments;
  }

  async assignTaskToUser(userId: string, taskId: string): Promise<ITaskAssignment> {
    const user: any = await this.userModel.findById(userId).populate('package');
    if (!user || !user.package) {
      throw new Error('User or package not found');
    }

    const { numberOfTaskPerDay } = user.package;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const tasksAssignedToday = await this.taskAssignmentModel.countDocuments({
      user: user._id,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (tasksAssignedToday >= numberOfTaskPerDay) {
      throw new Error(
        `Task limit reached. You can only select ${numberOfTaskPerDay} tasks per day.`
      );
    }

    const task = await this.taskModel.findById(taskId);
    if (!task || task.taskStatus !== 'unassigned') {
      throw new Error('Task not available for assignment.');
    }

    const assignment = new this.taskAssignmentModel({ user: user._id, task: task._id });
    await assignment.save();

    task.taskStatus = 'assigned';
    await task.save();

    user.selectedTasksCount += 1;
    await user.save();

    return assignment;
  }
}


// export const  getTasksForUser = async (userId: string): Promise<ITaskAssignment[]> => {
//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   const taskAssignments = await TaskAssignment
//     .find({
//       user: userId,
//       createdAt: { $gte: startOfDay, $lte: endOfDay }, // Filter by today's date
//     })
//     .populate('task')
//     .populate({
//       path: 'packageId',
//     });

//   return taskAssignments;
// }


// export const assignTaskToUser = async (userId: string, taskId: string): Promise<ITaskAssignment> => {
//   const user: any = await User.findById(userId).populate('package');
//   if (!user || !user.package) {
//     throw new Error('User or package not found');
//   }

//   const { numberOfTaskPerDay } = user.package;

//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   const tasksAssignedToday = await this.taskAssignmentModel.countDocuments({
//     user: user._id,
//     createdAt: { $gte: startOfDay, $lte: endOfDay },
//   });

//   if (tasksAssignedToday >= numberOfTaskPerDay) {
//     throw new Error(
//       `Task limit reached. You can only select ${numberOfTaskPerDay} tasks per day.`
//     );
//   }

//   const task = await this.taskModel.findById(taskId);
//   if (!task || task.taskStatus !== 'unassigned') {
//     throw new Error('Task not available for assignment.');
//   }

//   const assignment = new this.taskAssignmentModel({ user: user._id, task: task._id });
//   await assignment.save();

//   task.taskStatus = 'assigned';
//   await task.save();

//   user.selectedTasksCount += 1;
//   await user.save();

//   return assignment;
// }
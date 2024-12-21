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
      .populate({
        path: 'task', 
        populate: 'packageId'
      })
      .populate({
        path: 'user',
        model: 'User'
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

    // Check if the task has already been assigned to the user today
    const existingAssignment = await this.taskAssignmentModel.findOne({
      user: user._id,
      task: taskId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingAssignment) {
      throw new Error('This task has already been assigned to you for today.');
    }

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

    // REMOVING THE BELOW CODE BECAUSE IT EVERYONE WILL USE THE SAME TASK
    // SO WE CANNOT CHANGE STATUS HERE ELSE IT WILL PREVENT OTHERS FROM SELECTING THE TASK
    // if (!task || task.taskStatus !== 'unassigned') {
    //   throw new Error('Task not available for assignment.');
    // }

    const assignment = new this.taskAssignmentModel({ user: user._id, task: task?._id });
    await assignment.save();

    // task.taskStatus = 'assigned';
    // await task.save();

    user.selectedTasksCount += 1;
    await user.save();

    return assignment;
  }

  async deleteTaskAssignment(userId: string, taskId: string): Promise<ITaskAssignment | null> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
    // Find the task assignment
    const taskAssignment = await this.taskAssignmentModel.findOneAndDelete({
      user: userId,
      task: taskId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
  
    if (taskAssignment) {
      // Update the task status back to 'unassigned'
      const task = await this.taskModel.findById(taskAssignment.task);
      if (task) {
        task.taskStatus = 'unassigned';
        await task.save();
      }
  
      // Decrement the selectedTasksCount for the user
      const user = await this.userModel.findById(userId);
      if (user) {
        user.selectedTasksCount = Math.max(user?.selectedTasksCount! - 1, 0);
        await user.save();
      }
    }
  
    return taskAssignment;
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
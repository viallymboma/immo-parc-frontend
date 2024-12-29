// import { TaskAssignment, TaskAssignmentDocument } from '@/models/task-assignment.schema';
// import { Task } from '@/models/task.entity';
// import { UsersDocument } from '@/models/user.entity';
import mongoose, { Model } from 'mongoose';

// import { Wallet } from '../models';
import { ITask } from '../models/Task';
import { ITaskAssignment } from '../models/TaskAssignment';
import { IUser } from '../models/User';
import TaskSchedulerService from './task-assignment-schedul';

export class TaskAssignmentService {
  private taskAssignmentModel: Model<ITaskAssignment>;
  private userModel: Model<IUser>;
  private taskModel: Model<ITask>;

  constructor() {
    this.taskAssignmentModel = mongoose.models.TaskAssignment || mongoose.model<ITaskAssignment>('TaskAssignment');
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

  // WHEN I WANT TO PAGINATE
  // async getTasksForUser(
  //   userId: string,
  //   page: number = 1,
  //   limit: number = 10
  // ): Promise<ITaskAssignment[]> {
  //   const today = new Date();
  //   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  //   const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
  //   const taskAssignments = await this.taskAssignmentModel
  //     .find({
  //       user: userId,
  //       createdAt: { $gte: startOfDay, $lte: endOfDay },
  //     })
  //     .populate({
  //       path: 'task',
  //       populate: 'packageId',
  //     })
  //     .populate({
  //       path: 'user',
  //       model: 'User',
  //     })
  //     .skip((page - 1) * limit)
  //     .limit(limit); // Add pagination
  
  //   return taskAssignments;
  // }
  

  async getAllTasksForUser(userId: string): Promise<ITaskAssignment[]> {
    // const today = new Date();
    // const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    // const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const taskAssignments = await this.taskAssignmentModel
      .find({
        user: userId,
        // createdAt: { $gte: startOfDay, $lte: endOfDay }, // Filter by today's date
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
      throw new Error('Utilisateur ou package introuvable');
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
      throw new Error("Cette tâche vous a déjà été confiée pour aujourd'hui");
    }

    const tasksAssignedToday = await this.taskAssignmentModel.countDocuments({
      user: user._id,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (tasksAssignedToday >= numberOfTaskPerDay) {
      throw new Error(
        `Limite de tâches atteinte. Vous ne pouvez sélectionner que ${numberOfTaskPerDay} tâches par jour.`
      );
    }

    const task = await this.taskModel.findById(taskId);

    // REMOVING THE BELOW CODE BECAUSE IT EVERYONE WILL USE THE SAME TASK
    // SO WE CANNOT CHANGE STATUS HERE ELSE IT WILL PREVENT OTHERS FROM SELECTING THE TASK
    // if (!task || task.taskStatus !== 'unassigned') {
    //   throw new Error('Task not available for assignment.');
    // }

    const assignment: any = new this.taskAssignmentModel({ user: user._id, task: task?._id });
    await assignment.save();

    // Schedule status update for this assignment
    TaskSchedulerService.scheduleTaskStatusUpdate(assignment?._id?.toString());

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

  async updateTaskAssignmentStatusToInProgress(taskAssignmentId: string): Promise<ITaskAssignment> {
    const taskAssignment = await this.taskAssignmentModel.findById(taskAssignmentId);
    if (!taskAssignment) {
      throw new Error('Affectation de tâche introuvable');
    }
    if (taskAssignment.status === 'in-progress') {
      return taskAssignment; // No need to update if already in progress
    }
    taskAssignment.status = 'in-progress';
    taskAssignment.startTime = `${new Date()}`; // Set the start time
    await taskAssignment.save();

    return taskAssignment;
  }

  /**
   * Updates the picture and status of a TaskAssignment.
   * @param taskAssignmentId - ID of the task assignment to update
   * @param picture - Object containing Cloudinary image details (name, public_id, url)
   * @returns Updated task assignment
   */
  async updateTaskAssignmentWithPicture(
    taskAssignmentId: string,
    picture: { name: string; public_id: string; url: string }
  ): Promise<ITaskAssignment> {
    // const taskAssignment = await this.taskAssignmentModel.findById(taskAssignmentId); 

    const taskAssignment = await this.taskAssignmentModel
    .findById(taskAssignmentId)
    .populate({
      path: 'task', // Assuming 'task' is the reference field in TaskAssignment
      populate: {
        path: 'packageId', // Assuming 'package' is the reference field in Task
        model: 'Package', // The model name for packages
      },
    });

    console.log(taskAssignment, "ffddssaakklljj"); 

    if (!taskAssignment) {
      console.log('Task assignment not found');
      throw new Error('Task assignment not found');
    }

    // Get priceEarnedPerTaskDone from the populated package
    const task: any = taskAssignment.task;
    console.log(task, "task is here..........")
    if (!task || !task.packageId) {
      console.log('Task or Package not found');
      throw new Error('Task or Package not found');
    }

    const rewardAmount = task.packageId.priceEarnedPerTaskDone;

    console.log(rewardAmount, "there is a reward==============?")

    // Update the picture and mark the status as 'completed'
    taskAssignment.picture = picture;
    taskAssignment.status = 'completed';
    taskAssignment.endTime = `${new Date()}`; // Set the end time
    await taskAssignment.save();

    // Update user's wallet balance
    // const userId = taskAssignment.user;
    // const wallet = await Wallet.findOne({ user: userId });

    // if (!wallet) {
    //   console.log('Wallet not found for user');
    //   throw new Error('Wallet not found for user');
    // }

    // wallet.balance += rewardAmount;
    // await wallet.save();

    return taskAssignment;
  }
}


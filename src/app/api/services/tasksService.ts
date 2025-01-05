import { connectToDatabase } from '@/app/lib/mongodb';

import { User } from '../models';
import Package from '../models/Package';
import Task from '../models/Task';

export const getTasksForUser = async (userId: string) => {
    await connectToDatabase (); 
    // Fetch the user and their subscribed package
    const user = await User
        .findById(userId)
        .populate('package', 'listOfTasks')
        .exec();

    if (!user || !user.package) {
        throw new Error('User or user package not found');
    }

  // Fetch tasks associated with the package and populate the packageId field
    const packageWithTasks = await Package
        .findById(user.package._id)
        .populate({
            path: 'listOfTasks',
            populate: {
                path: 'packageId', // Populate the packageId for each task
            },
        })
        .exec();

    if (!packageWithTasks) {
        throw new Error('Package not found or has no tasks');
    }

    // Return the list of tasks
    return packageWithTasks.listOfTasks;
}

export const getAllTasks = async () => {
    await connectToDatabase (); 
  return await Task.find().exec(); // Fetch all tasks
}

export const createTask = async (taskData: any) => {
    const { packageId, ...taskDetails } = taskData;

    await connectToDatabase (); 

    // Validate packageId
    const pkg = await Package.findById(packageId);
    if (!pkg) {
        throw new Error('Invalid package ID');
    }

    // Create the task
    const task = new Package({ ...taskDetails, packageId });
    const createdTask = await task.save();

    // Update the package to include the new task ID in listOfTasks
    pkg.listOfTasks.push(createdTask._id);
    await pkg.save();

    return createdTask;
}

export const assignTask = async (taskId: string, userId: string) => {
    await connectToDatabase (); 
    const task = await Task.findById(taskId);
    const user = await Task.findById(userId);

    if (!task) throw new Error('Task not found');
    if (!user) throw new Error('User not found');

    task.assignedTo.push(user._id);
    task.status = 'assigned';

    await task.save();
    return task;
}

export const completeTask = async (taskId: string, userId: string) => {
    await connectToDatabase (); 
    const task = await Task.findById(taskId);
    const user = await User.findById(userId);

    if (!task) throw new Error('Task not found');
    if (!user) throw new Error('User not found');
    if (!task.assignedTo.includes(user._id)) {
        throw new Error('Task is not assigned to this user');
    }

    task.status = 'completed';
    return task.save();
}

export const attachImageToTask = async (taskId: string, imageUrl: string) => {
    await connectToDatabase (); 
    const task = await Task.findById(taskId);
    if (!task) throw new Error('Task not found');

    task.imageUrl = imageUrl;
    return task.save();
}
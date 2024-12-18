import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

// Define the TypeScript interface for TaskAssignment
export interface ITaskAssignment extends Document {
  user: Types.ObjectId; // Reference to Users
  task: Types.ObjectId; // Reference to Task
  status: 'pending' | 'in-progress' | 'completed'; // Task status
}

// Define the Mongoose schema for TaskAssignment
const TaskAssignmentSchema = new Schema<ITaskAssignment>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Create or retrieve the TaskAssignment model
const TaskAssignment = models.TaskAssignment || model<ITaskAssignment>('TaskAssignment', TaskAssignmentSchema);

export default TaskAssignment;

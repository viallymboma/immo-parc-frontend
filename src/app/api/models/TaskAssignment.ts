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
  picture?: any;
  startTime?: string;
  endTime?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'expired'; // Task status
}

// Define the Mongoose schema for TaskAssignment
const TaskAssignmentSchema = new Schema<ITaskAssignment>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
        picture: {
          name: { type: String, required: false }, 
          public_id: { type: String, required: false }, 
          url: { type: String, required: false }, 
        },
        startTime: { type: String, required: false }, 
        endTime: { type: String, required: false }, 
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', "expired"],
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

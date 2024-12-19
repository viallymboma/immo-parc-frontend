import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

export interface ITask extends Document {
    taskTitle: string;
    taskMission: string;
    taskShortInstruction: string;
    taskDescription: string;
    taskLink: string;
    taskCategory: 'video' | 'landing';
    imageUrl?: string;
    taskStatus: 'unassigned' | 'assigned' | 'completed' | 'overdue';
    assignedTo: Types.ObjectId[];
    completedBy: Types.ObjectId[];
    dueDate?: Date;
    packageId: Types.ObjectId;
}

// Define the schema
const TaskSchema = new Schema<ITask>(
    {
        taskTitle: { type: String, required: true },
        taskMission: { type: String, required: true },
        taskShortInstruction: { type: String, required: true },
        taskDescription: { type: String, required: true },
        taskLink: { type: String, required: true },
        taskCategory: {
            type: String,
            enum: ['video', 'landing'],
            default: 'video',
        },
        imageUrl: { type: String, required: false },
        taskStatus: {
            type: String,
            enum: ['unassigned', 'assigned', 'completed', 'overdue'],
            default: 'unassigned',
        },
        assignedTo: { type: [Types.ObjectId], ref: 'User', default: [] },
        completedBy: { type: [Types.ObjectId], ref: 'User', default: [] },
        dueDate: { type: Date, required: false },
        packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Export the model
const Task = models.Task || model<ITask>('Task', TaskSchema);

export default Task;

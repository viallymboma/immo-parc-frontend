import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

export interface IPackage extends Document {
    name: string;
    level: number;
    investment: number;
    numberOfTaskPerDay: number;
    priceEarnedPerTaskDone: number;
    priceEarnedForAllTaskDonePerDay: number;
    priceEarnedForAllTaskDonePerMonth: number;
    priceEarnedForAllTaskDonePerYear: number;
    description?: string;
    listOfTasks: Types.ObjectId[];
    options?: Map<string, string>;
}

// Define the schema
const PackageSchema = new Schema<IPackage>(
    {
        name: { type: String, required: true },
        level: { type: Number, required: true, unique: true, default: 0 },
        investment: { type: Number, required: true },
        numberOfTaskPerDay: { type: Number, required: true },
        priceEarnedPerTaskDone: { type: Number, required: true },
        priceEarnedForAllTaskDonePerDay: { type: Number, required: true },
        priceEarnedForAllTaskDonePerMonth: { type: Number, required: true },
        priceEarnedForAllTaskDonePerYear: { type: Number, required: true },
        description: { type: String, required: false },
        listOfTasks: { type: [Types.ObjectId], ref: 'Task', default: [] },
        options: { type: Map, of: String, required: false },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Export the model
const Package = models.Package || model<IPackage>('Package', PackageSchema);

export default Package;

import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

// Define the TypeScript interface for Transactions
export interface ITransactions extends Document {
  user: Types.ObjectId; // Reference to User
  type: 'funding' | 'withdrawal' | 'earning'; // Type of transaction
  amount: number; // Transaction amount
  status: 'pending' | 'completed' | 'rejected'; // Status of the transaction
}

// Define the Mongoose schema for Transactions
const TransactionsSchema = new Schema<ITransactions>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: {
            type: String,
            enum: ['funding', 'withdrawal', 'earning'],
            required: true,
        },
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'completed', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Create or retrieve the Transactions model
const Transactions = models.Transactions || model<ITransactions>('Transactions', TransactionsSchema);

export default Transactions;

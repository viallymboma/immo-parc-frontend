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
  triggeredBy?: Types.ObjectId;
  walletId: Types.ObjectId; 
  transactionId: string; 
  type: 'funding' | 'withdrawal' | 'earning' | 'investing' | 'bonus'; // Type of transaction
  amount: number; // Transaction amount
  status: 'pending' | 'completed' | 'rejected'; // Status of the transaction
  withdrawalId?: Types.ObjectId;
}

// Define the Mongoose schema for Transactions
const TransactionsSchema = new Schema<ITransactions>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
        walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
        transactionId: { type: String, required: false }, // Mobile Money transaction ID
        type: {
            type: String,
            enum: ['funding', 'withdrawal', 'earning', 'investing', 'bonus'],
            required: true,
        },
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'completed', 'rejected'],
            default: 'pending',
        },
        triggeredBy: { type: Schema.Types.ObjectId, ref: 'User', required: false }, 
        withdrawalId: { type: Schema.Types.ObjectId, ref: 'Withdrawal', required: false }, 
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Create or retrieve the Transactions model
const Transactions = models.Transactions || model<ITransactions>('Transactions', TransactionsSchema);

export default Transactions;

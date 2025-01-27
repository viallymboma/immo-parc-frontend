import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

export interface IWithdrawal extends Document {
    user: Types.ObjectId;
    walletId: Types.ObjectId;
    transactionId: Types.ObjectId;
    withdrawalType: string;
    withdrawalPercentage: number;
    withdrawalDuration: number;
    status: 'pending' | 'completed' | 'rejected';
}

const WithdrawalSchema = new Schema<IWithdrawal>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
        transactionId: { type: Schema.Types.ObjectId, ref: 'Transactions', required: true },
        withdrawalType: { 
            type: String, 
            enum: ['express', 'regular'],
            required: true 
        },
        withdrawalPercentage: { type: Number, required: true },
        withdrawalDuration: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'completed', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

const Withdrawal = models.Withdrawal || model<IWithdrawal>('Withdrawal', WithdrawalSchema);

export default Withdrawal;
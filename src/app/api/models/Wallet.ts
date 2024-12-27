import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

export interface IWallet extends Document {
  user: Types.ObjectId;
  balance: number;
}

const WalletSchema = new Schema<IWallet>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Wallet = models.Wallet || model<IWallet>('Wallet', WalletSchema);

export default Wallet;

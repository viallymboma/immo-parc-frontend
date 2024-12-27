// import Wallet from '@/models/Wallet';
// import Transactions from '@/models/Transactions';

import {
  Transactions,
  Wallet,
} from '../models';

// import Wallet from '../models/Wallet';

export const getWalletByUserId = async (userId: string) => {
  return await Wallet.findOne({ user: userId });
};

export const createOrUpdateWallet = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOneAndUpdate(
    { user: userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  );
  return wallet;
};

export const createTransaction = async (transactionData: any) => {
  return await Transactions.create(transactionData);
};

export const updateTransactionStatus = async (transactionId: string, status: 'pending' | 'completed' | 'failed') => {
  return await Transactions.findByIdAndUpdate(transactionId, { status }, { new: true });
};

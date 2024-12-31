// import Wallet from '@/models/Wallet';
// import Transactions from '@/models/Transactions';

import { connectToDatabase } from '@/app/lib/mongodb';

import {
  Transactions,
  Wallet,
} from '../models';

// import Wallet from '../models/Wallet';

export const getWalletByUserId = async (userId: string) => {
  await connectToDatabase (); 
  return await Wallet.findOne({ user: userId }).populate({
    path: "user", 
    model: "User"
  });
};

export const createOrUpdateWallet = async (userId: string, amount: number) => {
  await connectToDatabase (); 
  const wallet = await Wallet.findOneAndUpdate(
    { user: userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  ).populate({
    path: "user", 
    model: "User"
  });
  return wallet;
};

export const createTransaction = async (transactionData: any) => {
  await connectToDatabase (); 
  return await Transactions.create(transactionData);
};

export const updateTransactionStatus = async (transactionId: string, status: 'pending' | 'completed' | 'failed') => {
  await connectToDatabase (); 
  return await Transactions.findByIdAndUpdate(transactionId, { status }, { new: true });
};

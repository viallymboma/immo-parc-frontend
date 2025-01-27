import { connectToDatabase } from '@/app/lib/mongodb';

import {
  Transactions,
  Wallet,
  Withdrawal,
} from '../models';

export const createWithdrawal = async (
    userId: string,
    walletId: string,
    amount: number,
    withdrawalType: string,
    withdrawalPercentage: number,
    withdrawalDuration: number
) => {
    await connectToDatabase (); 

    console.log(userId,
        walletId,
        amount,
        withdrawalType,
        withdrawalPercentage,
        withdrawalDuration, "in hooooooooooooook")
    // Check if the wallet exists and belongs to the user
    const wallet = await Wallet.findOne({ _id: walletId, user: userId });
    if (!wallet) {
        throw new Error("Portefeuille introuvable ou n'appartient pas à l'utilisateur. Wallet not found or does not belong to the user.");
    }

    // Check if the wallet has sufficient balance
    if (wallet.balance < amount) {
        throw new Error('Insufficient balance / Solde insuffisant');
    }

    // Create a new transaction for the withdrawal
    const transaction = await Transactions.create({
        user: userId,
        walletId: walletId,
        type: 'withdrawal',
        amount: amount,
        status: 'pending',
    });

    // Create a new withdrawal record
    const withdrawal = await Withdrawal.create({
        user: userId,
        walletId: walletId,
        transactionId: transaction._id,
        withdrawalType: withdrawalType,
        withdrawalPercentage: withdrawalPercentage,
        withdrawalDuration: withdrawalDuration,
        status: 'pending',
    });

    // Update the transaction with the withdrawal ID
    transaction.withdrawalId = withdrawal._id;
    await transaction.save();

    // Update the wallet balance
    wallet.balance -= amount;
    await wallet.save();

    return { transaction, withdrawal };
};
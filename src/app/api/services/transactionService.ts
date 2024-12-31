import { Wallet } from '../models';
import Transactions
  from '../models/Transactions'; // Adjust the path to the Transactions model

export class TransactionService {
    /**
     * Get all transactions of type "earning" for a specific user
     * @param userId - The ID of the logged-in user
     */
    async getEarningTransactions(userId: string) {
        return Transactions.find({ user: userId, type: 'earning' }).populate({
            path: "user", 
            model: "User"
        }).populate({
            path: "walletId", 
            model: "Wallet"
        });
    }

    /**
     * Get all transactions of type "funding" for a specific user
     * @param userId - The ID of the logged-in user
     */
    async getFundingTransactions(userId: string) {
        return Transactions.find({ user: userId, type: 'funding' }).populate({
            path: "user", 
            model: "User"
        }).populate({
            path: "walletId", 
            model: "Wallet"
        });
    }

    /**
     * Get all transactions of type "withdrawal" for a specific user
     * @param userId - The ID of the logged-in user
     */
    async getWithdrawalTransactions(userId: string) {
        return Transactions.find({ user: userId, type: 'withdrawal' }).populate({
            path: "user", 
            model: "User"
        }).populate({
            path: "walletId", 
            model: "Wallet"
        });
    }

    /**
     * Get all transactions for a specific date range and user
     * @param userId - The ID of the user
     * @param startDate - Start date of the range
     * @param endDate - End date of the range
     */
    async getTransactionsByDateRange(userId: string, startDate: string, endDate: string) {
        return Transactions.find({
            user: userId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).populate({
            path: "user", 
            model: "User"
        }).populate({
            path: "walletId", 
            model: "Wallet"
        });
    }

    /**
     * Create a funding transaction
     * @param userId - ID of the user
     * @param walletId - ID of the wallet
     * @param transactionId - Mobile Money transaction ID
     * @param amount - Amount being funded
     */
    async createFundingTransaction({ userId, walletId, transactionId, amount }: { userId: string, walletId: string, transactionId: string, amount: number, }) {
        // Ensure wallet exists
        const wallet = await Wallet.findById(walletId);
        if (!wallet) {
            throw new Error('Portefeuille introuvable');
        }

        // Check if transaction ID already exists
        const existingTransaction = await Transactions.findOne({ transactionId });
        if (existingTransaction) {
            throw new Error('Vous ne pouvez pas utiliser le même identifiant de transaction deux fois'); // Duplicate transaction ID
        }

        // Create transaction
        const transaction = new Transactions({
            user: userId,
            walletId,
            transactionId,
            amount,
            type: 'funding',
        });

        // Save transaction
        await transaction.save();

        // Update wallet balance
        wallet.balance += amount;
        await wallet.save();

        return transaction;
    }
}

export default new TransactionService();

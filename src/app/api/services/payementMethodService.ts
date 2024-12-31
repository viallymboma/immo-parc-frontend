import { connectToDatabase } from '@/app/lib/mongodb';

import Payment, { IPayment } from '../models/PayementMethod';

// import Payment from '../models/Payment';

export class PaymentService {
    // Create a new payment
    async createPayment(data: Partial<IPayment>) {
        await connectToDatabase (); 
        return Payment.create(data);
    }

    // Update an existing payment
    async updatePayment(id: string, data: Partial<IPayment>) {
        await connectToDatabase (); 
        return Payment.findByIdAndUpdate(id, data, { new: true });
    }

    // Get all payments
    async getAllPayments() {
        await connectToDatabase (); 
        return Payment.find({});
    }
}

export default new PaymentService();

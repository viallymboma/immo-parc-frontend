import Payment, { IPayment } from '../models/PayementMethod';

// import Payment from '../models/Payment';

export class PaymentService {
    // Create a new payment
    async createPayment(data: Partial<IPayment>) {
        return Payment.create(data);
    }

    // Update an existing payment
    async updatePayment(id: string, data: Partial<IPayment>) {
        return Payment.findByIdAndUpdate(id, data, { new: true });
    }

    // Get all payments
    async getAllPayments() {
        return Payment.find({});
    }
}

export default new PaymentService();

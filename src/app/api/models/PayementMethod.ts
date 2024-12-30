import {
  Document,
  model,
  models,
  Schema,
} from 'mongoose';

export interface IPayment extends Document {
    operator: 'Orange' | 'MTN';
    service: 'Orange Money' | 'MTN Mobile Money';
    abbreviation: 'OM' | 'MoMo';
    balance?: number;
    phone_number?: number;
    image?: 'OrangeMoneySvgIcon' | 'MomoSvgIcon';
    primaryColor: '#ff7903' | '#facd0d';
    secondaryColor: '#000' | '#005074';
}

const PaymentSchema = new Schema<IPayment>(
    {
        operator: {
            type: String,
            enum: ['Orange', 'MTN'],
            required: true,
        },
        service: {
            type: String,
            enum: ['Orange Money', 'MTN Mobile Money'],
            required: true,
        },
        abbreviation: {
            type: String,
            enum: ['OM', 'MoMo'],
            required: true,
        },
        balance: { type: Number },
        phone_number: { type: Number },
        image: {
            type: String,
            enum: ['OrangeMoneySvgIcon', 'MomoSvgIcon'],
        },
        primaryColor: {
            type: String,
            enum: ['#ff7903', '#facd0d'],
        },
        secondaryColor: {
            type: String,
            enum: ['#000', '#005074'],
        },
    },
    { timestamps: true }
);

const Payment = models.Payment || model<IPayment>('Payment', PaymentSchema);
export default Payment;

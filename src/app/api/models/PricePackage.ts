import {
  Document,
  model,
  models,
  Schema,
} from 'mongoose';

export interface IPackagePrice extends Document {
    amount: number;
    currency: 'xaf' | 'naira' | 'ghana cedis' | 'usd' | 'euro';
}

const PackagePriceSchema = new Schema<IPackagePrice>(
    {
        amount: { type: Number, required: true },
        currency: {
            type: String,
            enum: ['xaf', 'naira', 'ghana cedis', 'usd', 'euro'],
            required: true,
        },
    },
    { timestamps: true }
);

const PackagePrice = models.PackagePrice || model<IPackagePrice>('PackagePrice', PackagePriceSchema);
export default PackagePrice;

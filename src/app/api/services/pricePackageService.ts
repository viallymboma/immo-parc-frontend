// import PackagePrice from '../models/PackagePrice';

import PackagePrice from '../models/PricePackage';

export class PackagePriceService {
    // Create a new package price
    async createPackagePrice(amount: number, currency: string) {
        return PackagePrice.create({ amount, currency });
    }

    // Update an existing package price
    async updatePackagePrice(id: string, amount: number, currency: string) {
        return PackagePrice.findByIdAndUpdate(id, { amount, currency }, { new: true });
    }

    // Get all package prices
    async getAllPackagePrices() {
        return PackagePrice.find({});
    }
}

export default new PackagePriceService();

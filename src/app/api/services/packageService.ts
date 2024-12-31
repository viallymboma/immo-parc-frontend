import { Model } from 'mongoose';

import { connectToDatabase } from '@/app/lib/mongodb';

import { IPackage } from '../models/Package';

export class PackageService {

    private packageModel: Model<IPackage>;

    constructor(packageModel: Model<IPackage>) {
        this.packageModel = packageModel;
    }

    async createPackage(data: any): Promise<IPackage> {
        console.log(data, 'Creating a package in service');
        await connectToDatabase (); 
        const pkg = new this.packageModel(data);
        return await pkg.save();
    }

    async findAllPackages(): Promise<IPackage[]> {
        await connectToDatabase (); 
        return await this.packageModel.find().exec();
    }

    async updatePackage(packageId: string, data: Partial<IPackage>): Promise<IPackage | null> {
        await connectToDatabase (); 
        return await this.packageModel.findByIdAndUpdate(packageId, data, { new: true }).exec();
    }

    async deletePackage(packageId: string): Promise<void> {
        await connectToDatabase (); 
        await this.packageModel.findByIdAndDelete(packageId).exec();
    }

    async findPackageById(packageId: string): Promise<IPackage | null> {
        await connectToDatabase (); 
        return await this.packageModel.findById(packageId).exec();
    }
}

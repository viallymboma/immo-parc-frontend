import { Model } from 'mongoose';

import { connectToDatabase } from '@/app/lib/mongodb';

import { IPackage } from '../models/Package';

export class PackageService {
    private packageModel: Model<IPackage>;

    constructor(packageModel: Model<IPackage>) {
        this.packageModel = packageModel;
    }

    async createPackage(data: any): Promise<IPackage> {
        try {
            console.log(data, 'Creating a package in service');
            await connectToDatabase();
            const pkg = new this.packageModel(data);
            return await pkg.save();
        } catch (error: any) {
            console.log(error.message, error)
            throw new Error(`Error creating package: ${error.message}`);
        }
    }

    async findAllPackages(): Promise<IPackage[]> {
        try {
            await connectToDatabase();
            return await this.packageModel.find().exec();
        } catch (error: any) {
            console.log(error.message, error)
            throw new Error(`Error fetching all packages: ${error.message}`);
        }
    }

    async updatePackage(packageId: string, data: Partial<IPackage>): Promise<IPackage | null> {
        try {
            await connectToDatabase();
            const updatedPackage = await this.packageModel.findByIdAndUpdate(packageId, data, { new: true }).exec();
            if (!updatedPackage) {
                throw new Error(`Package with ID ${packageId} not found`);
            }
            return updatedPackage;
        } catch (error: any) {
            console.log(error.message, error)
            throw new Error(`Error updating package: ${error.message}`);
        }
    }

    async deletePackage(packageId: string): Promise<void> {
        try {
            await connectToDatabase();
            const deletedPackage = await this.packageModel.findByIdAndDelete(packageId).exec();
            if (!deletedPackage) {
                throw new Error(`Package with ID ${packageId} not found`);
            }
        } catch (error: any) {
            console.log(error.message, error)
            throw new Error(`Error deleting package: ${error.message}`);
        }
    }

    async findPackageById(packageId: string): Promise<IPackage | null> {
        try {
            await connectToDatabase();
            const pkg = await this.packageModel.findById(packageId).exec();
            if (!pkg) {
                throw new Error(`Package with ID ${packageId} not found`);
            }
            return pkg;
        } catch (error: any) {
            console.log(error.message, error)
            throw new Error(`Error finding package: ${error.message}`);
        }
    }
}



























// import { Model } from 'mongoose';

// import { connectToDatabase } from '@/app/lib/mongodb';

// import { IPackage } from '../models/Package';

// export class PackageService {

//     private packageModel: Model<IPackage>;

//     constructor(packageModel: Model<IPackage>) {
//         this.packageModel = packageModel;
//     }

//     async createPackage(data: any): Promise<IPackage> {
//         console.log(data, 'Creating a package in service');
//         await connectToDatabase (); 
//         const pkg = new this.packageModel(data);
//         return await pkg.save();
//     }

//     async findAllPackages(): Promise<IPackage[]> {
//         await connectToDatabase (); 
//         return await this.packageModel.find().exec();
//     }

//     async updatePackage(packageId: string, data: Partial<IPackage>): Promise<IPackage | null> {
//         await connectToDatabase (); 
//         return await this.packageModel.findByIdAndUpdate(packageId, data, { new: true }).exec();
//     }

//     async deletePackage(packageId: string): Promise<void> {
//         await connectToDatabase (); 
//         await this.packageModel.findByIdAndDelete(packageId).exec();
//     }

//     async findPackageById(packageId: string): Promise<IPackage | null> {
//         await connectToDatabase (); 
//         return await this.packageModel.findById(packageId).exec();
//     }
// }

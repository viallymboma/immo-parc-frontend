import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { Packages } from '../../models';
import { PackageService } from '../../services/packageService';

const packageService = new PackageService(Packages);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const packageData = await packageService.findPackageById(id);
        return packageData
            ? NextResponse.json(packageData)
            : NextResponse.json({ error: 'Package not found' }, { status: 404 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await req.json();
        const updatedPackage = await packageService.updatePackage(id, data);
        return updatedPackage
            ? NextResponse.json(updatedPackage)
            : NextResponse.json({ error: 'Package not found' }, { status: 404 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await packageService.deletePackage(id);
        return NextResponse.json({ message: 'Package deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

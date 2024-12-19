import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { Packages } from '../../models';
import { PackageService } from '../../services/packageService';

// import { PackageService } from '@/services/packageService';
// import { PackageModel } from '@/models/package.entity';

const packageService = new PackageService(Packages);

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data, 'Creating a package');
        const createdPackage = await packageService.createPackage(data);
        return NextResponse.json(createdPackage);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

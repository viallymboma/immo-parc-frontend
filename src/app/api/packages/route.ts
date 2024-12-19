import { NextResponse } from 'next/server';

import { Packages } from '../models';
import { PackageService } from '../services/packageService';

const packageService = new PackageService(Packages);

export async function GET() {
  try {
    const packages = await packageService.findAllPackages();
    return NextResponse.json(packages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

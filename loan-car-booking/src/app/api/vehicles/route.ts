import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/mongodb';
import Vehicle from '../../../../models/Vehicle';

export async function GET() {
  await connectMongoDB();
  const vehicles = await Vehicle.find({});
  return NextResponse.json(vehicles);
}

export async function POST(req: Request) {
  await connectMongoDB();
  const data = await req.json();
  const newVehicle = await Vehicle.create(data);
  return NextResponse.json(newVehicle);
}

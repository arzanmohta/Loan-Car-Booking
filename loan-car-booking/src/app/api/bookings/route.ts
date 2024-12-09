import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/mongodb';
import Booking from '../../../../models/Booking';

export async function POST(req: Request) {
  await connectMongoDB();
  const data = await req.json();
  const newBooking = await Booking.create(data);
  return NextResponse.json(newBooking);
}

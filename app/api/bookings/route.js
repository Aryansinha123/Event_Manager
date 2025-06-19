import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 });
  }
}

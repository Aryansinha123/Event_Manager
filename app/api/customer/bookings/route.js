import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import Event from "@/models/Event";

export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Find bookings for the specific customer email
    const bookings = await Booking.find({ email: email })
      .populate({
        path: "eventId",
        select: "name date time place description price category image",
      })
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

    return NextResponse.json({
      success: true,
      bookings: bookings,
      count: bookings.length
    });

  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
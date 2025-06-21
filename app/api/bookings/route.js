import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const booking = await Booking.create(body);


    const event = await Event.findById(body.eventId);

    // Send confirmation email
    await sendEmail({
      to: body.email,
      subject: `Booking Confirmation for ${event.name}`,
      text: `Hello ${body.name},\n\nYour booking for ${event.name} on ${event.date} has been confirmed.`,
      html: `
        <h1>Booking Confirmation</h1>
        <p>Hello ${body.name},</p>
        <p>Your booking for <strong>${event.name}</strong> on ${event.date} has been confirmed.</p>
        <p>Tickets:${body.numberOfTickets}</p>
      `,
    });
    // return NextResponse.json({ success: true, booking });
     return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const bookings = await Booking.find({})
      .populate("eventId", "name date time place")
      .exec(); // Populate event details

    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch bookings" }),
      { status: 500 }
    );
  }
}
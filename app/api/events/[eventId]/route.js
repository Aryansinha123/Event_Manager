import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

// Update an event by ID
export async function PUT(req, { params }) {
  await dbConnect();
  const { eventId } =await params; 
  const body = await req.json();

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, body, { new: true });
    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Failed to update event" }, { status: 500 });
  }
}

// Delete an event by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  const { eventId } =await params; 

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ message: "Failed to delete event" }, { status: 500 });
  }
}

// Get an event by ID
export async function GET(req, { params }) {
  const { eventId } =await params; // Corrected variable name for consistency

  try {
    await dbConnect();

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Error fetching event details:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch event" }, { status: 500 });
  }
}

import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEvent) {
      return new Response(JSON.stringify({ message: "Event not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedEvent), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to update event" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return new Response(JSON.stringify({ message: "Event not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Event deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to delete event" }), { status: 500 });
  }
}

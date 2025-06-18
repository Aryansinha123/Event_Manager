import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  await dbConnect();
  try {
    const events = await Event.find({});
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch events" }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    // console.log("Request Body:", body);

    const { name, description, date, time, price, place, image } = body;

    // Check required fields
    if (!name || !description || !date || !time || !price || !place) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }
    // const newEvent = new Event({ name, description, date, time, price, place, image });

     const newEvent = await Event.create(body);
    // await newEvent.save();

    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to create event" }), { status: 500 });
  }
}

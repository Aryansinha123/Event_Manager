import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { verifyToken } from "@/lib/authMiddleware"; // Replace with your JWT validation logic

export async function GET(req) {
  try {
    await dbConnect();

    // Extract and verify token (Authorization header)
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const user = verifyToken(token); // Your token verification function
    if (!user) return new Response("Unauthorized", { status: 401 });

    // Fetch bookings for the user
    const bookings = await Booking.find({ email: user.email }).populate("eventId");

    return new Response(
      JSON.stringify(
        bookings.map((booking) => ({
          _id: booking._id,
          eventName: booking.eventId?.name || "Unknown Event",
          date: booking.eventId?.date || "N/A",
          tickets: booking.numberOfTickets,
          additionalDetails: booking.additionalDetails,
        }))
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

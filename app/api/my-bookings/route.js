// import dbConnect from "@/lib/mongodb";
// import Booking from "@/models/Booking";
// import { verifyToken } from "@/lib/authMiddleware"; // Function to verify JWT

// export async function GET(req) {
//   try {
//     await dbConnect();

//     // Extract and verify token from Authorization header
//     const token = req.headers.get("authorization")?.split(" ")[1];
//     if (!token) return new Response("Unauthorized", { status: 401 });

//     const user = verifyToken(token); // Verify token and decode user
//     if (!user) return new Response("Unauthorized", { status: 401 });

//     // Fetch bookings based on user email
//     const bookings = await Booking.find({ email: user.email }).populate("eventId");

//     if (!bookings.length) {
//       return new Response(
//         JSON.stringify({ bookings: [] }),
//         { status: 200 }
//       );
//     }

//     // Format the bookings for response
//     const formattedBookings = bookings.map((booking) => ({
//       _id: booking._id,
//       eventName: booking.eventId?.name || "Unknown Event",
//       date: booking.eventId?.date || "N/A",
//       numberOfTickets: booking.numberOfTickets,
//       additionalDetails: booking.additionalDetails || "N/A",
//     }));

//     return new Response(
//       JSON.stringify({ bookings: formattedBookings }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     return new Response(
//       JSON.stringify({ message: "Failed to fetch bookings" }),
//       { status: 500 }
//     );
//   }
// }

import { verifyToken } from "@/lib/authMiddleware";
import Customer from "@/models/Customer";
import Booking from "@/models/Booking"; // Assuming you have a Booking model
import dbConnect from "@/lib/mongodb";

export async function GET(req) {
  try {
    await dbConnect();
    
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Authorization token missing" }),
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    
    // First, get the customer details to retrieve email
    const customer = await Customer.findById(decoded.id);
    if (!customer) {
      return new Response(
        JSON.stringify({ message: "Customer not found" }),
        { status: 404 }
      );
    }

    // Fetch bookings using the customer's email
    const bookings = await Booking.find({ 
      email: customer.email 
    }).sort({ createdAt: -1 }); // Sort by newest first

    return new Response(
      JSON.stringify({ 
        bookings,
        totalBookings: bookings.length,
        customerEmail: customer.email
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/my-bookings:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch bookings" }),
      { status: 500 }
    );
  }
}
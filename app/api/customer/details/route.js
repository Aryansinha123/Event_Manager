import { verifyToken } from "@/lib/authMiddleware";
import Customer from "@/models/Customer";
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

    const decoded = verifyToken(token); // Decode token to get user ID
    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return new Response(
        JSON.stringify({ message: "Customer not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ username: customer.username }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in /api/customer/details:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch customer details" }),
      { status: 500 }
    );
  }
}

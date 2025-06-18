
import dbConnect from "@/lib/mongodb"; // MongoDB connection utility
import Admin from "@/models/Admin"; // Mongoose Admin model
export async function GET(req) {
  try {
    await dbConnect();

    // Replace this logic with actual session-based authentication
    const admin = await Admin.findOne(); // 
    // Fetch the first admin as a placeholder

    if (!admin) {
      return new Response(JSON.stringify({ error: "Admin not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ username: admin.username }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

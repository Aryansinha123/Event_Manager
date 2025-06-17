
import connectToDatabase from "@/lib/mongodb";

export async function GET(req, res) {
  try {
    await connectToDatabase();
    return new Response(JSON.stringify({ message: "Database connection successful!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(JSON.stringify({ message: "Database connection failed!", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

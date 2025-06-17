// app/api/test-models/route.js
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Event from "@/models/Event";

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create a test user
    const testUser = await User.create({
      username: "admin",
      password: "password123", // Hashing would be added in production
      role: "admin",
    });

    // Create a test event
    const testEvent = await Event.create({
      name: "Test Event",
      date: new Date(),
      description: "This is a test event.",
      createdBy: testUser._id,
    });

    return new Response(
      JSON.stringify({
        message: "Models tested successfully!",
        user: testUser,
        event: testEvent,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error testing models:", error);
    return new Response(JSON.stringify({ message: "Error testing models", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

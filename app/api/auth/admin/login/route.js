import { NextResponse } from "next/server"; // For sending responses
import bcrypt from "bcryptjs"; // For password comparison
import dbConnect from "@/lib/mongodb"; // MongoDB connection utility
import Admin from "@/models/Admin"; // Mongoose Admin model

export async function POST(request) {
  try {
    // Parse the request body
    const { email, username, password } = await request.json();

    // Validate the input
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Email, username, and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if an admin with the given email and username exists
    const admin = await Admin.findOne({ email, username });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email, username, or password" },
        { status: 401 } // Unauthorized
      );
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email, username, or password" },
        { status: 401 }
      );
    }

    // Respond with success
    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

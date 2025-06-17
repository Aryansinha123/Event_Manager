import { NextResponse } from "next/server"; // For sending responses in App Directory
import bcrypt from "bcryptjs"; // For password hashing
import dbConnect from "@/lib/mongodb"; // MongoDB connection utility
import Admin from "@/models/Admin"; // Mongoose Admin model

export async function POST(request) {
  try {
    // Parse the request body
    const { username, email, password } = await request.json();

    // Validate the input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if the email or username already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Username or email already in use" },
        { status: 409 } // Conflict
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new admin
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    // Respond with success
    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

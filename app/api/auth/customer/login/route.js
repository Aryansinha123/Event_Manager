import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();

    // Validate input
    if ((!email && !username) || !password) {
      return NextResponse.json(
        { message: "Email/Username and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the customer by email or username
    const customer = await Customer.findOne({
      $or: [{ email }, { username }],
    });
    if (!customer) {
      return NextResponse.json(
        { message: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in customer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

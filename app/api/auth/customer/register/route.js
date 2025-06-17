import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Email, username, and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if email or username already exists
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { username }],
    });

    if (existingCustomer) {
      return NextResponse.json(
        { message: "Email or username already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new customer to the database
    const newCustomer = new Customer({
      email,
      username,
      password: hashedPassword,
    });
    await newCustomer.save();

    return NextResponse.json(
      { message: "Customer registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering customer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

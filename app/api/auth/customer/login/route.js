import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "@/models/Customer";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    // Parse incoming request data
    const { username, email, password } = await req.json();
    console.log("Received login request:", { username, email });

    // Find customer by email or username
    const customer = await Customer.findOne(
      email ? { email } : { username }
    );
    console.log("Customer found:", customer);

    if (!customer) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials: user not found" }),
        { status: 401 }
      );
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials: password mismatch" }),
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: customer._id, username: customer.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Return success response with token
    return new Response(JSON.stringify({ message: "Login successful", token }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in /api/auth/customer/login:", error);
    return new Response(
      JSON.stringify({ message: "Login failed" }),
      { status: 500 }
    );
  }
}

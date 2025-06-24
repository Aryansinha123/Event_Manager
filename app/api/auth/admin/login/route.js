// import { NextResponse } from "next/server"; // For sending responses
// import bcrypt from "bcryptjs"; // For password comparison
// import dbConnect from "@/lib/mongodb"; // MongoDB connection utility
// import Admin from "@/models/Admin"; // Mongoose Admin model

// export async function POST(request) {
//   try {
//     // Parse the request body
//     const { email, username, password } = await request.json();

//     // Validate the input
//     if (!email || !username || !password) {
//       return NextResponse.json(
//         { message: "Email, username, and password are required" },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await dbConnect();

//     // Check if an admin with the given email and username exists
//     const admin = await Admin.findOne({ email, username });
//     if (!admin) {
//       return NextResponse.json(
//         { message: "Invalid email, username, or password" },
//         { status: 401 } // Unauthorized
//       );
//     }

//     // Verify the password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { message: "Invalid email, username, or password" },
//         { status: 401 }
//       );
//     }

//     // Respond with success
//     return NextResponse.json(
//       { message: "Login successful" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error during login:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import bcrypt from "bcryptjs"; // For password comparison
import jwt from "jsonwebtoken"; // For token generation
import dbConnect from "@/lib/mongodb"; // MongoDB connection utility
import Admin from "@/models/Admin"; // Admin model for database operations

export async function POST(request) {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } } // Unauthorized
      );
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        username: admin.username,
      },
      process.env.JWT_SECRET_KEY, // Secret key for token signing
      { expiresIn: "24h" } // Token validity duration
    );

    // Respond with token and admin details
    return new Response(
      JSON.stringify({
        message: "Login successful",
        token: token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during admin login:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

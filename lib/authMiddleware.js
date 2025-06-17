// lib/authMiddleware.js
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

export function authMiddleware(handler, allowedRoles = []) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Unauthorized. No token provided." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      // Check if user role is allowed
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return new Response(
          JSON.stringify({ message: "Forbidden. Access denied." }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

      // Attach user details to the request
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Invalid token.", error: error.message }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  };
}

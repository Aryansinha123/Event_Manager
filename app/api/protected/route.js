// app/api/protected/route.js
import { authMiddleware } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  // If middleware passes, user details are available
  return new Response(
    JSON.stringify({ message: "Access granted!", user: req.user }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

export const GET = authMiddleware(handler, ["admin"]);

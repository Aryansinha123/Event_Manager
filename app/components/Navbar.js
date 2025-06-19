"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState({ name: "Guest" }); // Default to Guest
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token"); // Fetch token from localStorage

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("/api/customer/details", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.username });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false); // Invalid or expired token
          localStorage.removeItem("token"); // Clear token if invalid
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setUser({ name: "Guest" });
    setIsLoggedIn(false);
    router.push("/customer/login"); // Redirect to login page
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">
        <a href="/">EventEase</a>
      </div>

      {/* User Details and Actions */}
      <div className="flex items-center gap-4">
        <p className="font-medium">Hi, {user.name}</p>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/customer/login")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [adminUsername, setAdminUsername] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
    const fetchAdminUsername = async () => {
      try {
        const res = await fetch("/api/admin/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch admin details");
        }

        const data = await res.json();
        setAdminUsername(data.username);
      } catch (err) {
        console.error("Error fetching admin username:", err);
        setAdminUsername("Error");
      }
    };

    fetchAdminUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/admin/logout", { method: "GET" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav
      className="flex items-center justify-between p-4 bg-gray-800 text-white sticky top-0 z-50 px-4 w-[85vw]"
      style={{ height: "64px" }} // Explicitly set navbar height
    >
      <h1 className="text-xl font-semibold ml-9">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <p className="font-medium">Hi, {adminUsername}</p>
        <button
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

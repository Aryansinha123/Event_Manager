"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [adminUsername, setAdminUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState({ name: "Guest", email: "", joinedDate: "" });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("/api/admin/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser({ 
            name: data.username,
            email: data.email || "",
            joinedDate: data.createdAt || data.joinedDate || ""
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          router.push("/admin/login");
          return;
        }

        const response = await fetch("/api/admin/details", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAdminUsername(data.username);
        } else {
          localStorage.removeItem("token");
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        localStorage.removeItem("token");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
        <div className="flex items-center justify-between p-4 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard  {user.name}</h1>
          </div>
          <div className="animate-pulse w-20 h-8 bg-gray-600 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg w-[70vw]">
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {adminUsername.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-white font-medium">{adminUsername}</span>
          </div>
          
          <div className="h-8 w-px bg-gray-600"></div>
          
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
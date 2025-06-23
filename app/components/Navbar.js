"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState({ name: "Guest", email: "", joinedDate: "" }); // Extended user state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("/api/customer/details", {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "Guest", email: "", joinedDate: "" });
    setIsLoggedIn(false);
    router.push("/customer/login");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return "";
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">
        <a href="/">EventEase</a>
      </div>

      {/* User Details and Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Hi, {user.name}</span>
          <div className="flex flex-col space-y-1">
            <div className="w-5 h-1 bg-white"></div>
            <div className="w-5 h-1 bg-white"></div>
            <div className="w-5 h-1 bg-white"></div>
          </div>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {isLoggedIn ? (
              <>
                {/* User Details Box */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-semibold text-lg backdrop-blur-sm">
                      {getUserInitials(user.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">{user.name}</h3>
                      {user.email && (
                        <p className="text-blue-100 text-sm opacity-90">{user.email}</p>
                      )}
                      {user.joinedDate && (
                        <p className="text-blue-100 text-xs opacity-75">
                          Member since {formatDate(user.joinedDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200"></div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      router.push("/customer/my-bookings");
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">My Bookings</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                  >
                    <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="py-2">
                <button
                  onClick={() => {
                    router.push("/customer/login");
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-blue-600"
                >
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Login</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
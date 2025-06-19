"use client";

import { useEffect, useState } from "react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Event ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Additional Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border p-2">{booking.eventId}</td>
                  <td className="border p-2">{booking.name}</td>
                  <td className="border p-2">{booking.email}</td>
                  <td className="border p-2">{booking.phone}</td>
                  <td className="border p-2">{booking.additionalDetails || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

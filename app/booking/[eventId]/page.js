"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingPage({ params }) {
  const { eventId } = params;
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfTickets: 1, // Default to 1 ticket
    additionalDetails: "",
  });

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();
        if (data.success) {
          setEventDetails(data.event);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, eventId }),
      });

      if (response.ok) {
        // router.push("/thank-you"); // Redirect after success
        toast.success("Booking confirmed! 🎉");
      } else {
        toast.error("Booking failed!")
        console.error("Failed to book the event");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Book Event</h1>
        {eventDetails ? (
          <>
            {/* Display event details */}
            <div className="mb-6">
              <img
                src={eventDetails.image}
                alt={eventDetails.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{eventDetails.name}</h2>
              <p className="text-gray-700 mb-2">{eventDetails.description}</p>
              <p className="text-gray-700 mb-2">
                <strong>Place:</strong> {eventDetails.place}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Date:</strong> {eventDetails.date}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Time:</strong> {eventDetails.time}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ₹{eventDetails.price} per ticket
              </p>
            </div>

            {/* Booking form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Number of Tickets</label>
                <input
                  type="number"
                  value={formData.numberOfTickets}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfTickets: parseInt(e.target.value) })
                  }
                  min="1"
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Additional Details</label>
                <textarea
                  value={formData.additionalDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalDetails: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Submit Booking
              </button>
            </form>
          </>
        ) : (
          <p>Loading event details...</p>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

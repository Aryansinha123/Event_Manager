
import { verifyToken } from "@/lib/authMiddleware";
import Customer from "@/models/Customer";
import Booking from "@/models/Booking";
import Event from "@/models/Event"; // Add Event model for population
import dbConnect from "@/lib/mongodb";

export async function GET(req) {
  try {
    await dbConnect();
    
    // Extract token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Invalid authorization format" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Authorization token missing" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get customer details
    const customer = await Customer.findById(decoded.id).select('email name');
    if (!customer) {
      return new Response(
        JSON.stringify({ message: "Customer not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch bookings with event details populated
    const bookings = await Booking.find({ 
      email: customer.email 
    })
    .populate({
      path: 'eventId',
      select: 'name date time venue description price category'
    })
    .sort({ createdAt: -1 })
    .lean(); // Use lean() for better performance

    // Format bookings for response
    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      bookingDate: booking.createdAt,
      numberOfTickets: booking.numberOfTickets,
      totalAmount: booking.totalAmount || (booking.numberOfTickets * (booking.eventId?.price || 0)),
      additionalDetails: booking.additionalDetails || null,
      status: booking.status || 'confirmed',
      event: booking.eventId ? {
        _id: booking.eventId._id,
        name: booking.eventId.name,
        date: booking.eventId.date,
        time: booking.eventId.time,
        venue: booking.eventId.venue,
        category: booking.eventId.category,
        price: booking.eventId.price
      } : {
        name: "Event not found",
        date: null,
        time: null,
        venue: null,
        category: null,
        price: 0
      }
    }));

    // Calculate summary statistics
    const totalTickets = bookings.reduce((sum, booking) => sum + (booking.numberOfTickets || 0), 0);
    const totalSpent = formattedBookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);

    return new Response(
      JSON.stringify({ 
        success: true,
        bookings: formattedBookings,
        summary: {
          totalBookings: bookings.length,
          totalTickets,
          totalSpent,
          customerEmail: customer.email,
          customerName: customer.name
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error("Error in /api/my-bookings:", error);
    
    // Handle specific error types
    if (error.name === 'JsonWebTokenError') {
      return new Response(
        JSON.stringify({ message: "Invalid token format" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (error.name === 'TokenExpiredError') {
      return new Response(
        JSON.stringify({ message: "Token has expired" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        message: "Failed to fetch bookings",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
this is my api for my-booking page
and this is my-booking page

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch bookings.");
          setLoading(false);
          return;
        }

        if (data.success) {
          setBookings(data.bookings || []);
          setSummary(data.summary || null);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Time not available";
    try {
      // Handle different time formats
      if (timeString.includes(':')) {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return timeString;
    } catch {
      return timeString;
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
        {status || "Confirmed"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              {summary && (
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Welcome back, <span className="font-medium">{summary.customerName}</span></span>
                  <span>•</span>
                  <span>{summary.totalBookings} booking{summary.totalBookings !== 1 ? "s" : ""}</span>
                  <span>•</span>
                  <span>{summary.totalTickets} ticket{summary.totalTickets !== 1 ? "s" : ""}</span>
                  {summary.totalSpent > 0 && (
                    <>
                      <span>•</span>
                      <span>₹{summary.totalSpent} total spent</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Book More Events
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
            {error.includes("not logged in") && (
              <button
                onClick={() => router.push("/customer/login")}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Login
              </button>
            )}
          </div>
        )}

        {/* Bookings Content */}
        {!error && (
          <>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">You haven't booked any events yet. Start exploring amazing events!</p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Explore Events
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tickets & Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.event?.name || 'Event Name Not Available'}
                                </div>
                                {booking.event?.venue && (
                                  <div className="text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {booking.event.venue}
                                  </div>
                                )}
                                {booking.event?.category && (
                                  <div className="text-xs text-gray-400 mt-1">
                                    {booking.event.category}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-medium">
                              {formatDate(booking.event?.date)}
                            </div>
                            {booking.event?.time && (
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatTime(booking.event.time)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.numberOfTickets || 1} ticket{(booking.numberOfTickets || 1) !== 1 ? "s" : ""}
                            </div>
                            {booking.totalAmount && (
                              <div className="text-sm text-gray-500">
                                ₹{booking.totalAmount}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {formatDate(booking.bookingDate)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.event?.name || 'Event Name Not Available'}
                              </h3>
                              {booking.event?.venue && (
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {booking.event.venue}
                                </div>
                              )}
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Event Date:
                          </span>
                          <span className="text-gray-900 font-medium">{formatDate(booking.event?.date)}</span>
                        </div>
                        
                        {booking.event?.time && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Time:
                            </span>
                            <span className="text-gray-900 font-medium">{formatTime(booking.event.time)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            Tickets:
                          </span>
                          <span className="text-gray-900">{booking.numberOfTickets || 1}</span>
                        </div>
                        
                        {booking.totalAmount && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              Amount:
                            </span>
                            <span className="text-gray-900 font-medium">₹{booking.totalAmount}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Booked On:
                          </span>
                          <span className="text-gray-900">{formatDate(booking.bookingDate)}</span>
                        </div>

                        {booking.event?.category && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              Category:
                            </span>
                            <span className="text-gray-900">{booking.event.category}</span>
                          </div>
                        )}
                        
                        {booking.additionalDetails && (
                          <div className="pt-2 border-t">
                            <span className="text-gray-500 flex items-start">
                              <svg className="w-4 h-4 mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Additional Details:
                            </span>
                            <p className="text-gray-900 mt-1 ml-5">{booking.additionalDetails}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
it should display the event booked by user correctly make it work tell steps with file name
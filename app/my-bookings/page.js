
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        // First fetch user details to get email
        const userRes = await fetch("/api/customer/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) {
          setError("Failed to fetch user details.");
          setLoading(false);
          return;
        }

        const userData = await userRes.json();
        setUser(userData);

        // Then fetch bookings using the user's email
        const bookingsRes = await fetch("/api/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!bookingsRes.ok) {
          const data = await bookingsRes.json();
          setError(data.message || "Failed to fetch bookings.");
          setLoading(false);
          return;
        }

        const bookingsData = await bookingsRes.json();
        let bookingsArray = bookingsData.bookings || [];

        // Fetch event details for each booking
        const bookingsWithEventDetails = await Promise.all(
          bookingsArray.map(async (booking) => {
            try {
              // Check if booking has eventId
              if (booking.eventId) {
                const response = await fetch(`/api/events/${booking.eventId}`);
                const data = await response.json();
                if (data.success && data.event) {
                  return {
                    ...booking,
                    eventName: data.event.name || booking.eventName,
                    eventImage: data.event.image || booking.eventImage,
                    place: data.event.location || data.event.place || booking.place,
                    date: data.event.date || booking.date,
                    time: data.event.time || booking.time,
                    description: data.event.description || booking.description,
                    venue: data.event.venue || booking.venue,
                    // Keep existing booking data as fallback
                  };
                }
              }
              // Return original booking if no eventId or fetch failed
              return booking;
            } catch (err) {
              console.error(`Error fetching event details for booking ${booking._id}:`, err);
              // Return original booking if fetch failed
              return booking;
            }
          })
        );

        setBookings(bookingsWithEventDetails);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBookings();
  }, []);

  const formatDate = (dateString) => {
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
    try {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
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
              {user && (
                <p className="text-gray-600 mt-1">
                  Welcome back, <span className="font-medium">{user.username}</span>
                </p>
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
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">
                    {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
                  </p>
                </div>

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
                          Tickets
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Additional Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking, index) => (
                        <tr key={booking._id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              {booking.eventImage ? (
                                <img
                                  src={booking.eventImage}
                                  alt={booking.eventName || 'Event'}
                                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div
                                className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ display: booking.eventImage ? 'none' : 'flex' }}
                              >
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.eventName || 'Event Name Not Available'}
                                </div>
                                {(booking.place || booking.venue) && (
                                  <div className="text-sm text-gray-500">
                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {booking.place || booking.venue}
                                  </div>
                                )}
                                {booking.description && (
                                  <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                                    {booking.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-medium">
                              {formatDate(booking.date)}
                            </div>
                            {booking.time && (
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatTime(booking.time)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.numberOfTickets || booking.tickets || 1} ticket{(booking.numberOfTickets || booking.tickets || 1) !== 1 ? "s" : ""}
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
                              {booking.additionalDetails || "No additional details"}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {bookings.map((booking, index) => (
                    <div key={booking._id || index} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        {booking.eventImage ? (
                          <img
                            src={booking.eventImage}
                            alt={booking.eventName || 'Event'}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ display: booking.eventImage ? 'none' : 'flex' }}
                        >
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.eventName || 'Event Name Not Available'}
                              </h3>
                              {(booking.place || booking.venue) && (
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {booking.place || booking.venue}
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
                            Date:
                          </span>
                          <span className="text-gray-900 font-medium">{formatDate(booking.date)}</span>
                        </div>

                        {booking.time && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Time:
                            </span>
                            <span className="text-gray-900 font-medium">{formatTime(booking.time)}</span>
                          </div>
                        )}

                        {(booking.place || booking.venue) && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Venue:
                            </span>
                            <span className="text-gray-900">{booking.place || booking.venue}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            Tickets:
                          </span>
                          <span className="text-gray-900">
                            {booking.numberOfTickets || booking.tickets || 1}
                          </span>
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

                        {booking.description && (
                          <div className="pt-2 border-t">
                            <span className="text-gray-500 flex items-start">
                              <svg className="w-4 h-4 mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Description:
                            </span>
                            <p className="text-gray-900 mt-1 ml-5">{booking.description}</p>
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
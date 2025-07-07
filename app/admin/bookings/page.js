"use client";
import { useEffect, useState } from "react";
import { Calendar, Clock, User, Mail, Phone, FileText, Users } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([
  ]);

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

    // Uncomment the line below to fetch real data
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-blue-600 rounded-lg w-fit">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Event Bookings</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage and view all event bookings</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Total Bookings: {bookings.length}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No bookings available</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                When customers book events, their information will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  {/* Mobile Image */}
                  <div className="relative h-48 sm:h-56">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    <img 
                      src={booking.eventId?.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=280&fit=crop"} 
                      alt={booking.eventId?.name || "Event"} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-2 bg-green-700 text-white text-sm font-medium rounded-full">
                        Confirmed
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            {booking.eventId?.name || "Event Name Not Available"}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-white/90">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.eventId?.date || "Date not available"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.eventId?.time || "Time not available"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Content */}
                  <div className="p-4 sm:p-6">
                    {/* Customer Information */}
                    <div className="grid gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Customer Name</p>
                          <p className="font-medium text-gray-900">{booking.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900 break-all">{booking.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">{booking.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    {booking.additionalDetails && booking.additionalDetails !== "N/A" && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg mt-1">
                            <FileText className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-2">Additional Details</p>
                            <p className="text-gray-900 leading-relaxed text-sm">{booking.additionalDetails}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex min-h-[320px]">
                  {/* Left Half - Content */}
                  <div className="flex-1 p-6 xl:p-8">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl xl:text-2xl font-semibold text-gray-900 mb-2">
                            {booking.eventId?.name || "Event Name Not Available"}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {booking.eventId?.date || "Date not available"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.eventId?.time || "Time not available"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Confirmed
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="grid gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Customer Name</p>
                          <p className="font-medium text-gray-900">{booking.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900 break-all">{booking.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">{booking.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    {booking.additionalDetails && booking.additionalDetails !== "N/A" && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg mt-1">
                            <FileText className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-2">Additional Details</p>
                            <p className="text-gray-900 leading-relaxed text-sm">{booking.additionalDetails}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Half - Image */}
                  <div className="w-80 xl:w-96 relative">
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 z-10"></div>
                    <img 
                      src={booking.eventId?.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=280&fit=crop"} 
                      alt={booking.eventId?.name || "Event"} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        Event Photo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
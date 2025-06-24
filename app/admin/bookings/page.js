// "use client";

// import { useEffect, useState } from "react";

// export default function AdminBookingsPage() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await fetch("/api/bookings");
//         const data = await res.json();
//         setBookings(data);
//       } catch (error) {
//         console.error("Failed to fetch bookings:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Bookings</h1>
//         {bookings.length === 0 ? (
//           <p>No bookings available.</p>
//         ) : (
//           <table className="w-full border-collapse">
//           <thead>
//   <tr>
//     <th className="border p-2">Event Name</th>
//     <th className="border p-2">Event Date</th>
//     <th className="border p-2">Event Time</th>
//     <th className="border p-2">Name</th>
//     <th className="border p-2">Email</th>
//     <th className="border p-2">Phone</th>
//     <th className="border p-2">Additional Details</th>
//   </tr>
// </thead>
//            <tbody>
//   {bookings.map((booking) => (
//     <tr key={booking._id}>
//       <td className="border p-2">{booking.eventId?.name || "N/A"}</td>
//       <td className="border p-2">{booking.eventId?.date || "N/A"}</td>
//       <td className="border p-2">{booking.eventId?.time || "N/A"}</td>
//       <td className="border p-2">{booking.name}</td>
//       <td className="border p-2">{booking.email}</td>
//       <td className="border p-2">{booking.phone}</td>
//       <td className="border p-2">{booking.additionalDetails || "N/A"}</td>
//     </tr>
//   ))}
// </tbody>

//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Calendar, Clock, User, Mail, Phone, FileText, Users } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Bookings</h1>
              <p className="text-gray-600 mt-1">Manage and view all event bookings</p>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings available</h3>
              <p className="text-gray-500">
                When customers book events, their information will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {booking.eventId?.name || "Event Name Not Available"}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg mt-1">
                          <FileText className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-2">Additional Details</p>
                          <p className="text-gray-900 leading-relaxed">{booking.additionalDetails}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
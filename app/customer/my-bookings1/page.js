
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function MyBookingsPage() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [user, setUser] = useState(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchUserAndBookings = async () => {
// //       const token = localStorage.getItem("token");

// //       if (!token) {
// //         setError("You are not logged in. Please log in to view your bookings.");
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         // First fetch user details to get email
// //         const userRes = await fetch("/api/customer/details", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (!userRes.ok) {
// //           setError("Failed to fetch user details.");
// //           setLoading(false);
// //           return;
// //         }

// //         const userData = await userRes.json();
// //         console.log("User data:", userData); // Debug log
// //         setUser(userData);

// //         // Then fetch bookings using the user's email
// //         const bookingsRes = await fetch("/api/my-bookings", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (!bookingsRes.ok) {
// //           const data = await bookingsRes.json();
// //           console.log("Bookings error:", data); // Debug log
// //           setError(data.message || "Failed to fetch bookings.");
// //           setLoading(false);
// //           return;
// //         }

// //         const bookingsData = await bookingsRes.json();
// //         console.log("Raw bookings data:", bookingsData); // Debug log
        
// //         // Handle different possible response structures
// //         let bookingsArray = [];
// //         if (Array.isArray(bookingsData)) {
// //           bookingsArray = bookingsData;
// //         } else if (bookingsData.bookings && Array.isArray(bookingsData.bookings)) {
// //           bookingsArray = bookingsData.bookings;
// //         } else if (bookingsData.data && Array.isArray(bookingsData.data)) {
// //           bookingsArray = bookingsData.data;
// //         } else {
// //           console.log("Unexpected bookings data structure:", bookingsData);
// //         }
        
// //         console.log("Processed bookings array:", bookingsArray); // Debug log

// //                         // Fetch event details for each booking
// //         const bookingsWithEventDetails = await Promise.all(
// //           bookingsArray.map(async (booking) => {
// //             console.log("Processing booking:", booking); // Debug log
// //             try {
// //               // Check if booking has eventId (try different possible field names)
// //               const eventId = booking.eventId || booking.event_id || booking.event || booking.eventID;
// //               console.log("Event ID found:", eventId); // Debug log
              
// //               if (eventId) {
// //                 const response = await fetch(`/api/events/${eventId}`);
// //                 const data = await response.json();
// //                 console.log("Event API response:", data); // Debug log
                
// //                 if (data.success && data.event) {
// //                   const enrichedBooking = {
// //                     ...booking,
// //                     eventName: data.event.name || data.event.title || booking.eventName || booking.event_name,
// //                     eventImage: data.event.image || data.event.imageUrl || data.event.img || booking.eventImage,
// //                     place: data.event.location || data.event.place || data.event.venue || booking.place || booking.location,
// //                     date: data.event.date || booking.date || booking.event_date,
// //                     time: data.event.time || booking.time || booking.event_time,
// //                     description: data.event.description || booking.description,
// //                     venue: data.event.venue || booking.venue,
// //                     // Keep existing booking data as fallback
// //                   };
// //                   console.log("Enriched booking:", enrichedBooking); // Debug log
// //                   return enrichedBooking;
// //                 }
// //               }
// //               // Return original booking if no eventId or fetch failed
// //               console.log("Returning original booking:", booking); // Debug log
// //               return booking;
// //             } catch (err) {
// //               console.error(`Error fetching event details for booking ${booking._id || booking.id}:`, err);
// //               // Return original booking if fetch failed
// //               return booking;
// //             }
// //           })
// //         );

// //         console.log("Final bookings with event details:", bookingsWithEventDetails); // Debug log
// //         setBookings(bookingsWithEventDetails);

// //       } catch (err) {
// //         console.error("Error fetching data:", err);
// //         setError("Failed to fetch your bookings. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserAndBookings();
// //   }, []);

// //   const formatDate = (dateString) => {
// //     try {
// //       return new Date(dateString).toLocaleDateString("en-US", {
// //         weekday: "short",
// //         year: "numeric",
// //         month: "short",
// //         day: "numeric",
// //       });
// //     } catch {
// //       return dateString;
// //     }
// //   };

// //   const formatTime = (timeString) => {
// //     try {
// //       return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       });
// //     } catch {
// //       return timeString;
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusColors = {
// //       confirmed: "bg-green-100 text-green-800",
// //       pending: "bg-yellow-100 text-yellow-800",
// //       cancelled: "bg-red-100 text-red-800",
// //     };

// //     return (
// //       <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
// //         {status || "Confirmed"}
// //       </span>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading your bookings...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header Section */}
// //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
// //               {user && (
// //                 <p className="text-gray-600 mt-1">
// //                   Welcome back, <span className="font-medium">{user.username}</span>
// //                 </p>
// //               )}
// //             </div>
// //             <button
// //               onClick={() => router.push("/")}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
// //             >
// //               Book More Events
// //             </button>
// //           </div>
// //         </div>

// //         {/* Error State */}
// //         {error && (
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
// //             <div className="flex items-center">
// //               <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
// //                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //               </svg>
// //               <p className="text-red-800">{error}</p>
// //             </div>
// //             {error.includes("not logged in") && (
// //               <button
// //                 onClick={() => router.push("/customer/login")}
// //                 className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
// //               >
// //                 Go to Login
// //               </button>
// //             )}
// //           </div>
// //         )}

// //         {/* Bookings Content */}
// //         {!error && (
// //           <>
// //             {bookings.length === 0 ? (
// //               <div className="bg-white rounded-lg shadow-sm p-12 text-center">
// //                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                   </svg>
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
// //                 <p className="text-gray-600 mb-6">You haven't booked any events yet. Start exploring amazing events!</p>
// //                 <button
// //                   onClick={() => router.push("/")}
// //                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
// //                 >
// //                   Explore Events
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="space-y-4">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <p className="text-gray-600">
// //                     {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
// //                   </p>
// //                 </div>

// //                 {/* Desktop Table View */}
// //                 <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
// //                   <table className="w-full">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Event Details
// //                         </th>
// //                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Date & Time
// //                         </th>
// //                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Tickets
// //                         </th>
// //                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Status
// //                         </th>
// //                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Additional Details
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {bookings.map((booking, index) => (
// //                         <tr key={booking._id || index} className="hover:bg-gray-50">
// //                           <td className="px-6 py-4">
// //                             <div className="flex items-center space-x-3">
// //                               {booking.eventImage ? (
// //                                 <img 
// //                                   src={booking.eventImage} 
// //                                   alt={booking.eventName || 'Event'}
// //                                   className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
// //                                   onError={(e) => {
// //                                     e.target.style.display = 'none';
// //                                     e.target.nextElementSibling.style.display = 'flex';
// //                                   }}
// //                                 />
// //                               ) : null}
// //                               <div 
// //                                 className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"
// //                                 style={{ display: booking.eventImage ? 'none' : 'flex' }}
// //                               >
// //                                 <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                                 </svg>
// //                               </div>
// //                               <div>
// //                                 <div className="text-sm font-medium text-gray-900">
// //                                   {booking.eventName || booking.event_name || booking.name || 'Event Name Not Available'}
// //                                 </div>
// //                                 {(booking.place || booking.venue || booking.location) && (
// //                                   <div className="text-sm text-gray-500">
// //                                     <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                                     </svg>
// //                                     {booking.place || booking.venue || booking.location}
// //                                   </div>
// //                                 )}
// //                                 {booking.description && (
// //                                   <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">
// //                                     {booking.description}
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4">
// //                             <div className="text-sm text-gray-900 font-medium">
// //                               {formatDate(booking.date || booking.event_date)}
// //                             </div>
// //                             {(booking.time || booking.event_time) && (
// //                               <div className="text-sm text-gray-500 flex items-center mt-1">
// //                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                                 </svg>
// //                                 {formatTime(booking.time || booking.event_time)}
// //                               </div>
// //                             )}
// //                           </td>
// //                           <td className="px-6 py-4">
// //                             <div className="text-sm font-medium text-gray-900">
// //                               {booking.numberOfTickets || booking.tickets || 1} ticket{(booking.numberOfTickets || booking.tickets || 1) !== 1 ? "s" : ""}
// //                             </div>
// //                             {booking.totalAmount && (
// //                               <div className="text-sm text-gray-500">
// //                                 ₹{booking.totalAmount}
// //                               </div>
// //                             )}
// //                           </td>
// //                           <td className="px-6 py-4">
// //                             {getStatusBadge(booking.status)}
// //                           </td>
// //                           <td className="px-6 py-4">
// //                             <div className="text-sm text-gray-900">
// //                               {booking.additionalDetails || "No additional details"}
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Mobile Card View */}
// //                 <div className="lg:hidden space-y-4">
// //                   {bookings.map((booking, index) => (
// //                     <div key={booking._id || index} className="bg-white rounded-lg shadow-sm p-4">
// //                       <div className="flex items-start space-x-3 mb-3">
// //                         {booking.eventImage ? (
// //                           <img 
// //                             src={booking.eventImage} 
// //                             alt={booking.eventName || 'Event'}
// //                             className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
// //                             onError={(e) => {
// //                               e.target.style.display = 'none';
// //                               e.target.nextElementSibling.style.display = 'flex';
// //                             }}
// //                           />
// //                         ) : null}
// //                         <div 
// //                           className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"
// //                           style={{ display: booking.eventImage ? 'none' : 'flex' }}
// //                         >
// //                           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                           </svg>
// //                         </div>
// //                         <div className="flex-1">
// //                           <div className="flex justify-between items-start">
// //                             <div className="flex-1">
// //                               <h3 className="text-lg font-semibold text-gray-900">
// //                                 {booking.eventName || booking.event_name || booking.name || 'Event Name Not Available'}
// //                               </h3>
// //                               {(booking.place || booking.venue || booking.location) && (
// //                                 <div className="text-sm text-gray-500 flex items-center mt-1">
// //                                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                                   </svg>
// //                                   {booking.place || booking.venue || booking.location}
// //                                 </div>
// //                               )}
// //                             </div>
// //                             {getStatusBadge(booking.status)}
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <div className="space-y-2 text-sm">
// //                         <div className="flex justify-between">
// //                           <span className="text-gray-500 flex items-center">
// //                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                             </svg>
// //                             Date:
// //                           </span>
// //                           <span className="text-gray-900 font-medium">{formatDate(booking.date || booking.event_date)}</span>
// //                         </div>
                        
// //                         {(booking.time || booking.event_time) && (
// //                           <div className="flex justify-between">
// //                             <span className="text-gray-500 flex items-center">
// //                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                               </svg>
// //                               Time:
// //                             </span>
// //                             <span className="text-gray-900 font-medium">{formatTime(booking.time || booking.event_time)}</span>
// //                           </div>
// //                         )}

// //                         {(booking.place || booking.venue || booking.location) && (
// //                           <div className="flex justify-between">
// //                             <span className="text-gray-500 flex items-center">
// //                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                               </svg>
// //                               Venue:
// //                             </span>
// //                             <span className="text-gray-900">{booking.place || booking.venue || booking.location}</span>
// //                           </div>
// //                         )}
                        
// //                         <div className="flex justify-between">
// //                           <span className="text-gray-500 flex items-center">
// //                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
// //                             </svg>
// //                             Tickets:
// //                           </span>
// //                           <span className="text-gray-900">
// //                             {booking.numberOfTickets || booking.tickets || 1}
// //                           </span>
// //                         </div>
                        
// //                         {booking.totalAmount && (
// //                           <div className="flex justify-between">
// //                             <span className="text-gray-500 flex items-center">
// //                               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
// //                               </svg>
// //                               Amount:
// //                             </span>
// //                             <span className="text-gray-900 font-medium">₹{booking.totalAmount}</span>
// //                           </div>
// //                         )}

// //                         {booking.description && (
// //                           <div className="pt-2 border-t">
// //                             <span className="text-gray-500 flex items-start">
// //                               <svg className="w-4 h-4 mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                               </svg>
// //                               Description:
// //                             </span>
// //                             <p className="text-gray-900 mt-1 ml-5">{booking.description}</p>
// //                           </div>
// //                         )}
                        
// //                         {booking.additionalDetails && (
// //                           <div className="pt-2 border-t">
// //                             <span className="text-gray-500 flex items-start">
// //                               <svg className="w-4 h-4 mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                               </svg>
// //                               Additional Details:
// //                             </span>
// //                             <p className="text-gray-900 mt-1 ml-5">{booking.additionalDetails}</p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import MyBookings from "@/app/components/MyBookings";

// export default function MyBookingsPage() {
//   return <MyBookings />;
// }
"use client";
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Mail, Phone, Ticket, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Get user email from localStorage or context (modify as needed)
  useEffect(() => {
    const email = localStorage.getItem('userEmail') || 'sinhaaryan173@gmail.com'; // Replace with your auth logic
    setUserEmail(email);
  }, []);

  const fetchBookings = async () => {
    if (!userEmail) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/customer/bookings?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchBookings();
    }
  }, [userEmail]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Ticket className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            View and manage your event bookings ({userEmail})
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-16">
            <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">You haven't made any bookings yet.</p>
          </div>
        )}

        {/* Bookings Grid */}
        {bookings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Event Image */}
                {booking.eventId?.image && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={booking.eventId.image} 
                      alt={booking.eventId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status || 'confirmed')}`}>
                      {getStatusIcon(booking.status || 'confirmed')}
                      <span className="ml-1 capitalize">{booking.status || 'Confirmed'}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      #{booking._id.slice(-6).toUpperCase()}
                    </span>
                  </div>

                  {/* Event Details */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {booking.eventId?.name || 'Event Name'}
                  </h3>

                  <div className="space-y-3">
                    {/* Date & Time */}
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm">
                        {booking.eventId?.date ? formatDate(booking.eventId.date) : 'Date TBD'}
                      </span>
                    </div>

                    {booking.eventId?.time && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{formatTime(booking.eventId.time)}</span>
                      </div>
                    )}

                    {/* Location */}
                    {booking.eventId?.place && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{booking.eventId.place}</span>
                      </div>
                    )}

                    {/* Tickets */}
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm">
                        {booking.numberOfTickets} {booking.numberOfTickets === 1 ? 'Ticket' : 'Tickets'}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center text-gray-600 mb-2">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{booking.email}</span>
                      </div>
                      {booking.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{booking.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Total Amount */}
                    {booking.eventId?.price && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Amount:</span>
                          <span className="text-lg font-semibold text-gray-900">
                            ${(booking.eventId.price * booking.numberOfTickets).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking Date */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {bookings.filter(b => (b.status || 'confirmed').toLowerCase() === 'confirmed').length}
                </div>
                <div className="text-sm text-gray-600">Confirmed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {bookings.reduce((sum, booking) => sum + booking.numberOfTickets, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Tickets</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
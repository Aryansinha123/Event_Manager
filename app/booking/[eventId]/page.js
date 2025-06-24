// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function BookingPage({ params }) {
//   const { eventId } = params;
//   const router = useRouter();
//   const [eventDetails, setEventDetails] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     numberOfTickets: 1, // Default to 1 ticket
//     additionalDetails: "",
//   });

//   // Fetch event details
//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const response = await fetch(`/api/events/${eventId}`);
//         const data = await response.json();
//         if (data.success) {
//           setEventDetails(data.event);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error("Failed to fetch event details:", error);
//       }
//     };

//     fetchEventDetails();
//   }, [eventId]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...formData, eventId }),
//       });

//       if (response.ok) {
//         // router.push("/thank-you"); // Redirect after success
//         toast.success("Booking confirmed! 🎉");
//         router.push("/")
//       } else {
//         toast.error("Booking failed!")
//         console.error("Failed to book the event");
//       }
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-4">Book Event</h1>
//         {eventDetails ? (
//           <>
//             {/* Display event details */}
//             <div className="mb-6">
//               <img
//                 src={eventDetails.image}
//                 alt={eventDetails.name}
//                 className="w-full h-64 object-cover rounded-md mb-4"
//               />
//               <h2 className="text-xl font-semibold">{eventDetails.name}</h2>
//               <p className="text-gray-700 mb-2">{eventDetails.description}</p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Place:</strong> {eventDetails.place}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Date:</strong> {eventDetails.date}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Time:</strong> {eventDetails.time}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Price:</strong> ₹{eventDetails.price} per ticket
//               </p>
//             </div>

//             {/* Booking form */}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full border px-4 py-2 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full border px-4 py-2 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Phone</label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className="w-full border px-4 py-2 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Number of Tickets</label>
//                 <input
//                   type="number"
//                   value={formData.numberOfTickets}
//                   onChange={(e) =>
//                     setFormData({ ...formData, numberOfTickets: parseInt(e.target.value) })
//                   }
//                   min="1"
//                   className="w-full border px-4 py-2 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Additional Details</label>
//                 <textarea
//                   value={formData.additionalDetails}
//                   onChange={(e) =>
//                     setFormData({ ...formData, additionalDetails: e.target.value })
//                   }
//                   className="w-full border px-4 py-2 rounded-md"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//               >
//                 Submit Booking
//               </button>
//             </form>
//           </>
//         ) : (
//           <p>Loading event details...</p>
//         )}
//       </div>
//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingPage({ params }) {
  const { eventId } = params;
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

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
        router.push("/")
      } else {
        toast.error("Booking failed!")
        console.error("Failed to book the event");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = eventDetails ? eventDetails.price * formData.numberOfTickets : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {eventDetails ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="relative">
                <img
                  src={eventDetails.image}
                  alt={eventDetails.name}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{eventDetails.name}</h1>
                  <div className="flex items-center text-sm opacity-90">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {eventDetails.place}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{eventDetails.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">{eventDetails.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">{eventDetails.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price per ticket</p>
                      <p className="font-semibold text-gray-900">₹{eventDetails.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Tickets</h2>
                <p className="text-gray-600">Fill in your details to secure your spot</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Tickets *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.numberOfTickets}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfTickets: parseInt(e.target.value) })
                      }
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      tickets
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Details
                  </label>
                  <textarea
                    value={formData.additionalDetails}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalDetails: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      {formData.numberOfTickets} ticket{formData.numberOfTickets > 1 ? 's' : ''} × ₹{eventDetails.price}
                    </span>
                    <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-xl font-bold text-indigo-600">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to our terms and conditions. You will receive a confirmation email shortly.
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Event Details</h3>
              <p className="text-gray-600">Please wait while we fetch the event information...</p>
            </div>
          </div>
        )}
      </div>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
        toastClassName="rounded-lg shadow-lg"
      />
    </div>
  );
}
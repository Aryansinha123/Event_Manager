"use client"
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Mail, Phone, Ticket, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// import { useSession } from 'next-auth/react'; // Uncomment if using NextAuth
// import { useRouter } from 'next/router'; // Uncomment if using router for redirects

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState({ name: "Guest", email: "", joinedDate: "" }); // Extended user state

  // const router = useRouter(); // Uncomment if using router for redirects
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in.");
      }

      const response = await fetch("/api/customer/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const data = await response.json();
      setUserEmail(data.email); // Set the email dynamically
      setUser({
        name: data.username,
        email: data.email || "",
        joinedDate: data.createdAt || data.joinedDate || ""
      });
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details. Please log in.");
    }
  };
  // 🔥 STEP 3: REPLACE THIS SECTION WITH YOUR AUTH LOGIC
  // useEffect(() => {
  //   // ===== CHOOSE ONE OF THE OPTIONS BELOW =====

  //   // OPTION A: NextAuth.js (Uncomment the import above first)
  //   /*
  //   const { data: session } = useSession();
  //   if (session?.user?.email) {
  //     setUserEmail(session.user.email);
  //   } else {
  //     setError('Please log in to view your bookings');
  //   }
  //   */

  //   // OPTION B: localStorage (Simple - currently active)
  //   const email = localStorage.getItem('userEmail');
  //   if (email) {
  //     setUserEmail(email);
  //   } else {
  //     setError('Please log in to view your bookings');
  //     // Uncomment to redirect to login:
  //     // router.push('/login');
  //   }

  //   // OPTION C: Custom API call to get current user
  //   /*
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await fetch('/api/auth/me', {
  //         credentials: 'include'
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUserEmail(userData.email);
  //       } else {
  //         setError('Please log in to view your bookings');
  //       }
  //     } catch (err) {
  //       setError('Failed to authenticate user');
  //     }
  //   };
  //   fetchCurrentUser();
  //   */

  //   // OPTION D: JWT Token from localStorage
  //   /*
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
  //       if (payload.email && payload.exp > Date.now() / 1000) {
  //         setUserEmail(payload.email);
  //       } else {
  //         setError('Session expired. Please log in again.');
  //       }
  //     } catch (err) {
  //       setError('Invalid session. Please log in again.');
  //     }
  //   } else {
  //     setError('Please log in to view your bookings');
  //   }
  //   */

  // }, []);
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchBookings = async () => {
    if (!userEmail) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/customer/bookings?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
        setError(''); // Clear any previous errors
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
            View and manage your event bookings for
            {user.name}
            ({userEmail})
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
"use client"
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Mail, Phone, Ticket, CheckCircle, XCircle, AlertCircle, Star,User, Sparkles } from 'lucide-react';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState({ name: "Guest", email: "", joinedDate: "" }); // Extended user state

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
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-blue-700 bg-blue-50 border-blue-200';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-xl animate-pulse"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading your amazing bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-40 -translate-x-40"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">My Bookings</h1>
              <Sparkles className="w-8 h-8 text-yellow-300 ml-2" />
            </div>
            <p className="text-xl text-purple-100 mb-2">
              Welcome back, <span className="font-semibold text-white">{user.name}</span>!
            </p>
            <p className="text-purple-200 opacity-90">
              {userEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-4">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">Oops! Something went wrong</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center">
                <Ticket className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Event Journey Starts Here!</h3>
            <p className="text-gray-600 text-lg mb-8">No bookings yet, but amazing experiences await you.</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Explore Events
            </button>
          </div>
        )}

        {/* Bookings Grid */}
        {bookings.length > 0 && (
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div key={booking._id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Event Image */}
                  {booking.eventId?.image && (
                    <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400 overflow-hidden">
                      <img
                        src={booking.eventId.image}
                        alt={booking.eventId.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Status Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(booking.status || 'confirmed')} backdrop-blur-sm`}>
                        {getStatusIcon(booking.status || 'confirmed')}
                        <span className="ml-2 capitalize">{booking.status || 'Confirmed'}</span>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        #{booking._id.slice(-6).toUpperCase()}
                      </div>
                    </div>

                    {/* Event Details */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-200">
                      {booking.eventId?.name || 'Event Name'}
                    </h3>

                    <div className="space-y-3">
                      {/* Date & Time */}
                      <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">
                          {booking.eventId?.date ? formatDate(booking.eventId.date) : 'Date TBD'}
                        </span>
                      </div>

                      {booking.eventId?.time && (
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{formatTime(booking.eventId.time)}</span>
                        </div>
                      )}

                      {/* Location */}
                      {booking.eventId?.place && (
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{booking.eventId.place}</span>
                        </div>
                      )}

                      {/* Tickets */}
                      <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">
                          {booking.numberOfTickets} {booking.numberOfTickets === 1 ? 'Ticket' : 'Tickets'}
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                                        
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 mr-3 text-gray-400" />
                          <span className="text-sm font-medium">{booking.name}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-3 text-gray-400" />
                          <span className="text-sm font-medium">{booking.email}</span>
                        </div>
                        {booking.phone && (
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-3 text-gray-400" />
                            <span className="text-sm font-medium">{booking.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Total Amount */}
                      {booking.eventId?.price && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">Total Amount:</span>
                              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                &#8377;{(booking.eventId.price * booking.numberOfTickets).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Booking Date */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">
                        Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Star className="w-6 h-6 mr-2" />
                  Booking Summary
                </h3>
                <p className="text-purple-100 mt-1">Your event journey at a glance</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Ticket className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{bookings.length}</div>
                    <div className="text-gray-600 font-medium">Total Bookings</div>
                  </div>
                  
                  <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {bookings.filter(b => (b.status || 'confirmed').toLowerCase() === 'confirmed').length}
                    </div>
                    <div className="text-gray-600 font-medium">Confirmed</div>
                  </div>
                  
                  <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {bookings.reduce((sum, booking) => sum + booking.numberOfTickets, 0)}
                    </div>
                    <div className="text-gray-600 font-medium">Total Tickets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
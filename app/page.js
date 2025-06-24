
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "./components/Navbar";

// export default function HomePage() {
//   const router = useRouter();
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedDateRange, setSelectedDateRange] = useState({ start: "", end: "" });

//   // Mock data for demonstration
//   const mockEvents = [
//     {
//       _id: "1",
//       name: "Tech Conference 2025",
//       description: "Annual technology conference featuring latest innovations",
//       date: "2025-07-15",
//       time: "09:00 AM",
//       price: 150,
//       place: "San Francisco",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       _id: "2",
//       name: "Music Festival",
//       description: "Three-day music festival with top artists",
//       date: "2025-08-20",
//       time: "06:00 PM",
//       price: 85,
//       place: "Austin",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       _id: "3",
//       name: "Food & Wine Expo",
//       description: "Culinary experience with renowned chefs",
//       date: "2025-06-30",
//       time: "11:00 AM",
//       price: 75,
//       place: "New York",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       _id: "4",
//       name: "Art Gallery Opening",
//       description: "Contemporary art exhibition opening night",
//       date: "2025-07-05",
//       time: "07:00 PM",
//       price: 25,
//       place: "Los Angeles",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       _id: "5",
//       name: "Business Summit",
//       description: "Leadership and entrepreneurship summit",
//       date: "2025-09-10",
//       time: "08:00 AM",
//       price: 200,
//       place: "Chicago",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       _id: "6",
//       name: "Charity Run",
//       description: "Annual charity marathon for local causes",
//       date: "2025-06-25",
//       time: "06:00 AM",
//       price: 30,
//       place: "Boston",
//       image: "https://via.placeholder.com/300x200"
//     }
//   ];

//   // Fetch Events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         // Using mock data for demonstration
//         const res = await fetch("/api/events");
//         const data = await res.json();
//         // const data = mockEvents;
//         setEvents(data);
//         setFilteredEvents(data); // Default view
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//         // Fallback to mock data
//         setEvents(mockEvents);
//         setFilteredEvents(mockEvents);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Handle booking redirect
//   const handleBookNow = (eventId) => {
//     router.push(`/booking/${eventId}`);
//   };

//   // Get unique locations for filter dropdown
//   const getUniqueLocations = () => {
//     return [...new Set(events.map(event => event.place))];
//   };

//   // Apply all filters
//   const applyFilters = () => {
//     let filtered = events;

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter((event) =>
//         event.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Price range filter
//     if (priceRange.min !== "" || priceRange.max !== "") {
//       filtered = filtered.filter((event) => {
//         const price = event.price;
//         const min = priceRange.min === "" ? 0 : parseInt(priceRange.min);
//         const max = priceRange.max === "" ? Infinity : parseInt(priceRange.max);
//         return price >= min && price <= max;
//       });
//     }

//     // Location filter
//     if (selectedLocation) {
//       filtered = filtered.filter((event) => event.place === selectedLocation);
//     }

//     // Date range filter
//     if (selectedDateRange.start || selectedDateRange.end) {
//       filtered = filtered.filter((event) => {
//         const eventDate = new Date(event.date);
//         const startDate = selectedDateRange.start ? new Date(selectedDateRange.start) : new Date("1900-01-01");
//         const endDate = selectedDateRange.end ? new Date(selectedDateRange.end) : new Date("2100-12-31");
//         return eventDate >= startDate && eventDate <= endDate;
//       });
//     }

//     setFilteredEvents(filtered);
//   };

//   // Handle Search
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   // Handle Sort
//   const handleSort = (option) => {
//     setSortOption(option);
//     const sorted = [...filteredEvents].sort((a, b) => {
//       if (option === "date") {
//         return new Date(a.date) - new Date(b.date);
//       }
//       if (option === "price") {
//         return a.price - b.price;
//       }
//       if (option === "name") {
//         return a.name.localeCompare(b.name);
//       }
//       return 0;
//     });
//     setFilteredEvents(sorted);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchQuery("");
//     setPriceRange({ min: "", max: "" });
//     setSelectedLocation("");
//     setSelectedDateRange({ start: "", end: "" });
//     setSortOption("");
//     setFilteredEvents(events);
//   };

//   // Apply filters whenever filter values change
//   useEffect(() => {
//     applyFilters();
//   }, [searchQuery, priceRange, selectedLocation, selectedDateRange, events]);

//   // Apply sorting after filters are applied
//   useEffect(() => {
//     if (sortOption) {
//       handleSort(sortOption);
//     }
//   }, [filteredEvents.length]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <Navbar />

//       <div className="flex">
//         {/* Enhanced Filter Sidebar */}
//         <div className="w-80 bg-white/80 backdrop-blur-sm shadow-xl border-r border-gray-200/50 p-6 h-screen overflow-y-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
//               Filters
//             </h2>
//             <button
//               onClick={clearFilters}
//               className="text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-lg hover:bg-indigo-50 transition-all duration-200"
//             >
//               Clear All
//             </button>
//           </div>

//           {/* Search Filter */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               🔍 Search Events
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//               />
//               <div className="absolute right-3 top-3 text-gray-400">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Sort Options */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               📊 Sort By
//             </label>
//             <select
//               value={sortOption}
//               onChange={(e) => handleSort(e.target.value)}
//               className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//             >
//               <option value="">Default</option>
//               <option value="date">Date</option>
//               <option value="price">Price</option>
//               <option value="name">Name</option>
//             </select>
//           </div>

//           {/* Price Range Filter */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               💰 Price Range ($)
//             </label>
//             <div className="flex gap-3">
//               <div className="flex-1">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   value={priceRange.min}
//                   onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
//                   className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//                 />
//               </div>
//               <div className="flex items-center text-gray-400">-</div>
//               <div className="flex-1">
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   value={priceRange.max}
//                   onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
//                   className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Location Filter */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               📍 Location
//             </label>
//             <select
//               value={selectedLocation}
//               onChange={(e) => setSelectedLocation(e.target.value)}
//               className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//             >
//               <option value="">All Locations</option>
//               {getUniqueLocations().map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date Range Filter */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               📅 Date Range
//             </label>
//             <div className="space-y-3">
//               <div>
//                 <label className="text-xs text-gray-500 mb-1 block">From</label>
//                 <input
//                   type="date"
//                   value={selectedDateRange.start}
//                   onChange={(e) => setSelectedDateRange({...selectedDateRange, start: e.target.value})}
//                   className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs text-gray-500 mb-1 block">To</label>
//                 <input
//                   type="date"
//                   value={selectedDateRange.end}
//                   onChange={(e) => setSelectedDateRange({...selectedDateRange, end: e.target.value})}
//                   className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Results Count */}
//           <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//             <p className="text-sm font-medium text-gray-700 text-center">
//               📊 Showing <span className="text-blue-600 font-bold">{filteredEvents.length}</span> of <span className="text-indigo-600 font-bold">{events.length}</span> events
//             </p>
//           </div>
//         </div>

//         {/* Enhanced Main Content */}
//         <div className="flex-1">
//           <div className="p-8">
//             {filteredEvents.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <p className="text-gray-600 text-xl mb-6">No events found matching your criteria.</p>
//                 <button
//                   onClick={clearFilters}
//                   className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
//                 {filteredEvents.map((event) => (
//                   <div
//                     key={event._id}
//                     className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-indigo-200 transform hover:-translate-y-2"
//                   >
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={event.image || "https://via.placeholder.com/300x200"}
//                         alt={event.name}
//                         className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-indigo-600 shadow-lg">
//                         ${event.price}
//                       </div>
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </div>
                    
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
//                         {event.name}
//                       </h3>
//                       <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                         {event.description}
//                       </p>
                      
//                       <div className="space-y-2 mb-6">
//                         <div className="flex items-center text-sm text-gray-600">
//                           <span className="w-5 h-5 mr-3 text-indigo-500">📅</span>
//                           <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <span className="w-5 h-5 mr-3 text-indigo-500">🕐</span>
//                           <span className="font-medium">{event.time}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <span className="w-5 h-5 mr-3 text-indigo-500">📍</span>
//                           <span className="font-medium">{event.place}</span>
//                         </div>
//                       </div>
                      
//                       <button
//                         onClick={() => handleBookNow(event._id)}
//                         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105"
//                       >
//                         Book Now 🎫
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({ start: "", end: "" });

  // Mock data for demonstration
  const mockEvents = [
    {
      _id: "1",
      name: "Tech Conference 2025",
      description: "Annual technology conference featuring latest innovations in AI, blockchain, and emerging technologies. Join industry leaders and innovators.",
      date: "2025-07-15",
      time: "09:00 AM",
      price: 150,
      place: "San Francisco",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
    },
    {
      _id: "2",
      name: "Music Festival",
      description: "Three-day music festival with top artists from around the world. Experience incredible performances and discover new talent.",
      date: "2025-08-20",
      time: "06:00 PM",
      price: 85,
      place: "Austin",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    },
    {
      _id: "3",
      name: "Food & Wine Expo",
      description: "Culinary experience with renowned chefs showcasing gourmet cuisine and premium wines from local and international vineyards.",
      date: "2025-06-30",
      time: "11:00 AM",
      price: 75,
      place: "New York",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop"
    },
    {
      _id: "4",
      name: "Art Gallery Opening",
      description: "Contemporary art exhibition opening night featuring works from emerging and established artists. Wine and networking included.",
      date: "2025-07-05",
      time: "07:00 PM",
      price: 25,
      place: "Los Angeles",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=250&fit=crop"
    },
    {
      _id: "5",
      name: "Business Summit",
      description: "Leadership and entrepreneurship summit bringing together industry titans to share insights on building successful businesses.",
      date: "2025-09-10",
      time: "08:00 AM",
      price: 200,
      place: "Chicago",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=250&fit=crop"
    },
    {
      _id: "6",
      name: "Charity Run",
      description: "Annual charity marathon for local causes supporting education and community development. All skill levels welcome.",
      date: "2025-06-25",
      time: "06:00 AM",
      price: 30,
      place: "Boston",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
    }
  ];

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Using mock data for demonstration
        const res = await fetch("/api/events");
        const data = await res.json();
        // const data = mockEvents;
        setEvents(data);
        setFilteredEvents(data); // Default view
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // Fallback to mock data
        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
      }
    };

    fetchEvents();
  }, []);

  // Handle booking redirect
  const handleBookNow = (eventId) => {
    router.push(`/booking/${eventId}`);
  };

  // Get unique locations for filter dropdown
  const getUniqueLocations = () => {
    return [...new Set(events.map(event => event.place))];
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = events;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    if (priceRange.min !== "" || priceRange.max !== "") {
      filtered = filtered.filter((event) => {
        const price = event.price;
        const min = priceRange.min === "" ? 0 : parseInt(priceRange.min);
        const max = priceRange.max === "" ? Infinity : parseInt(priceRange.max);
        return price >= min && price <= max;
      });
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((event) => event.place === selectedLocation);
    }

    // Date range filter
    if (selectedDateRange.start || selectedDateRange.end) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        const startDate = selectedDateRange.start ? new Date(selectedDateRange.start) : new Date("1900-01-01");
        const endDate = selectedDateRange.end ? new Date(selectedDateRange.end) : new Date("2100-12-31");
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    setFilteredEvents(filtered);
  };

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle Sort
  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredEvents].sort((a, b) => {
      if (option === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      if (option === "price") {
        return a.price - b.price;
      }
      if (option === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    setFilteredEvents(sorted);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setSelectedLocation("");
    setSelectedDateRange({ start: "", end: "" });
    setSortOption("");
    setFilteredEvents(events);
  };

  // Apply filters whenever filter values change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, priceRange, selectedLocation, selectedDateRange, events]);

  // Apply sorting after filters are applied
  useEffect(() => {
    if (sortOption) {
      handleSort(sortOption);
    }
  }, [filteredEvents.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navbar />

      <div className="flex relative z-10 mt-[65px]">
        {/* Enhanced Filter Sidebar */}
        <div className="w-80 bg-white/10 backdrop-blur-xl shadow-2xl border-r border-white/20 p-6 h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-lg"></div>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Filters
              </span>
            </h2>
            <button
              onClick={clearFilters}
              className="text-sm text-cyan-300 hover:text-white font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              Clear All
            </button>
          </div>

          {/* Search Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-lg">🔍</span>
              Search Events
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute right-3 top-3 text-white/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-lg">📊</span>
              Sort By
            </label>
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
            >
              <option value="" className="bg-gray-800">Default</option>
              <option value="date" className="bg-gray-800">Date</option>
              <option value="price" className="bg-gray-800">Price</option>
              <option value="name" className="bg-gray-800">Name</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-lg">💰</span>
              Price Range ($)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex items-center text-white/60">-</div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-lg">📍</span>
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
            >
              <option value="" className="bg-gray-800">All Locations</option>
              {getUniqueLocations().map((location) => (
                <option key={location} value={location} className="bg-gray-800">
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span className="text-lg">📅</span>
              Date Range
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-cyan-200 mb-1 block">From</label>
                <input
                  type="date"
                  value={selectedDateRange.start}
                  onChange={(e) => setSelectedDateRange({...selectedDateRange, start: e.target.value})}
                  className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-xs text-cyan-200 mb-1 block">To</label>
                <input
                  type="date"
                  value={selectedDateRange.end}
                  onChange={(e) => setSelectedDateRange({...selectedDateRange, end: e.target.value})}
                  className="w-full border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
            <p className="text-sm font-medium text-white text-center">
              <span className="text-lg mr-2">📊</span>
              Showing <span className="text-cyan-300 font-bold">{filteredEvents.length}</span> of <span className="text-blue-300 font-bold">{events.length}</span> events
            </p>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex-1">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-b border-white/20 px-8 py-12">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Discover Amazing Events
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                From tech conferences to music festivals, find your next unforgettable experience. 
                Join thousands of attendees at premium events around the world.
              </p>
              <div className="flex items-center gap-8 mt-8">
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="text-2xl">🎪</span>
                  <span className="font-semibold">Premium Events</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <span className="text-2xl">🌍</span>
                  <span className="font-semibold">Worldwide Venues</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <span className="text-2xl">✨</span>
                  <span className="font-semibold">Curated Experiences</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                <h3 className="text-white text-2xl font-bold mb-4">No Events Found</h3>
                <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
                  We couldn't find any events matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-2 hover:scale-105"
                >
                  <span className="mr-2">🔄</span>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Events Grid Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Featured Events</h2>
                  <p className="text-white/70">Handpicked experiences just for you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event._id}
                      className="group relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden border border-white/20 hover:border-cyan-400/50 transform hover:-translate-y-4 hover:scale-105"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Premium Badge */}
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        ⭐ FEATURED
                      </div>

                      <div className="relative overflow-hidden">
                        <img
                          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"}
                          alt={event.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 text-white font-bold shadow-lg border border-white/30">
                          <span className="text-2xl">💰</span>
                          <span className="ml-1">${event.price}</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Floating Action Button */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <button
                            onClick={() => handleBookNow(event._id)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-full shadow-xl hover:shadow-cyan-500/50 transition-all duration-200 transform hover:scale-110"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-1">
                          {event.name}
                        </h3>
                        <p className="text-white/70 mb-6 line-clamp-2 leading-relaxed text-sm">
                          {event.description}
                        </p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-white/80 bg-white/5 rounded-lg p-2">
                            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 text-white">📅</span>
                            <div>
                              <span className="font-medium text-white">{new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-white/80 bg-white/5 rounded-lg p-2">
                            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white">🕐</span>
                            <span className="font-medium text-white">{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-white/80 bg-white/5 rounded-lg p-2">
                            <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 text-white">📍</span>
                            <span className="font-medium text-white">{event.place}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleBookNow(event._id)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-cyan-500/30 transform hover:-translate-y-1 relative overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>🎫</span>
                            Book Your Spot
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
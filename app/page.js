// "use client";

// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// export default function HomePage() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOption, setSortOption] = useState("");

//   // Fetch Events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch("/api/events");
//         const data = await res.json();
//         setEvents(data);
//         setFilteredEvents(data); // Default view
//       } catch (error) {
//         console.error("Failed to fetch events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Handle Search
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setFilteredEvents(
//       events.filter((event) =>
//         event.name.toLowerCase().includes(query.toLowerCase())
//       )
//     );
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
//       return 0;
//     });
//     setFilteredEvents(sorted);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />

//       {/* Search and Filter Controls */}
//       {/* <div className="p-6 bg-white shadow-md">
//         <input
//           type="text"
//           placeholder="Search events..."
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="border p-2 rounded w-full md:w-1/3 mb-4"
//         />
//         <div className="flex gap-4">
//           <button
//             onClick={() => handleSort("date")}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Sort by Date
//           </button>
//           <button
//             onClick={() => handleSort("price")}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Sort by Price
//           </button>
//         </div>
//       </div> */}



//       <div className="content flex flex-row">
// {/* Filter section */}

//         {/* Events Grid */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEvents.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white border rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <img
//                 src={event.image || "https://via.placeholder.com/150"}
//                 alt={event.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">{event.name}</h3>
//                 <p className="text-gray-600">{event.description}</p>
//                 <p>
//                   <strong>Date:</strong> {event.date}
//                 </p>
//                 <p>
//                   <strong>Price:</strong> ${event.price}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {event.place}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function HomePage() {
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
      description: "Annual technology conference featuring latest innovations",
      date: "2025-07-15",
      price: 150,
      place: "San Francisco",
      image: "https://via.placeholder.com/300x200"
    },
    {
      _id: "2",
      name: "Music Festival",
      description: "Three-day music festival with top artists",
      date: "2025-08-20",
      price: 85,
      place: "Austin",
      image: "https://via.placeholder.com/300x200"
    },
    {
      _id: "3",
      name: "Food & Wine Expo",
      description: "Culinary experience with renowned chefs",
      date: "2025-06-30",
      price: 75,
      place: "New York",
      image: "https://via.placeholder.com/300x200"
    },
    {
      _id: "4",
      name: "Art Gallery Opening",
      description: "Contemporary art exhibition opening night",
      date: "2025-07-05",
      price: 25,
      place: "Los Angeles",
      image: "https://via.placeholder.com/300x200"
    },
    {
      _id: "5",
      name: "Business Summit",
      description: "Leadership and entrepreneurship summit",
      date: "2025-09-10",
      price: 200,
      place: "Chicago",
      image: "https://via.placeholder.com/300x200"
    },
    {
      _id: "6",
      name: "Charity Run",
      description: "Annual charity marathon for local causes",
      date: "2025-06-25",
      price: 30,
      place: "Boston",
      image: "https://via.placeholder.com/300x200"
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-80 bg-white shadow-lg p-6 h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear All
            </button>
          </div>

          {/* Search Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Events
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range ($)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {getUniqueLocations().map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={selectedDateRange.start}
                onChange={(e) => setSelectedDateRange({...selectedDateRange, start: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={selectedDateRange.end}
                onChange={(e) => setSelectedDateRange({...selectedDateRange, end: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Events Grid */}
          <div className="p-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={event.image || "https://via.placeholder.com/300x200"}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Price:</strong> ${event.price}
                        </p>
                        <p>
                          <strong>Location:</strong> {event.place}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
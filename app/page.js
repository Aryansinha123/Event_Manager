"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
        setFilteredEvents(data); // Default view
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      )
    );
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
      return 0;
    });
    setFilteredEvents(sorted);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Search and Filter Controls */}
      <div className="p-6 bg-white shadow-md">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 mb-4"
        />
        <div className="flex gap-4">
          <button
            onClick={() => handleSort("date")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sort by Date
          </button>
          <button
            onClick={() => handleSort("price")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Sort by Price
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white border rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image || "https://via.placeholder.com/150"}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Price:</strong> ${event.price}
              </p>
              <p>
                <strong>Location:</strong> {event.place}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

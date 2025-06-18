

"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events);
    };
    fetchEvents();
  }, []);

 
  const filteredEvents = (events || []).filter((event) =>
  event.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <Carousel />

      <div className="container mx-auto my-6">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p>{event.description}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
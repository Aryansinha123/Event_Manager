"use client";

import { useState } from "react";

const events = [
  { id: 1, name: "Event 1", image: "/event1.jpg", description: "Exciting Event 1" },
  { id: 2, name: "Event 2", image: "/event2.jpg", description: "Exciting Event 2" },
  // Add more events here
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % events.length);
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + events.length) % events.length);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {events.map((event) => (
          <div key={event.id} className="w-full flex-shrink-0">
            <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
            <h3 className="text-center text-xl font-bold mt-2">{event.name}</h3>
            <p className="text-center">{event.description}</p>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full">
        {"<"}
      </button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full">
        {">"}
      </button>
    </div>
  );
}

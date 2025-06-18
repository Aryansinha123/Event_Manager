"use client";

import { useState } from "react";

export default function EventForm() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    time: "",
    price: "",
    place: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Event added successfully!");
    } else {
      alert("Failed to add event!");
    }
  };

  return (
    <form
      className="bg-white p-6 shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-bold mb-4">Add New Event</h3>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={form.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="time"
          className="w-full p-2 border rounded"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="place"
          placeholder="Event Place"
          className="w-full p-2 border rounded"
          value={form.place}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}

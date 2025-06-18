"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    price: "",
    place: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit (Add/Edit Event)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/events/${editId}` : "/api/events";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save event");

      fetchEvents();
      setForm({
        name: "",
        description: "",
        date: "",
        time: "",
        price: "",
        place: "",
        image: "",
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  // Handle Edit
  const handleEdit = (event) => {
    setForm(event);
    setEditId(event._id);
    setIsEditing(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Event Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="place"
          value={form.place}
          onChange={handleChange}
          placeholder="Place"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? "Update Event" : "Add Event"}
        </button>
      </form>

      {/* Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border rounded shadow-lg overflow-hidden">
            <img
              src={event.image || "https://via.placeholder.com/150"}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{event.name}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <p>
                <strong>Price:</strong> ${event.price}
              </p>
              <p>
                <strong>Place:</strong> {event.place}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(event)}
                  className="px-4 py-2 bg-yellow-400 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

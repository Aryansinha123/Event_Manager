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
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (Array.isArray(data)) setEvents(data);
      else setEvents([]);
    } catch (error) {
      setEvents([]);
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/events/${editId}` : "/api/events";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save event");
      }

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
      setError("Error saving the event. Please check your input and try again.");
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setIsEditing(true);
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      fetchEvents();
    } catch (err) {
      setError("Error deleting the event. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="place"
          value={form.place}
          onChange={handleChange}
          placeholder="Place"
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? "Update Event" : "Add Event"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id} className="mb-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{event.name}</p>
              <p className="text-gray-600">{event.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(event)}
                className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

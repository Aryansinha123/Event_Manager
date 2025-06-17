"use client";

import { useState } from "react";

export default function CustomerRegister() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <form
        className="max-w-md w-full bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Customer Register</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
        >
          Register
        </button>
        {message && <p className="text-center mt-4">{message}</p>}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a
            href="/customer/login"
            className="text-blue-500 hover:underline"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

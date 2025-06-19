"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function CustomerLogin() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize the router

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Save the token in localStorage if needed
        localStorage.setItem("token", data.token);

        // Redirect to the landing page
        router.push("/");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <form
        className="max-w-md w-full bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Customer Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email (or leave blank for username)"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username (or leave blank for email)"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={form.username}
          onChange={handleChange}
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
        >
          Login
        </button>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/customer/register"
            className="text-blue-500 hover:underline"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

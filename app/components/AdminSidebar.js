"use client";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white fixed h-[100vh]">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <ul className="space-y-4 p-4">
        <li className="hover:bg-gray-700 p-2 rounded">
          <a href="#">Dashboard</a>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <a href="#">Manage Events</a>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <a href="#">Settings</a>
        </li>
      </ul>
    </div>
  );
}

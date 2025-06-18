"use client";

import AdminNavbar from "@/app/components/AdminNavbar";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
   
    // </div
    <>
      <div className="flex flex-row">
        <div className="w-64">
          <AdminSidebar />
        </div>
        <div className="flex flex-col ">
          <div className="w-full fixed ">
            <AdminNavbar />
          </div>
          <main className="px-6 mt-[64px]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

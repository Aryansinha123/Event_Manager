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
        <div className="flex flex-col w-[100vw]">
          <div className="w-full fixed ">
            <AdminNavbar />
          </div>
          <main className="px-10 mt-[64px]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

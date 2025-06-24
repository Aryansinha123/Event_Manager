"use client";

import AdminNavbar from "@/app/components/AdminNavbar";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (

    <>
      <div className="flex flex-row">
        <div className="w-64">
          <AdminSidebar />
        </div>

        <main className=" w-[100vw] md:pl-12 pl-14">
          {children}
        </main>
      </div>
    </>
  );
}

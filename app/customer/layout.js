"use client";

import Navbar from "@/app/components/Navbar";
// import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
   
    // </div
    <>
      
        <div className="flex flex-col w-[100vw]">
          <div className="w-full fixed ">
            <Navbar />
          </div>
          <main className="md:px-10 mt-[64px] px-16 ">
            {children}
          </main>
        </div>
    </>
  );
}

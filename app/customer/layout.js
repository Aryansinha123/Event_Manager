"use client";

import Navbar from "@/app/components/Navbar";
import CreativeFooter from "../components/CreativeFooter";
export default function AdminLayout({ children }) {
  return (
   
    // </div
    <>
      
        <div className="flex flex-col w-[100vw]">
          <div className="w-full fixed z-100">
            <Navbar />
          </div>
          <main className="md:px-10 mt-[64px]  ">
            {children}
            
          </main>
        </div>
    </>
  );
}

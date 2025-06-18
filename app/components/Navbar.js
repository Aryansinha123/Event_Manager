"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <nav className={`p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-md`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Evently</h1>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                           Login
                        </button>
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 flex items-center justify-center gap-2 border border-gray-300 rounded-md bg-red-600 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        {darkMode ? (
                            <>
                                <span className="material-icons">wb_sunny</span> Light Mode
                            </>
                        ) : (
                            <>
                                <span className="material-icons">dark_mode</span> Dark Mode
                            </>
                        )}
                    </button>

                </div>
            </div>
        </nav>
    );
}

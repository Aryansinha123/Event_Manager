// "use client";

// export default function AdminSidebar() {
//   return (
//     <div className="w-64 bg-gray-800 text-white fixed h-[100vh]">
//       <div className="p-4 text-xl font-bold">Admin Panel</div>
//       <ul className="space-y-4 p-4">
//         <li className="hover:bg-gray-700 p-2 rounded">
//           <a href="#">Dashboard</a>
//         </li>
//         <li className="hover:bg-gray-700 p-2 rounded">
//           <a href="/admin/dashboard">Manage Events</a>
//         </li>
        
//         <li className="hover:bg-gray-700 p-2 rounded">
//           <a href="/admin/bookings">Bookings</a>
//         </li>
//       </ul>
//     </div>
//   );
// }

"use client";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white fixed h-[100vh] shadow-2xl border-r border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-xs text-gray-400">Event Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <a 
              href="#" 
              className="group flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 border border-transparent hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="w-8 h-8 bg-gray-700 group-hover:bg-blue-500 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:shadow-lg">
                <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 012 2v0H6v0a2 2 0 012-2v0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                Dashboard
              </span>
              <svg className="w-4 h-4 ml-auto text-gray-500 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>

          {/* Manage Events */}
          <li>
            <a 
              href="/admin/dashboard" 
              className="group flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-teal-600/20 transition-all duration-300 border border-transparent hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="w-8 h-8 bg-gray-700 group-hover:bg-emerald-500 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:shadow-lg">
                <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                Manage Events
              </span>
              <div className="ml-auto flex items-center">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  New
                </span>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </li>

          {/* Bookings */}
          <li>
            <a 
              href="/admin/bookings" 
              className="group flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all duration-300 border border-transparent hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="w-8 h-8 bg-gray-700 group-hover:bg-purple-500 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:shadow-lg">
                <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                Bookings
              </span>
              <svg className="w-4 h-4 ml-auto text-gray-500 group-hover:text-purple-400 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </li>
        </ul>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Event
            </button>
            <button className="w-full flex items-center p-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Reports
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-white">System Status</h4>
            <p className="text-xs text-green-400 mt-1">All systems online</p>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">admin@example.com</p>
          </div>
          <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const [user, setUser] = useState({ name: "Guest", email: "", joinedDate: "" });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setIsLoggedIn(false);
//         return;
//       }

//       try {
//         const res = await fetch("/api/customer/details", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUser({ 
//             name: data.username,
//             email: data.email || "",
//             joinedDate: data.createdAt || data.joinedDate || ""
//           });
//           setIsLoggedIn(true);
//         } else {
//           setIsLoggedIn(false);
//           localStorage.removeItem("token");
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         setIsLoggedIn(false);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser({ name: "Guest", email: "", joinedDate: "" });
//     setIsLoggedIn(false);
//     router.push("/customer/login");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       return new Date(dateString).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric"
//       });
//     } catch {
//       return "";
//     }
//   };

//   const getUserInitials = (name) => {
//     return name
//       .split(" ")
//       .map(word => word.charAt(0))
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <nav className={`sticky top-0 z-50 transition-all duration-300 ${
//       isScrolled 
//         ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
//         : 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a 
//               href="/" 
//               className={`text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 ${
//                 isScrolled ? 'from-purple-600 via-pink-600 to-red-600' : ''
//               }`}
//             >
//               ✨ EventEase
//             </a>
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               {[
//                 { href: "/", label: "Home", icon: "🏠" },
//                 { href: "/events", label: "Events", icon: "🎪" },
//                 { href: "/about", label: "About", icon: "ℹ️" },
//                 { href: "/contact", label: "Contact", icon: "📞" }
//               ].map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className={`group relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
//                     isScrolled 
//                       ? 'text-gray-700 hover:text-purple-600' 
//                       : 'text-gray-300 hover:text-white'
//                   }`}
//                 >
//                   <span className="flex items-center gap-2">
//                     <span className="text-xs">{link.icon}</span>
//                     {link.label}
//                   </span>
//                   <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* User Menu */}
//           <div className="relative">
//             <button
//               className={`group flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
//                 isScrolled
//                   ? 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200'
//                   : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
//               }`}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
//                 isScrolled 
//                   ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
//                   : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
//               }`}>
//                 {getUserInitials(user.name)}
//               </div>
//               <span className={`hidden sm:block font-medium ${
//                 isScrolled ? 'text-gray-700' : 'text-white'
//               }`}>
//                 {user.name}
//               </span>
//               <svg 
//                 className={`w-4 h-4 transition-transform duration-200 ${
//                   isDropdownOpen ? 'rotate-180' : ''
//                 } ${isScrolled ? 'text-gray-500' : 'text-white/70'}`} 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             {/* Dropdown Menu */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-200 animate-in slide-in-from-top-2 z-50">
//                 {isLoggedIn ? (
//                   <>
//                     {/* User Profile Header */}
//                     <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 p-6 text-white overflow-hidden">
//                       {/* Background Pattern */}
//                       <div className="absolute inset-0 bg-black/10">
//                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
//                         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
//                       </div>
                      
//                       <div className="relative flex items-center gap-4">
//                         <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-xl backdrop-blur-sm border border-white/30">
//                           {getUserInitials(user.name)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-bold text-xl leading-tight truncate">{user.name}</h3>
//                           {user.email && (
//                             <p className="text-purple-100 text-sm opacity-90 truncate">{user.email}</p>
//                           )}
//                           {user.joinedDate && (
//                             <div className="flex items-center gap-1 mt-1">
//                               <svg className="w-3 h-3 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                               </svg>
//                               <p className="text-purple-100 text-xs opacity-75">
//                                 Since {formatDate(user.joinedDate)}
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="p-2">
//                       <button
//                         onClick={() => {
//                           router.push("/customer/my-bookings");
//                           setIsDropdownOpen(false);
//                         }}
//                         className="group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-[1.02]"
//                       >
//                         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
//                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <span className="text-gray-800 font-semibold block">My Bookings</span>
//                           <span className="text-gray-500 text-xs">View your events</span>
//                         </div>
//                       </button>
                      
//                       <button
//                         onClick={handleLogout}
//                         className="group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 hover:scale-[1.02] text-red-600"
//                       >
//                         <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
//                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                           </svg>
//                         </div>
//                         <div>
//                           <span className="font-semibold block">Logout</span>
//                           <span className="text-red-400 text-xs">Sign out safely</span>
//                         </div>
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="p-2">
//                     <button
//                       onClick={() => {
//                         router.push("/customer/login");
//                         setIsDropdownOpen(false);
//                       }}
//                       className="group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-[1.02] text-blue-600"
//                     >
//                       <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
//                         <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                         </svg>
//                       </div>
//                       <div>
//                         <span className="font-semibold block">Login</span>
//                         <span className="text-blue-400 text-xs">Access your account</span>
//                       </div>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState({ name: "Guest", email: "", joinedDate: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("/api/customer/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser({ 
            name: data.username,
            email: data.email || "",
            joinedDate: data.createdAt || data.joinedDate || ""
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "Guest", email: "", joinedDate: "" });
    setIsLoggedIn(false);
    router.push("/customer/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return "";
    }
  };

  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className={`text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 ${
                isScrolled ? 'from-purple-600 via-pink-600 to-red-600' : ''
              }`}
            >
              ✨ EventEase
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {[
                { href: "/", label: "Home", icon: "🏠" },
                { href: "/events", label: "Events", icon: "🎪" },
                { href: "/about", label: "About", icon: "ℹ️" },
                { href: "/contact", label: "Contact", icon: "📞" }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-purple-600' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs">{link.icon}</span>
                    {link.label}
                  </span>
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </a>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              className={`group flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                isScrolled
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                isScrolled 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
              }`}>
                {getUserInitials(user.name)}
              </div>
              <span className={`hidden sm:block font-medium ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                {user.name}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                } ${isScrolled ? 'text-gray-500' : 'text-white/70'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-200 animate-in slide-in-from-top-2 z-50">
                {isLoggedIn ? (
                  <>
                    {/* User Profile Header */}
                    <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 p-6 text-white overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-black/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                      </div>
                      
                      <div className="relative flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-xl backdrop-blur-sm border border-white/30">
                          {getUserInitials(user.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl leading-tight truncate">{user.name}</h3>
                          {user.email && (
                            <p className="text-purple-100 text-sm opacity-90 truncate">{user.email}</p>
                          )}
                          {user.joinedDate && (
                            <div className="flex items-center gap-1 mt-1">
                              <svg className="w-3 h-3 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              <p className="text-purple-100 text-xs opacity-75">
                                Since {formatDate(user.joinedDate)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          router.push("/customer/my-bookings");
                          setIsDropdownOpen(false);
                        }}
                        className="group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-[1.02]"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-gray-800 font-semibold block">My Bookings</span>
                          <span className="text-gray-500 text-xs">View your events</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 hover:scale-[1.02] text-red-600"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold block">Logout</span>
                          <span className="text-red-400 text-xs">Sign out safely</span>
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-2">
                    <button
                      onClick={() => {
                        router.push("/customer/login");
                        setIsDropdownOpen(false);
                      }}
                      className="group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-[1.02] text-blue-600"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold block">Login</span>
                        <span className="text-blue-400 text-xs">Access your account</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay - you can add mobile menu here if needed */}
      {/* Removed the overlay that was causing the blur effect */}
    </nav>
  );
}
"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Calendar, Home, ArrowLeft, Search } from 'lucide-react'

export default function Custom404() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-white/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-24 h-24 md:w-32 md:h-32 text-purple-400 animate-pulse" />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Event Not Found
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            It looks like the event you&apos;re looking for has either ended, been moved, 
            or the page doesn&apos;t exist. Don&apos;t worry - there are plenty of other amazing 
            events waiting for you!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            
            <Link 
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Events
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 text-gray-500">
          <p className="text-sm">
            Lost? Try searching for events by category or date
          </p>
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-50" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </div>
  )
}
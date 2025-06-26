"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle, RefreshCcw, Home, ArrowLeft, Mail } from 'lucide-react'

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  const router = useRouter()

  // Determine error message based on status code
  const getErrorMessage = (code) => {
    switch (code) {
      case 400:
        return {
          title: "Bad Request",
          description: "The request couldn't be understood. Please check your input and try again."
        }
      case 401:
        return {
          title: "Unauthorized",
          description: "You need to sign in to access this event or registration page."
        }
      case 403:
        return {
          title: "Access Forbidden",
          description: "You don't have permission to access this event. It might be private or require special access."
        }
      case 404:
        return {
          title: "Event Not Found",
          description: "The event you're looking for doesn't exist or has been removed."
        }
      case 500:
        return {
          title: "Server Error",
          description: "Something went wrong on our end. Our team has been notified and is working on a fix."
        }
      case 502:
        return {
          title: "Bad Gateway",
          description: "We're having trouble connecting to our servers. Please try again in a moment."
        }
      case 503:
        return {
          title: "Service Unavailable",
          description: "Our registration system is temporarily unavailable. We'll be back online soon!"
        }
      default:
        return {
          title: "Something Went Wrong",
          description: "An unexpected error occurred while processing your request."
        }
    }
  }

  const errorInfo = getErrorMessage(statusCode)
  const isServerError = statusCode >= 500

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleReport = () => {
    const subject = `Error Report - ${statusCode}`
    const body = `I encountered an error on your event registration website:\n\nError Code: ${statusCode}\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}\n\nAdditional details:\n`
    window.location.href = `mailto:support@yoursite.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error icon and code */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-white/10 select-none mb-4">
            {statusCode || 'ERROR'}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <AlertTriangle className="w-20 h-20 md:w-24 md:h-24 text-orange-400" />
              <div className="absolute inset-0 animate-ping">
                <AlertTriangle className="w-20 h-20 md:w-24 md:h-24 text-orange-400 opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Error content */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {errorInfo.title}
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {errorInfo.description}
          </p>

          {/* Server error additional info */}
          {isServerError && (
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-orange-500/20">
              <p className="text-orange-200 text-sm">
                <strong>Don't worry!</strong> This is likely a temporary issue. 
                Try refreshing the page or come back in a few minutes.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold rounded-lg transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
          </div>

          {/* Report error section */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-400 text-sm mb-4">
              Still having trouble? Let us know what happened.
            </p>
            <button
              onClick={handleReport}
              className="inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors duration-200 text-sm underline decoration-dotted underline-offset-4"
            >
              <Mail className="w-4 h-4 mr-1" />
              Report this error
            </button>
          </div>

          {/* Error details for development */}
          {process.env.NODE_ENV === 'development' && err && (
            <div className="mt-8 p-4 bg-black/30 rounded-lg text-left">
              <h3 className="text-red-400 font-mono text-sm mb-2">Development Error Details:</h3>
              <pre className="text-xs text-gray-300 overflow-auto">
                {err.toString()}
              </pre>
            </div>
          )}
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-orange-300 rounded-full animate-bounce opacity-45" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
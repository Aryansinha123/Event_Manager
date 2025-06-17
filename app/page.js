export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Event Portal</h1>

        <div className="flex flex-col gap-4">
          <a 
            href="/customer/login" 
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600"
          >
            Customer Login
          </a>
          <a 
            href="/customer/register" 
            className="bg-green-500 text-white px-4 py-2 rounded-md text-center hover:bg-green-600"
          >
            Customer Registration
          </a>
        </div>
      </div>

      <div className="mt-4">
        <a 
          href="/admin/login" 
          className="text-blue-500 hover:underline"
        >
          Admin Login
        </a>
      </div>
    </div>
  );
}

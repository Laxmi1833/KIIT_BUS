import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* HERO */}
      <section className="bg-gradient-to-r from-dark via-gray-800 to-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Welcome to <span className="text-primary">Kiit Bus</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Your smart campus transportation companion
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Active Booking */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-primary hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Active Booking</h3>
              <span className="bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">
                LIVE
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Route</p>
            <p className="font-semibold text-dark mb-3">
              Hostel B → Campus 25
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Today • 8:30 AM
            </p>
            <Link
              to="/live-tracking"
              className="text-primary font-semibold hover:underline text-sm"
            >
              Track Live →
            </Link>
          </div>

          {/* Next Arrival */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-primary hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Next Arrival</h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                ON TIME
              </span>
            </div>
            <p className="text-sm text-gray-600">Bus Number</p>
            <p className="text-xl font-bold text-dark mb-2">UT-205</p>
            <p className="text-sm text-gray-600">ETA</p>
            <p className="text-2xl font-bold text-primary">5 min</p>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-primary hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-dark mb-4">
              Weekly Summary
            </h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-600">Rides</p>
                <p className="text-3xl font-extrabold text-dark">12</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Travel Time</p>
                <p className="text-3xl font-extrabold text-dark">8.5h</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Avg wait time: 6 minutes
            </p>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Ride */}
          <div className="bg-white rounded-2xl shadow-md p-10 text-center hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              🚍
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">
              Book a Ride
            </h3>
            <p className="text-gray-600 mb-6">
              Choose pickup and destination to find the best bus
            </p>
            <Link
              to="/select-route"
              className="inline-block bg-primary text-dark font-semibold px-10 py-3 rounded-xl hover:bg-yellow-400 transition"
            >
              Book Now
            </Link>
          </div>

          {/* View Routes */}
          <div className="bg-white rounded-2xl shadow-md p-10 text-center hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              🗺️
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">
              View Routes
            </h3>
            <p className="text-gray-600 mb-6">
              Explore all available bus routes & schedules
            </p>
            <Link
              to="/routes"
              className="inline-block bg-primary text-dark font-semibold px-10 py-3 rounded-xl hover:bg-yellow-400 transition"
            >
              View Routes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

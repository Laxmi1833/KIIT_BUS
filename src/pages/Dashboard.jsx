import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-dark to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Welcome to Kiit Bus</h1>
         {/* <p className="text-slate text-lg">Campus Hostel B • Roll: BT21CS001</p>*/}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Active Bookings</h3>
              <span className="bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">1</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Next Booking</p>
                <p className="font-semibold text-dark">Hostel B → Campus 25</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-semibold text-dark">Today, 8:30 AM</p>
              </div>
              <Link to="/live-tracking" className="text-primary font-semibold hover:underline text-sm">
                Track Live →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Next Bus Arrival</h3>
              <span className="bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">LIVE</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Bus Number</p>
                <p className="font-semibold text-dark">UT-205</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Arrival</p>
                <p className="font-semibold text-dark">5 minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold text-green-600">On Schedule</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Travel Summary</h3>
              <span className="bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">THIS WEEK</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Total Rides</p>
                <p className="text-2xl font-bold text-dark">12</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hours Traveled</p>
                <p className="text-2xl font-bold text-dark">8.5h</p>
              </div>
              <p className="text-xs text-gray-600 pt-2">Average wait time: 6 minutes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-dark mb-2">Book a Ride</h3>
            <p className="text-gray-600 mb-6">Select your pickup and destination for your next journey</p>
            <Link
              to="/select-route"
              className="inline-block bg-primary text-dark font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Book Now
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-2xl font-bold text-dark mb-2">View Routes</h3>
            <p className="text-gray-600 mb-6">Explore all available bus routes and schedules</p>
            <Link
              to="/routes"
              className="inline-block bg-primary text-dark font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              View Routes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

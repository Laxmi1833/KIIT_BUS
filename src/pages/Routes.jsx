import { useState } from 'react'

export default function Routes() {
  const [expandedRoute, setExpandedRoute] = useState(null)

  const busRoutes = [
    {
      id: 1,
      number: 'Route 1',
      name: 'North Campus Express',
      stops: ['Hostel A', 'Hostel B', 'Library', 'Campus 25'],
      schedule: ['6:30 AM', '7:15 AM', '8:00 AM', '8:30 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'],
      distance: '4.5 km',
      duration: '25 min',
      buses: 3,
    },
    {
      id: 2,
      number: 'Route 2',
      name: 'East Campus Link',
      stops: ['Hostel C', 'Hostel D', 'Cafeteria', 'Campus 25'],
      schedule: ['6:45 AM', '7:30 AM', '8:15 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM', '9:00 PM'],
      distance: '5.2 km',
      duration: '28 min',
      buses: 2,
    },
    {
      id: 3,
      number: 'Route 3',
      name: 'West Campus Circle',
      stops: ['Hostel A', 'Hostel C', 'Sports Complex', 'Campus 25'],
      schedule: ['7:00 AM', '8:00 AM', '9:00 AM', '10:30 AM', '12:30 PM', '2:30 PM', '4:30 PM', '6:30 PM'],
      distance: '6.0 km',
      duration: '30 min',
      buses: 2,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark mb-2">Bus Routes</h1>
        <p className="text-gray-600 mb-8">Explore all available routes and schedules</p>

        <div className="space-y-6">
          {busRoutes.map((route) => (
            <div key={route.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors border-l-4 border-primary"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">{route.number}</span>
                      <h3 className="text-xl font-bold text-dark">{route.name}</h3>
                    </div>
                    <p className="text-gray-600 mt-1">
                      {route.stops[0]} to {route.stops[route.stops.length - 1]}
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                      expandedRoute === route.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <div className="flex gap-4 text-sm">
                  <span className="text-gray-600"><strong>Distance:</strong> {route.distance}</span>
                  <span className="text-gray-600"><strong>Duration:</strong> {route.duration}</span>
                  <span className="text-gray-600"><strong>Buses:</strong> {route.buses}</span>
                </div>
              </button>

              {expandedRoute === route.id && (
                <div className="border-t border-slate px-6 py-8 bg-gray-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-dark mb-4 text-lg">Route Stops</h4>
                      <div className="space-y-3">
                        {route.stops.map((stop, idx) => (
                          <div key={stop} className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                              {idx < route.stops.length - 1 && (
                                <div className="w-1 h-6 bg-slate my-1"></div>
                              )}
                            </div>
                            <span className="font-medium text-dark">{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-dark mb-4 text-lg">Departure Times</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {route.schedule.map((time, idx) => (
                          <div key={idx} className="bg-white border border-slate rounded-lg px-3 py-2 text-center">
                            <p className="font-semibold text-dark">{time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button className="flex-1 bg-primary text-dark font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
                      Book from This Route
                    </button>
                    <button className="flex-1 border-2 border-primary text-dark font-semibold px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors">
                      View on Map
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

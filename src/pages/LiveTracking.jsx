import { useState } from 'react'

export default function LiveTracking() {
  const [selectedBus, setSelectedBus] = useState(null)

  const activeBuses = [
    { id: 1, number: 'UT-201', route: 'Hostel A ↔ Campus 25', status: 'On Route', location: 'Near Hostel B' },
    { id: 2, number: 'UT-205', route: 'Hostel C ↔ Campus 25', status: 'On Route', location: 'At Campus 25' },
    { id: 3, number: 'UT-210', route: 'Hostel B ↔ Campus 25', status: 'At Stop', location: 'Hostel B' },
    { id: 4, number: 'UT-215', route: 'Hostel D ↔ Campus 25', status: 'On Route', location: 'Near Library' },
    { id: 5, number: 'UT-220', route: 'Hostel A ↔ Campus 25', status: 'Maintenance', location: 'Service Center' },
  ]

  const routeStops = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Library', 'Campus 25']

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark mb-8">Live Bus Tracking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7.382" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Real-time Map (Integration Ready)</p>
                  <p className="text-gray-500 text-sm">Click on a bus to see its live location</p>
                </div>
              </div>

              {selectedBus && (
                <div className="bg-primary/10 border border-primary rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-dark">Bus {selectedBus.number}</h3>
                      <p className="text-gray-600">{selectedBus.route}</p>
                    </div>
                    <button
                      onClick={() => setSelectedBus(null)}
                      className="text-gray-400 hover:text-dark text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Location:</span>
                      <span className="font-semibold text-dark">{selectedBus.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-semibold text-green-600">{selectedBus.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Stop:</span>
                      <span className="font-semibold text-dark">Hostel C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ETA:</span>
                      <span className="font-semibold text-dark">3 minutes</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-dark mb-3">Route Timeline</h4>
                    <div className="space-y-2">
                      {routeStops.map((stop, idx) => (
                        <div key={stop} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            stop === selectedBus.location ? 'bg-primary' : 'bg-gray-400'
                          }`}></div>
                          <span className={`text-sm ${
                            stop === selectedBus.location ? 'font-bold text-dark' : 'text-gray-600'
                          }`}>
                            {stop}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h3 className="text-xl font-bold text-dark mb-4">Active Buses</h3>
            <div className="space-y-2">
              {activeBuses.map((bus) => (
                <button
                  key={bus.id}
                  onClick={() => setSelectedBus(bus)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedBus?.id === bus.id
                      ? 'border-primary bg-primary/10'
                      : 'border-slate hover:border-primary'
                  }`}
                >
                  <p className="font-bold text-dark">{bus.number}</p>
                  <p className="text-xs text-gray-600 mb-1">{bus.route}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      bus.status === 'On Route' ? 'bg-green-100 text-green-700' :
                      bus.status === 'At Stop' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

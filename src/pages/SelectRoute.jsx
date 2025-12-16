import { useState } from 'react'

export default function SelectRoute() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [showResults, setShowResults] = useState(false)

  const locations = ['Campus-6', 'KP-5', 'KP-10', 'KP-3', 'Campus-12', 'Campus-25']

  const mockBuses = [
    { id: 1, number: '10', route: 'Hostel B → Campus 25', eta: '5 min', capacity: '45/50' },
    { id: 2, number: '43', route: 'Hostel B → Campus 25', eta: '12 min', capacity: '30/50'},
    { id: 3, number: '32', route: 'Hostel B → Campus 25', eta: '18 min', capacity: '50/50'},
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (pickup && destination) {
      setShowResults(true)
    }
  }

  return (
  
    <div className="min-h-screen bg-gray-100 py-12">
      <section className="bg-gradient-to-r from-dark to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Welcome to Kiit Bus</h1>
         {/* <p className="text-slate text-lg">Campus Hostel B • Roll: BT21CS001</p>*/}
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-dark mb-8">See Available Buses</h1>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Pickup Location</label>
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select pickup location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select destination</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-primary text-dark font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Show Buses
                </button>
              </div>
            </div>
          </form>
        </div>

        {showResults && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-dark mb-6">
              Available Buses: {pickup} → {destination}
            </h2>

            {mockBuses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bus Number</p>
                    <p className="text-2xl font-bold text-dark">{bus.number}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">ETA</p>
                    <p className="text-xl font-semibold text-primary">{bus.eta}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Capacity</p>
                    <p className="text-lg font-semibold text-dark">{bus.capacity}</p>
                  </div>

                  {/*<div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      bus.type === 'Express' ? 'bg-primary text-dark' : 'bg-slate text-dark'
                    }`}>
                      {bus.type}
                    </span>
                  </div>*/}

                  <div>
                    <button className="w-full bg-primary text-dark font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showResults && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-600 text-lg">Select pickup and destination to see available buses</p>
          </div>
        )}
      </div>
    </div>
  )
}

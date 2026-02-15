import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bus, Navigation, Clock, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function LiveTracking() {
  const [selectedBus, setSelectedBus] = useState(null);

  const activeBuses = [
    { id: 1, number: 'UT-201', route: 'Hostel A ↔ Campus 25', status: 'On Route', location: 'Near Hostel B', color: 'text-green-600 bg-green-100' },
    { id: 2, number: 'UT-205', route: 'Hostel C ↔ Campus 25', status: 'On Route', location: 'At Campus 25', color: 'text-green-600 bg-green-100' },
    { id: 3, number: 'UT-210', route: 'Hostel B ↔ Campus 25', status: 'At Stop', location: 'Hostel B', color: 'text-blue-600 bg-blue-100' },
    { id: 4, number: 'UT-215', route: 'Hostel D ↔ Campus 25', status: 'On Route', location: 'Near Library', color: 'text-green-600 bg-green-100' },
    { id: 5, number: 'UT-220', route: 'Hostel A ↔ Campus 25', status: 'Maintenance', location: 'Service Center', color: 'text-orange-600 bg-orange-100' },
  ];

  const routeStops = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Library', 'Campus 25'];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Live Bus Tracking</h1>
          <p className="text-slate-500">Real-time location updates for all active buses.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAP SECTION */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 min-h-[500px] flex flex-col relative overflow-hidden">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" className="text-slate-400" />
                </svg>
              </div>

              <div className="flex-1 flex items-center justify-center z-10">
                <div className="text-center space-y-4">
                  <div className="bg-slate-50 p-6 rounded-full inline-block">
                    <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-lg">Interactive Map Integration</p>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      In a real deployment, this would be a Google Maps or Leaflet interface showing live bus coordinates.
                    </p>
                  </div>
                </div>
              </div>

              {selectedBus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-6 shadow-lg z-20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-900 p-3 rounded-lg text-white">
                        <Bus className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Bus {selectedBus.number}</h3>
                        <p className="text-sm text-slate-500">{selectedBus.route}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedBus(null)}
                      className="text-slate-400 hover:text-slate-900"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                      <p className="font-semibold text-slate-900 text-sm truncate">{selectedBus.location}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                      <span className={`text-sm font-bold ${selectedBus.status === 'Maintenance' ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedBus.status}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 font-bold uppercase">Next Stop</p>
                      <p className="font-semibold text-slate-900 text-sm">Hostel C</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 font-bold uppercase">ETA</p>
                      <p className="font-semibold text-slate-900 text-sm">3 min</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Route Progress</h4>
                    <div className="relative flex items-center justify-between">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10"></div>
                      {routeStops.map((stop, idx) => {
                        const isPast = activeBuses.findIndex(b => b.location === stop) === -1 && idx < 3; // Mock logic 
                        const isCurrent = stop === selectedBus.location;

                        return (
                          <div key={stop} className="flex flex-col items-center gap-2 group">
                            <div className={`w-3 h-3 rounded-full border-2 transition-all ${isCurrent
                                ? 'bg-slate-900 border-slate-900 scale-125'
                                : isPast
                                  ? 'bg-slate-400 border-slate-400'
                                  : 'bg-white border-slate-300'
                              }`}></div>
                            <span className={`text-[10px] font-medium transition-colors ${isCurrent ? 'text-slate-900' : 'text-slate-400'
                              }`}>
                              {stop}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* SIDEBAR LIST */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 h-fit">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-amber-500" />
              Active Fleet
            </h3>
            <div className="space-y-3">
              {activeBuses.map((bus) => (
                <motion.button
                  key={bus.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBus(bus)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${selectedBus?.id === bus.id
                      ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                      : 'border-slate-100 hover:border-slate-300 hover:shadow-md bg-white'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{bus.number}</p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${bus.color}`}>
                      {bus.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-1">{bus.route}</p>

                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {bus.location}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

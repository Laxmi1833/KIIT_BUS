import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Users, ChevronDown, Bus } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Routes() {
  const [expandedRoute, setExpandedRoute] = useState(null)

  const [busRoutes, setBusRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const routesData = await import('../services/api').then(m => m.fetchBusRoutes());
        // Transform backend data to UI format
        const formattedRoutes = routesData.filter(bus => bus.route && bus.route.length > 0).map(bus => {
          const stops = bus.route.map(s => s.name);
          const startNode = bus.route[0];
          const endNode = bus.route[bus.route.length - 1];

          // Calculate approximate distance (Haversine or simple Euclidean for now, or mock)
          // For now, let's mock distance/duration based on stop count as we don't have real routing engine distance
          const distance = (bus.route.length * 1.2).toFixed(1) + ' km';
          const duration = (bus.route.length * 5) + ' min';

          return {
            id: bus.bus_id,
            number: `Bus ${bus.bus_code}`,
            name: `${startNode.name} - ${endNode.name}`,
            stops: stops,
            schedule: ['Every 30 mins', '6:00 AM - 10:00 PM'], // Placeholder as we don't have schedule in DB
            distance: distance,
            duration: duration,
            buses: 1, // We are listing individual buses as routes since they are 1:1 in this system mostly
            status: bus.status
          };
        });
        setBusRoutes(formattedRoutes);
      } catch (err) {
        console.error("Failed to load routes", err);
      } finally {
        setLoading(false);
      }
    };
    loadRoutes();
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-8 px-4 md:px-8 pb-24 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary dark:text-gray-100 tracking-tight">Bus Routes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Explore all available routes and schedules</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl skeleton-shimmer" />
            ))}
          </div>
        ) : busRoutes.length === 0 ? (
          <div className="text-center py-16 bg-surface dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm animate-fade-in">
             <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
               <MapPin size={30} />
             </div>
             <p className="text-secondary dark:text-gray-300 font-medium text-lg">No routes available</p>
             <p className="text-slate-500 text-sm mt-1">Check back later for active bus schedules</p>
          </div>
        ) : (
          <div className="space-y-4">
            {busRoutes.map((route, idx) => (
              <Card
                key={route.id}
                className="!p-0 overflow-hidden border-0 shadow-soft glass-card"
                hover={false}
                delay={idx * 0.1}
              >
                <div
                  onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)}
                  className="p-5 bg-surface dark:bg-zinc-900 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/80 transition-colors relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                        {route.number.split(' ')[1]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-secondary dark:text-gray-100">{route.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
                          <MapPin size={14} />
                          {route.stops.length} Stops • {route.duration}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedRoute === route.id ? 180 : 0 }}
                      className="text-slate-400 dark:text-slate-500"
                    >
                      <ChevronDown />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRoute === route.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-slate-50/50 dark:bg-zinc-900/50 border-t border-slate-100 dark:border-white/5 overflow-hidden"
                    >
                      <div className="p-5">
                        {/* Stats */}
                        <div className="flex gap-4 mb-6 text-sm">
                          <div className="flex items-center gap-2 bg-surface dark:bg-zinc-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            <MapPin size={16} className="text-primary" />
                            <span className="font-semibold text-secondary dark:text-gray-100">{route.distance}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-surface dark:bg-zinc-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            <Clock size={16} className="text-orange-500 dark:text-orange-400" />
                            <span className="font-semibold text-secondary dark:text-gray-100">{route.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-surface dark:bg-zinc-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            <Bus size={16} className="text-emerald-500 dark:text-emerald-400" />
                            <span className="font-semibold text-secondary dark:text-gray-100">{route.buses} Buses</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          {/* STOPS */}
                          <div>
                            <h4 className="font-bold text-secondary dark:text-gray-100 mb-4 text-xs uppercase tracking-widest">Stops</h4>
                            <div className="relative pl-2 space-y-6">
                              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
                              {route.stops.map((stop, i) => (
                                <div key={stop} className="relative z-10 flex items-center gap-3">
                                  <div className={`w-5 h-5 rounded-full border-2 border-surface dark:border-zinc-900 shadow-sm flex items-center justify-center ${i === 0 || i === route.stops.length - 1 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    {i === 0 || i === route.stops.length - 1 ? <div className="w-1.5 h-1.5 bg-white rounded-full" /> : null}
                                  </div>
                                  <span className={`text-sm ${i === 0 || i === route.stops.length - 1 ? 'font-bold text-secondary dark:text-gray-100' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>{stop}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* SCHEDULE */}
                          <div>
                            <h4 className="font-bold text-secondary dark:text-gray-100 mb-4 text-xs uppercase tracking-widest">Schedule</h4>
                            <div className="flex flex-wrap gap-2">
                              {route.schedule.map((time, i) => (
                                <div key={i} className="bg-surface dark:bg-zinc-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-primary dark:hover:border-primary/50 hover:text-primary transition-colors cursor-default">
                                  {time}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                          <Button className="flex-1" icon={Users}>See Capacity</Button>
                          <Button variant="outline" className="flex-1" icon={MapPin}>View Map</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

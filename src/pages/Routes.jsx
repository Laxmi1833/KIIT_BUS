import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Route, Clock, ChevronRight } from 'lucide-react';

export default function RoutesPage() {
  const routes = [
    { id: 1, name: 'Route 1', from: 'Campus 3', to: 'Hostel King Palace', stops: ['Campus 3', 'Big Bazar', 'Patia', 'KP 1', 'KP 5'], time: '20 mins' },
    { id: 2, name: 'Route 2', from: 'Campus 6', to: 'Queens Castle', stops: ['Campus 6', 'Campus 12', 'QC Main'], time: '15 mins' },
    { id: 3, name: 'Route 3', from: 'Campus 15', to: 'KIMS', stops: ['Campus 15', 'Law School', 'KIMS Gate'], time: '25 mins' },
    { id: 4, name: 'Route 4', from: 'Maidangarhi', to: 'Campus 3', stops: ['Maidangarhi', 'Station', 'Campus 3'], time: '30 mins' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bus Routes</h1>
          <p className="text-slate-500 mt-2">View all active routes and scheduled stops. Plan your journey comfortably.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {routes.map((route, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={route.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Route className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{route.name}</h2>
                    <div className="flex items-center text-xs text-slate-500 font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {route.time}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative pl-4 space-y-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 bg-white"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">From</p>
                  <p className="text-base font-semibold text-slate-900">{route.from}</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-slate-300 bg-white"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">To</p>
                  <p className="text-base font-semibold text-slate-900">{route.to}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50">
                <p className="text-sm text-slate-500 mb-3 font-medium">Stops</p>
                <div className="flex flex-wrap gap-2">
                  {route.stops.map(stop => (
                    <span key={stop} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-100">
                      {stop}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

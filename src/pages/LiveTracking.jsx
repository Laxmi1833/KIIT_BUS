import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, Bus, ChevronRight, X } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LiveMap from '../components/LiveMap'
import { socket } from '../services/socket'
import { fetchLiveBuses, fetchBusRoutes } from '../services/api'

export default function LiveTracking() {
  const location = useLocation()
  const { busId } = location.state || {}
  const [selectedBus, setSelectedBus] = useState(null)
  const [viewMode, setViewMode] = useState('map')
  const [buses, setBuses] = useState([])
  const [filteredBuses, setFilteredBuses] = useState([])
  const [routes, setRoutes] = useState([])
  const [filteredRoutes, setFilteredRoutes] = useState([])
  const [etas, setEtas] = useState({}) // Map of busId -> array of stops with ETA

  useEffect(() => {
    // Initial fetch via REST API
    const loadInitialData = async () => {
      try {
        const data = await fetchLiveBuses();
        setBuses(data);
      } catch (err) {
        console.error("Failed to load initial bus data", err);
      }
    };

    loadInitialData();

    const loadRoutes = async () => {
      try {
        const data = await fetchBusRoutes();
        setRoutes(data || []);
      } catch (err) {
        console.error("Failed to load bus routes", err);
      }
    };
    loadRoutes();

    // Connect socket
    socket.connect();

    // Listen for events
    socket.on('initialBusLocations', (data) => {
      setBuses(data);
    });

    socket.on('busLocationUpdate', (updatedBus) => {
      setBuses(prevBuses => {
        const index = prevBuses.findIndex(b => b.busId === updatedBus.busId);
        if (index !== -1) {
          const newBuses = [...prevBuses];
          newBuses[index] = { ...newBuses[index], ...updatedBus };
          return newBuses;
        } else {
          return [...prevBuses, updatedBus];
        }
      });
    });

    socket.on('busETAUpdate', (data) => {
      setEtas(prevEtas => ({
        ...prevEtas,
        [data.busId]: data.stops
      }));
    });

    return () => {
      socket.off('initialBusLocations');
      socket.off('busLocationUpdate');
      socket.off('busETAUpdate');
      socket.disconnect();
    };
  }, []);

  // Filter buses based on navigation state (busId)
  useEffect(() => {
    if (busId && buses.length > 0) {
      const targetBus = buses.find(b => b.busId === busId);
      if (targetBus) {
        setFilteredBuses([targetBus]);
        setSelectedBus(targetBus);
      } else {
        setFilteredBuses([]);
      }
    } else {
      setFilteredBuses(buses);
    }
  }, [busId, buses]);

  // Filter routes based on visible buses
  useEffect(() => {
    if (routes.length > 0) {
      if (filteredBuses.length > 0) {
        const visibleBusIds = new Set(filteredBuses.map(b => b.busId));
        const visible = routes.filter(r => visibleBusIds.has(r.bus_id));
        setFilteredRoutes(visible);
      } else {
        setFilteredRoutes([]);
      }
    }
  }, [filteredBuses, routes]);

  const routeStops = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Library', 'Campus 25']

  return (
    <div className="h-[calc(100vh-[env(safe-area-inset-top)])] md:h-screen flex flex-col md:flex-row relative overflow-hidden bg-background dark:bg-background-dark">

      {/* MAP CONTAINER (Full height on mobile) */}
      <div className="flex-1 relative h-full bg-slate-200 dark:bg-slate-800">
        <LiveMap buses={filteredBuses} etas={etas} routes={filteredRoutes} />

        {/* Mobile Floating Action Button to show list if hidden */}
        <div className="md:hidden absolute bottom-24 right-4 z-20">
          <button
            onClick={() => setViewMode('list')}
            className="bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-transform"
          >
            <Bus size={24} />
          </button>
        </div>
      </div>

      {/* SIDEBAR LIST (Hidden on mobile unless toggled, Visible on Desktop) */}
      <motion.div
        initial={false}
        animate={window.innerWidth < 768 ? (viewMode === 'list' ? { y: 0 } : { y: '100%' }) : { y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
           fixed inset-x-0 bottom-0 top-16 z-30 bg-surface dark:bg-zinc-900 rounded-t-3xl shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)]
           md:static md:w-96 md:h-full md:shadow-[0_0_20px_rgba(0,0,0,0.05)] md:border-l md:border-slate-200 md:dark:border-white/5 md:rounded-none md:z-10
           flex flex-col transition-colors
           ${viewMode === 'list' ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}
         `}
      >
        {/* Mobile Handle */}
        <div className="md:hidden w-full flex justify-center pt-3 pb-1 cursor-pointer" onClick={() => setViewMode('map')}>
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        <div className="p-5 md:p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-surface dark:bg-zinc-900 rounded-t-3xl md:rounded-none">
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-gray-100 tracking-tight">Active Buses</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{filteredBuses.length} vehicles online</p>
          </div>
          <button onClick={() => setViewMode('map')} className="md:hidden p-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-zinc-950/50">
          {filteredBuses.length === 0 ? (
             <div className="text-center py-10">
               <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                 <Bus size={20} />
               </div>
               <p className="text-sm text-slate-500 font-medium">No buses currently active.</p>
             </div>
          ) : filteredBuses.map((bus) => (
            <div
              key={bus.busId}
              onClick={() => setSelectedBus(bus)}
              className={`
                    bg-surface dark:bg-zinc-900 p-4 rounded-2xl border transition-all cursor-pointer shadow-sm
                    ${selectedBus?.busId === bus.busId ? 'border-primary ring-1 ring-primary/50 dark:ring-primary/40 shadow-md' : 'border-slate-200 dark:border-white/5 hover:border-primary/30'}
                  `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl flex items-center justify-center font-bold">
                    <Bus size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary dark:text-gray-100 leading-none mb-1 text-base">{bus.code}</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{bus.routeId || 'Route 1'}</p>
                  </div>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${bus.speed_m_s > 0 ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600' :
                  'bg-amber-100/50 dark:bg-amber-500/10 text-amber-600'
                  }`}>
                  {bus.speed_m_s > 0 ? 'Moving' : 'Idle'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-zinc-800 px-3 py-2 rounded-lg">
                <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                <span>Last updated just now</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SELECTED BUS DETAIL OVERLAY (Mobile & Desktop) */}
      <AnimatePresence>
        {selectedBus && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="absolute bottom-[24px] md:bottom-8 left-4 right-4 md:left-8 md:right-auto md:w-[400px] z-[1000]"
          >
            <Card className="!p-5 border-0 shadow-float glass glass-dark">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-secondary dark:text-gray-100 flex items-center gap-2">
                    Bus {selectedBus.code}
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{selectedBus.routeId || 'Route 1'}</p>
                </div>
                <button onClick={() => setSelectedBus(null)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <X size={20} className="text-slate-400 dark:text-slate-500" />
                </button>
              </div>

              <div className="flex justify-between items-center py-4 border-y border-slate-100 dark:border-white/10 mb-5 relative before:absolute before:left-0 before:top-0 before:-bottom-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                <div className="text-center px-2 flex-1 relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-slate-200 dark:after:bg-slate-700">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Speed</p>
                  <p className="font-bold text-secondary dark:text-gray-100 text-lg">
                    {Math.round((selectedBus.speed_m_s || 0) * 3.6)} <span className="text-sm font-medium text-slate-400">km/h</span>
                  </p>
                </div>
                <div className="text-center px-4 flex-1 relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-px after:bg-slate-200 dark:after:bg-slate-700">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">ETA</p>
                  <p className="font-bold text-accent text-lg">
                    {etas[selectedBus.busId]?.[0]?.etaMinutes || '--'} <span className="text-sm font-medium text-slate-400">min</span>
                  </p>
                </div>
                <div className="text-center px-2 flex-1">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Next</p>
                  <p className="font-bold text-secondary dark:text-gray-100 truncate max-w-[100px] mx-auto">
                    {etas[selectedBus.busId]?.[0]?.stopName || 'Fetching...'}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 dark:text-slate-500 px-2 relative">
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10" />
                {routeStops.slice(0, 4).map((stop, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-1 bg-white dark:bg-zinc-900 rounded-full">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 1 ? 'bg-primary ring-4 ring-primary/20 dark:ring-primary/40' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    <span className={`text-[10px] tracking-wide ${i === 1 ? 'text-primary font-bold' : ''}`}>{stop.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useState } from 'react';
import API_BASE from '../apiBase';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Bus, AlertCircle } from 'lucide-react';

export default function SelectRoute() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  // Fetch stops
  useEffect(() => {
    const fetchStops = async () => {
      try {
        const res = await fetch(`${API_BASE}/getStops`);
        const data = await res.json();
        setStops(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch stops:', err);
        setStops([]);
      }
    };
    fetchStops();
  }, []);

  // Fetch buses with ETA
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pickup || !destination) return;

    setLoading(true);
    setShowResults(false); // Reset results view to trigger animation again
    try {
      const res = await fetch(`${API_BASE}/getBusesForRoutes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupId: pickup,
          dropId: destination,
        }),
      });

      const data = await res.json();
      setBuses(Array.isArray(data) ? data : []);
      setShowResults(true);
    } catch (err) {
      console.error('Failed to fetch buses:', err);
      setBuses([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Find Your Bus</h1>
          <p className="text-slate-500">Check live availability and ETAs across campus.</p>
        </div>

        {/* SEARCH CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-6 items-end">
            <div className="md:col-span-3">
              <SelectBox
                label="Pickup Location"
                icon={<MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />}
                value={pickup}
                onChange={setPickup}
                options={stops}
                placeholder="Select Pickup"
              />
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center pb-2">
              <div className="w-8 h-px bg-slate-200 mt-8"></div>
            </div>

            <div className="md:col-span-3">
              <SelectBox
                label="Destination"
                icon={<MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />}
                value={destination}
                onChange={setDestination}
                options={stops}
                placeholder="Select Drop"
              />
            </div>

            <div className="md:col-span-7 mt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-slate-900 hover:bg-slate-800 text-base"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Show Available Buses'}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* RESULTS */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Available Buses
                  <span className="ml-2 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {buses.length}
                  </span>
                </h2>
              </div>

              {buses.length > 0 ? (
                <div className="grid gap-4">
                  {buses.map((bus) => (
                    <motion.div
                      key={bus.bus_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Bus className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{bus.bus_code}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span>Non-AC</span>
                              <span>•</span>
                              <span>45 Seats</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">ETA</p>
                            <div className="flex items-center text-green-600 font-bold text-xl">
                              <Clock className="w-5 h-5 mr-1.5" />
                              {bus.eta_minutes} min
                            </div>
                          </div>
                          <Button size="sm" className="hidden md:inline-flex">Track Live</Button>
                          <Button size="sm" variant="outline" className="md:hidden">Track</Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-4">
                    <AlertCircle className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No buses found</h3>
                  <p className="text-slate-500">Try selecting a different route or time.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SelectBox({ label, value, onChange, options, icon, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 ml-1">
        {label}
      </label>
      <div className="relative">
        {icon}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
                     text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                     transition-all appearance-none cursor-pointer hover:bg-slate-100"
        >
          <option value="">{placeholder}</option>
          {options.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
    </div>
  );
}

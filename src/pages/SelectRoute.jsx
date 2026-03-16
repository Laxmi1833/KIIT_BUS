import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Navigation, Bus, Clock, Search } from "lucide-react";
import API_BASE from "../apiBase";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function SelectRoute() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([]);

  // Fetch stops
  useEffect(() => {
    const fetchStops = async () => {
      try {
        const res = await fetch(`${API_BASE}/getStops`);
        const data = await res.json();
        setStops(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch stops:", err);
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

    try {
      const res = await fetch(`${API_BASE}/getBusesForRoutes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupId: pickup,
          dropId: destination,
        }),
      });

      const data = await res.json();
      setBuses(Array.isArray(data) ? data : []);
      setShowResults(true);
    } catch (err) {
      console.error("Failed to fetch buses:", err);
      setBuses([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] pb-20 md:pb-8 bg-background dark:bg-background-dark relative">
      {/* Header Decor */}
      <div className="h-48 bg-primary rounded-b-[40px] shadow-lg shadow-primary/20 absolute top-0 inset-x-0 overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[200%] bg-white/10 rounded-full blur-3xl rotate-12" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[150%] bg-white/5 rounded-full blur-3xl -rotate-12" />
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 relative z-10 w-full">

        {/* Welcome Text */}
        <div className="text-white mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">Find your ride</h1>
          <p className="opacity-90 font-medium">Where are you going today?</p>
        </div>

        {/* SEARCH CARD */}
        <Card className="mb-8 !p-6 border-0 shadow-float glass-card">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative pl-8 space-y-4">
              {/* Decor Line */}
              <div className="absolute left-3 top-4 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-700">
                <div className="absolute -top-1 -left-[5px] w-3 h-3 rounded-full border-2 border-slate-300 dark:border-slate-500 bg-white dark:bg-zinc-800" />
                <div className="absolute -bottom-1 -left-[5px] w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 dark:ring-primary/10" />
              </div>

              <SelectBox
                label="Pickup Location"
                value={pickup}
                onChange={setPickup}
                options={stops}
                placeholder="Current Location"
                icon={MapPin}
              />

              <SelectBox
                label="Destination"
                value={destination}
                onChange={setDestination}
                options={stops}
                placeholder="Where to?"
                icon={Navigation}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg font-bold mt-4 animate-scale-in"
              isLoading={loading}
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              Search Buses
            </Button>
          </form>
        </Card>

        {/* RESULTS */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold text-secondary dark:text-gray-100 px-1 flex justify-between items-end">
              Available Buses 
              <span className="text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{buses.length} found</span>
            </h2>

            {buses.length > 0 ? (
              <div className="space-y-4">
                {buses.map((bus, idx) => (
                  <Card
                    key={bus.bus_id}
                    className="!p-4 active:scale-[0.98] transition-all cursor-pointer border border-transparent hover:border-primary/20 shadow-soft hover:shadow-float glass-card"
                    delay={idx * 0.1}
                    onClick={() => navigate('/live-tracking', { state: { busId: bus.bus_id } })}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                          <Bus size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-secondary dark:text-gray-100">{bus.bus_code}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">AC Seater</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-0.5">ETA</p>
                        <p className="text-xl font-bold text-accent flex items-center gap-1 justify-end">
                          <Clock size={16} />
                          {bus.eta_minutes} <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">min</span>
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full h-10 border-primary/20 text-primary hover:bg-primary/5 dark:hover:bg-primary/10 dark:border-primary/30"
                    >
                      Track Live Location
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-surface dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm animate-fade-in">
                <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Bus size={30} />
                </div>
                <p className="text-secondary dark:text-gray-300 font-medium text-lg">No buses found</p>
                <p className="text-slate-500 text-sm mt-1">Try selecting different stops</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function SelectBox({ label, value, onChange, options, placeholder, icon: Icon }) {
  return (
    <div className="relative group">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 pr-10 text-secondary dark:text-gray-100 font-medium
                       focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-slate-300 dark:hover:border-slate-600 transition-all appearance-none cursor-pointer outline-none"
        >
          <option value="" disabled className="text-slate-400">{placeholder}</option>
          {options.map((s) => (
            <option key={s.id} value={s.id} className="text-secondary dark:text-gray-100 dark:bg-zinc-800">
              {s.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
          <Search size={18} />
        </div>
      </div>
    </div>
  );
}

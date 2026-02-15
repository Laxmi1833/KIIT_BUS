import { useEffect, useState } from "react";
import API_BASE from "../apiBase";

export default function SelectRoute() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);

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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">

      {/* HERO */}
      <section className="bg-gradient-to-r from-dark to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Welcome to KiitBus</h1>
          <p className="text-gray-300 text-lg">
            Check live bus availability & ETAs across campus
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">

        {/* SEARCH CARD */}
        <div className="relative bg-white rounded-2xl shadow-lg p-10 mb-10 animate-fade-in">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-orange-400"></div>

          <h2 className="text-3xl font-bold text-dark mb-8">
            See Available Buses
          </h2>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <SelectBox
                label="Pickup Location"
                value={pickup}
                onChange={setPickup}
                options={stops}
              />

              <SelectBox
                label="Destination"
                value={destination}
                onChange={setDestination}
                options={stops}
              />

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-yellow-400
                             text-dark font-bold px-6 py-4 rounded-xl
                             hover:scale-[1.02] active:scale-[0.97]
                             transition-transform duration-200 shadow-md hover:shadow-lg"
                >
                  Show Buses
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* RESULTS */}
        {showResults && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-dark mb-4">
              Available Buses
            </h2>

            {buses.map((bus) => (
              <div
                key={bus.bus_id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

                  <div>
                    <p className="text-sm text-gray-600">Bus Number</p>
                    <p className="text-2xl font-bold text-dark">
                      {bus.bus_code}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Estimated Arrival</p>
                    <p className="text-xl font-semibold text-primary">
                      {bus.eta_minutes} min
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      className="w-full bg-primary text-dark font-semibold px-6 py-3
                                 rounded-xl hover:bg-yellow-400 transition-colors"
                    >
                      Track Live
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {buses.length === 0 && (
              <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-600">
                No buses available for the selected route
              </div>
            )}
          </div>
        )}

        {!showResults && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center animate-fade-in">
            <p className="text-gray-600 text-lg">
              Select pickup and destination to see available buses
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function SelectBox({ label, value, onChange, options }) {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-dark mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-slate rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-primary
                   transition-all duration-200 group-hover:border-primary"
      >
        <option value="">Select</option>
        {options.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}

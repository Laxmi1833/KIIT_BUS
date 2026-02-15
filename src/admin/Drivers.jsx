import { useEffect, useState } from "react";
import API_BASE from "../apiBase";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const fetchDrivers = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/getDriverDetails`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setDrivers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch drivers:", err.message);
      setDrivers([]);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // DELETE DRIVER
  const handleDelete = async (driverId, driverName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove driver "${driverName}"?`
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(driverId);

      const res = await fetch(
        `${API_BASE}/admin/deleteDriver/${driverId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error(`Delete failed (${res.status})`);

      // Remove driver from UI instantly
      setDrivers((prev) => prev.filter((d) => d.id !== driverId));
    } catch (err) {
      console.error("Failed to delete driver:", err.message);
      alert("Failed to delete driver. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Driver Management
        </h1>
        <p className="text-gray-600 mb-8">
          View and manage driver assignments
        </p>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm text-gray-600">Driver</th>
                <th className="px-6 py-4 text-sm text-gray-600">Phone</th>
                <th className="px-6 py-4 text-sm text-gray-600">Vehicle</th>
                <th className="px-6 py-4 text-sm text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm text-gray-600 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-b last:border-none">
                  <td className="px-6 py-4 font-semibold text-dark">
                    {d.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {d.phone || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {d.vehicle || "Unassigned"}
                  </td>

                  <td
                    className={`px-6 py-4 font-semibold ${
                      d.status === "active"
                        ? "text-green-600"
                        : d.status === "idle"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {d.status === "active"
                      ? "Active"
                      : d.status === "idle"
                      ? "Idle"
                      : "Maintenance"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(d.id, d.name)}
                      disabled={deletingId === d.id}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition
                        ${
                          deletingId === d.id
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                    >
                      {deletingId === d.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}

              {drivers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

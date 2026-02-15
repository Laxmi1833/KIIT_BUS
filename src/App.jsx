import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';

// Student pages
import SelectRoute from './pages/SelectRoute';
import LiveTracking from './pages/LiveTracking';
import RoutesPage from './pages/Routes';
import Support from './pages/Support';
import Complaints from './pages/Complaints';

// Driver pages
import DriverDashboard from './pages/driver/DriverDashboard';

// Admin pages
import AdminDashboard from './admin/AdminDashboard';
import Vehicles from './admin/Vehicles';
import Hostels from './admin/Hostels';
import Drivers from './admin/Drivers';
import Reports from './admin/Reports';
import LiveMap from './admin/LiveMap';
import MLPredictions from './admin/MLPredictions';
import AdminLogin from './admin/AdminLogin';

// Protected Route Wrapper
const ProtectedRoute = ({ allowedRoles }) => {
  const { role, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* PUBLIC / LANDING */}
              <Route path="/" element={<LandingPage />} />

              {/* STUDENT ROUTES */}
              <Route path="/student" element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route index element={<SelectRoute />} />
                <Route path="live-tracking" element={<LiveTracking />} />
                <Route path="routes" element={<RoutesPage />} />
                <Route path="support" element={<Support />} />
                <Route path="complaints" element={<Complaints />} />
              </Route>

              {/* DRIVER ROUTES */}
              <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']} />}>
                <Route index element={<DriverDashboard />} />
                {/* Add more driver routes here if needed */}
              </Route>

              {/* ADMIN LOGIN */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* ADMIN ROUTES */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route index element={<AdminDashboard />} />
                <Route path="vehicles" element={<Vehicles />} />
                <Route path="hostels" element={<Hostels />} />
                <Route path="drivers" element={<Drivers />} />
                <Route path="reports" element={<Reports />} />
                <Route path="live-map" element={<LiveMap />} />
                <Route path="ml" element={<MLPredictions />} />
              </Route>

              {/* CATCH ALL */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

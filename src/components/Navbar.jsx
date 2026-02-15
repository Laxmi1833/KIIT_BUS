import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Menu, X, Bus, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavItems = () => {
    switch (role) {
      case 'student':
        return [
          { label: 'Find Bus', path: '/student' },
          { label: 'Live Tracking', path: '/student/live-tracking' },
          { label: 'My Routes', path: '/student/routes' },
          { label: 'Support', path: '/student/support' },
          { label: 'Complaints', path: '/student/complaints' },
        ];
      case 'driver':
        return [
          { label: 'Dashboard', path: '/driver' },
          //   { label: 'My Schedule', path: '/driver/schedule' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin' },
          { label: 'Vehicles', path: '/admin/vehicles' },
          { label: 'Drivers', path: '/admin/drivers' },
        ];
      default:
        return [
          { label: 'Home', path: '/' },
          //   { label: 'Track Bus', path: '/student/live-tracking' }, // Redirect to student tracking if public? Or keep hidden
        ];
    }
  };

  const navItems = getNavItems();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <div className="bg-slate-900 p-1.5 rounded-lg">
            <Bus className="h-6 w-6 text-amber-500" />
          </div>
          <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-slate-900">
            KiitBus
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex md:flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "transition-colors hover:text-slate-900/80",
                  isActive(item.path) ? "text-slate-900 font-bold" : "text-slate-500"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-medium leading-none text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{role}</p>
                </div>
                <div className="relative group">
                  <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                    <User className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-slate-600 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              // If not logged in, we are likely on landing page or need to go there.
              // We can't link to /login as it doesn't exist.
              // We'll link to /admin/login for explicit admin login, or just remove if redundant.
              // But simplified: Link to /admin/login for "Admin Portal" explicitly? 
              // Or just keep "Sign In" pointing to "/" to let them choose.
              <Link to="/">
                <Button variant="default" size="sm" className="bg-slate-900 text-white hover:bg-slate-800 shadow-sm">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="ml-auto md:hidden p-2 text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-white"
          >
            <div className="space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <div className="border-t border-slate-100 mt-4 pt-4">
                  <div className="flex items-center px-4 mb-4">
                    <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-100 mt-4 pt-4">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-center bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

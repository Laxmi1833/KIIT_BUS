import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Bus, Clock, ChevronRight, Star, Shield } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark pb-20 md:pb-10 transition-colors">
      {/* HERO SECTION */}
      <section className="relative bg-primary text-white pt-10 pb-24 md:pb-32 px-6 overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-lg shadow-primary/10">
        {/* Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white/10 rounded-full blur-3xl rotate-12 pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[150%] bg-blue-600/30 rounded-full blur-3xl -rotate-12 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-white/10 shadow-sm">
                <Star size={12} className="text-yellow-300" fill="currentColor" />
                <span>Official Campus Transport</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight leading-[1.1]">
                Smart Ride <br />
                <span className="text-blue-200">Better Campus.</span>
              </h1>
              <p className="text-blue-100/90 text-lg mb-8 leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                Real-time tracking, accurate schedules, and seamless transit for everyone at KIIT.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/select-route" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full h-14 text-lg shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-100">
                    Find a Bus
                  </Button>
                </Link>
                <Link to="/live-tracking" className="w-full sm:w-auto">
                  <Button variant="ghost" className="w-full h-14 text-lg bg-white/10 text-white hover:bg-white/20 border-white/20 border">
                    Live Map
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:w-1/2 w-full"
          >
            {/* Abstract App Preview / Illustration */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/30">
                  <Bus className="text-orange-900" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg text-white">Arriving Now</p>
                  <p className="text-blue-100/80 text-sm font-medium">Route 4 • Campus 12</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-3xl">2 <span className="text-sm font-normal text-blue-100">min</span></p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex gap-4 items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="absolute left-0 top-0 h-full bg-green-400 rounded-full" 
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center shrink-0">
                  <Navigation size={20} className="text-green-300" />
                </div>
              </div>
              <div className="text-center font-medium text-xs text-blue-200 mt-2 tracking-wide uppercase">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                Live GPS Tracking Active
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Active Booking */}
          <Card className="!p-6 border-0 glass-card" hover delay={0.1}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center">
                <Clock size={20} />
              </div>
              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                Next Bus
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest mb-1">Upcoming</p>
            <h3 className="text-xl font-bold text-secondary dark:text-gray-100 mb-1">Campus 12 <span className="text-slate-400 font-normal">to</span> KIMS</h3>
            <p className="text-accent font-bold mb-5 flex items-center gap-1.5">
              <Clock size={16} /> 5 min away
            </p>
            <Link to="/live-tracking" className="block focus:outline-none">
              <Button variant="outline" className="w-full text-sm py-2 h-10 dark:hover:bg-slate-800">Track Now</Button>
            </Link>
          </Card>

          {/* Favorites */}
          <Card className="!p-6 border-0 glass-card" hover delay={0.2}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <Star size={20} />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest mb-1">Your Route</p>
            <h3 className="text-xl font-bold text-secondary dark:text-gray-100 mb-1">Route 5 Express</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-5">
              Daily • 8:30 AM
            </p>
            <Link to="/select-route" className="block focus:outline-none">
              <Button variant="outline" className="w-full text-sm py-2 h-10 dark:hover:bg-slate-800">Book Seat</Button>
            </Link>
          </Card>

          {/* Notice */}
          <Card className="!p-6 border-0 glass-card" hover delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                INFO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest mb-1">Safety</p>
            <h3 className="text-xl font-bold text-secondary dark:text-gray-100 mb-1">Safe Travel</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-5">
              All buses sanitized daily and tracked via GPS.
            </p>
            <Button variant="ghost" className="w-full text-sm py-2 h-10 text-slate-400 dark:text-slate-500 pointer-events-none">Verified</Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold text-secondary dark:text-gray-100 tracking-tight">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Link to="/select-route" className="group focus:outline-none">
            <div className="bg-surface dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 group-hover:shadow-float group-hover:border-primary/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                <Bus size={24} />
              </div>
              <p className="font-semibold text-secondary dark:text-gray-100 text-sm md:text-base">Find Bus</p>
            </div>
          </Link>
          <Link to="/routes" className="group focus:outline-none">
            <div className="bg-surface dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 group-hover:shadow-float group-hover:border-primary/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 mx-auto bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <p className="font-semibold text-secondary dark:text-gray-100 text-sm md:text-base">Routes</p>
            </div>
          </Link>
          <Link to="/live-tracking" className="group focus:outline-none">
            <div className="bg-surface dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 group-hover:shadow-float group-hover:border-primary/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 mx-auto bg-orange-50 dark:bg-orange-500/10 text-orange-500 dark:text-orange-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                <Navigation size={24} />
              </div>
              <p className="font-semibold text-secondary dark:text-gray-100 text-sm md:text-base">Track Live</p>
            </div>
          </Link>
          <Link to="/admin/login" className="group focus:outline-none">
            <div className="bg-surface dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 group-hover:shadow-float group-hover:border-primary/30 transition-all duration-300 text-center">
              <div className="w-12 h-12 mx-auto bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                <Shield size={24} />
              </div>
              <p className="font-semibold text-secondary dark:text-gray-100 text-sm md:text-base">Admin Portal</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}

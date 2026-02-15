import { motion } from 'framer-motion';
import { Bus, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function DriverDashboard() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-slate-900">Driver Dashboard</h1>
                <p className="text-slate-500">Welcome back, Driver. Here is your schedule for today.</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {/* CURRENT STATUS */}
                <motion.div variants={item} className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center">
                            <Bus className="mr-2 text-amber-500" /> Current Assignment
                        </h2>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Active
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Vehicle</p>
                            <p className="text-2xl font-bold text-slate-900">BUS-104</p>
                            <p className="text-sm text-slate-400">Volvo 9400 B11R</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Route</p>
                            <p className="text-2xl font-bold text-slate-900">Route 7 - Campus 3</p>
                            <p className="text-sm text-slate-400">Via Big Bazar & Patia</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800">
                            Update Status
                        </Button>
                        <Button variant="outline" className="w-full">
                            View Route Map
                        </Button>
                    </div>
                </motion.div>

                {/* STATS */}
                <motion.div variants={item} className="space-y-6">
                    <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                <Clock className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-amber-800">Next Stop</p>
                                <p className="text-xl font-bold text-slate-900">Campus 6</p>
                                <p className="text-xs text-slate-500">ETA: 5 mins</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Today's Schedule</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Trip {i} Completed</p>
                                        <p className="text-xs text-slate-400">10:00 AM</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

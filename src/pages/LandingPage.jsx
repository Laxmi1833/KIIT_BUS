import { motion } from 'framer-motion';
import { Bus, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export default function LandingPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRoleSelect = async (role) => {
        if (role === 'admin') {
            navigate('/admin/login');
        } else {
            const result = await login(role);
            if (result.success) {
                navigate(`/${role}`);
            }
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col">
            {/* HERO SECTION */}
            <section className="bg-slate-900 text-white py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto relative z-10"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/10">
                        <Bus className="w-10 h-10 text-amber-500 mr-3" />
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">KiitBus</h1>
                    </div>
                    <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                        The official transport management system for KIIT University.
                        Real-time tracking, route management, and seamless commuting for everyone.
                    </p>
                </motion.div>
            </section>

            {/* ROLE SELECTION */}
            <main className="flex-1 -mt-16 px-6 pb-12 relative z-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* STUDENT CARD */}
                    <div role="button" onClick={() => handleRoleSelect('student')} className="cursor-pointer h-full">
                        <RoleCard
                            variants={item}
                            icon={<User className="w-12 h-12 text-blue-500" />}
                            title="Student / Staff"
                            description="Track buses, check routes, and find your daily commute."
                            actionText="Find My Bus"
                            colorClass="hover:border-blue-500/50 hover:shadow-2xl"
                        />
                    </div>

                    {/* DRIVER CARD */}
                    <div role="button" onClick={() => handleRoleSelect('driver')} className="cursor-pointer h-full">
                        <RoleCard
                            variants={item}
                            icon={<Bus className="w-12 h-12 text-amber-500" />}
                            title="Bus Driver"
                            description="Manage your schedule, view assigned routes, and update status."
                            actionText="Driver Portal"
                            colorClass="hover:border-amber-500/50 hover:shadow-2xl"
                        />
                    </div>

                    {/* ADMIN CARD */}
                    <div role="button" onClick={() => handleRoleSelect('admin')} className="cursor-pointer h-full">
                        <RoleCard
                            variants={item}
                            icon={<ShieldCheck className="w-12 h-12 text-slate-900" />}
                            title="Administrator"
                            description="Manage fleet, drivers, routes, and system configuration."
                            actionText="Admin Login"
                            colorClass="hover:border-slate-900/50 hover:shadow-2xl"
                        />
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

function RoleCard({ icon, title, description, actionText, colorClass, variants }) {
    return (
        <motion.div
            variants={variants}
            className={`bg-white rounded-2xl p-8 shadow-xl border border-slate-100 transition-all duration-300 group h-full flex flex-col ${colorClass}`}
        >
            <div className="mb-6 bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 mb-8 flex-1">{description}</p>
            <Button
                className="w-full justify-between group-hover:pl-6 transition-all pointer-events-none" // Disable pointer events on button to let parent div handle click
                size="lg"
            >
                {actionText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </motion.div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary/50 shadow-soft hover:shadow-primary/30",
        secondary: "bg-secondary text-white dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-secondary-hover focus:ring-slate-500 shadow-soft hover:shadow-slate-900/20 dark:hover:shadow-black/40",
        outline: "border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200",
        ghost: "hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
        danger: "bg-danger text-white hover:bg-danger-hover focus:ring-danger/50 shadow-soft hover:shadow-danger/30",
        success: "bg-accent text-white hover:bg-accent-hover focus:ring-accent/50 shadow-soft hover:shadow-accent/30",
    };

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : Icon && (
                <Icon className={`w-5 h-5 ${children ? 'mr-2' : ''}`} />
            )}
            {children}
        </motion.button>
    );
};

export default Button;

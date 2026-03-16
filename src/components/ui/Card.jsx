import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, delay = 0, style, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
            className={`bg-surface dark:bg-zinc-900 rounded-2xl shadow-card border border-slate-100 dark:border-white/5 p-6 transition-colors ${hover ? 'hover:shadow-float' : ''} ${className}`}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;

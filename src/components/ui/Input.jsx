import React from 'react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`
            w-full bg-surface dark:bg-zinc-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition-all duration-200
            text-secondary dark:text-gray-100 placeholder-slate-400 dark:placeholder-slate-500
            focus:bg-white dark:focus:bg-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-slate-300 dark:hover:border-slate-600
            disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${error ? '!border-danger focus:!border-danger focus:!ring-danger/20' : ''}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-danger ml-1 animate-fade-in">{error}</p>
            )}
        </div>
    );
};

export default Input;

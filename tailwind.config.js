export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue 500
          hover: '#2563EB',   // Blue 600
        },
        secondary: {
          DEFAULT: '#0F172A', // Slate 900
          hover: '#1E293B',   // Slate 800
        },
        accent: {
          DEFAULT: '#10B981', // Emerald 500
          hover: '#059669',   // Emerald 600
        },
        background: {
          DEFAULT: '#FAFAFA', // Zinc 50
          dark: '#09090B',    // Zinc 950
        },
        surface: {
          DEFAULT: '#FFFFFF', // White
          dark: '#18181B',    // Zinc 900
        },
        danger: {
          DEFAULT: '#EF4444', // Red 500
          hover: '#DC2626',   // Red 600
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.05), border 1px solid rgba(0, 0, 0, 0.05)',
        'float': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        shimmer: {
          'from': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}


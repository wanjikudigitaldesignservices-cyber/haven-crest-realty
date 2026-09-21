/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B1320',      // Deep midnight navy
          charcoal: '#152238',  // Rich secondary dark
          surface: '#1E2D4A',   // Elevated dark surface
          gold: {
            DEFAULT: '#C5A880', // Champagne Gold
            light: '#DFCCA8',
            dark: '#9E8058',
            hover: '#B8986D',
          },
          stone: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
          emerald: {
            DEFAULT: '#10B981',
            light: '#D1FAE5',
            dark: '#047857',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 19, 32, 0.08), 0 2px 6px -1px rgba(11, 19, 32, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(11, 19, 32, 0.16), 0 4px 10px -2px rgba(11, 19, 32, 0.08)',
        'modal': '0 25px 50px -12px rgba(11, 19, 32, 0.25)',
      },
      borderRadius: {
        'luxury': '0.875rem',
      }
    },
  },
  plugins: [],
}

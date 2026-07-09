/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          blue: '#2563EB',
        },
        success: {
          DEFAULT: '#10B981',
          green: '#10B981',
        },
        ai: {
          DEFAULT: '#8B5CF6',
          purple: '#8B5CF6',
        },
        warning: {
          DEFAULT: '#F59E0B',
          orange: '#F59E0B',
        },
        error: {
          DEFAULT: '#EF4444',
          red: '#EF4444',
        },
        background: '#F8FAFC',
        text: '#111827',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

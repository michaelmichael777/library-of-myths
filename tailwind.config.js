/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0a0710',
          800: '#120d1c',
          700: '#1a1428',
          600: '#241b36',
          500: '#2f2450',
        },
        gold: {
          100: '#fdf3d3',
          200: '#f7e3a3',
          300: '#eccf6e',
          400: '#d9b14a',
          500: '#c3932b',
          600: '#9c721f',
        },
        amethyst: {
          300: '#c9a8ff',
          400: '#a87cf0',
          500: '#8a5fd6',
          600: '#6d44b0',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        // Ornate carved-inscription font used for the largest mystical titles.
        rune: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-40px) translateX(20px)', opacity: '0' },
        },
        mistMove: {
          '0%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(-10%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '0.7' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-14px)', opacity: '0.7' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        etherGlow: {
          '0%, 100%': { textShadow: '0 0 16px rgba(236,207,110,0.25), 0 0 40px rgba(138,95,214,0.15)' },
          '50%': { textShadow: '0 0 28px rgba(236,207,110,0.5), 0 0 64px rgba(138,95,214,0.3)' },
        },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        drift: 'drift 12s linear infinite',
        mistMove: 'mistMove 24s ease-in-out infinite',
        glowPulse: 'glowPulse 6s ease-in-out infinite',
        floatUp: 'floatUp 5s ease-in-out infinite',
        fadeUp: 'fadeUp 0.9s ease-out both',
        modalIn: 'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 6s linear infinite',
        etherGlow: 'etherGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

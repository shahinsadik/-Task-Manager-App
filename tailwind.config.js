module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#6366f1', // Indigo-500
          dark: '#4f46e5',    // Indigo-600
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        md: '0 4px 24px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

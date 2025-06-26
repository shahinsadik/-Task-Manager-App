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
        purpleBg: '#f5f0ff',       // lightest purple background
        purpleCard: '#e6d7ff',     // card background
        purpleAccent: '#805ad5',   // primary purple
        purpleDark: '#6b46c1',     // hover/focus purple
        purpleDeep: '#3c305a',     // sidebar or dark section
        purpleBadgeBg: '#ede9fe',  // soft badge bg
        purpleBadgeText: '#6d28d9',// badge text
        info: '#3b82f6',      // Blue-500
        warning: '#fbbf24',   // Yellow-400
        danger: '#ef4444',    // Red-500
        success: '#22c55e',   // Green-500
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        md: '0 4px 24px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

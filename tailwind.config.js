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
        purpleBg: "rgb(245, 240, 255)",        // Light page background
        purpleCard: "rgb(230, 215, 255)",      // Card background
        purpleAccent: "rgb(128, 90, 213)",     // Button / Primary
        purpleAccentDark: "rgb(107, 70, 193)", // Button hover
        purpleSidebar: "rgb(60, 48, 90)",      // Sidebar background
        purpleBadgeBg: "rgb(237, 233, 254)",   // Badge background
        purpleBadgeText: "rgb(109, 40, 217)",  // Badge label text
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

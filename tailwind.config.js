/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'finder-window': 'var(--finder-window)',
        'finder-sidebar': 'var(--finder-sidebar)',
        'finder-text': 'var(--finder-text)',
        'finder-text-secondary': 'var(--finder-text-secondary)',
        'finder-hover': 'var(--finder-hover)',
        'finder-accent': 'var(--finder-accent)',
        'finder-border': 'var(--finder-border)',
        'finder-search': 'var(--finder-search)',
        'finder-control-close': 'var(--finder-control-close)',
        'finder-control-minimize': 'var(--finder-control-minimize)',
        'finder-control-maximize': 'var(--finder-control-maximize)',
        'finder-control-close-hover': 'var(--finder-control-close-hover)',
        'finder-control-minimize-hover': 'var(--finder-control-minimize-hover)',
        'finder-control-maximize-hover': 'var(--finder-control-maximize-hover)',
      },
      fontFamily: {
        'finder': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        'sidebar': '200px',
      },
      borderRadius: {
        'control': '50%',
      },
      boxShadow: {
        'control': '0 0 0 1px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'folder': "url('./public/icons/icons8-mac-folder-96.png')",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        }
      },
      animation: {
        shake: 'shake 0.3s ease-in-out infinite',
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 
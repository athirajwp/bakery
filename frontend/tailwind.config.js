/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B0000',
          dark: '#6d0000',
          light: '#a31212',
          soft: '#fce9e6',
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#e0b900',
          light: '#ffe96b',
        },
        cream: {
          DEFAULT: '#FFF8F2',
          dark: '#fbeede',
        },
        brown: {
          DEFAULT: '#3E2723',
          light: '#5D4037',
          muted: '#8D6E63',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 6px 24px -8px rgba(62, 39, 35, 0.14)',
        lift: '0 18px 40px -14px rgba(139, 0, 0, 0.28)',
        gold: '0 10px 28px -8px rgba(255, 215, 0, 0.55)',
      },
      backgroundImage: {
        'hero-texture':
          'radial-gradient(60rem 40rem at 80% -10%, rgba(255,215,0,0.14), transparent 60%), radial-gradient(50rem 34rem at 0% 110%, rgba(139,0,0,0.06), transparent 55%)',
        'gold-gradient': 'linear-gradient(120deg, #FFD700 0%, #FFE96B 50%, #F5B301 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}

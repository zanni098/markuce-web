import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#02030A',
        base: '#060910',
        surface: '#0B0E1A',
        elevated: '#111624',
        primary: '#5865F2',
        accent: '#00C9A7',
        ember: '#FF6B35',
        text: '#E4EBFF',
        sub: '#7B88B8',
        muted: '#3D4A6B',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(30) forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(88,101,242,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(88,101,242,0.04) 1px, transparent 1px)`,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(88,101,242,0.15) 0%, transparent 70%)',
        'radial-accent': 'radial-gradient(ellipse at center, rgba(0,201,167,0.1) 0%, transparent 70%)',
        'gradient-primary': 'linear-gradient(135deg, #5865F2 0%, #7C3AED 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00C9A7 0%, #00B4D8 100%)',
        'gradient-text': 'linear-gradient(135deg, #E4EBFF 0%, #A5B4FC 40%, #00C9A7 100%)',
      },
    },
  },
  plugins: [],
}

export default config

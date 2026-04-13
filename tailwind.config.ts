import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf8fc',
        foreground: '#1a1a1a',
        primary: '#7c5b9d',
        primary_light: '#e8ddf5',
        accent: '#6b5089',
        border: '#e0d5f0',
      },
      borderRadius: {
        DEFAULT: '1rem',
        sm: '0.75rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      fontSize: {
        xs: '0.875rem',
        sm: '1rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config

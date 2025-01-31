import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6042AA',
        secondary: '#f5f5f5',
        gray: '#D3D3D3',
        dark: '#292929',
        'gray-dark': '#424B54',
        'gray-light': '#666768',
        'gray-lighter': '#E0E0E0',
        'gray-alt': '#F9F9F9',
        white: '#ffffff',
        purple: '#9F7CF7',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Larsseit', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      fontSize: {
        '12px': ['0.75rem', { lineHeight: '1rem' }],
        '14px': ['0.875rem', { lineHeight: '1.25rem' }],
        '16px': ['1rem', { lineHeight: '1.5rem' }],
        '20px': ['1.25rem', { lineHeight: '1.75rem' }],
        '26px': ['1.625rem', { lineHeight: '2rem' }],
      },
      spacing: {
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        40: '40px',
        48: '48px',
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '24px',
        md: '32px',
        lg: '80px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 34px rgba(16, 24, 40, 0.08)',
        button: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;

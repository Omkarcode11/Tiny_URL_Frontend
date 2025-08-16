import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3f4f6', // gray-100
          foreground: '#111827', // gray-900
        },
        destructive: {
          DEFAULT: '#dc2626', // red-600
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f9fafb', // gray-50
          foreground: '#6b7280', // gray-500
        },
        accent: {
          DEFAULT: '#f3f4f6', // gray-100
          foreground: '#374151', // gray-700
        },
        border: '#e5e7eb', // gray-200
        input: '#e5e7eb', // gray-200
        ring: '#2563eb', // blue-600
        background: '#ffffff',
        foreground: '#111827', // gray-900
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111827', // gray-900
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#111827', // gray-900
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
};

export default config;

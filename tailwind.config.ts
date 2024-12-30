import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        'border-gradient': 'border-gradient 8s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        ping: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'border-gradient': {
          '0%, 100%': {
            'border-image-source': 'linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4)',
          },
          '50%': {
            'border-image-source': 'linear-gradient(to right, #06b6d4, #ec4899, #8b5cf6)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        blink: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0',
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
} satisfies Config;

export default config;

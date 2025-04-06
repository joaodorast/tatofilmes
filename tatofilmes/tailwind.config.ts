
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					red: '#E50914',
					darkred: '#B80710',
					lightred: '#FF414D',
					gold: '#E5A00A',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cinema: {
					50: '#f5f5f6',
					100: '#e5e5e7',
					200: '#d1d1d5',
					300: '#b0afb6',
					400: '#908694',
					500: '#756778',
					600: '#5f5262',
					700: '#4d4251',
					800: '#423a45',
					900: '#32303c',
					950: '#1a1a1f',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'blur-in': {
					'0%': { filter: 'blur(5px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' },
				},
				'pulse-red': {
					'0%, 100%': { 
						backgroundColor: 'rgba(229, 9, 20, 0.8)',
						boxShadow: '0 0 0 0 rgba(229, 9, 20, 0.4)'
					},
					'50%': { 
						backgroundColor: 'rgba(229, 9, 20, 1)',
						boxShadow: '0 0 20px 5px rgba(229, 9, 20, 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'slide-down': 'slide-down 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'blur-in': 'blur-in 0.5s ease-out forwards',
				'pulse-red': 'pulse-red 2s infinite',
			},
			backgroundImage: {
				'red-gradient': 'linear-gradient(to right, #E50914, #FF414D)',
				'red-white-gradient': 'linear-gradient(to bottom, #E50914, #FFFFFF)',
				'dark-red-gradient': 'linear-gradient(135deg, #B80710 0%, #E50914 100%)',
				'light-red-gradient': 'linear-gradient(to right, #FF414D, #FF9A9E)',
				'red-gold-gradient': 'linear-gradient(to right, #E50914, #E5A00A)',
				'hero-pattern': 'linear-gradient(to bottom, rgba(229, 9, 20, 0.8), rgba(229, 9, 20, 0.4), transparent), url("/images/hero-bg.jpg")',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

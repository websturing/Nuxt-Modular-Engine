import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/components/**/*.{vue,js,ts}',
        './app/shared/**/*.vue',
        './app/pages/**/*.vue',
        './app/app.vue',
        './app/**/*.vue',  // Catch-all untuk Nuxt 4
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--primary-50)',
                    100: 'var(--primary-100)',
                    200: 'var(--primary-200)',
                    300: 'var(--primary-300)',
                    400: 'var(--primary-400)',
                    500: 'var(--primary-500)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    800: 'var(--primary-800)',
                    900: 'var(--primary-900)',
                    DEFAULT: 'var(--primary-500)',
                },
                secondary: {
                    50: 'var(--secondary-50)',
                    100: 'var(--secondary-100)',
                    200: 'var(--secondary-200)',
                    300: 'var(--secondary-300)',
                    400: 'var(--secondary-400)',
                    500: 'var(--secondary-500)',
                    600: 'var(--secondary-600)',
                    700: 'var(--secondary-700)',
                    800: 'var(--secondary-800)',
                    900: 'var(--secondary-900)',
                    DEFAULT: 'var(--secondary-500)',
                },
                black: {
                    50: 'var(--black-50)',
                    100: 'var(--black-100)',
                    200: 'var(--black-200)',
                    300: 'var(--black-300)',
                    400: 'var(--black-400)',
                    500: 'var(--black-500)',
                    600: 'var(--black-600)',
                    700: 'var(--black-700)',
                    800: 'var(--black-800)',
                    900: 'var(--black-900)',
                    DEFAULT: 'var(--black-500)',
                },
                white: {
                    50: 'var(--neutral-50)',
                },
                danger: {
                    50: 'var(--danger-50)',
                    100: 'var(--danger-100)',
                    200: 'var(--danger-200)',
                    300: 'var(--danger-300)',
                    400: 'var(--danger-400)',
                    500: 'var(--danger-500)',
                    600: 'var(--danger-600)',
                    700: 'var(--danger-700)',
                    800: 'var(--danger-800)',
                    900: 'var(--danger-900)',
                    DEFAULT: 'var(--danger-500)',
                },
                // Add semantic colors from variables.css
                sidebar: {
                    bg: 'var(--bg-sidebar)',
                    text: 'var(--text-secondary-50)',
                },
                background: {
                    bg: 'var(--bg-page)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [tailwindAnimate],
}
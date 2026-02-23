/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7B2FFF',
                    glow: 'rgba(123, 47, 255, 0.5)',
                },
                danger: {
                    DEFAULT: '#FF4444',
                    glow: 'rgba(255, 68, 68, 0.4)',
                },
                success: {
                    DEFAULT: '#00FF88',
                    glow: 'rgba(0, 255, 136, 0.4)',
                },
                background: {
                    start: '#0A0A0F',
                    end: '#1A0A2E',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#A89EC9',
                },
            },
            boxShadow: {
                'purple-glow': '0 0 20px rgba(123, 47, 255, 0.5)',
                'red-glow': '0 0 20px rgba(255, 68, 68, 0.4)',
                'green-glow': '0 0 20px rgba(0, 255, 136, 0.4)',
            },
            backgroundImage: {
                'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0M0 0l40 40' stroke='rgba(123,47,255,0.05)' stroke-width='1' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            }
        },
    },
    plugins: [],
}

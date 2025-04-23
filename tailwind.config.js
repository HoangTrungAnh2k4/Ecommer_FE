/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from 'tailwindcss-animated';

export default {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            transitionProperty: {
                all: 'all',
            },
            colors: {
                primary: '#263b96',
                second: '#6671a1',
                textColor1: '#3a3a3a',
                textColor2: '#575757',
                background: '#e2e2e2',
                redColor: '#e31223',
            },
            boxShadow: {
                'custom-soft': '0 2px 10px rgba(4, 41, 58, 0.2)',
                'custom-strong': '0 10px 25px rgba(0, 0, 0, 0.3)',
            },
            keyframes: {
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-3%)' },
                },
            },
        },
    },
    plugins: [tailwindcssAnimated],
};

/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            spacing: {
                1.5: '0.375rem',

                1.75: '0.4375rem',

                2.5: '0.625rem',

                3.5: '0.875rem',

                4.5: '1.25rem',

                5.5: '1.375rem',

                6.5: '1.625rem',

                7.5: '1.875rem',

                7.872: '1.968rem',

                15: '3.75rem',

                20: '5rem',

                25: '6.25rem',

                30: '7.5rem',

                35: '8.75rem',

                50: '12.5rem',

                60: '15rem',
            },

            fontFamily: {
                primary: ['iranSans', ...fontFamily.sans],
            },

            colors: {
                primary: {
                    // Customize it on globals.css :root

                    300: '#06b6d4',

                    500: '#05a7c2',

                    600: '#0055cc',

                    700: '#e5f8fb',

                    800: '#233361',

                    900: '#151f3a',
                },

                secondary: {
                    50: '#e5f8fb',

                    100: '#ffeef1',

                    300: '#ff5876',

                    500: '#e44864',
                },

                success: {
                    50: '#e5f9f2',

                    100: '#00c781',

                    300: '#65aa57',

                    500: '#00b374',

                    700: '#0aa25d',

                    800: '#00a049',

                    900: '#b1b64d',
                },

                default: {
                    50: '#f8fafc',
                },

                gray: {
                    50: '#f0f0f0',

                    100: '#d4d4d4',

                    200: '#cccccc',

                    300: '#949494',

                    400: '#606060',

                    500: '#33313c',

                    600: 'rgba(112,112,112, 0.3)',
                },
                warning: {
                    100: '#f9bc00',
                },
                transitionProperty: {
                    height: 'height',
                    spacing: 'margin, padding',
                },

                dark: '#222222',
            },

            fontSize: {
                sm: '0.625rem', // 10px

                m: '0.75rem', // 12px

                ml: '0.875rem', // 14px

                base: '1rem', // 16px

                l: '1.125rem', // 18px

                xl: '1.25rem', // 20px

                xxl: '1.375rem', // 22px

                xxxl: '1.5rem', // 24px
            },

            fontWeight: {
                'extra-light': 100,

                light: 300,

                normal: 400,

                medium: 600,

                bold: 800,

                // 'extra-bold': 800,

                black: 900,
            },

            borderRadius: {
                sm: '0.25rem', // 10px
                m: '0.5rem', // 10px
                md: '0.625rem', // 10px
                base: '0.75rem', // 10px

            },
            zIndex: {
                1000: 1000,
                1001: 1001,
                1002: 1002,
            },
            keyframes: {
                portal_in: {
                    '0%': {
                        opacity: 0,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
                portal_out: {
                    '0%': {
                        opacity: 1,
                    },
                    '100%': {
                        opacity: 0,
                    },
                },
                open_drawer: {
                    '0%': {
                        transform: 'translateX(100%)',
                    },
                    '100%': {
                        transform: 'translateX(0%)',
                    },
                },
                close_drawer: {
                    '0%': {
                        transform: 'translateX(0%)',
                    },
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
            },
            animation: {
                portalIn: 'portal_in 200ms linear forwards',
                portalOut_200: 'portal_out 200ms linear forwards',
                portalOut_300: 'portal_out 300ms linear forwards',
                portalOut_400: 'portal_out 400ms linear forwards',
                portalOut_500: 'portal_out 500ms linear forwards',
                portalOut600: 'portal_out 200ms linear 200ms forwards',
                openDrawer: 'open_drawer 300ms ease-out forwards',
                closeDrawer: 'close_drawer 200ms ease-out forwards',
            },
            padding: {
                '2px': '2px',
            },
            maxHeight: {
                '80%': '80%',
            },
            height: {
                '80vh': '80vh',
            },
            boxShadow: {
                base: '0 0 8px 0 #ccc',
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};

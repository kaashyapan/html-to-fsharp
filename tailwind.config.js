import daisyui from 'daisyui'

export default {
    darkMode: 'class',
    content: ['./*.{html, js}'],
    plugins: [daisyui],
    daisyui: {
        themes: ['coffee', 'bumblebee'],
    },
    theme: {
        extend: {
            keyframes: {
                fadein: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 0.08 },
                },
                fadeout: {
                    '0%': { opacity: 0.08 },
                    '100%': { opacity: 0 },
                },
            },
            animation: {
                'fade-in': 'fadein 1.5s linear forwards',
                'fade-out': 'fadeout 5s linear forwards',
            },
        },
        fontFamily: {
            sans: [
                'Montserrat',
                'ui-sans-serif',
                'Segoe UI',
                'Roboto',
                'Ubuntu',
                'Arial',
                'sans-serif',
            ],
            serif: [
                'ui-serif',
                'Georgia',
                'Cambria',
                'Times New Roman',
                'serif',
            ],
            mono: [
                'Consolas',
                'ui-monospace',
                'Menlo',
                'Liberation Mono',
                'Courier New',
                'monospace',
            ],
        },
    },
}

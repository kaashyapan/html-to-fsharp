import daisyui from 'daisyui'

export default {
    darkMode: 'class',
    content: ['./*.{html, js}'],
    plugins: [daisyui],
    daisyui: {
        themes: ['coffee', 'bumblebee'],
    },
    theme: {
        fontFamily: {
            sans: [
                'Monteserrat',
                'Segoe UI',
                'Roboto',
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
                'Liberation Mono',
                'Courier New',
                'monospace',
            ],
        },
    },
}

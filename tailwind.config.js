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

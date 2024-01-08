import daisyui from 'daisyui'

export default {
    darkMode: 'class',
    content: ['./*.{html, js}'],
    plugins: [daisyui],
    daisyui: {
        themes: ['coffee', 'bumblebee'],
    },
    theme: {
        extend: {},
    },
}

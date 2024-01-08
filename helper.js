export function getRidofEmptyLines(str) {
    return str
        .split('\n')
        .filter((line) => line.trim() !== '')
        .join('\n')
}

export function attrStringify(str) {
    let val = str.trim()
    let pattern = /[^0123456789.]/
    if (val.match(pattern)) {
        if (val === 'true' || val === 'false') {
            return val
        } else return `"${val}"`
    } else {
        return val
    }
}

export function swapHlCss() {
    let theme_swap = document.getElementById('theme-swap')

    let lightTheme = JSON.parse(
        localStorage.getItem('html2fsthemeIsLight') ?? 'false'
    )
    theme_swap.checked = lightTheme
    const dark_theme = document.styleSheets[0]
    const light_theme = document.styleSheets[1]

    if (lightTheme) {
        dark_theme.disabled = true
        light_theme.disabled = false
    } else {
        dark_theme.disabled = false
        light_theme.disabled = true
    }

    theme_swap.addEventListener('click', (e) => {
        let isLight = theme_swap['checked']
        localStorage.setItem('html2fsthemeIsLight', JSON.stringify(isLight))
        if (isLight) {
            dark_theme.disabled = true
            light_theme.disabled = false
        } else {
            dark_theme.disabled = false
            light_theme.disabled = true
        }
    })
}

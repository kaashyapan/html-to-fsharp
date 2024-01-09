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

    let isLight = JSON.parse(
        localStorage.getItem('html2fsthemeIsLight') ?? 'false'
    )
    theme_swap.checked = isLight

    let dark_theme = {}
    let light_theme = {}
    setTimeout(function () {
        try {
            dark_theme = document.styleSheets[0]
            light_theme = document.styleSheets[1]

            if (isLight) {
                dark_theme.disabled = true
                light_theme.disabled = false
            } else {
                dark_theme.disabled = false
                light_theme.disabled = true
            }
        } catch (e) {
            console.log(e)
        }
    }, 1500)

    theme_swap.addEventListener('click', (e) => {
        try {
            let isLight = theme_swap['checked']
            dark_theme = document.styleSheets[0]
            light_theme = document.styleSheets[1]

            localStorage.setItem('html2fsthemeIsLight', JSON.stringify(isLight))
            if (isLight) {
                dark_theme.disabled = true
                light_theme.disabled = false
            } else {
                dark_theme.disabled = false
                light_theme.disabled = true
            }
        } catch (e) {
            console.log(e)
        }
    })
}

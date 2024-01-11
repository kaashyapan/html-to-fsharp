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
    const htmleditor = document.getElementById('htmleditor')
    const fseditor = document.getElementById('fs-editor')

    let isLight = JSON.parse(
        localStorage.getItem('html2fsthemeIsLight') ?? 'false'
    )
    theme_swap.checked = isLight
    if (isLight) {
        htmleditor.classList.remove('editor-dark')
        htmleditor.classList.add('editor-light')
        fseditor.classList.remove('editor-dark')
        fseditor.classList.add('editor-light')
    } else {
        htmleditor.classList.add('editor-dark')
        htmleditor.classList.remove('editor-light')
        fseditor.classList.add('editor-dark')
        fseditor.classList.remove('editor-light')
    }

    theme_swap.addEventListener('click', (e) => {
        let isLight = theme_swap['checked']
        if (isLight) {
            htmleditor.classList.remove('editor-dark')
            htmleditor.classList.add('editor-light')
            fseditor.classList.remove('editor-dark')
            fseditor.classList.add('editor-light')
        } else {
            htmleditor.classList.add('editor-dark')
            htmleditor.classList.remove('editor-light')
            fseditor.classList.add('editor-dark')
            fseditor.classList.remove('editor-light')
        }

        localStorage.setItem('html2fsthemeIsLight', JSON.stringify(isLight))
    })
}

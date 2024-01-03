import './style.scss'

import { CodeJar } from 'codejar'
import Prism from 'prismjs'
import 'prismjs/components/prism-fsharp'
import 'prismjs/components/prism-markup'
import { parse_html } from './html_parser'
import { get_key, startup } from './choose_lib'
import { to_bolero } from './dom_bolero'
import { to_giraffe } from './dom_giraffe'
import { to_feliz } from './dom_feliz'
import { to_sutil } from './dom_sutil'
import { getRidofEmptyLines } from './helper'

const html_editor = document.querySelector('#htmleditor')
const convert_me = document.querySelector('#convert-me')
const copy_me = document.querySelector('#copy-me')
const clear_me = document.querySelector('#clear-me')
const fs_editor = document.querySelector('#fs-editor')

const highlight_html = (editor) => {
    editor.innerHTML = Prism.highlight(
        editor.textContent,
        Prism.languages.html,
        'html'
    )
}
const highlight_fsharp = (editor) => {
    editor.innerHTML = Prism.highlight(
        editor.textContent,
        Prism.languages.fsharp,
        'fsharp'
    )
}

startup()

const options = {
    tab: '    ',
    history: false,
}

const html_jar = CodeJar(html_editor, highlight_html, options)
const fs_jar = CodeJar(fs_editor, highlight_fsharp, options)
fs_jar.updateCode('//Enter valid HTML on the left and click to convert')

convert_me.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const code = html_jar.toString()
    const jobjs = parse_html(code)

    const lib = get_key()

    let fs_str = ''
    if (lib == 'feliz') fs_str = to_feliz(jobjs)
    if (lib == 'giraffe') fs_str = to_giraffe(jobjs)
    if (lib == 'bolero') fs_str = to_bolero(jobjs)
    if (lib == 'sutil') fs_str = to_sutil(jobjs)

    fs_jar.updateCode(getRidofEmptyLines(fs_str))
})

clear_me.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    fs_jar.updateCode('//Enter valid HTML on the left and click to convert')
    html_jar.updateCode('')
})

copy_me.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const copyText = fs_jar.toString()
    navigator.clipboard.writeText(copyText).then(() => {
        copy_me.innerHTML = `<i class="gg-smile"></i>`
        setTimeout(function () {
            copy_me.innerHTML = `<i class="gg-copy"></i>`
        }, 1000)
    })
})

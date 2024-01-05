import './style.scss'

import { CodeJar } from 'codejar'

import { parse_html } from './html_parser'
import { get_key, startup } from './choose_lib'
import { to_bolero } from './dom_bolero'
import { to_giraffe } from './dom_giraffe'
import { to_feliz } from './dom_feliz'
import { to_sutil } from './dom_sutil'
import { to_websharper } from './dom_websharper'
import { getRidofEmptyLines } from './helper'

const html_editor = document.querySelector('#htmleditor')
const convert_me = document.querySelector('#convert-me')
const copy_me = document.querySelector('#copy-me')
const clear_me = document.querySelector('#clear-me')
const fs_editor = document.querySelector('#fs-editor')

const highlight_html = (editor) => {
    editor.innerHTML = window.hljs.highlight(editor.textContent, {
        language: 'html',
    }).value
}
const highlight_fsharp = (editor) => {
    editor.innerHTML = window.hljs.highlight(editor.textContent, {
        language: 'fsharp',
    }).value
}

startup()

const options = {
    tab: '    ',
    history: false,
}

const defaultMsg = '// Enter valid HTML on the left and click > to convert'

const html_jar = CodeJar(html_editor, highlight_html, options)
const fs_jar = CodeJar(fs_editor, highlight_fsharp, options)
fs_jar.updateCode(defaultMsg)

convert_me.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const code = html_jar.toString()
    html_jar.updateCode(code.trim())

    const jobjs = parse_html(code)

    const lib = get_key()

    let fs_str = ''
    if (lib == 'feliz') fs_str = to_feliz(jobjs)
    if (lib == 'giraffe') fs_str = to_giraffe(jobjs)
    if (lib == 'bolero') fs_str = to_bolero(jobjs)
    if (lib == 'sutil') fs_str = to_sutil(jobjs)
    if (lib == 'websharper') fs_str = to_websharper(jobjs)

    fs_jar.restore({ start: 0, end: 0 })
    fs_jar.updateCode(getRidofEmptyLines(fs_str))
})

clear_me.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    fs_jar.restore({ start: 0, end: 0 })
    html_jar.restore({ start: 0, end: 0 })
    fs_jar.updateCode(defaultMsg)
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

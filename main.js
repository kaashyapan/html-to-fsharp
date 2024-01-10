import { CodeJar } from 'codejar'
import hljs from 'highlight.js/lib/core'

// Import each language module you require
import xml from 'highlight.js/lib/languages/xml' // for HTML
import fsharp from 'highlight.js/lib/languages/fsharp'

import { parse_html } from './html_parser'
import { get_key, startup } from './choose_lib'
import { to_bolero } from './dom_bolero'
import { to_giraffe } from './dom_giraffe'
import { to_feliz } from './dom_feliz'
import { to_sutil } from './dom_sutil'
import { to_falco } from './dom_falco'
import { to_websharper } from './dom_websharper'
import { getRidofEmptyLines, swapHlCss } from './helper'

document.addEventListener('DOMContentLoaded', () => {
    const html_editor = document.querySelector('#htmleditor')
    const convert_me = document.querySelector('#convert-me')
    const copy_me = document.querySelector('#copy-me')
    const clear_me = document.querySelector('#clear-me')
    const fs_editor = document.querySelector('#fs-editor')

    hljs.registerLanguage('xml', xml) // for HTML
    hljs.registerLanguage('fsharp', fsharp)

    const highlight_html = (editor) => {
        editor.innerHTML = hljs.highlight(editor.textContent, {
            language: 'html',
        }).value
    }
    const highlight_fsharp = (editor) => {
        editor.innerHTML = hljs.highlight(editor.textContent, {
            language: 'fsharp',
        }).value
    }

    startup()
    swapHlCss()

    const options = {
        tab: '    ',
        history: false,
    }

    const defaultMsg = '// Enter valid HTML on the left \n// Click > to convert'

    const html_jar = CodeJar(html_editor, highlight_html, options)
    const fs_jar = CodeJar(fs_editor, highlight_fsharp, options)
    fs_jar.updateCode(defaultMsg)

    let watermarks = document.getElementsByClassName('watermark')
    html_jar.onUpdate((code) => {
        if (
            code.length > 1 &&
            watermarks[0].classList.contains('animate-fade-in')
        ) {
            watermarks[0].classList.remove('animate-fade-in')
            watermarks[0].classList.add('animate-fade-out')
        }
    })
    convert_me.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const code = html_jar.toString().trim()
        if (code === '') {
            return
        }

        html_jar.updateCode(code)
        const jobjs = parse_html(code)

        const lib = get_key()

        watermarks[1].classList.remove('animate-fade-in')
        watermarks[1].classList.add('animate-fade-out')
        let fs_str = ''

        if (lib == 'feliz') fs_str = to_feliz(jobjs)
        if (lib == 'giraffe') fs_str = to_giraffe(jobjs)
        if (lib == 'bolero') fs_str = to_bolero(jobjs)
        if (lib == 'sutil') fs_str = to_sutil(jobjs)
        if (lib == 'websharper') fs_str = to_websharper(jobjs)
        if (lib == 'falco') fs_str = to_falco(jobjs)

        fs_jar.restore({ start: 0, end: 0 })
        fs_jar.updateCode(getRidofEmptyLines(fs_str))
    })

    clear_me.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        watermarks[0].classList.remove('animate-fade-out')
        watermarks[0].classList.add('animate-fade-in')
        watermarks[1].classList.remove('animate-fade-out')
        watermarks[1].classList.add('animate-fade-in')
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
})

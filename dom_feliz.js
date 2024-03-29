import { attrStringify } from './helper'

let accum = []
let indent = 0

const writeElement = (h) => {
    if (h.tag == 'text') {
        accum.push(`prop.text "${h.data}"\n`)
    } else {
        indent = indent + 4
        if (h.tag.includes('-')) {
            //webcomponents
            accum.push(`Html.custom "${h.tag}" [`)
        } else {
            accum.push(`Html.${h.tag} [`)
        }

        let attrs = []
        for (const attr in h.attrs) {
            let p = attr
                .trim()
                .replace(/class$/, 'className')
                .replace(/id$/, `id'`)
                .replace(/type$/, "type'")

            const _attr = attrStringify(h.attrs[attr])
            if (p.includes('-')) {
                //webcomponents
                attrs.push(`prop.custom "${p}" ${_attr}\n`)
            } else {
                attrs.push(`prop.${p} ${_attr}\n`)
            }
        }

        if (attrs.length > 0) {
            accum.push(`\n`)
            accum.push(' '.repeat(indent))
        } else {
            accum.push(`\n`)
        }

        accum.push(attrs.join(' '.repeat(indent)))
        h.children?.forEach((e) => {
            accum.push(' '.repeat(indent))
            writeElement(e)
        })
        indent = indent - 4
        if (indent > 0) accum.push(' '.repeat(indent)) //TODO if exp not necessary. Just in case...
        accum.push(`]\n`)
    }
}

export function to_feliz(h) {
    accum = []
    indent = 0
    h.forEach((e) => writeElement(e))
    return accum.join('')
}

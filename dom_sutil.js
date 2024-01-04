import { attrStringify } from './helper'

let accum = []
let indent = 0

const writeElement = (h) => {
    indent = indent + 4
    if (h.tag == 'text') {
        accum.push(`Html.text "${h.data}"\n`)
    } else {
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
                .replace(/class$/, "class'")
                .replace(/id$/, `id'`)
                .replace(/type$/, "type'")

            const _attr = attrStringify(h.attrs[attr])
            if (p.includes('-')) {
                //webcomponents
                attrs.push(`Attr.custom "${p}" ${_attr}\n`)
            } else {
                attrs.push(`Attr.${p} ${_attr}\n`)
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
        accum.push(' '.repeat(indent))
        accum.push(`]\n`)
    }
    indent = indent - 4
}

export function to_sutil(h) {
    accum = []
    h.forEach((e) => writeElement(e))
    return accum.join('')
}

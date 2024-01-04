let accum = []
let indent = 0

const writeElement = (h) => {
    indent = indent + 4
    if (h.tag == 'text') {
        accum.push(`"${h.data}"\n`)
    } else {
        accum.push(`${h.tag} {`)

        let attrs = []
        for (const property in h.attrs) {
            let p = property
                .trim()
                .replace(/class$/, '``class``')
                .replace(/type$/, '``type``')

            const _attr = h.attrs[property]

            if (p.includes('-')) {
                //webcomponents
                attrs.push(`"${p}" => "${_attr}"\n`)
            } else {
                attrs.push(`attr.${p} "${_attr}"\n`)
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
        accum.push(' '.repeat(indent))
        accum.push(`}\n`)
    }
}

export function to_bolero(h) {
    accum = []
    h.forEach((e) => writeElement(e))
    return accum.join('')
}

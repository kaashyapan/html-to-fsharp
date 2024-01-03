let accum = []
let indent = 0

const writeElement = (h) => {
    indent = indent + 4
    if (h.tag == 'text') {
        accum.push(`prop.text "${h.data}"\n`)
    } else {
        if (h.tag.includes('-')) {
            //webcomponents
            accum.push(`Html.custom "${h.tag}" [`)
        } else {
            accum.push(`Html.${h.tag} [`)
        }

        let attrs = []
        for (const property in h.attrs) {
            let p = property
                .replace('class', 'className')
                .replace('id', `id'`)
                .replace('type', "type'")
            //TODO expand style object to prop.style
            if (p.includes('-')) {
                //webcomponents
                attrs.push(`prop.custom "${p}" "${h.attrs[property]}"\n`)
            } else {
                attrs.push(`prop.${p} "${h.attrs[property]}"\n`)
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

export function to_feliz(h) {
    accum = []
    h.forEach((e) => writeElement(e))
    return accum.join('')
}
